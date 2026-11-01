export type RecognitionMode = 'speech-api' | 'acoustic-analyzer' | 'manual-checklist';

export type MatchQuality = 'excellent' | 'good' | 'fair' | 'poor' | 'none';

export interface SyllableEvaluation {
  readonly expected: string;
  readonly matched: boolean;
  readonly tip?: string;
}

export interface PracticeResult {
  readonly commandId: string;
  readonly targetLanguage: 'zh' | 'en';
  readonly targetPhrase: string;
  readonly recognizedText: string;
  readonly similarityScore: number; // 0 - 100
  readonly quality: MatchQuality;
  readonly feedback: string;
  readonly suggestions: readonly string[];
  readonly syllableEvaluations: readonly SyllableEvaluation[];
  readonly timestamp: number;
}

export interface PracticeHistoryItem {
  readonly id: string;
  readonly commandId: string;
  readonly dateIso: string;
  readonly score: number;
  readonly targetLanguage: 'zh' | 'en';
  readonly quality: MatchQuality;
}

