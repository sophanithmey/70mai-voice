import type { FC } from 'react';
import type { DashCamModel } from '../../../domain/models/dash-cam-model';
import { Check, ShieldCheck, AlertCircle, Eye, Volume2 } from 'lucide-react';

interface ModelSelectorCardProps {
  model: DashCamModel;
  isSelected: boolean;
  onSelect: () => void;
}

export const ModelSelectorCard: FC<ModelSelectorCardProps> = ({
  model,
  isSelected,
  onSelect
}) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group w-full p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'bg-electric-blue/10 border-electric-blue shadow-[0_4px_16px_rgba(2,132,199,0.18)] ring-2 ring-electric-blue/30'
          : 'bg-white hover:bg-charcoal-850 border-charcoal-750 hover:border-charcoal-700'
      }`}
    >
      {/* Header: Title & Selection Indicator */}
      <div className="flex items-start justify-between gap-2.5">
        <div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-charcoal-800 text-silver-300 font-bold uppercase">
              {model.series}
            </span>
            {model.verificationStatus === 'verified' ? (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-mono text-automotive-emerald bg-automotive-emerald/10 px-1.5 py-0.5 rounded border border-automotive-emerald/20 font-semibold">
                <ShieldCheck size={10} /> Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-mono text-automotive-amber bg-automotive-amber/10 px-1.5 py-0.5 rounded border border-automotive-amber/20 font-semibold">
                <AlertCircle size={10} /> Provisional
              </span>
            )}
          </div>
          <h4 className="font-bold text-sm sm:text-base text-silver-100 mt-1">
            {model.name}
          </h4>
          <p className="text-[11px] text-silver-400 font-mono mt-0.5">
            {model.marketingName}
          </p>
        </div>

        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
            isSelected
              ? 'bg-electric-blue text-white shadow-xs'
              : 'border border-charcoal-700 bg-charcoal-850 text-transparent group-hover:border-charcoal-600'
          }`}
        >
          <Check size={14} className={isSelected ? 'opacity-100' : 'opacity-0'} />
        </div>
      </div>

      {/* Footer Specs & Command Count */}
      <div className="mt-3.5 pt-2.5 border-t border-charcoal-750/70 flex items-center justify-between gap-2 text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-silver-400">
          <Eye size={13} className="text-electric-blue shrink-0" />
          <span className="truncate font-semibold">{model.resolution}</span>
        </div>

        <div className="flex items-center gap-1 text-electric-blue font-bold shrink-0">
          <Volume2 size={13} />
          <span>{model.commandIds.length} Commands</span>
        </div>
      </div>
    </button>
  );
};

