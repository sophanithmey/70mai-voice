import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { VoiceCommand } from '../../domain/models/voice-command';
import { IconRenderer } from '../../components/icon-renderer';
import { Volume2, Copy, Check, Star, Mic, Square } from 'lucide-react';

interface CommandCardProps {
  command: VoiceCommand;
  currentLanguage: 'zh-TW' | 'zh-CN' | 'en';
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCopy: (text: string, id: string) => void;
  isCopied: boolean;
  onPlayAudio: (command: VoiceCommand, lang: 'zh' | 'en') => void;
  isPlayingZh: boolean;
  isPlayingEn: boolean;
  onStopAudio: () => void;
}

export const CommandCard: FC<CommandCardProps> = ({
  command,
  currentLanguage,
  isFavorite,
  onToggleFavorite,
  onCopy,
  isCopied,
  onPlayAudio,
  isPlayingZh,
  isPlayingEn,
  onStopAudio
}) => {
  const primaryChinese = currentLanguage === 'zh-TW' ? command.traditionalChinese : command.simplifiedChinese;
  const secondaryChinese = currentLanguage === 'zh-TW' ? command.simplifiedChinese : command.traditionalChinese;

  const categoryColorClass =
    command.category === 'camera'
      ? 'text-electric-blue bg-electric-blue/10 border-electric-blue/30'
      : command.category === 'recording'
      ? 'text-automotive-amber bg-automotive-amber/10 border-automotive-amber/30'
      : command.category === 'ptz-motion'
      ? 'text-purple-600 bg-purple-500/10 border-purple-500/30'
      : command.category === 'display'
      ? 'text-amber-700 bg-amber-500/10 border-amber-500/30'
      : 'text-automotive-emerald bg-automotive-emerald/10 border-automotive-emerald/30';

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-charcoal-750 hover:border-charcoal-600 transition-all duration-200 space-y-3.5">
      {/* Top Header: Category, Action Name, Favorite Toggle */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-charcoal-800 border border-charcoal-750 flex items-center justify-center text-electric-blue shrink-0 shadow-inner">
            <IconRenderer name={command.iconName} size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-silver-100">{command.name}</h3>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-medium ${categoryColorClass}`}>
                {command.category}
              </span>
            </div>
            <p className="text-xs text-silver-400 mt-0.5">{command.description}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleFavorite(command.id)}
          className={`p-2 rounded-xl transition-colors cursor-pointer ${
            isFavorite
              ? 'text-automotive-amber bg-automotive-amber/15 border border-automotive-amber/30'
              : 'text-silver-500 hover:text-silver-300 hover:bg-charcoal-800/60'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star size={17} className={isFavorite ? 'fill-automotive-amber' : ''} />
        </button>
      </div>

      {/* Main Pronunciation & Target Commands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Chinese Command Box */}
        <div className={`p-3.5 rounded-xl bg-charcoal-900/90 border transition-colors flex flex-col justify-between ${
          isPlayingZh ? 'border-electric-blue/50 shadow-xs' : 'border-charcoal-750'
        }`}>
          <div>
            <div className="flex items-center justify-between text-[11px] text-silver-400 font-mono mb-1">
              <span>CHINESE COMMAND</span>
              <span className="text-silver-400 font-semibold">Pinyin: {command.pinyin}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-silver-50 tracking-wide font-sans">{primaryChinese}</span>
              <span className="text-xs text-silver-400 font-mono">({secondaryChinese})</span>
            </div>
            <p className="text-[11px] text-electric-blue font-mono mt-1">{command.phoneticGuide.description}</p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => isPlayingZh ? onStopAudio() : onPlayAudio(command, 'zh')}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isPlayingZh
                  ? 'bg-electric-blue text-white border-electric-blue shadow-xs'
                  : 'bg-electric-blue/12 hover:bg-electric-blue/20 text-electric-blue border-electric-blue/30'
              }`}
            >
              {isPlayingZh ? <Square size={13} className="fill-white" /> : <Volume2 size={13} />}
              <span>{isPlayingZh ? 'Stop Audio' : 'Play Chinese'}</span>
            </button>
            <button
              type="button"
              onClick={() => onCopy(primaryChinese, `${command.id}-zh`)}
              className="p-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-silver-300 border border-charcoal-750 transition-colors cursor-pointer"
              title="Copy Chinese phrase"
            >
              {isCopied ? <Check size={14} className="text-automotive-emerald" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* English Command Box */}
        <div className={`p-3.5 rounded-xl bg-charcoal-900/90 border transition-colors flex flex-col justify-between ${
          isPlayingEn ? 'border-charcoal-700 shadow-xs' : 'border-charcoal-750'
        }`}>
          <div>
            <div className="flex items-center justify-between text-[11px] text-silver-400 font-mono mb-1">
              <span>ENGLISH COMMAND</span>
              <span className="text-silver-500">Firmware EN</span>
            </div>
            <p className="text-lg font-bold text-silver-100 tracking-tight">&quot;{command.phrase}&quot;</p>
            <p className="text-[11px] text-silver-400 mt-1">Aliases: {command.englishAliases.join(', ')}</p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => isPlayingEn ? onStopAudio() : onPlayAudio(command, 'en')}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isPlayingEn
                  ? 'bg-charcoal-800 text-silver-100 border-charcoal-700 shadow-xs'
                  : 'bg-charcoal-850 hover:bg-charcoal-800 text-silver-200 border-charcoal-750'
              }`}
            >
              {isPlayingEn ? <Square size={13} className="fill-silver-100" /> : <Volume2 size={13} />}
              <span>{isPlayingEn ? 'Stop Audio' : 'Play English'}</span>
            </button>
            <button
              type="button"
              onClick={() => onCopy(command.englishCommand, `${command.id}-en`)}
              className="p-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-silver-300 border border-charcoal-750 transition-colors cursor-pointer"
              title="Copy English phrase"
            >
              {isCopied ? <Check size={14} className="text-automotive-emerald" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* Supported Model Indicators */}
      <div className="pt-2 border-t border-charcoal-750/70 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
        <span className="text-silver-400 font-semibold">SUPPORTED ON:</span>
        {command.supportedModelIds.map((mId) => (
          <span key={mId} className="px-1.5 py-0.5 rounded bg-charcoal-850 text-silver-300 border border-charcoal-750 font-medium">
            {mId.toUpperCase()}
          </span>
        ))}
      </div>

      {/* Footer Info & Practice CTA */}
      <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-charcoal-750/50">
        <p className="text-silver-400 text-[11px] leading-relaxed">
          <strong className="text-silver-300">Dash Cam Response:</strong> {command.dashcamBehavior}
        </p>

        <Link
          to={`/practice?command=${command.actionKey}`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 border border-electric-blue/30 text-electric-blue text-xs font-semibold transition-colors cursor-pointer shrink-0"
        >
          <Mic size={14} />
          <span>Practice Pronunciation</span>
        </Link>
      </div>
    </div>
  );
};
