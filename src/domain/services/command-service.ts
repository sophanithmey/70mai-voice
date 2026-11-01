import { ALL_VOICE_COMMANDS, COMMANDS_BY_ID } from '../../data/commands/all-commands';
import type { CommandFilterOptions, VoiceCommand } from '../models/voice-command';

const FAVORITES_STORAGE_KEY = '70mai_favorite_commands';

export class CommandService {
  public static getAllCommands(): readonly VoiceCommand[] {
    return ALL_VOICE_COMMANDS;
  }

  public static getCommandById(id: string): VoiceCommand | undefined {
    return COMMANDS_BY_ID.get(id);
  }

  public static getCommandByActionKey(key: string): VoiceCommand | undefined {
    return ALL_VOICE_COMMANDS.find((cmd) => cmd.actionKey === key);
  }

  public static getCommandsForModel(modelId?: string): readonly VoiceCommand[] {
    if (!modelId) return ALL_VOICE_COMMANDS;
    return ALL_VOICE_COMMANDS.filter((cmd) => cmd.supportedModelIds.includes(modelId));
  }

  public static filterCommands(
    options: CommandFilterOptions,
    favorites: ReadonlySet<string>
  ): readonly VoiceCommand[] {
    const query = options.searchQuery.trim().toLowerCase();
    const sourceCommands = options.modelId
      ? this.getCommandsForModel(options.modelId)
      : ALL_VOICE_COMMANDS;

    return sourceCommands.filter((cmd) => {
      if (options.favoritesOnly && !favorites.has(cmd.id)) {
        return false;
      }

      if (options.category !== 'all' && cmd.category !== options.category) {
        return false;
      }

      if (!query) {
        return true;
      }

      const matchEnglish = cmd.englishCommand.toLowerCase().includes(query) ||
        cmd.phrase.toLowerCase().includes(query) ||
        cmd.englishAliases.some((alias) => alias.toLowerCase().includes(query));
      const matchChinese = cmd.traditionalChinese.includes(query) ||
        cmd.simplifiedChinese.includes(query) ||
        Boolean(cmd.chinese && cmd.chinese.includes(query)) ||
        cmd.chineseAliases.some((alias) => alias.includes(query));
      const matchPinyin = cmd.pinyin ? cmd.pinyin.toLowerCase().includes(query) : false;
      const matchName = cmd.name.toLowerCase().includes(query);
      const matchExplanation = cmd.description.toLowerCase().includes(query) ||
        cmd.dashcamBehavior.toLowerCase().includes(query);

      return matchEnglish || matchChinese || matchPinyin || matchName || matchExplanation;
    });
  }

  public static loadFavorites(): Set<string> {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (!stored) return new Set();
      const parsed = JSON.parse(stored) as string[];
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch {
      return new Set();
    }
  }

  public static saveFavorites(favorites: ReadonlySet<string>): void {
    try {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(Array.from(favorites))
      );
    } catch {
      // Ignore storage quota errors
    }
  }

  public static async copyCommandText(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    }
  }
}
