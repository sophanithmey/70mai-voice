import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import '../styles/index.css';
import { PwaUpdateService } from '../infrastructure/offline/pwa-update-service';
import { registerSW } from 'virtual:pwa-register';

// Register PWA Service Worker with Workbox auto-refresh listener
if ('serviceWorker' in navigator) {
  const updateSW = registerSW({
    onNeedRefresh() {
      PwaUpdateService.notifyNeedRefresh(async () => {
        await updateSW(true);
      });
    },
    onOfflineReady() {
      // App is cached and ready for offline use
    },
  });
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
