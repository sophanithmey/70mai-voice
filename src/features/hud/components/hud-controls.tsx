import type { FC } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Clock } from 'lucide-react';

interface HudControlsProps {
  currentIndex: number;
  totalCount: number;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  intervalSeconds: number;
  onToggleInterval: () => void;
  audioLanguage: 'zh' | 'en';
  onToggleLanguage: () => void;
}

export const HudControls: FC<HudControlsProps> = ({
  currentIndex,
  totalCount,
  isAutoPlaying,
  onToggleAutoPlay,
  onPrev,
  onNext,
  intervalSeconds,
  onToggleInterval,
  audioLanguage,
  onToggleLanguage
}) => {
  return (
    <div className="w-full glass-panel rounded-2xl p-4 sm:p-5 border border-charcoal-750 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Left: Settings (Interval & Audio Language) */}
      <div className="flex items-center gap-2 text-xs font-mono w-full sm:w-auto justify-center sm:justify-start">
        <button
          type="button"
          onClick={onToggleLanguage}
          className="px-3 py-1.5 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-750 text-silver-300 font-semibold cursor-pointer transition-colors"
          title="Toggle audio trigger language"
        >
          Audio: <strong className="text-electric-blue">{audioLanguage === 'zh' ? '中文' : 'EN'}</strong>
        </button>

        <button
          type="button"
          onClick={onToggleInterval}
          className="px-3 py-1.5 rounded-xl bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-750 text-silver-300 font-semibold cursor-pointer transition-colors inline-flex items-center gap-1"
          title="Toggle slideshow advance delay"
        >
          <Clock size={12} className="text-silver-400" />
          <span>{intervalSeconds}s Interval</span>
        </button>
      </div>

      {/* Center: Navigation Controls (Prev, Auto-Play, Next) */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onPrev}
          className="w-12 h-12 rounded-2xl bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-750 text-silver-200 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
          aria-label="Previous command"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={onToggleAutoPlay}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 ${
            isAutoPlaying
              ? 'bg-automotive-amber text-white shadow-amber-900/20'
              : 'bg-electric-blue hover:bg-electric-blue-hover text-white'
          }`}
        >
          {isAutoPlaying ? (
            <>
              <Pause size={16} />
              <span>Pause Slideshow</span>
            </>
          ) : (
            <>
              <Play size={16} />
              <span>Auto-Play HUD</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onNext}
          className="w-12 h-12 rounded-2xl bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-750 text-silver-200 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
          aria-label="Next command"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Right: Counter Indicator */}
      <div className="text-xs font-mono text-silver-400">
        <span className="font-bold text-silver-100">{currentIndex + 1}</span> of{' '}
        <span className="font-bold text-silver-100">{totalCount}</span> Commands
      </div>
    </div>
  );
};

