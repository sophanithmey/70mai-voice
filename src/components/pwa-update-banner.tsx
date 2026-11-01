import { useEffect, useState, type FC } from 'react';
import { RefreshCw, X } from 'lucide-react';
import { PwaUpdateService } from '../infrastructure/offline/pwa-update-service';

export const PwaUpdateBanner: FC = () => {
  const [show, setShow] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    return PwaUpdateService.subscribe((needRefresh) => {
      setShow(needRefresh);
    });
  }, []);

  if (!show) return null;

  const handleUpdate = async () => {
    setIsUpdating(true);
    await PwaUpdateService.applyUpdate();
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto animate-fade-in">
      <div className="bg-charcoal-850/95 border border-electric-blue/40 rounded-xl p-3.5 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-electric-blue/20 flex items-center justify-center text-electric-blue shrink-0">
            <RefreshCw size={16} className={isUpdating ? 'animate-spin' : ''} />
          </div>
          <div>
            <p className="text-xs font-semibold text-silver-100">App Update Available</p>
            <p className="text-[11px] text-silver-400">Offline cache can be updated with fresh audio.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleUpdate}
            disabled={isUpdating}
            className="px-3 py-1.5 bg-electric-blue hover:bg-electric-blue-hover text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            {isUpdating ? 'Updating...' : 'Reload'}
          </button>
          <button
            type="button"
            onClick={() => setShow(false)}
            className="p-1 text-silver-400 hover:text-silver-200 transition-colors cursor-pointer"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
