import type { FC } from 'react';
import type { VoiceCommand } from '../../../domain/models/voice-command';
import { Volume2, Sparkles, Activity } from 'lucide-react';

interface HudCardProps {
  command: VoiceCommand;
  audioLanguage: 'zh' | 'en';
  onPlayAudio: () => void;
  isPlayingAudio?: boolean;
}

export const HudCard: FC<HudCardProps> = ({
  command,
  audioLanguage,
  onPlayAudio,
  isPlayingAudio = false
}) => {
  const primaryText = audioLanguage === 'zh' ? command.traditionalChinese : command.englishCommand;
  const secondaryText = audioLanguage === 'zh' ? command.englishCommand : command.traditionalChinese;

  return (
    <div className="relative w-full glass-panel rounded-3xl p-6 sm:p-10 border border-charcoal-750 shadow-xl flex flex-col items-center justify-between text-center min-h-[380px] sm:min-h-[440px] select-none transition-all">
      {/* Top Meta Info */}
      <div className="w-full flex items-center justify-between gap-3 text-xs font-mono">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-blue/10 text-electric-blue border border-electric-blue/20 font-semibold uppercase text-[10px] sm:text-xs">
          <Sparkles size={12} />
          <span>{command.category} Trigger</span>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-charcoal-800 text-silver-400 text-[10px] uppercase font-bold">
          {command.actionKey}
        </span>
      </div>

      {/* Center Giant Command Typography */}
      <div className="my-auto py-4 space-y-3 sm:space-y-4 max-w-xl">
        <h2 className="text-4xl sm:text-6xl font-black text-silver-100 tracking-tight leading-none">
          {primaryText}
        </h2>

        {command.pinyin && (
          <p className="text-xl sm:text-3xl font-mono font-bold text-electric-blue tracking-wide">
            {command.pinyin}
          </p>
        )}

        <p className="text-base sm:text-xl font-medium text-silver-400">
          {secondaryText}
        </p>

        {command.phoneticGuide && (
          <div className="pt-2 text-[11px] sm:text-xs text-silver-400 font-mono bg-charcoal-850 px-3 py-1.5 rounded-xl border border-charcoal-750 inline-block">
            {command.phoneticGuide.description}
          </div>
        )}
      </div>

      {/* Bottom Replay & Behavior Pill */}
      <div className="w-full pt-4 border-t border-charcoal-750/70 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-left text-xs text-silver-400 max-w-sm truncate">
          <Activity size={14} className="text-automotive-emerald shrink-0" />
          <span className="truncate">
            <strong className="text-silver-300 font-semibold">Dash Cam:</strong> {command.dashcamBehavior}
          </span>
        </div>

        <button
          type="button"
          onClick={onPlayAudio}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs ${
            isPlayingAudio
              ? 'bg-electric-blue-hover text-white ring-2 ring-electric-blue/40'
              : 'bg-electric-blue hover:bg-electric-blue-hover text-white active:scale-95'
          }`}
          title="Play voice pronunciation audio"
        >
          <Volume2 size={16} />
          <span>Replay Sound ({audioLanguage.toUpperCase()})</span>
        </button>
      </div>
    </div>
  );
};

