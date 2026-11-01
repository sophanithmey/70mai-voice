import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mic, Compass, FileText, Volume2, CheckCircle2 } from 'lucide-react';
import { AudioPlayerService } from '../../infrastructure/audio/audio-player-service';

export const QuickActionsCard: FC = () => {
  const [testStatus, setTestStatus] = useState<string | null>(null);

  const testDashcamSound = (type: 'shutter' | 'confirm') => {
    AudioPlayerService.playFeedbackSound(type);
    setTestStatus(type === 'shutter' ? 'Shutter audio triggered' : 'Prompt tone triggered');
    setTimeout(() => setTestStatus(null), 2000);
  };

  return (
    <div className="space-y-3">
      {/* 4 Feature Action Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <Link
          to="/commands"
          className="group p-3 sm:p-3.5 rounded-2xl glass-panel border border-charcoal-750 hover:border-electric-blue/50 transition-all flex flex-col justify-between"
        >
          <div className="w-8 h-8 rounded-xl bg-electric-blue/15 text-electric-blue flex items-center justify-center group-hover:scale-105 transition-transform">
            <BookOpen size={16} />
          </div>
          <div className="mt-2.5">
            <h3 className="font-bold text-xs sm:text-sm text-silver-100 group-hover:text-electric-blue transition-colors">
              Library
            </h3>
            <p className="text-[10px] text-silver-400 mt-0.5 line-clamp-2">
              All official model commands
            </p>
          </div>
        </Link>

        <Link
          to="/practice"
          className="group p-3 sm:p-3.5 rounded-2xl glass-panel border border-charcoal-750 hover:border-electric-cyan/50 transition-all flex flex-col justify-between"
        >
          <div className="w-8 h-8 rounded-xl bg-electric-cyan/15 text-electric-cyan flex items-center justify-center group-hover:scale-105 transition-transform">
            <Mic size={16} />
          </div>
          <div className="mt-2.5">
            <h3 className="font-bold text-xs sm:text-sm text-silver-100 group-hover:text-electric-cyan transition-colors">
              Practice
            </h3>
            <p className="text-[10px] text-silver-400 mt-0.5 line-clamp-2">
              Mic acoustic speech testing
            </p>
          </div>
        </Link>

        <Link
          to="/hud"
          className="group p-3 sm:p-3.5 rounded-2xl glass-panel border border-charcoal-750 hover:border-automotive-amber/50 transition-all flex flex-col justify-between"
        >
          <div className="w-8 h-8 rounded-xl bg-automotive-amber/15 text-automotive-amber flex items-center justify-center group-hover:scale-105 transition-transform">
            <Compass size={16} />
          </div>
          <div className="mt-2.5">
            <h3 className="font-bold text-xs sm:text-sm text-silver-100 group-hover:text-automotive-amber transition-colors">
              Driving HUD
            </h3>
            <p className="text-[10px] text-silver-400 mt-0.5 line-clamp-2">
              Hands-free flashcard audio
            </p>
          </div>
        </Link>

        <Link
          to="/cheat-sheet"
          className="group p-3 sm:p-3.5 rounded-2xl glass-panel border border-charcoal-750 hover:border-purple-500/50 transition-all flex flex-col justify-between"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileText size={16} />
          </div>
          <div className="mt-2.5">
            <h3 className="font-bold text-xs sm:text-sm text-silver-100 group-hover:text-purple-600 transition-colors">
              Cheat Sheet
            </h3>
            <p className="text-[10px] text-silver-400 mt-0.5 line-clamp-2">
              Wallpaper & Visor card
            </p>
          </div>
        </Link>
      </div>

      {/* Hardware Chime Audio Simulator */}
      <div className="glass-panel p-3 rounded-xl border border-charcoal-750 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-silver-300">
          <Volume2 size={15} className="text-electric-blue shrink-0" />
          <div>
            <span className="font-semibold text-silver-200">Acoustic Audio Test:</span>
            <span className="text-[11px] text-silver-400 ml-1">Simulate dash cam audio chimes</span>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {testStatus && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-automotive-emerald font-mono">
              <CheckCircle2 size={12} /> {testStatus}
            </span>
          )}
          <button
            type="button"
            onClick={() => testDashcamSound('shutter')}
            className="px-2.5 py-1 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700 text-[11px] text-silver-200 transition-colors cursor-pointer"
          >
            Snapshot Snap
          </button>
          <button
            type="button"
            onClick={() => testDashcamSound('confirm')}
            className="px-2.5 py-1 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700 text-[11px] text-silver-200 transition-colors cursor-pointer"
          >
            Prompt Beep
          </button>
        </div>
      </div>
    </div>
  );
};
