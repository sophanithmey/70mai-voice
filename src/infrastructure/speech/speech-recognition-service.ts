export interface SpeechRecognitionResultPayload {
  readonly transcript: string;
  readonly confidence: number;
  readonly isFinal: boolean;
}

// Cross-browser Web Speech API interface declarations
interface IWindowSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: { error: string; message?: string }) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

interface SpeechRecognitionEvent {
  readonly resultIndex: number;
  readonly results: {
    readonly length: number;
    [index: number]: {
      readonly isFinal: boolean;
      [index: number]: {
        readonly transcript: string;
        readonly confidence: number;
      };
    };
  };
}

type SpeechRecognitionConstructor = new () => IWindowSpeechRecognition;

export class SpeechRecognitionService {
  private recognition: IWindowSpeechRecognition | null = null;
  private isListening = false;

  public static isSupported(): boolean {
    const win = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    return Boolean(win.SpeechRecognition || win.webkitSpeechRecognition);
  }

  public initialize(lang: 'zh' | 'en'): boolean {
    const win = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const RecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!RecognitionClass) {
      return false;
    }

    try {
      this.recognition = new RecognitionClass();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
      this.recognition.maxAlternatives = 3;
      return true;
    } catch {
      return false;
    }
  }

  public start(
    onResult: (payload: SpeechRecognitionResultPayload) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ): boolean {
    if (!this.recognition) return false;
    if (this.isListening) this.stop();

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';
      let confidence = 0.8;

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item && item[0]) {
          if (item.isFinal) {
            finalTranscript += item[0].transcript;
            confidence = item[0].confidence || 0.8;
          } else {
            interimTranscript += item[0].transcript;
          }
        }
      }

      const text = finalTranscript || interimTranscript;
      if (text) {
        onResult({
          transcript: text.trim(),
          confidence,
          isFinal: Boolean(finalTranscript)
        });
      }
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd();
    };

    try {
      this.recognition.start();
      return true;
    } catch (err: unknown) {
      this.isListening = false;
      onError(err instanceof Error ? err.message : 'Failed to start recognition');
      return false;
    }
  }

  public stop(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // Ignore
      }
    }
    this.isListening = false;
  }
}

