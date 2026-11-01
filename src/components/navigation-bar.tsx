import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Mic,
  Compass,
  Settings,
} from 'lucide-react';

interface NavItem {
  readonly path: string;
  readonly fullLabel: string;
  readonly compactLabel: string;
  readonly icon: FC<{ size?: number; className?: string }>;
}

const NAV_ITEMS: readonly NavItem[] = [
  {
    path: '/',
    fullLabel: 'Dashboard',
    compactLabel: 'Home',
    icon: LayoutDashboard,
  },
  {
    path: '/commands',
    fullLabel: 'Commands',
    compactLabel: 'Commands',
    icon: BookOpen,
  },
  {
    path: '/practice',
    fullLabel: 'Voice Practice',
    compactLabel: 'Practice',
    icon: Mic,
  },
  {
    path: '/hud',
    fullLabel: 'Driving HUD',
    compactLabel: 'HUD',
    icon: Compass,
  },
  {
    path: '/settings',
    fullLabel: 'Device Guide',
    compactLabel: 'Guide',
    icon: Settings,
  },
];

export const NavigationBar: FC = () => {
  return (
    <nav
      aria-label='Main Navigation'
      className='fixed bottom-2 sm:bottom-5 left-0 right-0 z-40 px-2 sm:px-4 pointer-events-none safe-bottom'
    >
      <div className='max-w-md sm:max-w-xl mx-auto pointer-events-auto bg-white/95 backdrop-blur-2xl border border-charcoal-750 rounded-2xl p-1 sm:p-1.5 shadow-[0_12px_36px_rgba(40,30,20,0.12),0_1px_3px_rgba(0,0,0,0.06)] flex items-center justify-between gap-0.5 sm:gap-1'>
        {NAV_ITEMS.map(({ path, fullLabel, compactLabel, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `group relative flex-1 py-1.5 px-0.5 sm:px-3 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-0.5 sm:gap-1 cursor-pointer select-none ${
                isActive
                  ? 'bg-linear-to-b from-electric-blue/15 via-electric-blue/8 to-charcoal-850/50 border border-electric-blue/40 text-electric-blue shadow-[0_2px_10px_rgba(2,132,199,0.15)]'
                  : 'text-silver-500 hover:text-silver-100 hover:bg-charcoal-800/60 border border-transparent'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active HUD Glow Pip */}
                {isActive && (
                  <span className='absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-electric-blue shadow-[0_0_6px_#0284c7]' />
                )}

                <div className='relative'>
                  <Icon
                    size={18}
                    className={`transition-transform duration-200 ${
                      isActive
                        ? 'text-electric-blue scale-110'
                        : 'group-hover:scale-105'
                    }`}
                  />
                </div>

                {/* Typography: single line, no wrapping */}
                <span className='text-[10px] sm:text-[11px] font-semibold tracking-tight whitespace-nowrap'>
                  <span className='hidden sm:inline'>{fullLabel}</span>
                  <span className='sm:hidden inline'>{compactLabel}</span>
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
