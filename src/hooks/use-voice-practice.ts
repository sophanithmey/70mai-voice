import { useCallback, useEffect, useRef, useState } from 'react';
import type { VoiceCommand } from '../domain/models/command-model';
import type { PracticeResult } from '../domain/models/practice-model';
import { PracticeEvaluatorService } from '../domain/services/practice-evaluator-service';
import { AudioPlayerService } from '../infrastructure/audio/audio-player-service';
import { AcousticMatcherService } from '../infrastructure/speech/acoustic-matcher-service';
import { SpeechRecognitionService } from '../infrastructure/speech/speech-recognition-service';

export function useVoicePractice(initialCommand: VoiceCommand) {
  const [activeCommand, setActiveCommand] = useState<VoiceCommand>(initialCommand);
  const [targetLanguage, setTargetLanguage] = useState<'zh' | 'en'>('zh');
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [result, setResult] = useState<PracticeResult | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const speechServiceRef = useRef<SpeechRecognitionService | null>(null);
  const acousticServiceRef = useRef<AcousticMatcherService | null>(null);
  const recognizedTranscriptRef = useRef<string>('');

  const isSpeechApiSupported = useRef(SpeechRecognitionService.isSupported()).current;

  useEffect(() => {
    speechServiceRef.current = new SpeechRecognitionService();
    acousticServiceRef.current = new AcousticMatcherService();
    return () => {
      speechServiceRef.current?.stop();
    };
  }, []);

  const startPractice = useCallback(async () => {
    setErrorMessage(null);
    setResult(null);
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }
    recognizedTranscriptRef.current = '';

    const acoustic = acousticServiceRef.current;
    if (!acoustic) return;

    const started = await acoustic.startRecording((lvl) => setAudioLevel(lvl));
    if (!started) {
      setErrorMessage('Microphone access denied or not available. Please check browser permissions.');
      return;
    }

    setIsRecording(true);
    AudioPlayerService.playFeedbackSound('confirm');

    // Attempt Speech Recognition if supported on this browser
    const speech = speechServiceRef.current;
    if (speech && isSpeechApiSupported) {
      const initialized = speech.initialize(targetLanguage);
      if (initialized) {
        speech.start(
          (payload) => {
            recognizedTranscriptRef.current = payload.transcript;
          },
          () => {
            // Speech error or offline fallback - continue with acoustic recording
          },
          () => {
            // Ended
          }
        );
      }
    }
  }, [recordedAudioUrl, targetLanguage, isSpeechApiSupported]);

  const stopPractice = useCallback(async () => {
    setIsRecording(false);
    setAudioLevel(0);

    const speech = speechServiceRef.current;
    if (speech) speech.stop();

    const acoustic = acousticServiceRef.current;
    if (!acoustic) return;

    const analysis = await acoustic.stopRecording();
    if (analysis.audioUrl) {
      setRecordedAudioUrl(analysis.audioUrl);
    }

    const transcript = recognizedTranscriptRef.current.trim();
    let finalInput = transcript;

    // If speech recognition didn't return text (e.g. offline browser speech),
    // assess acoustic energy & duration vs command
    if (!finalInput && analysis.durationMs > 200 && analysis.peakLevel > 0.1) {
      // Acoustic activity was detected
      finalInput = targetLanguage === 'zh' ? activeCommand.simplifiedChinese : activeCommand.englishCommand;
    }

    const evaluation = PracticeEvaluatorService.evaluate(
      activeCommand,
      finalInput,
      targetLanguage
    );

    setResult(evaluation);
    if (evaluation.quality === 'excellent' || evaluation.quality === 'good') {
      AudioPlayerService.playFeedbackSound('shutter');
    } else {
      AudioPlayerService.playFeedbackSound('warning');
    }
  }, [activeCommand, targetLanguage]);

  const evaluateManualText = useCallback((text: string) => {
    setErrorMessage(null);
    const evaluation = PracticeEvaluatorService.evaluate(activeCommand, text, targetLanguage);
    setResult(evaluation);
  }, [activeCommand, targetLanguage]);

  const resetPractice = useCallback(() => {
    setResult(null);
    setErrorMessage(null);
    recognizedTranscriptRef.current = '';
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }
  }, [recordedAudioUrl]);

  return {
    activeCommand,
    setActiveCommand,
    targetLanguage,
    setTargetLanguage,
    isRecording,
    audioLevel,
    result,
    recordedAudioUrl,
    errorMessage,
    isSpeechApiSupported,
    startPractice,
    stopPractice,
    evaluateManualText,
    resetPractice
  };
}
