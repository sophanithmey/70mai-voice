import { SynthesizedSoundGenerator } from './synthesized-sound-generator';

export class AudioPlayerService {
  private static activeAudio: HTMLAudioElement | null = null;

  public static async playCommandAudio(
    audioPath: string,
    fallbackText: string,
    lang: 'zh' | 'en'
  ): Promise<void> {
    this.stopCurrentAudio();

    // First attempt: Primary audio path
    const played = await this.tryPlayAudioElement(audioPath);
    if (played) return;

    // Second attempt: Companion format (e.g. .mp3 -> .wav or .wav -> .mp3)
    const altPath = audioPath.endsWith('.mp3')
      ? audioPath.replace(/\.mp3$/, '.wav')
      : audioPath.replace(/\.wav$/, '.mp3');

    if (altPath !== audioPath) {
      const altPlayed = await this.tryPlayAudioElement(altPath);
      if (altPlayed) return;
    }

    // Third attempt: Offline SpeechSynthesis with matched voice
    this.playSpeechSynthesisFallback(fallbackText, lang);
  }

  private static tryPlayAudioElement(src: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      try {
        const audio = new Audio(src);
        this.activeAudio = audio;

        let hasResolved = false;
        const cleanupAndResolve = (success: boolean) => {
          if (!hasResolved) {
            hasResolved = true;
            this.activeAudio = null;
            resolve(success);
          }
        };

        audio.onended = () => cleanupAndResolve(true);
        audio.onerror = () => cleanupAndResolve(false);

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => cleanupAndResolve(false));
        }
      } catch {
        resolve(false);
      }
    });
  }

  public static playSpeechSynthesisFallback(text: string, lang: 'zh' | 'en'): void {
    if (!('speechSynthesis' in window)) {
      SynthesizedSoundGenerator.playConfirmationBeep();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      if (lang === 'zh') {
        const zhVoice = voices.find((v) =>
          v.lang.toLowerCase().startsWith('zh') ||
          v.name.includes('Chinese') ||
          v.name.includes('Tingting') ||
          v.name.includes('Meijia') ||
          v.name.includes('Sinji')
        );
        if (zhVoice) {
          utterance.voice = zhVoice;
        }
      } else {
        const enVoice = voices.find((v) => v.lang.toLowerCase().startsWith('en'));
        if (enVoice) {
          utterance.voice = enVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      SynthesizedSoundGenerator.playConfirmationBeep();
    }
  }

  public static playFeedbackSound(type: 'shutter' | 'confirm' | 'warning'): void {
    switch (type) {
      case 'shutter':
        SynthesizedSoundGenerator.playShutterSnap();
        break;
      case 'confirm':
        SynthesizedSoundGenerator.playConfirmationBeep();
        break;
      case 'warning':
        SynthesizedSoundGenerator.playWarningChime();
        break;
    }
  }

  public static stopCurrentAudio(): void {
    if (this.activeAudio) {
      try {
        this.activeAudio.pause();
        this.activeAudio.currentTime = 0;
      } catch {
        // Ignore
      }
      this.activeAudio = null;
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
  }
}
