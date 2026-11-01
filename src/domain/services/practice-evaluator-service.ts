import type { VoiceCommand } from '../models/command-model';
import type { MatchQuality, PracticeResult, SyllableEvaluation } from '../models/practice-model';

export class PracticeEvaluatorService {
  public static evaluate(
    command: VoiceCommand,
    recognizedRaw: string,
    targetLanguage: 'zh' | 'en'
  ): PracticeResult {
    const recognized = recognizedRaw.trim();
    if (!recognized) {
      return this.createEmptyResult(command, targetLanguage);
    }

    const targetPhrase = targetLanguage === 'zh' ? command.simplifiedChinese : command.englishCommand;
    const candidates = targetLanguage === 'zh'
      ? [command.simplifiedChinese, command.traditionalChinese, ...command.chineseAliases, command.pinyin?.replace(/\s+/g, '') ?? '']
      : [command.englishCommand, ...command.englishAliases];

    let bestScore = 0;
    for (const candidate of candidates) {
      const score = this.calculateSimilarity(recognized, candidate, targetLanguage);
      if (score > bestScore) {
        bestScore = score;
      }
    }

    const quality = this.determineQuality(bestScore);
    const syllableEvaluations = this.evaluateSyllables(command, recognized, targetLanguage);
    const suggestions = this.generateSuggestions(command, quality, targetLanguage);

    let feedback = 'Excellent! 70mai acoustic DSP will trigger promptly.';
    if (quality === 'good') {
      feedback = 'Good match! Very close to the dash cam recognition threshold.';
    } else if (quality === 'fair') {
      feedback = 'Partially matched. Try articulating syllables more clearly without ambient shouting.';
    } else if (quality === 'poor' || quality === 'none') {
      feedback = 'Not recognized. Review the tone guide and speak in a clear, conversational volume.';
    }

    return {
      commandId: command.id,
      targetLanguage,
      targetPhrase,
      recognizedText: recognized,
      similarityScore: Math.round(bestScore),
      quality,
      feedback,
      suggestions,
      syllableEvaluations,
      timestamp: Date.now()
    };
  }

  private static calculateSimilarity(a: string, b: string, lang: 'zh' | 'en'): number {
    const cleanA = this.cleanText(a, lang);
    const cleanB = this.cleanText(b, lang);

    if (cleanA === cleanB) return 100;
    if (!cleanA || !cleanB) return 0;

    if (cleanA.includes(cleanB) || cleanB.includes(cleanA)) {
      const minLen = Math.min(cleanA.length, cleanB.length);
      const maxLen = Math.max(cleanA.length, cleanB.length);
      return Math.round(85 + (minLen / maxLen) * 15);
    }

    const distance = this.levenshtein(cleanA, cleanB);
    const maxLen = Math.max(cleanA.length, cleanB.length);
    const ratio = Math.max(0, 1 - distance / maxLen);
    return Math.round(ratio * 100);
  }

  private static cleanText(text: string, lang: 'zh' | 'en'): string {
    if (lang === 'zh') {
      return text.toLowerCase().replace(/[\s.,!?;:，。！？；：“”‘’"']/g, '');
    }
    return text.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  private static levenshtein(s1: string, s2: string): number {
    const m = s1.length;
    const n = s2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i]![0] = i;
    for (let j = 0; j <= n; j++) dp[0]![j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        dp[i]![j] = Math.min(
          dp[i - 1]![j]! + 1,
          dp[i]![j - 1]! + 1,
          dp[i - 1]![j - 1]! + cost
        );
      }
    }
    return dp[m]![n]!;
  }

  private static determineQuality(score: number): MatchQuality {
    if (score >= 85) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 45) return 'fair';
    if (score > 10) return 'poor';
    return 'none';
  }

  private static evaluateSyllables(
    command: VoiceCommand,
    recognized: string,
    targetLanguage: 'zh' | 'en'
  ): readonly SyllableEvaluation[] {
    if (targetLanguage === 'zh') {
      const syllables = command.phoneticGuide.syllables;
      const cleanRecognized = recognized.toLowerCase();

      return syllables.map((syl, index) => {
        const char = command.simplifiedChinese[index] ?? '';
        const tradChar = command.traditionalChinese[index] ?? '';
        const matched = cleanRecognized.includes(char) ||
          cleanRecognized.includes(tradChar) ||
          cleanRecognized.includes(syl.replace(/[āáǎàōóǒòēéěèīíǐìūúǔù]/g, ''));

        return {
          expected: `${char} (${syl})`,
          matched,
          tip: command.phoneticGuide.tones[index]
        };
      });
    }

    const words = command.englishCommand.split(' ');
    const cleanRecognized = recognized.toLowerCase();
    return words.map((word) => ({
      expected: word,
      matched: cleanRecognized.includes(word.toLowerCase()),
      tip: 'Natural stress'
    }));
  }

  private static generateSuggestions(
    command: VoiceCommand,
    quality: MatchQuality,
    lang: 'zh' | 'en'
  ): readonly string[] {
    const list: string[] = [];
    if (quality !== 'excellent') {
      if (lang === 'zh') {
        list.push(`Focus on: ${command.phoneticGuide.description}`);
        list.push('Keep speech rhythm steady; dash cam DSP rejects pauses longer than 0.5s.');
      } else {
        list.push(`Speak standard phrase: "${command.englishCommand}"`);
        list.push('Avoid adding extra filler words like "please" or "hey 70mai".');
      }
      list.push('Note: Voice commands are muted if the 70mai smartphone app is connected.');
    }
    return list;
  }

  private static createEmptyResult(command: VoiceCommand, targetLanguage: 'zh' | 'en'): PracticeResult {
    return {
      commandId: command.id,
      targetLanguage,
      targetPhrase: targetLanguage === 'zh' ? command.simplifiedChinese : command.englishCommand,
      recognizedText: '',
      similarityScore: 0,
      quality: 'none',
      feedback: 'No speech detected. Press the microphone button and pronounce the phrase clearly.',
      suggestions: ['Check microphone permissions', 'Speak at normal conversational volume'],
      syllableEvaluations: [],
      timestamp: Date.now()
    };
  }
}
