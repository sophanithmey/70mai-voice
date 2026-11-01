import type { FC } from 'react';
import type { VoiceCommand } from '../../domain/models/voice-command';
import { Volume2 } from 'lucide-react';
import { AudioPlayerService } from '../../infrastructure/audio/audio-player-service';

interface PracticeSelectorProps {
  activeCommand: VoiceCommand;
  availableCommands: readonly VoiceCommand[];
  onSelectCommand: (cmd: VoiceCommand) => void;
  targetLanguage: 'zh' | 'en';
  onLanguageChange: (lang: 'zh' | 'en') => void;
  currentLanguage: 'zh-TW' | 'zh-CN' | 'en';
}

export const PracticeSelector: FC<PracticeSelectorProps> = ({
  activeCommand,
  availableCommands,
  onSelectCommand,
  targetLanguage,
  onLanguageChange,
  currentLanguage,
}) => {
  const playReference = () => {
    const audioPath =
      targetLanguage === 'zh'
        ? activeCommand.audioFileZh
        : activeCommand.audioFileEn;
    const fallback =
      targetLanguage === 'zh'
        ? activeCommand.simplifiedChinese
        : activeCommand.englishCommand;
    void AudioPlayerService.playCommandAudio(
      audioPath,
      fallback,
      targetLanguage,
    );
  };

  return (
    <div className='glass-panel rounded-2xl p-4 sm:p-5 border border-charcoal-750 space-y-4'>
      {/* Target Language Switcher & Audio Reference */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
        <div>
          <span className='text-[10px] font-mono uppercase text-electric-blue font-semibold tracking-wider'>
            STEP 1 • SELECT TARGET COMMAND
          </span>
          <h3 className='text-sm font-bold text-silver-100'>Practice Goal</h3>
        </div>

        <div className='flex items-center gap-2'>
          {/* Language Toggle */}
          <div className='inline-flex rounded-xl bg-charcoal-850 p-1 border border-charcoal-750 text-xs'>
            <button
              type='button'
              onClick={() => onLanguageChange('zh')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                targetLanguage === 'zh'
                  ? 'bg-electric-blue text-white shadow-xs'
                  : 'text-silver-400 hover:text-silver-100'
              }`}
            >
              Chinese (中文)
            </button>
            <button
              type='button'
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                targetLanguage === 'en'
                  ? 'bg-electric-blue text-white shadow-xs'
                  : 'text-silver-400 hover:text-silver-100'
              }`}
            >
              English
            </button>
          </div>

          <button
            type='button'
            onClick={playReference}
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-silver-200 border border-charcoal-700 text-xs font-semibold transition-colors cursor-pointer'
            title='Listen to official pronunciation'
          >
            <Volume2 size={14} className='text-electric-blue' />
            <span>Listen Reference</span>
          </button>
        </div>
      </div>

      {/* Command Selector Buttons Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
        {availableCommands.map((cmd) => {
          const isSelected = cmd.id === activeCommand.id;
          const label =
            targetLanguage === 'zh'
              ? currentLanguage === 'zh-TW'
                ? cmd.traditionalChinese
                : cmd.simplifiedChinese
              : cmd.englishCommand;

          return (
            <button
              key={cmd.id}
              type='button'
              onClick={() => onSelectCommand(cmd)}
              className={`p-2.5 rounded-xl text-left border transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-electric-blue/15 border-electric-blue text-silver-50 shadow-[0_0_15px_rgba(0,210,255,0.15)]'
                  : 'bg-charcoal-850 border-charcoal-750 text-silver-400 hover:text-silver-200 hover:border-charcoal-700'
              }`}
            >
              <div className='flex items-center justify-between'>
                <span className='text-[10px] font-mono text-silver-500 uppercase'>
                  {cmd.actionKey}
                </span>
                {isSelected && (
                  <span className='w-1.5 h-1.5 rounded-full bg-electric-blue' />
                )}
              </div>
              <p className='font-bold text-xs sm:text-sm mt-0.5 truncate text-silver-100'>
                {label}
              </p>
              <p className='text-[10px] font-mono text-silver-400 truncate'>
                {cmd.pinyin}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
