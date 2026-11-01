import { useState, type FC } from 'react';
import { DisclaimerBanner } from '../../components/disclaimer-banner';
import { DeviceSpecsCard } from './device-specs-card';
import { QuickActionsCard } from './quick-actions-card';
import { ModelActiveCard } from '../models/components/model-active-card';
import { ModelSelectorModal } from '../models/components/model-selector-modal';
import { useSelectedModel } from '../../hooks/use-selected-model';
import { CommandService } from '../../domain/services/command-service';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface DashboardViewProps {
  currentLanguage: 'zh-TW' | 'zh-CN' | 'en';
}

export const DashboardView: FC<DashboardViewProps> = ({ currentLanguage }) => {
  const { selectedModel, selectedModelId, changeModel } = useSelectedModel();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modelCommands = CommandService.getCommandsForModel(selectedModelId);

  return (
    <div className="space-y-5 animate-fade-in pb-16">
      {/* Disclaimer regarding independent companion & app disconnection */}
      <DisclaimerBanner />

      {/* Prominent Active Model Card */}
      <ModelActiveCard
        selectedModel={selectedModel}
        onOpenModelSelector={() => setIsModalOpen(true)}
      />

      {/* Model Selector Modal */}
      <ModelSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedModelId={selectedModelId}
        onSelectModel={changeModel}
      />

      {/* Quick Navigation Cards */}
      <QuickActionsCard />

      {/* Hardware Profile & Dynamic Specs */}
      <DeviceSpecsCard selectedModel={selectedModel} />

      {/* Model-Specific Quick Command Reference Preview */}
      <div className="glass-panel rounded-2xl p-5 border border-charcoal-750">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm text-silver-100">
              {selectedModel.name} Voice Commands ({modelCommands.length})
            </h3>
            <p className="text-xs text-silver-400">
              Verified commands supported by this device
            </p>
          </div>
          <Link
            to={`/commands?model=${selectedModelId}`}
            className="text-xs font-semibold text-electric-blue hover:text-electric-blue-hover flex items-center gap-1 transition-colors"
          >
            <span>View All ({modelCommands.length})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {modelCommands.slice(0, 6).map((cmd) => (
            <div
              key={cmd.id}
              className="p-3 rounded-xl bg-charcoal-850 border border-charcoal-750 flex items-center justify-between gap-3 hover:border-charcoal-700 transition-colors"
            >
              <div>
                <p className="font-bold text-sm text-silver-100">
                  {currentLanguage === 'zh-TW'
                    ? cmd.traditionalChinese
                    : currentLanguage === 'zh-CN'
                    ? cmd.simplifiedChinese
                    : cmd.englishCommand}
                </p>
                <p className="text-[11px] text-silver-400 font-mono">
                  {currentLanguage === 'en' ? cmd.traditionalChinese : cmd.englishCommand} • {cmd.pinyin}
                </p>
              </div>
              <span className="text-[10px] font-mono text-electric-blue bg-electric-blue/10 px-2 py-0.5 rounded border border-electric-blue/20">
                {cmd.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
