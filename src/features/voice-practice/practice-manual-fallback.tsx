import { useState, type FC, type FormEvent } from 'react';
import type { VoiceCommand } from '../../domain/models/command-model';
import { HelpCircle, Send } from 'lucide-react';

interface PracticeManualFallbackProps {
  activeCommand: VoiceCommand;
  targetLanguage: 'zh' | 'en';
  onEvaluateManualText: (text: string) => void;
  currentLanguage: 'zh-TW' | 'zh-CN' | 'en';
}

export const PracticeManualFallback: FC<PracticeManualFallbackProps> = ({
  activeCommand,
  targetLanguage,
  onEvaluateManualText,
  currentLanguage
}) => {
  const [inputText, setInputText] = useState('');

  const targetPhrase = targetLanguage === 'zh'
    ? (currentLanguage === 'zh-TW' ? activeCommand.traditionalChinese : activeCommand.simplifiedChinese)
    : activeCommand.englishCommand;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onEvaluateManualText(inputText);
    }
  };

  const handleQuickInsert = (text: string) => {
    setInputText(text);
    onEvaluateManualText(text);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-charcoal-750 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase text-silver-400 font-semibold tracking-wider">
            OFFLINE FALLBACK
          </span>
          <h3 className="text-sm font-bold text-silver-100">Manual Syllable & Text Matching</h3>
        </div>
        <HelpCircle size={16} className="text-silver-500" />
      </div>

      <p className="text-xs text-silver-400 leading-relaxed">
        Test matching algorithms offline without microphone access. Type what you spoke or click quick tokens to simulate speech recognition output.
      </p>

      {/* Manual Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`e.g. "${targetPhrase}" or pinyin...`}
          className="flex-1 px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-750 focus:border-electric-blue rounded-xl text-xs sm:text-sm text-silver-100 placeholder:text-silver-500 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-electric-blue hover:bg-electric-blue-hover text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Send size={14} />
          <span>Test Match</span>
        </button>
      </form>

      {/* Quick Test Presets */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
        <span className="text-[11px] text-silver-500 font-mono">Quick test tokens:</span>
        <button
          type="button"
          onClick={() => handleQuickInsert(targetPhrase)}
          className="px-2.5 py-1 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700 text-silver-200 text-xs transition-colors cursor-pointer font-mono"
        >
          Exact: &quot;{targetPhrase}&quot;
        </button>
        {targetLanguage === 'zh' && activeCommand.pinyin ? (
          <button
            type="button"
            onClick={() => handleQuickInsert(activeCommand.pinyin ?? '')}
            className="px-2.5 py-1 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700 text-silver-300 text-xs transition-colors cursor-pointer font-mono"
          >
            Pinyin: &quot;{activeCommand.pinyin}&quot;
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleQuickInsert(activeCommand.englishAliases[0] ?? activeCommand.englishCommand)}
            className="px-2.5 py-1 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700 text-silver-300 text-xs transition-colors cursor-pointer font-mono"
          >
            Alias: &quot;{activeCommand.englishAliases[0]}&quot;
          </button>
        )}
      </div>
    </div>
  );
};
