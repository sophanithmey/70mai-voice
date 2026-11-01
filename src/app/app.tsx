import { useState, type FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../components/header';
import { NavigationBar } from '../components/navigation-bar';
import { PwaUpdateBanner } from '../components/pwa-update-banner';
import { AppRouter } from '../routes/app-router';

export const App: FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'zh-TW' | 'zh-CN' | 'en'>('zh-TW');

  return (
    <BrowserRouter>
      <div className='min-h-screen bg-charcoal-950 text-silver-100 bg-hud-grid flex flex-col selection:bg-electric-blue/20 selection:text-silver-100'>
        {/* Top Header */}
        <Header
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
        />

        {/* Main Content Area with generous bottom clearance for floating dock */}
        <main className='flex-1 max-w-4xl w-full mx-auto px-4 py-5 pb-28 sm:pb-32'>
          <AppRouter currentLanguage={currentLanguage} />
        </main>

        {/* PWA Update Banner */}
        <PwaUpdateBanner />

        {/* Bottom Automotive HUD Navigation */}
        <NavigationBar />
      </div>
    </BrowserRouter>
  );
};
