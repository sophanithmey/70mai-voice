import type { FC } from 'react';
import type { CommandCategory, CommandFilterOptions } from '../../domain/models/voice-command';
import { Search, Star, X } from 'lucide-react';

interface CommandFilterBarProps {
  filterOptions: CommandFilterOptions;
  onFilterChange: (options: CommandFilterOptions) => void;
  favoritesCount: number;
}

const CATEGORIES: readonly { key: CommandCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All Categories' },
  { key: 'camera', label: 'Camera' },
  { key: 'recording', label: 'Recording' },
  { key: 'ptz-motion', label: '360° PTZ Motion' },
  { key: 'display', label: 'Mirror & Display' },
  { key: 'connectivity', label: 'Wi-Fi & System' }
];

export const CommandFilterBar: FC<CommandFilterBarProps> = ({
  filterOptions,
  onFilterChange,
  favoritesCount
}) => {
  return (
    <div className="space-y-3">
      {/* Search Bar Input */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-silver-400 pointer-events-none"
        />
        <input
          type="text"
          value={filterOptions.searchQuery}
          onChange={(e) =>
            onFilterChange({ ...filterOptions, searchQuery: e.target.value })
          }
          placeholder="Search commands by English, Chinese (拍照 / 向左拍), or Pinyin..."
          className="w-full pl-10 pr-10 py-2.5 bg-white border border-charcoal-750 focus:border-electric-blue rounded-xl text-xs sm:text-sm text-silver-100 placeholder:text-silver-400 focus:outline-none transition-colors"
        />
        {filterOptions.searchQuery && (
          <button
            type="button"
            onClick={() => onFilterChange({ ...filterOptions, searchQuery: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-silver-400 hover:text-silver-200 p-1 cursor-pointer"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category Pills & Favorites Toggle */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {CATEGORIES.map(({ key, label }) => {
          const isActive = !filterOptions.favoritesOnly && filterOptions.category === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() =>
                onFilterChange({
                  ...filterOptions,
                  category: key,
                  favoritesOnly: false
                })
              }
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-electric-blue text-white shadow-xs'
                  : 'bg-white text-silver-400 hover:text-silver-100 border border-charcoal-750'
              }`}
            >
              {label}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() =>
            onFilterChange({
              ...filterOptions,
              favoritesOnly: !filterOptions.favoritesOnly
            })
          }
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            filterOptions.favoritesOnly
              ? 'bg-automotive-amber text-white shadow-xs'
              : 'bg-white text-silver-400 hover:text-silver-100 border border-charcoal-750'
          }`}
        >
          <Star
            size={13}
            className={filterOptions.favoritesOnly ? 'fill-white' : 'text-automotive-amber'}
          />
          <span>Favorites ({favoritesCount})</span>
        </button>
      </div>
    </div>
  );
};
