import type { FC } from 'react';
import { MODEL_SERIES_LIST } from '../../../domain/models/dash-cam-model';
import { ALL_MODELS } from '../../../data/models/models-registry';
import { Search, X } from 'lucide-react';

interface ModelSelectorFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeSeriesFilter: string;
  onSeriesFilterChange: (seriesId: string) => void;
}

const getShortSeriesLabel = (id: string): string => {
  switch (id) {
    case 'm-series':
      return 'M-Series';
    case 'omni-series':
      return 'Omni 360°';
    case 'rearview-mirror':
      return 'Mirror';
    case 'a-series':
      return 'A-Series';
    case 't-series':
      return 'T-Series';
    default:
      return id;
  }
};

export const ModelSelectorFilterBar: FC<ModelSelectorFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  activeSeriesFilter,
  onSeriesFilterChange,
}) => {
  return (
    <div className='p-3 sm:p-4 border-b border-charcoal-750 bg-charcoal-900 shrink-0 space-y-2'>
      {/* Search Input */}
      <div className='relative'>
        <Search
          size={15}
          className='absolute left-3 top-1/2 -translate-y-1/2 text-silver-400 pointer-events-none'
        />
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder='Search models (e.g. Omni, M310, S500, 4K)...'
          className='w-full pl-9 pr-8 py-2 bg-charcoal-850 border border-charcoal-750 focus:border-electric-blue rounded-xl text-xs sm:text-sm text-silver-100 placeholder:text-silver-400 focus:outline-none transition-colors'
          autoFocus
        />
        {searchQuery && (
          <button
            type='button'
            onClick={() => onSearchChange('')}
            className='absolute right-2.5 top-1/2 -translate-y-1/2 text-silver-400 hover:text-silver-100 p-1 cursor-pointer'
            aria-label='Clear search'
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Series Filter Chips */}
      <div className='flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs no-scrollbar'>
        <button
          type='button'
          onClick={() => onSeriesFilterChange('all')}
          className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl font-mono text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeSeriesFilter === 'all'
              ? 'bg-electric-blue text-white shadow-xs'
              : 'bg-charcoal-850 text-silver-400 hover:text-silver-100 border border-charcoal-750'
          }`}
        >
          All ({ALL_MODELS.length})
        </button>
        {MODEL_SERIES_LIST.map((series) => {
          const count = ALL_MODELS.filter(
            (m) => m.seriesId === series.id,
          ).length;
          const isActive = activeSeriesFilter === series.id;
          const label = getShortSeriesLabel(series.id);
          return (
            <button
              key={series.id}
              type='button'
              onClick={() => onSeriesFilterChange(series.id)}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl font-mono text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-electric-blue text-white shadow-xs'
                  : 'bg-charcoal-850 text-silver-400 hover:text-silver-100 border border-charcoal-750'
              }`}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>
    </div>
  );
};
