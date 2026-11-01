import { useEffect, useState } from 'react';
import { NetworkStatusService } from '../infrastructure/offline/network-status-service';

export function useNetworkStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(() => NetworkStatusService.isOnline());

  useEffect(() => {
    return NetworkStatusService.subscribe((online) => {
      setIsOnline(online);
    });
  }, []);

  return isOnline;
}
