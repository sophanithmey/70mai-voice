export type CommandCategory =
  | 'camera'
  | 'recording'
  | 'ptz-motion'
  | 'display'
  | 'connectivity'
  | 'system';

export type CommandLanguage = 'zh-TW' | 'zh-CN' | 'en';

export interface CommandPhoneticGuide {
  readonly syllables: readonly string[];
  readonly tones: readonly string[];
  readonly description: string;
}

export interface VoiceCommand {
  readonly id: string;
  readonly phrase: string; // Required by spec (primary English phrase)
  readonly chinese?: string; // Required by spec (Simplified Chinese)
  readonly pinyin?: string; // Required by spec
  readonly description: string; // Required by spec
  readonly category: CommandCategory; // Required by spec
  readonly traditionalChinese: string;
  readonly simplifiedChinese: string;
  readonly englishCommand: string;
  readonly actionKey: string;
  readonly name: string;
  readonly englishAliases: readonly string[];
  readonly chineseAliases: readonly string[];
  readonly phoneticGuide: CommandPhoneticGuide;
  readonly dashcamBehavior: string;
  readonly audioFileZh: string;
  readonly audioFileEn: string;
  readonly iconName: string;
  readonly priority: number;
  readonly officialManualNote: string;
  readonly verificationStatus: 'verified' | 'provisional' | 'unverified';
  readonly sourceReference: string;
  readonly supportedModelIds: readonly string[];
}

export interface CommandFilterOptions {
  readonly searchQuery: string;
  readonly category: CommandCategory | 'all';
  readonly languageView: 'both' | 'zh' | 'en';
  readonly favoritesOnly: boolean;
  readonly modelId?: string;
}

