import type { FC } from 'react';
import type { VoiceCommand } from '../../domain/models/command-model';
import { Mic, Square, Volume2, Info, AlertCircle } from 'lucide-react';

interface PracticeRecorderCardProps {
  activeCommand: VoiceCommand;
  targetLanguage: 'zh' | 'en';
  isRecording: boolean;
  audioLevel: number;
  recordedAudioUrl: string | null;
  errorMessage: string | null;
  isSpeechApiSupported: boolean;
  onStartPractice: () => void;
  onStopPractice: () => void;
  currentLanguage: 'zh-TW' | 'zh-CN' | 'en';
}

export const PracticeRecorderCard: FC<PracticeRecorderCardProps> = ({
  activeCommand,
  targetLanguage,
  isRecording,
  audioLevel,
  recordedAudioUrl,
  errorMessage,
  isSpeechApiSupported,
  onStartPractice,
  onStopPractice,
  currentLanguage
}) => {
  const targetText = targetLanguage === 'zh'
    ? (currentLanguage === 'zh-TW' ? activeCommand.traditionalChinese : activeCommand.simplifiedChinese)
    : activeCommand.englishCommand;

  const playRecordedSnippet = () => {
    if (!recordedAudioUrl) return;
    const audio = new Audio(recordedAudioUrl);
    void audio.play();
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-charcoal-750 space-y-4">
      {/* Target Phrase Display */}
      <div className="text-center py-2">
        <span className="text-[10px] font-mono text-silver-400 uppercase tracking-widest font-semibold">
          PRONOUNCE THIS PHRASE CLEARLY
        </span>
        <div className="text-3xl sm:text-4xl font-black text-silver-50 tracking-wide mt-1 font-sans">
          {targetText}
        </div>
        {targetLanguage === 'zh' && (
          <p className="text-sm font-mono text-electric-cyan mt-1">
            {activeCommand.pinyin} • {activeCommand.phoneticGuide.description}
          </p>
        )}
      </div>

      {/* Main Microphone Button & Visualizer */}
      <div className="flex flex-col items-center justify-center py-3 space-y-4">
        <div className="relative flex items-center justify-center">
          {/* Animated Pulsing Ring */}
          {isRecording && (
            <div
              className="absolute w-32 h-32 rounded-full bg-automotive-red/25 animate-ping pointer-events-none"
              style={{ transform: `scale(${1 + Math.min(0.8, audioLevel * 1.5)})` }}
            />
          )}

          <button
            type="button"
            onClick={isRecording ? onStopPractice : onStartPractice}
            className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl ${
              isRecording
                ? 'bg-automotive-red text-white scale-105 border-4 border-automotive-red/50 shadow-[0_0_35px_rgba(239,68,68,0.6)]'
                : 'bg-linear-to-br from-electric-blue via-sky-500 to-electric-navy text-white hover:scale-105 border-4 border-electric-blue/30 shadow-[0_8px_25px_rgba(2,132,199,0.35)]'
            }`}
            aria-label={isRecording ? 'Stop recording voice' : 'Start recording voice'}
          >
            {isRecording ? (
              <>
                <Square size={28} className="fill-white" />
                <span className="text-[10px] font-mono font-bold mt-1 uppercase tracking-wider text-white">STOP</span>
              </>
            ) : (
              <>
                <Mic size={32} className="text-white" />
                <span className="text-[10px] font-mono font-bold mt-1 uppercase tracking-wider text-white">SPEAK</span>
              </>
            )}
          </button>
        </div>

        {/* Automotive 18-Segment LED Equalizer Bar */}
        <div className="w-full max-w-xs space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-silver-400">
            <span>CABIN DSP AUDIO INPUT</span>
            <span className={isRecording ? 'text-electric-blue font-semibold' : ''}>
              {isRecording ? `${Math.round(audioLevel * 100)}%` : 'READY'}
            </span>
          </div>

          <div className="flex items-center gap-1 w-full justify-between h-3.5 p-1 rounded-lg bg-charcoal-900 border border-charcoal-800">
            {Array.from({ length: 18 }).map((_, i) => {
              const threshold = (i + 1) / 18;
              const isLit = isRecording && audioLevel >= threshold;
              const isHot = i >= 14;
              const isMid = i >= 9;

              let barColor = 'bg-charcoal-800/80';
              if (isLit) {
                barColor = isHot
                  ? 'bg-automotive-red shadow-[0_0_6px_#ef4444]'
                  : isMid
                  ? 'bg-automotive-amber shadow-[0_0_6px_#f59e0b]'
                  : 'bg-electric-blue shadow-[0_0_6px_#00d2ff]';
              }

              return (
                <div
                  key={i}
                  className={`flex-1 h-full rounded-xs transition-all duration-75 ${barColor}`}
                />
              );
            })}
          </div>
        </div>

        {/* Replay User's Attempt */}
        {recordedAudioUrl && !isRecording && (
          <button
            type="button"
            onClick={playRecordedSnippet}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-silver-200 border border-charcoal-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Volume2 size={14} className="text-electric-blue" />
            <span>Replay Your Recording</span>
          </button>
        )}
      </div>

      {/* Error or Browser Warning Notification */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-automotive-red/10 border border-automotive-red/30 text-automotive-red text-xs flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Offline Speech Limitation Explainer */}
      <div className="flex items-start gap-2 p-3 rounded-xl bg-charcoal-900/80 border border-charcoal-800 text-xs text-silver-400">
        <Info size={15} className="text-electric-blue mt-0.5 shrink-0" />
        <p className="text-[11px] leading-relaxed">
          <strong>Offline Practice Architecture:</strong> Voice recording and acoustic evaluation work 100% offline. Browser-level speech-to-text operates if supported locally ({isSpeechApiSupported ? 'Active' : 'Acoustic fallback'}). You can also use the Manual Checklist below.
        </p>
      </div>
    </div>
  );
};
