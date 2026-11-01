import { useState, type FC } from 'react';
import type { DashCamModel } from '../../../domain/models/dash-cam-model';
import type { VoiceCommand } from '../../../domain/models/voice-command';
import { WallpaperGeneratorService } from '../services/wallpaper-generator-service';
import { CheatSheetVisorCard } from './cheat-sheet-visor-card';
import { Download, Printer, Smartphone, FileText } from 'lucide-react';

interface CheatSheetPreviewProps {
  model: DashCamModel;
  commands: readonly VoiceCommand[];
}

export const CheatSheetPreview: FC<CheatSheetPreviewProps> = ({
  model,
  commands,
}) => {
  const [activeTab, setActiveTab] = useState<'wallpaper' | 'printable'>(
    'wallpaper',
  );
  const [theme, setTheme] = useState<'dark' | 'cream'>('dark');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadWallpaper = async () => {
    try {
      setIsDownloading(true);
      await WallpaperGeneratorService.downloadWallpaper({
        model,
        commands,
        theme,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className='space-y-4'>
      {/* Format Selector Tabs & Theme Toggle */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 glass-panel p-3.5 rounded-2xl border border-charcoal-750'>
        <div className='inline-flex rounded-xl bg-charcoal-850 p-1 border border-charcoal-750 text-xs'>
          <button
            type='button'
            onClick={() => setActiveTab('wallpaper')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              activeTab === 'wallpaper'
                ? 'bg-electric-blue text-white shadow-xs'
                : 'text-silver-400 hover:text-silver-100'
            }`}
          >
            <Smartphone size={14} />
            <span>Lockscreen Wallpaper (9:16)</span>
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('printable')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              activeTab === 'printable'
                ? 'bg-electric-blue text-white shadow-xs'
                : 'text-silver-400 hover:text-silver-100'
            }`}
          >
            <FileText size={14} />
            <span>Visor Pocket Card</span>
          </button>
        </div>

        {activeTab === 'wallpaper' && (
          <div className='inline-flex rounded-xl bg-charcoal-850 p-1 border border-charcoal-750 text-xs'>
            <button
              type='button'
              onClick={() => setTheme('dark')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-charcoal-900 text-silver-100 border border-charcoal-750 shadow-xs'
                  : 'text-silver-400 hover:text-silver-100'
              }`}
            >
              Dark HUD
            </button>
            <button
              type='button'
              onClick={() => setTheme('cream')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                theme === 'cream'
                  ? 'bg-white text-silver-100 border border-charcoal-750 shadow-xs'
                  : 'text-silver-400 hover:text-silver-100'
              }`}
            >
              Warm Cream
            </button>
          </div>
        )}
      </div>

      {/* Main Preview Container */}
      {activeTab === 'wallpaper' ? (
        <div className='flex flex-col items-center gap-4'>
          {/* Mock Mobile Phone Frame */}
          <div
            className={`relative w-70 sm:w-[320px] aspect-9/16 rounded-[36px] p-4 border-4 shadow-2xl flex flex-col justify-between overflow-hidden select-none transition-colors ${
              theme === 'dark'
                ? 'bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 border-slate-700 text-slate-100'
                : 'bg-charcoal-950 border-charcoal-700 text-charcoal-950'
            }`}
          >
            {/* Top Mock Clock Clearance Area */}
            <div className='pt-4 text-center space-y-1'>
              <span className='text-[10px] tracking-widest font-mono opacity-60'>
                FRIDAY, NOVEMBER 1
              </span>
              <p className='text-4xl sm:text-5xl font-light tracking-tight font-sans'>
                09:41
              </p>
              <div className='pt-2'>
                <span className='text-[9px] font-mono px-2 py-0.5 rounded-full bg-electric-blue/20 text-electric-blue font-bold'>
                  {model.name}
                </span>
              </div>
            </div>

            {/* Middle Mini Command Cards */}
            <div className='space-y-1.5 my-auto px-1 py-2'>
              {commands.slice(0, 6).map((cmd) => (
                <div
                  key={cmd.id}
                  className={`p-2 rounded-xl border flex items-center justify-between text-xs ${
                    theme === 'dark'
                      ? 'bg-slate-800/80 border-slate-700/60'
                      : 'bg-white/90 border-charcoal-750/70'
                  }`}
                >
                  <div>
                    <span className='font-black text-xs block leading-tight'>
                      {cmd.traditionalChinese}
                    </span>
                    <span className='text-[9px] font-mono text-electric-blue'>
                      {cmd.pinyin}
                    </span>
                  </div>
                  <span className='text-[10px] font-medium opacity-75'>
                    {cmd.englishCommand}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Disclaimer */}
            <div className='text-center pb-2 text-[8px] font-mono opacity-50'>
              DISCONNECT 70MAI APP FOR VOICE CONTROL
            </div>
          </div>

          {/* Action Download Button */}
          <button
            type='button'
            onClick={() => void handleDownloadWallpaper()}
            disabled={isDownloading}
            className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-electric-blue hover:bg-electric-blue-hover text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md disabled:opacity-50'
          >
            {isDownloading ? (
              <span>Rendering 1080x1920 PNG...</span>
            ) : (
              <>
                <Download size={16} />
                <span>Download Lockscreen Wallpaper (1080x1920)</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* Printable Visor Pocket Card */
        <div className='space-y-4'>
          <CheatSheetVisorCard model={model} commands={commands} />

          <div className='text-center print:hidden'>
            <button
              type='button'
              onClick={() => window.print()}
              className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-charcoal-800 hover:bg-charcoal-750 text-silver-100 border border-charcoal-750 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs'
            >
              <Printer size={16} className='text-electric-blue' />
              <span>Print / Save Pocket Card (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
