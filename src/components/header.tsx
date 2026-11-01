import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Download, Globe } from 'lucide-react';
import { NetworkStatusBadge } from './network-status-badge';
import { usePwaInstall } from '../hooks/use-pwa-install';
import { useSelectedModel } from '../hooks/use-selected-model';

interface HeaderProps {
  currentLanguage: 'zh-TW' | 'zh-CN' | 'en';
  onLanguageChange: (lang: 'zh-TW' | 'zh-CN' | 'en') => void;
}

export const Header: FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const { canInstall, promptInstall } = usePwaInstall();
  const { selectedModel } = useSelectedModel();

  const shortBadge = selectedModel.name
    .replace('70mai ', '')
    .replace('Dash Cam ', '');

  return (
    <header className='sticky top-0 z-40 w-full glass-panel border-b border-charcoal-750/90 shadow-xs'>
      <div className='max-w-4xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-3'>
        {/* Brand & Model Identity */}
        <Link
          to='/'
          className='flex items-center gap-2 sm:gap-3 group cursor-pointer select-none shrink-0 min-w-0'
        >
          <div className='relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-linear-to-br from-charcoal-750 via-charcoal-850 to-charcoal-900 border border-electric-blue/40 flex items-center justify-center shadow-[0_0_12px_rgba(0,210,255,0.15)] group-hover:border-electric-blue/70 transition-colors shrink-0'>
            <span className='font-mono text-xs sm:text-sm font-black text-electric-blue tracking-tighter'>
              70
            </span>
            <span className='absolute -bottom-0.5 -right-0.5 flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75' />
              <span className='relative inline-flex rounded-full h-2 w-2 bg-electric-blue' />
            </span>
          </div>

          <div className='min-w-0'>
            <div className='flex items-center gap-1.5'>
              <h1 className='font-bold text-xs sm:text-sm tracking-wide text-silver-100 uppercase group-hover:text-electric-blue transition-colors truncate'>
                70mai Voice
              </h1>
              <span
                className='hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-electric-blue/15 text-electric-blue font-semibold border border-electric-blue/30 max-w-27.5 truncate'
                title={selectedModel.name}
              >
                {shortBadge}
              </span>
            </div>
            <p className='hidden sm:block text-[9px] text-silver-400 font-mono tracking-wider'>
              SMART CABIN AUDIO
            </p>
          </div>
        </Link>

        {/* Right Controls: PWA install, Network Badge, Language Selector */}
        <div className='flex items-center gap-1.5 sm:gap-2 shrink-0'>
          {canInstall && (
            <button
              type='button'
              onClick={() => void promptInstall()}
              className='hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-electric-blue/15 text-electric-blue hover:bg-electric-blue/25 border border-electric-blue/30 text-xs font-semibold transition-all cursor-pointer shadow-[0_0_10px_rgba(0,210,255,0.1)]'
              title='Install Offline PWA App'
            >
              <Download size={13} />
              <span>Install</span>
            </button>
          )}

          <NetworkStatusBadge />

          {/* Primary Language Mode Dropdown with Globe Icon */}
          <div className='relative flex items-center bg-charcoal-850 border border-charcoal-700/80 rounded-xl px-1.5 sm:px-2 py-1 text-xs focus-within:border-electric-blue transition-colors'>
            <Globe
              size={13}
              className='text-silver-400 mr-1 sm:mr-1.5 shrink-0'
            />
            <label htmlFor='header-lang-select' className='sr-only'>
              Language
            </label>
            <select
              id='header-lang-select'
              value={currentLanguage}
              onChange={(e) =>
                onLanguageChange(e.target.value as 'zh-TW' | 'zh-CN' | 'en')
              }
              className='bg-transparent text-silver-200 text-[11px] sm:text-xs font-mono focus:outline-none cursor-pointer pr-0.5 sm:pr-1'
            >
              <option value='zh-TW' className='bg-charcoal-900 text-silver-100'>
                繁體
              </option>
              <option value='zh-CN' className='bg-charcoal-900 text-silver-100'>
                简体
              </option>
              <option value='en' className='bg-charcoal-900 text-silver-100'>
                EN
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
