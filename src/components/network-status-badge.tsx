import type { FC } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useNetworkStatus } from '../hooks/use-network-status';

export const NetworkStatusBadge: FC = () => {
  const isOnline = useNetworkStatus();

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium transition-colors duration-200 ${
        isOnline
          ? 'bg-charcoal-800 text-silver-300 border border-silver-600/30'
          : 'bg-automotive-amber/10 text-automotive-amber border border-automotive-amber/30'
      }`}
      title={isOnline ? 'Online mode: voice practice available' : 'Offline mode: local cached assets'}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isOnline ? 'bg-electric-cyan' : 'bg-automotive-amber'
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isOnline ? 'bg-electric-blue' : 'bg-automotive-amber'
          }`}
        />
      </span>
      {isOnline ? (
        <span className="flex items-center gap-1 shrink-0">
          <Wifi size={12} className="text-electric-blue" />
          <span className="hidden sm:inline">Online</span>
        </span>
      ) : (
        <span className="flex items-center gap-1 font-semibold text-automotive-amber shrink-0">
          <WifiOff size={12} />
          <span className="hidden sm:inline">Offline Ready</span>
          <span className="sm:hidden text-[10px]">Off</span>
        </span>
      )}
    </div>
  );
};
