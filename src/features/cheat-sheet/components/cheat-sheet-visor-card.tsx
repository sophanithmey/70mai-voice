import type { FC } from 'react';
import type { DashCamModel } from '../../../domain/models/dash-cam-model';
import type { VoiceCommand } from '../../../domain/models/voice-command';

interface CheatSheetVisorCardProps {
  model: DashCamModel;
  commands: readonly VoiceCommand[];
}

export const CheatSheetVisorCard: FC<CheatSheetVisorCardProps> = ({ model, commands }) => {
  return (
    <div className="glass-panel p-5 sm:p-8 rounded-3xl border border-charcoal-750 bg-white print:p-0 print:border-none print:shadow-none space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-charcoal-750">
        <div>
          <span className="text-[10px] font-mono uppercase text-electric-blue font-bold tracking-wider">
            SUN-VISOR VOICE CLIP CHEAT SHEET
          </span>
          <h3 className="text-base sm:text-lg font-black text-silver-100 mt-0.5">
            {model.marketingName}
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-silver-400">
          {commands.length} Commands
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {commands.map((cmd) => (
          <div key={cmd.id} className="p-3 rounded-xl bg-charcoal-850 border border-charcoal-750 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-silver-100">{cmd.traditionalChinese}</span>
                <span className="text-[9px] font-mono text-silver-400 uppercase">{cmd.actionKey}</span>
              </div>
              <span className="text-[11px] font-mono text-electric-blue font-bold block">{cmd.pinyin}</span>
              <span className="text-xs text-silver-300 font-medium mt-1 block">{cmd.englishCommand}</span>
            </div>
            <p className="text-[10px] text-silver-400 mt-2 pt-1 border-t border-charcoal-750/70 truncate">
              {cmd.dashcamBehavior}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-2 text-[10px] font-mono text-silver-400 text-center border-t border-charcoal-750">
        Cut out along border & clip to vehicle sun visor • Disconnect 70mai App for voice triggers
      </div>
    </div>
  );
};

