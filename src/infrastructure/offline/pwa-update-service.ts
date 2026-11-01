type UpdateListener = (needRefresh: boolean) => void;

export class PwaUpdateService {
  private static listeners: Set<UpdateListener> = new Set();
  private static needRefreshState = false;
  private static updateCallback: (() => Promise<void>) | null = null;

  public static subscribe(listener: UpdateListener): () => void {
    this.listeners.add(listener);
    listener(this.needRefreshState);

    return () => {
      this.listeners.delete(listener);
    };
  }

  public static notifyNeedRefresh(updateFn?: () => Promise<void>): void {
    this.needRefreshState = true;
    if (updateFn) {
      this.updateCallback = updateFn;
    }
    this.listeners.forEach((listener) => listener(true));
  }

  public static async applyUpdate(): Promise<void> {
    if (this.updateCallback) {
      await this.updateCallback();
    } else {
      window.location.reload();
    }
  }

  public static dismissUpdate(): void {
    this.needRefreshState = false;
    this.listeners.forEach((listener) => listener(false));
  }
}

