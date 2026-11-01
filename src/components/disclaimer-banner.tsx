import { useState, type FC } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export const DisclaimerBanner: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-2xl bg-amber-500/8 border border-amber-600/20 p-3.5 mb-4 text-xs transition-all duration-200 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <AlertTriangle size={16} className="text-automotive-amber mt-0.5 shrink-0" />
          <div>
            <span className="font-bold text-silver-100">Independent Companion Reference</span>
            <p className="text-silver-400 mt-0.5 text-[11px] leading-relaxed">
              This app is a standalone voice command & pronunciation trainer. It does not establish direct Bluetooth/hardware control over your 70mai Dash Cam.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-silver-400 hover:text-electric-blue transition-colors p-1 cursor-pointer shrink-0"
          aria-label={isExpanded ? 'Collapse notes' : 'Expand notes'}
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-amber-600/15 space-y-2 text-[11px] text-silver-300">
          <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-charcoal-750">
            <ShieldCheck size={14} className="text-electric-blue mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-silver-100">70mai Dash Cam Firmware Notice:</p>
              <p className="text-silver-400 mt-0.5 leading-relaxed">
                Voice control is temporarily <strong>disabled</strong> on the physical dash cam while your phone is connected to the camera&apos;s Wi-Fi hotspot in the 70mai App. To use voice commands in your car, disconnect the app or say &quot;关闭热点 / Turn off hotspot&quot;.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
