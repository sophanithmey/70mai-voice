import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { DashCamModel } from '../../../domain/models/dash-cam-model';
import {
  Camera,
  RefreshCw,
  GitCompare,
  ShieldCheck,
  AlertCircle,
  Eye,
  Globe,
} from 'lucide-react';

interface ModelActiveCardProps {
  selectedModel: DashCamModel;
  onOpenModelSelector: () => void;
}

export const ModelActiveCard: FC<ModelActiveCardProps> = ({
  selectedModel,
  onOpenModelSelector,
}) => {
  return (
    <div className='glass-panel rounded-2xl p-4 sm:p-5 border border-charcoal-750 shadow-sm space-y-3.5'>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
        {/* Model Identity */}
        <div className='flex items-start gap-3'>
          <div className='w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-linear-to-br from-electric-blue/15 to-charcoal-800 border border-electric-blue/30 flex items-center justify-center text-electric-blue shadow-inner shrink-0 mt-0.5'>
            <Camera size={20} className='sm:hidden' />
            <Camera size={22} className='hidden sm:block' />
          </div>
          <div>
            <div className='flex flex-wrap items-center gap-1.5 sm:gap-2'>
              <span className='text-[10px] font-mono px-2 py-0.5 rounded-full bg-charcoal-800 text-silver-300 font-bold border border-charcoal-750 uppercase'>
                {selectedModel.series}
              </span>
              {selectedModel.verificationStatus === 'verified' ? (
                <span className='inline-flex items-center gap-1 text-[10px] font-mono text-automotive-emerald bg-automotive-emerald/10 px-2 py-0.5 rounded-full border border-automotive-emerald/20 font-semibold'>
                  <ShieldCheck size={11} /> Verified Firmware
                </span>
              ) : (
                <span className='inline-flex items-center gap-1 text-[10px] font-mono text-automotive-amber bg-automotive-amber/10 px-2 py-0.5 rounded-full border border-automotive-amber/20 font-semibold'>
                  <AlertCircle size={11} /> Provisional Data
                </span>
              )}
            </div>
            <h2 className='text-base sm:text-lg font-black text-silver-100 tracking-tight mt-1'>
              {selectedModel.marketingName}
            </h2>
          </div>
        </div>

        {/* Action Buttons: Switch Model & Compare (full-width grid on mobile, flex on desktop) */}
        <div className='grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto shrink-0 pt-1 sm:pt-0'>
          <button
            type='button'
            onClick={onOpenModelSelector}
            className='inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-electric-blue hover:bg-electric-blue-hover text-white text-xs font-semibold transition-all cursor-pointer shadow-xs'
          >
            <RefreshCw size={13} />
            <span>Switch Model</span>
          </button>

          <Link
            to={`/compare?modelA=${selectedModel.id}`}
            className='inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-silver-200 border border-charcoal-750 text-xs font-semibold transition-colors cursor-pointer'
          >
            <GitCompare size={13} className='text-electric-blue' />
            <span>Compare</span>
          </Link>
        </div>
      </div>

      {/* Model Specs Pills Bar */}
      <div className='pt-2 border-t border-charcoal-750/70 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs'>
        <div className='bg-charcoal-850 p-2.5 rounded-xl border border-charcoal-750 flex items-center gap-2 min-w-0'>
          <Eye size={15} className='text-electric-blue shrink-0' />
          <div className='truncate'>
            <span className='text-[10px] text-silver-400 font-mono block'>
              RESOLUTION
            </span>
            <span className='font-bold text-silver-100 text-xs truncate block'>
              {selectedModel.resolution}
            </span>
          </div>
        </div>

        <div className='bg-charcoal-850 p-2.5 rounded-xl border border-charcoal-750 flex items-center gap-2 min-w-0'>
          <Globe size={15} className='text-electric-blue shrink-0' />
          <div className='truncate'>
            <span className='text-[10px] text-silver-400 font-mono block'>
              LANGUAGES
            </span>
            <span className='font-bold text-silver-100 text-xs uppercase block truncate'>
              {selectedModel.languages.join(' • ')}
            </span>
          </div>
        </div>

        <div className='bg-charcoal-850 p-2.5 rounded-xl border border-charcoal-750 flex items-center gap-2 min-w-0'>
          <div className='w-4 h-4 rounded-full bg-electric-blue/15 text-electric-blue flex items-center justify-center font-mono font-bold text-[10px] shrink-0'>
            {selectedModel.commandIds.length}
          </div>
          <div className='truncate'>
            <span className='text-[10px] text-silver-400 font-mono block'>
              VOICE COMMANDS
            </span>
            <span className='font-bold text-silver-100 text-xs block truncate'>
              {selectedModel.commandIds.length} Available
            </span>
          </div>
        </div>

        <div className='bg-charcoal-850 p-2.5 rounded-xl border border-charcoal-750 flex items-center gap-2 min-w-0'>
          <div className='w-2 h-2 rounded-full bg-automotive-emerald shadow-xs shrink-0' />
          <div className='truncate'>
            <span className='text-[10px] text-silver-400 font-mono block'>
              PROFILE
            </span>
            <span className='font-bold text-silver-100 text-xs truncate block'>
              {selectedModel.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
