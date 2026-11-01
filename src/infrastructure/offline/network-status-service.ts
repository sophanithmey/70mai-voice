type NetworkListener = (isOnline: boolean) => void;

export class NetworkStatusService {
  private static listeners: Set<NetworkListener> = new Set();
  private static isInitialized = false;

  public static isOnline(): boolean {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
  }

  public static subscribe(listener: NetworkListener): () => void {
    this.ensureInitialized();
    this.listeners.add(listener);
    listener(this.isOnline());

    return () => {
      this.listeners.delete(listener);
    };
  }

  private static ensureInitialized(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    window.addEventListener('online', () => {
      this.notify(true);
    });

    window.addEventListener('offline', () => {
      this.notify(false);
    });

    this.isInitialized = true;
  }

  private static notify(isOnline: boolean): void {
    this.listeners.forEach((listener) => {
      try {
        listener(isOnline);
      } catch {
        // Ignore listener error
      }
    });
  }
}

