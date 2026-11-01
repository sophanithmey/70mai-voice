import { useState, useMemo, useEffect, type FC } from 'react';
import { createPortal } from 'react-dom';
import type { DashCamModel } from '../../../domain/models/dash-cam-model';
import { MODEL_SERIES_LIST } from '../../../domain/models/dash-cam-model';
import { ALL_MODELS } from '../../../data/models/models-registry';
import { ModelSelectorCard } from './model-selector-card';
import { ModelSelectorFilterBar } from './model-selector-filter-bar';
import { X, Check, Layers, SlidersHorizontal } from 'lucide-react';

interface ModelSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
}

export const ModelSelectorModal: FC<ModelSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedModelId,
  onSelectModel,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSeriesFilter, setActiveSeriesFilter] = useState<string>('all');

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const filteredModels = useMemo(() => {
    const list =
      activeSeriesFilter !== 'all'
        ? ALL_MODELS.filter((m) => m.seriesId === activeSeriesFilter)
        : ALL_MODELS;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.series.toLowerCase().includes(q) ||
        m.resolution.toLowerCase().includes(q) ||
        m.specs.some((s) => s.value.toLowerCase().includes(q)),
    );
  }, [searchQuery, activeSeriesFilter]);

  const modelsBySeries = useMemo(() => {
    const map = new Map<string, DashCamModel[]>();
    filteredModels.forEach((model) => {
      const list = map.get(model.seriesId) ?? [];
      list.push(model);
      map.set(model.seriesId, list);
    });
    return map;
  }, [filteredModels]);

  const activeModel = useMemo(
    () => ALL_MODELS.find((m) => m.id === selectedModelId),
    [selectedModelId],
  );

  if (!isOpen) return null;

  return createPortal(
    <div
      className='fixed inset-0 z-9999 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md animate-fade-in overflow-hidden'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className='w-full max-w-3xl h-full max-h-dvh sm:h-[88vh] sm:max-h-212.5 flex flex-col bg-white rounded-none sm:rounded-3xl border-0 sm:border border-charcoal-750 shadow-2xl overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header */}
        <header className='px-4 sm:px-6 py-3.5 bg-charcoal-850 border-b border-charcoal-750 pt-[max(0.875rem,env(safe-area-inset-top))] flex items-center justify-between gap-3 shrink-0'>
          <div>
            <div className='flex items-center gap-2'>
              <span className='text-[10px] font-mono uppercase text-electric-blue font-bold tracking-wider'>
                HARDWARE REGISTRY
              </span>
              <span className='text-[10px] font-mono px-2 py-0.5 rounded-full bg-charcoal-800 text-silver-300 font-semibold border border-charcoal-750'>
                {ALL_MODELS.length} Models
              </span>
            </div>
            <h2 className='text-base sm:text-xl font-black text-silver-100 tracking-tight mt-0.5'>
              Select 70mai Dash Cam Model
            </h2>
          </div>

          <button
            type='button'
            onClick={onClose}
            className='p-2 sm:px-3 sm:py-1.5 rounded-xl text-silver-400 hover:text-silver-100 hover:bg-charcoal-800 border border-transparent hover:border-charcoal-750 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-semibold'
            aria-label='Close modal'
          >
            <span className='hidden sm:inline'>Close</span>
            <X size={18} />
          </button>
        </header>

        {/* Search Bar & Series Quick Filter Chips */}
        <ModelSelectorFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeSeriesFilter={activeSeriesFilter}
          onSeriesFilterChange={setActiveSeriesFilter}
        />

        {/* Scrollable Model Grid with min-h-0 */}
        <div className='flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-6'>
          {filteredModels.length > 0 ? (
            MODEL_SERIES_LIST.map((series) => {
              const modelsInSeries = modelsBySeries.get(series.id);
              if (!modelsInSeries || modelsInSeries.length === 0) return null;

              return (
                <div key={series.id} className='space-y-3'>
                  <div className='flex items-center justify-between pb-1 border-b border-charcoal-750'>
                    <div className='flex items-center gap-2'>
                      <Layers size={14} className='text-electric-blue' />
                      <h3 className='font-bold text-xs uppercase tracking-wider text-silver-200'>
                        {series.name.split('(')[0]?.trim() ?? series.name}
                      </h3>
                    </div>
                    <span className='text-[10px] text-silver-400 font-mono'>
                      {modelsInSeries.length} Model
                      {modelsInSeries.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    {modelsInSeries.map((model) => (
                      <ModelSelectorCard
                        key={model.id}
                        model={model}
                        isSelected={model.id === selectedModelId}
                        onSelect={() => {
                          onSelectModel(model.id);
                          onClose();
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className='text-center py-16 space-y-3'>
              <div className='w-12 h-12 rounded-full bg-charcoal-800 text-silver-400 flex items-center justify-center mx-auto'>
                <SlidersHorizontal size={22} />
              </div>
              <h4 className='font-bold text-sm text-silver-100'>
                No matching models found
              </h4>
              <p className='text-xs text-silver-400 max-w-xs mx-auto'>
                No dash cams match &quot;{searchQuery}&quot;. Try a different
                search term or reset the series filter.
              </p>
              <button
                type='button'
                onClick={() => {
                  setSearchQuery('');
                  setActiveSeriesFilter('all');
                }}
                className='px-4 py-2 rounded-xl bg-electric-blue/15 text-electric-blue hover:bg-electric-blue/25 border border-electric-blue/30 text-xs font-semibold cursor-pointer transition-colors'
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Sticky Bottom Action Bar */}
        <footer className='p-3.5 sm:p-4 pb-[max(0.875rem,env(safe-area-inset-bottom))] border-t border-charcoal-750 bg-charcoal-850 flex items-center justify-between gap-3 shrink-0'>
          <div className='text-xs truncate'>
            <span className='text-[10px] font-mono text-silver-400 uppercase block'>
              ACTIVE PROFILE
            </span>
            <span className='font-bold text-silver-100 truncate block'>
              {activeModel ? activeModel.name : 'None Selected'}
            </span>
          </div>

          <button
            type='button'
            onClick={onClose}
            className='px-5 py-2.5 rounded-xl bg-electric-blue hover:bg-electric-blue-hover text-white text-xs font-bold transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5'
          >
            <Check size={14} />
            <span>Done</span>
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
};
