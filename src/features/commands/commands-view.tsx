import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { DisclaimerBanner } from '../../components/disclaimer-banner';
import { CommandFilterBar } from './command-filter-bar';
import { CommandCard } from './command-card';
import { useVoiceCommands } from '../../hooks/use-voice-commands';
import { useSelectedModel } from '../../hooks/use-selected-model';
import { ModelSelectorModal } from '../models/components/model-selector-modal';
import { Sparkles, HelpCircle, RefreshCw, GitCompare, Camera, Compass, FileText } from 'lucide-react';

interface CommandsViewProps {
  currentLanguage: 'zh-TW' | 'zh-CN' | 'en';
}

export const CommandsView: FC<CommandsViewProps> = ({ currentLanguage }) => {
  const { selectedModel, selectedModelId, changeModel } = useSelectedModel();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    filteredCommands,
    allCommands,
    filterOptions,
    setFilterOptions,
    favorites,
    toggleFavorite,
    copiedId,
    copyCommand,
    playingId,
    playCommandAudio,
    stopAudio
  } = useVoiceCommands(selectedModelId);

  return (
    <div className="space-y-5 animate-fade-in pb-16">
      {/* 70mai Companion Notice */}
      <DisclaimerBanner />

      {/* Active Model Context Bar */}
      <div className="glass-panel p-3.5 rounded-2xl border border-charcoal-750 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-electric-blue/20 to-charcoal-800 text-electric-blue flex items-center justify-center border border-electric-blue/30 shrink-0">
            <Camera size={17} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-charcoal-800 text-silver-300 font-bold border border-charcoal-750 uppercase">
                {selectedModel.series}
              </span>
              <span className="font-bold text-xs sm:text-sm text-silver-100">{selectedModel.name}</span>
            </div>
            <p className="text-[11px] text-silver-400 font-mono mt-0.5">
              {allCommands.length} supported commands • {selectedModel.resolution}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-electric-blue hover:bg-electric-blue-hover text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw size={12} />
            <span>Switch</span>
          </button>
          <Link
            to="/hud"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-silver-200 border border-charcoal-750 text-xs font-semibold transition-colors cursor-pointer"
            title="In-Car Driving HUD"
          >
            <Compass size={12} className="text-automotive-amber" />
            <span>HUD</span>
          </Link>
          <Link
            to="/cheat-sheet"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-silver-200 border border-charcoal-750 text-xs font-semibold transition-colors cursor-pointer"
            title="Lockscreen Wallpaper & Visor Card"
          >
            <FileText size={12} className="text-purple-600" />
            <span>Card</span>
          </Link>
          <Link
            to={`/compare?modelA=${selectedModel.id}`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-silver-200 border border-charcoal-750 text-xs font-semibold transition-colors cursor-pointer"
          >
            <GitCompare size={12} className="text-electric-blue" />
            <span>Compare</span>
          </Link>
        </div>
      </div>

      {/* Search & Category Filter Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-electric-blue text-xs font-mono font-semibold">
              <Sparkles size={13} />
              <span>VOICE COMMAND DIRECTORY</span>
            </div>
            <h2 className="text-xl font-black text-silver-100 tracking-tight">
              {selectedModel.name} Commands
            </h2>
          </div>
          <div className="text-xs font-mono px-2.5 py-1 rounded-full bg-charcoal-850 border border-charcoal-700 text-silver-300">
            {filteredCommands.length} of {allCommands.length} Commands
          </div>
        </div>

        <CommandFilterBar
          filterOptions={filterOptions}
          onFilterChange={setFilterOptions}
          favoritesCount={favorites.size}
        />
      </div>

      {/* Commands List or Empty State */}
      {filteredCommands.length > 0 ? (
        <div className="space-y-4">
          {filteredCommands.map((command) => (
            <CommandCard
              key={command.id}
              command={command}
              currentLanguage={currentLanguage}
              isFavorite={favorites.has(command.id)}
              onToggleFavorite={toggleFavorite}
              onCopy={copyCommand}
              isCopied={copiedId === `${command.id}-zh` || copiedId === `${command.id}-en`}
              onPlayAudio={playCommandAudio}
              isPlayingZh={playingId === `${command.id}-zh`}
              isPlayingEn={playingId === `${command.id}-en`}
              onStopAudio={stopAudio}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass-panel rounded-2xl border border-charcoal-750 p-6 space-y-3">
          <div className="w-12 h-12 rounded-full bg-charcoal-800 text-silver-400 flex items-center justify-center mx-auto">
            <HelpCircle size={24} />
          </div>
          <h3 className="font-bold text-base text-silver-200">No commands match your filter</h3>
          <p className="text-xs text-silver-400 max-w-sm mx-auto">
            Try adjusting your search keywords or switching back to the &quot;All&quot; category filter.
          </p>
          <button
            type="button"
            onClick={() =>
              setFilterOptions({
                searchQuery: '',
                category: 'all',
                languageView: 'both',
                favoritesOnly: false,
                modelId: selectedModelId
              })
            }
            className="px-4 py-2 rounded-xl bg-electric-blue/15 hover:bg-electric-blue/25 text-electric-blue text-xs font-semibold border border-electric-blue/30 transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

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
