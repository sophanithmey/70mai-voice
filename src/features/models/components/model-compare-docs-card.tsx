import type { FC } from 'react';
import type { DashCamModel } from '../../../domain/models/dash-cam-model';
import { ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

interface ModelCompareDocsCardProps {
  modelA: DashCamModel;
  modelB: DashCamModel;
}

export const ModelCompareDocsCard: FC<ModelCompareDocsCardProps> = ({ modelA, modelB }) => {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-charcoal-750 space-y-3 text-xs">
      <h3 className="font-bold text-sm text-silver-100">Hardware & Firmware Documentation</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {[modelA, modelB].map((m) => (
          <div key={m.id} className="p-3 rounded-xl bg-charcoal-850 border border-charcoal-750 space-y-1.5">
            <p className="font-bold text-silver-100">{m.name}</p>
            <p className="text-[11px] text-silver-400">{m.firmwareNotice}</p>
            <div className="flex items-center gap-1 text-[10px] font-mono text-automotive-emerald pt-1">
              {m.verificationStatus === 'verified' ? (
                <ShieldCheck size={12} />
              ) : (
                <AlertCircle size={12} className="text-automotive-amber" />
              )}
              <span>{m.verificationStatus.toUpperCase()}</span>
            </div>
            <a
              href={m.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-blue text-[11px] inline-flex items-center gap-1 hover:underline font-semibold pt-1"
            >
              <span>View Manual</span>
              <ExternalLink size={10} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

