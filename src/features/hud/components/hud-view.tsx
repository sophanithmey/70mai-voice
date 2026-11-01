import { useState, useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelectedModel } from '../../../hooks/use-selected-model';
import { CommandService } from '../../../domain/services/command-service';
import { ALL_VOICE_COMMANDS } from '../../../data/commands/all-commands';
import { useHudCarousel } from '../hooks/use-hud-carousel';
import { HudCard } from './hud-card';
import { HudControls } from './hud-controls';
import { ModelSelectorModal } from '../../models/components/model-selector-modal';
import { Compass, RefreshCw, FileText, ArrowLeft, Volume2 } from 'lucide-react';

export const HudView: FC = () => {
  const { selectedModel, selectedModelId, changeModel } = useSelectedModel();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modelCommands = useMemo(() => {
    const list = CommandService.getCommandsForModel(selectedModelId);
    return list.length > 0 ? list : ALL_VOICE_COMMANDS;
  }, [selectedModelId]);

  const {
    currentIndex,
    activeCommand,
    isAutoPlaying,
    toggleAutoPlay,
    intervalSeconds,
    setIntervalSeconds,
    audioLanguage,
    setAudioLanguage,
    nextCommand,
    prevCommand,
    playCurrentAudio
  } = useHudCarousel({ commands: modelCommands, defaultIntervalSeconds: 6 });

  return (
    <div className="space-y-4 animate-fade-in pb-16">
      {/* Top HUD Banner & Model Quick Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 glass-panel p-3.5 sm:p-4 rounded-2xl border border-charcoal-750">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/15 text-electric-blue flex items-center justify-center font-bold shrink-0">
            <Compass size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-charcoal-800 text-silver-300 font-bold uppercase">
                {selectedModel.series}
              </span>
              <h2 className="text-xs sm:text-sm font-black text-silver-100">
                {selectedModel.name} In-Car HUD
              </h2>
            </div>
            <p className="text-[11px] text-silver-400 font-mono mt-0.5">
              Hands-free flashcard pronunciation trainer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-silver-200 border border-charcoal-750 text-xs font-semibold cursor-pointer transition-colors"
          >
            <RefreshCw size={12} />
            <span>Switch Model</span>
          </button>

          <Link
            to="/cheat-sheet"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-electric-blue/15 hover:bg-electric-blue/25 text-electric-blue border border-electric-blue/30 text-xs font-semibold cursor-pointer transition-colors"
          >
            <FileText size={12} />
            <span>Cheat Sheet</span>
          </Link>

          <Link
            to="/commands"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-charcoal-800 text-silver-400 hover:text-silver-200 text-xs font-semibold cursor-pointer transition-colors"
          >
            <ArrowLeft size={12} />
            <span>Library</span>
          </Link>
        </div>
      </div>

      {/* Main Flashcard */}
      {activeCommand && (
        <HudCard
          command={activeCommand}
          audioLanguage={audioLanguage}
          onPlayAudio={playCurrentAudio}
        />
      )}

      {/* Control Bar (Navigation & Auto-Play) */}
      <HudControls
        currentIndex={currentIndex}
        totalCount={modelCommands.length}
        isAutoPlaying={isAutoPlaying}
        onToggleAutoPlay={toggleAutoPlay}
        onPrev={prevCommand}
        onNext={nextCommand}
        intervalSeconds={intervalSeconds}
        onToggleInterval={() => setIntervalSeconds((prev) => (prev === 5 ? 8 : 5))}
        audioLanguage={audioLanguage}
        onToggleLanguage={() => setAudioLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'))}
      />

      {/* In-Car Speech Delivery Advice */}
      <div className="p-3.5 rounded-xl bg-charcoal-850 border border-charcoal-750 flex items-center justify-between text-[11px] text-silver-400 font-mono">
        <span className="flex items-center gap-1.5">
          <Volume2 size={13} className="text-electric-blue shrink-0" />
          <span>Keep conversational cabin volume • Avoid pointing AC blower at dash cam</span>
        </span>
        <span className="hidden sm:inline font-semibold text-silver-300">
          Hands-Free Offline Mode
        </span>
      </div>

      {/* Model Selector Modal */}
      <ModelSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedModelId={selectedModelId}
        onSelectModel={changeModel}
      />
    </div>
  );
};

