import { useState, useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelectedModel } from '../../../hooks/use-selected-model';
import { CommandService } from '../../../domain/services/command-service';
import { ALL_VOICE_COMMANDS } from '../../../data/commands/all-commands';
import { CheatSheetPreview } from './cheat-sheet-preview';
import { ModelSelectorModal } from '../../models/components/model-selector-modal';
import { FileText, RefreshCw, Compass, ArrowLeft, ShieldCheck } from 'lucide-react';

export const CheatSheetView: FC = () => {
  const { selectedModel, selectedModelId, changeModel } = useSelectedModel();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modelCommands = useMemo(() => {
    const list = CommandService.getCommandsForModel(selectedModelId);
    return list.length > 0 ? list : ALL_VOICE_COMMANDS;
  }, [selectedModelId]);

  return (
    <div className="space-y-5 animate-fade-in pb-16">
      {/* Top Banner & Model Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 glass-panel p-3.5 sm:p-4 rounded-2xl border border-charcoal-750">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/15 text-electric-blue flex items-center justify-center font-bold shrink-0">
            <FileText size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-charcoal-800 text-silver-300 font-bold uppercase">
                {selectedModel.series}
              </span>
              <h2 className="text-xs sm:text-sm font-black text-silver-100">
                {selectedModel.name} Cheat Sheet
              </h2>
            </div>
            <p className="text-[11px] text-silver-400 font-mono mt-0.5">
              Printable Visor Card & 9:16 Lockscreen Wallpaper Generator
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
            to="/hud"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-electric-blue/15 hover:bg-electric-blue/25 text-electric-blue border border-electric-blue/30 text-xs font-semibold cursor-pointer transition-colors"
          >
            <Compass size={12} />
            <span>Driving HUD</span>
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

      {/* Guide Banner */}
      <div className="p-3.5 rounded-xl bg-charcoal-850 border border-charcoal-750 flex items-center justify-between text-xs text-silver-300">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-automotive-emerald shrink-0" />
          <span>
            Generates 100% offline PNG wallpaper & printable PDF slips formatted for your phone or sun-visor.
          </span>
        </div>
        <span className="hidden sm:inline font-mono text-[10px] text-silver-400">
          {modelCommands.length} Verified Commands
        </span>
      </div>

      {/* Live Preview & Generator Tool */}
      <CheatSheetPreview
        model={selectedModel}
        commands={modelCommands}
      />

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

