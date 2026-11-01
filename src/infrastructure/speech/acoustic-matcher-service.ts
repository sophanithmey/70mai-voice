export interface AcousticAnalysis {
  readonly durationMs: number;
  readonly peakLevel: number;
  readonly averageLevel: number;
  readonly audioBlob: Blob | null;
  readonly audioUrl: string | null;
}

export class AcousticMatcherService {
  private mediaStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private startTime = 0;
  private peakLevel = 0;
  private sumLevels = 0;
  private sampleCount = 0;

  public static isSupported(): boolean {
    return Boolean(
      typeof navigator !== 'undefined' &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    );
  }

  public async startRecording(onLevelUpdate?: (level: number) => void): Promise<boolean> {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      this.audioChunks = [];
      this.startTime = Date.now();
      this.peakLevel = 0;
      this.sumLevels = 0;
      this.sampleCount = 0;

      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioContextClass();
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      source.connect(this.analyser);

      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      const sampleInterval = setInterval(() => {
        if (!this.analyser) {
          clearInterval(sampleInterval);
          return;
        }
        this.analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += (dataArray[i] ?? 0);
        }
        const avg = sum / dataArray.length / 255;
        this.peakLevel = Math.max(this.peakLevel, avg);
        this.sumLevels += avg;
        this.sampleCount += 1;
        if (onLevelUpdate) {
          onLevelUpdate(avg);
        }
      }, 50);

      this.mediaRecorder = new MediaRecorder(this.mediaStream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };
      this.mediaRecorder.start();
      return true;
    } catch {
      return false;
    }
  }

  public async stopRecording(): Promise<AcousticAnalysis> {
    const durationMs = Math.max(0, Date.now() - this.startTime);
    const averageLevel = this.sampleCount > 0 ? this.sumLevels / this.sampleCount : 0;

    return new Promise<AcousticAnalysis>((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        this.cleanup();
        resolve({
          durationMs,
          peakLevel: this.peakLevel,
          averageLevel,
          audioBlob: null,
          audioUrl: null
        });
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        this.cleanup();
        resolve({
          durationMs,
          peakLevel: this.peakLevel,
          averageLevel,
          audioBlob,
          audioUrl
        });
      };

      this.mediaRecorder.stop();
    });
  }

  private cleanup(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      void this.audioContext.close();
      this.audioContext = null;
    }
    this.analyser = null;
    this.mediaRecorder = null;
  }
}

