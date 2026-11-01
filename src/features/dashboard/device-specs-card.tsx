import type { FC } from 'react';
import type { DashCamModel } from '../../domain/models/dash-cam-model';
import { M310_DEVICE_PROFILE } from '../../domain/models/device-model';
import { Cpu, Eye, HardDrive, Shield, Info } from 'lucide-react';

interface DeviceSpecsCardProps {
  selectedModel?: DashCamModel;
}

export const DeviceSpecsCard: FC<DeviceSpecsCardProps> = ({ selectedModel }) => {
  const modelName = selectedModel ? selectedModel.marketingName : M310_DEVICE_PROFILE.marketingName;
  const resolution = selectedModel ? selectedModel.resolution : M310_DEVICE_PROFILE.resolution;
  const fov = selectedModel ? selectedModel.fieldOfView : M310_DEVICE_PROFILE.fieldOfView;
  const isM310 = !selectedModel || selectedModel.id === 'm310';

  return (
    <div className="glass-panel rounded-2xl p-5 border border-charcoal-750 space-y-4">
      {/* Device Header */}
      <div className="flex items-center justify-between pb-3 border-b border-charcoal-750">
        <div>
          <span className="text-[11px] font-mono text-electric-blue uppercase tracking-widest font-semibold">
            Active Hardware Specs
          </span>
          <h2 className="text-base font-bold text-silver-100">{modelName}</h2>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-charcoal-800 border border-charcoal-750 text-[11px] font-mono text-silver-300">
          {selectedModel?.series ?? 'M-Series'}
        </div>
      </div>

      {/* Grid of Key Specifications */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-charcoal-850 p-3 rounded-xl border border-charcoal-750">
          <div className="flex items-center gap-1.5 text-electric-blue mb-1">
            <Eye size={14} />
            <span className="text-[11px] font-medium text-silver-400">Optics & Resolution</span>
          </div>
          <p className="text-sm font-semibold text-silver-100">{resolution}</p>
          <span className="text-[10px] text-silver-400 font-mono">{fov}</span>
        </div>

        <div className="bg-charcoal-850 p-3 rounded-xl border border-charcoal-750">
          <div className="flex items-center gap-1.5 text-electric-blue mb-1">
            <Cpu size={14} />
            <span className="text-[11px] font-medium text-silver-400">Acoustic Engine</span>
          </div>
          <p className="text-sm font-semibold text-silver-100">On-Device DSP Voice</p>
          <span className="text-[10px] text-silver-400">Hardware Microcontroller</span>
        </div>

        <div className="bg-charcoal-850 p-3 rounded-xl border border-charcoal-750">
          <div className="flex items-center gap-1.5 text-automotive-amber mb-1">
            <Shield size={14} />
            <span className="text-[11px] font-medium text-silver-400">Surveillance</span>
          </div>
          <p className="text-sm font-semibold text-silver-100">24H Parking Mode</p>
          <span className="text-[10px] text-silver-400">G-Sensor + Time-Lapse</span>
        </div>

        <div className="bg-charcoal-850 p-3 rounded-xl border border-charcoal-750">
          <div className="flex items-center gap-1.5 text-silver-400 mb-1">
            <HardDrive size={14} />
            <span className="text-[11px] font-medium text-silver-400">Storage Class</span>
          </div>
          <p className="text-sm font-semibold text-silver-100">U3 / Class 10</p>
          <span className="text-[10px] text-silver-400">Up to 128GB - 512GB</span>
        </div>
      </div>

      {/* Model Firmware Notice */}
      {selectedModel?.firmwareNotice && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-charcoal-850 border border-charcoal-750 text-xs text-silver-400">
          <Info size={14} className="text-electric-blue mt-0.5 shrink-0" />
          <p className="text-[11px] leading-relaxed">
            <strong className="text-silver-200">Model Rule:</strong> {selectedModel.firmwareNotice}
          </p>
        </div>
      )}

      {/* LED Status Decoder (Shown for M310 series) */}
      {isM310 && (
        <div className="pt-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-silver-400 mb-2 font-semibold">
            M310 LED Indicator Decoder
          </h3>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {M310_DEVICE_PROFILE.ledStates.map((led) => (
              <div
                key={led.behavior}
                className="flex items-start gap-2 p-2 rounded-lg bg-charcoal-850 border border-charcoal-750"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full mt-0.5 shrink-0 shadow-xs"
                  style={{ backgroundColor: led.color }}
                />
                <div>
                  <p className="font-semibold text-silver-200">{led.behavior}</p>
                  <p className="text-silver-400 text-[10px] leading-tight">{led.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
