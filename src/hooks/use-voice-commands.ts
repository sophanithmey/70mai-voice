import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CommandFilterOptions, VoiceCommand } from '../domain/models/voice-command';
import { CommandService } from '../domain/services/command-service';
import { AudioPlayerService } from '../infrastructure/audio/audio-player-service';

export function useVoiceCommands(initialModelId?: string) {
  const [filterOptions, setFilterOptions] = useState<CommandFilterOptions>(() => ({
    searchQuery: '',
    category: 'all',
    languageView: 'both',
    favoritesOnly: false,
    modelId: initialModelId
  }));

  const [favorites, setFavorites] = useState<Set<string>>(() => CommandService.loadFavorites());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Sync if modelId prop changes
  useEffect(() => {
    setFilterOptions((prev) => (prev.modelId === initialModelId ? prev : { ...prev, modelId: initialModelId }));
  }, [initialModelId]);

  const allCommands = useMemo(() => CommandService.getCommandsForModel(filterOptions.modelId), [filterOptions.modelId]);

  const filteredCommands = useMemo(() => {
    return CommandService.filterCommands(filterOptions, favorites);
  }, [filterOptions, favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      CommandService.saveFavorites(next);
      return next;
    });
  }, []);

  const copyCommand = useCallback(async (text: string, id: string) => {
    const ok = await CommandService.copyCommandText(text);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }, []);

  const playCommandAudio = useCallback(async (command: VoiceCommand, lang: 'zh' | 'en') => {
    const playKey = `${command.id}-${lang}`;
    setPlayingId(playKey);
    const audioPath = lang === 'zh' ? command.audioFileZh : command.audioFileEn;
    const fallbackText = lang === 'zh' ? command.simplifiedChinese : command.englishCommand;

    try {
      await AudioPlayerService.playCommandAudio(audioPath, fallbackText, lang);
    } finally {
      setPlayingId(null);
    }
  }, []);

  const stopAudio = useCallback(() => {
    AudioPlayerService.stopCurrentAudio();
    setPlayingId(null);
  }, []);

  useEffect(() => {
    return () => {
      AudioPlayerService.stopCurrentAudio();
    };
  }, []);

  return {
    allCommands,
    filteredCommands,
    filterOptions,
    setFilterOptions,
    favorites,
    toggleFavorite,
    copiedId,
    copyCommand,
    playingId,
    playCommandAudio,
    stopAudio
  };
}
