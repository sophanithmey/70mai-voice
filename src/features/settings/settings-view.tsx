import { useState, type FC } from 'react';
import { DisclaimerBanner } from '../../components/disclaimer-banner';
import { useSelectedModel } from '../../hooks/use-selected-model';
import { CommandService } from '../../domain/services/command-service';
import { AudioPlayerService } from '../../infrastructure/audio/audio-player-service';
import { usePwaInstall } from '../../hooks/use-pwa-install';
import { Mic, Volume2, Download, CheckCircle } from 'lucide-react';

export const SettingsView: FC = () => {
  const { canInstall, isInstalled, promptInstall } = usePwaInstall();
  const { selectedModel, selectedModelId } = useSelectedModel();
  const [testedAudio, setTestedAudio] = useState<string | null>(null);

  const modelCommands = CommandService.getCommandsForModel(selectedModelId);

  const testAudio = async (
    name: string,
    path: string,
    text: string,
    lang: 'zh' | 'en',
  ) => {
    setTestedAudio(`${name}-${lang}`);
    await AudioPlayerService.playCommandAudio(path, text, lang);
    setTimeout(() => setTestedAudio(null), 2500);
  };

  return (
    <div className='space-y-5 animate-fade-in pb-16'>
      {/* Disclaimer */}
      <DisclaimerBanner />

      {/* Guide Header */}
      <div>
        <span className='text-[10px] font-mono uppercase text-electric-blue font-semibold tracking-wider'>
          {selectedModel.name} HARDWARE & AUDIO GUIDE
        </span>
        <h2 className='text-xl font-black text-silver-100 tracking-tight'>
          Cabin Acoustic Diagnostics & Guidelines
        </h2>
        <p className='text-xs text-silver-400 mt-1'>
          Official operating conditions, offline cache verification, and
          hardware documentation.
        </p>
      </div>

      {/* Cabin Voice Recognition Rules */}
      <div className='glass-panel rounded-2xl p-5 border border-charcoal-750 space-y-3'>
        <h3 className='text-sm font-bold text-silver-100 flex items-center gap-2'>
          <Mic size={16} className='text-electric-blue' />
          <span>Driver Cabin Best Practices</span>
        </h3>
        <div className='space-y-2 text-xs text-silver-300'>
          <div className='p-3 rounded-xl bg-charcoal-850 border border-charcoal-750 space-y-1'>
            <p className='font-semibold text-silver-100'>
              1. Natural Conversational Volume
            </p>
            <p className='text-silver-400 text-[11px] leading-relaxed'>
              Do not shout or scream commands. The 70mai microphone array is
              calibrated for normal driver speech from a 1.0m–1.8m distance.
            </p>
          </div>
          <div className='p-3 rounded-xl bg-charcoal-850 border border-charcoal-750 space-y-1'>
            <p className='font-semibold text-silver-100'>
              2. Deflector & AC Blower Vent Angle
            </p>
            <p className='text-silver-400 text-[11px] leading-relaxed'>
              Ensure dashboard AC vents are not pointed directly upward at the
              dash cam mount. High airflow causes turbulence that masks DSP
              syllable triggers.
            </p>
          </div>
          <div className='p-3 rounded-xl bg-charcoal-850 border border-charcoal-750 space-y-1'>
            <p className='font-semibold text-silver-100'>
              3. Smartphone App Disconnection
            </p>
            <p className='text-silver-400 text-[11px] leading-relaxed'>
              Voice commands are temporarily paused while connected to the 70mai
              mobile app over Wi-Fi. Disconnect the app to re-enable voice
              commands.
            </p>
          </div>
        </div>
      </div>

      {/* Offline Audio Diagnostics */}
      <div className='glass-panel rounded-2xl p-5 border border-charcoal-750 space-y-3'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-bold text-silver-100 flex items-center gap-2'>
            <Volume2 size={16} className='text-electric-blue' />
            <span>{selectedModel.name} Audio Cache Diagnostics</span>
          </h3>
          <span className='text-[10px] font-mono text-automotive-emerald bg-automotive-emerald/10 px-2 py-0.5 rounded border border-automotive-emerald/20'>
            Offline Ready
          </span>
        </div>
        <p className='text-xs text-silver-400'>
          Test and warm up offline audio assets for {selectedModel.name}. All
          sound clips are cached in local PWA storage.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1'>
          {modelCommands.map((cmd) => (
            <div
              key={cmd.id}
              className='p-3 rounded-xl bg-charcoal-850 border border-charcoal-750 flex flex-col justify-between'
            >
              <div className='flex items-center justify-between mb-2'>
                <span className='text-[10px] font-mono text-silver-500 uppercase'>
                  {cmd.actionKey}
                </span>
                <span className='text-xs font-bold text-silver-100'>
                  {cmd.traditionalChinese}
                </span>
              </div>
              <div className='flex items-center gap-1.5 pt-1'>
                <button
                  type='button'
                  onClick={() =>
                    void testAudio(
                      cmd.name,
                      cmd.audioFileZh,
                      cmd.simplifiedChinese,
                      'zh',
                    )
                  }
                  className='flex-1 py-1 px-2 rounded-lg bg-electric-blue/15 hover:bg-electric-blue/25 text-electric-blue text-[11px] font-semibold border border-electric-blue/30 flex items-center justify-center gap-1 cursor-pointer'
                >
                  {testedAudio === `${cmd.name}-zh` ? (
                    <CheckCircle size={11} />
                  ) : (
                    <Volume2 size={11} />
                  )}
                  <span>中文</span>
                </button>
                <button
                  type='button'
                  onClick={() =>
                    void testAudio(
                      cmd.name,
                      cmd.audioFileEn,
                      cmd.englishCommand,
                      'en',
                    )
                  }
                  className='flex-1 py-1 px-2 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-silver-300 text-[11px] font-semibold border border-charcoal-700 flex items-center justify-center gap-1 cursor-pointer'
                >
                  {testedAudio === `${cmd.name}-en` ? (
                    <CheckCircle size={11} />
                  ) : (
                    <Volume2 size={11} />
                  )}
                  <span>EN</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PWA Installation & Offline State */}
      <div className='glass-panel rounded-2xl p-5 border border-charcoal-750 space-y-3'>
        <h3 className='text-sm font-bold text-silver-100 flex items-center gap-2'>
          <Download size={16} className='text-electric-blue' />
          <span>Progressive Web App (PWA) Status</span>
        </h3>
        <div className='p-3.5 rounded-xl bg-charcoal-850 border border-charcoal-750 flex items-center justify-between gap-3 text-xs'>
          <div>
            <p className='font-semibold text-silver-100'>
              {isInstalled
                ? 'App Installed on Device'
                : canInstall
                  ? 'App Ready to Install'
                  : 'Browser App Mode'}
            </p>
            <p className='text-[11px] text-silver-400 mt-0.5'>
              Workbox precaches app shell, multi-model command registries,
              icons, and audio for complete offline access.
            </p>
          </div>
          {canInstall && (
            <button
              type='button'
              onClick={() => void promptInstall()}
              className='px-3.5 py-1.5 rounded-xl bg-electric-blue hover:bg-electric-blue-hover text-white font-semibold text-xs transition-colors cursor-pointer shrink-0 shadow-xs'
            >
              Install App
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
