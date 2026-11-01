import { useState, useMemo, type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ModelService } from '../../../domain/services/model-service';
import { ALL_MODELS } from '../../../data/models/models-registry';
import { GitCompare, CheckCircle2, Sparkles } from 'lucide-react';
import type { VoiceCommand } from '../../../domain/models/voice-command';
import { ModelCompareDocsCard } from './model-compare-docs-card';

export const ModelCompareView: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const modelAParam = searchParams.get('modelA') ?? 'm310';
  const modelBParam = searchParams.get('modelB') ?? 'omni';

  const [modelAId, setModelAId] = useState(modelAParam);
  const [modelBId, setModelBId] = useState(modelBParam);

  const comparison = useMemo(() => {
    return ModelService.compareModels(modelAId, modelBId);
  }, [modelAId, modelBId]);

  const handleModelAChange = (id: string) => {
    setModelAId(id);
    setSearchParams({ modelA: id, modelB: modelBId });
  };

  const handleModelBChange = (id: string) => {
    setModelBId(id);
    setSearchParams({ modelA: modelAId, modelB: id });
  };

  if (!comparison) return null;

  const { modelA, modelB, sharedCommands, uniqueToA, uniqueToB } = comparison;

  return (
    <div className="space-y-5 animate-fade-in pb-16">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-electric-blue/10 text-electric-blue text-[11px] font-mono font-semibold mb-2 border border-electric-blue/20">
          <GitCompare size={12} />
          <span>70MAI HARDWARE MATRIX COMPARISON</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-silver-100 tracking-tight">
          Compare Dash Cam Voice Capabilities
        </h2>
        <p className="text-xs sm:text-sm text-silver-400 mt-1">
          Inspect shared acoustic triggers versus hardware-specific commands across distinct 70mai models.
        </p>
      </div>

      {/* Model Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Model A Picker */}
        <div className="glass-panel p-4 rounded-2xl border border-charcoal-750 space-y-2">
          <span className="text-[10px] font-mono uppercase text-electric-blue font-bold tracking-wider">
            PRIMARY MODEL (A)
          </span>
          <select
            value={modelAId}
            onChange={(e) => handleModelAChange(e.target.value)}
            className="w-full p-2.5 bg-white border border-charcoal-750 focus:border-electric-blue rounded-xl text-xs sm:text-sm font-bold text-silver-100 focus:outline-none cursor-pointer"
          >
            {ALL_MODELS.map((m) => (
              <option key={m.id} value={m.id}>{m.name} ({m.series})</option>
            ))}
          </select>
          <div className="flex items-center justify-between text-[11px] text-silver-400 font-mono pt-1">
            <span>{modelA.resolution}</span>
            <span className="font-bold text-electric-blue">{modelA.commandIds.length} Commands</span>
          </div>
        </div>

        {/* Model B Picker */}
        <div className="glass-panel p-4 rounded-2xl border border-charcoal-750 space-y-2">
          <span className="text-[10px] font-mono uppercase text-purple-600 font-bold tracking-wider">
            COMPARISON MODEL (B)
          </span>
          <select
            value={modelBId}
            onChange={(e) => handleModelBChange(e.target.value)}
            className="w-full p-2.5 bg-white border border-charcoal-750 focus:border-purple-500 rounded-xl text-xs sm:text-sm font-bold text-silver-100 focus:outline-none cursor-pointer"
          >
            {ALL_MODELS.map((m) => (
              <option key={m.id} value={m.id}>{m.name} ({m.series})</option>
            ))}
          </select>
          <div className="flex items-center justify-between text-[11px] text-silver-400 font-mono pt-1">
            <span>{modelB.resolution}</span>
            <span className="font-bold text-purple-600">{modelB.commandIds.length} Commands</span>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-3 gap-2.5 text-center">
        <div className="glass-panel p-3 rounded-2xl border border-charcoal-750">
          <span className="text-[10px] font-mono text-silver-400 block uppercase">SHARED</span>
          <span className="text-xl font-black text-silver-100 mt-0.5 block">{sharedCommands.length}</span>
          <span className="text-[10px] text-automotive-emerald font-semibold font-mono">Both Models</span>
        </div>
        <div className="glass-panel p-3 rounded-2xl border border-charcoal-750">
          <span className="text-[10px] font-mono text-silver-400 block uppercase">ONLY {modelA.name.split(' ')[1] ?? 'A'}</span>
          <span className="text-xl font-black text-electric-blue mt-0.5 block">{uniqueToA.length}</span>
          <span className="text-[10px] text-silver-400 font-mono">Unique to A</span>
        </div>
        <div className="glass-panel p-3 rounded-2xl border border-charcoal-750">
          <span className="text-[10px] font-mono text-silver-400 block uppercase">ONLY {modelB.name.split(' ')[1] ?? 'B'}</span>
          <span className="text-xl font-black text-purple-600 mt-0.5 block">{uniqueToB.length}</span>
          <span className="text-[10px] text-silver-400 font-mono">Unique to B</span>
        </div>
      </div>

      {/* Shared Commands Section */}
      <div className="glass-panel p-5 rounded-2xl border border-charcoal-750 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-silver-100 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-automotive-emerald" />
            <span>Shared Commands ({sharedCommands.length})</span>
          </h3>
          <span className="text-[10px] font-mono text-automotive-emerald bg-automotive-emerald/10 px-2 py-0.5 rounded border border-automotive-emerald/20">
            Works on Both
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sharedCommands.map((cmd) => (
            <div key={cmd.id} className="p-3 rounded-xl bg-charcoal-850 border border-charcoal-750 flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-silver-100">{cmd.englishCommand}</p>
                <p className="text-[11px] text-silver-400 font-mono">{cmd.simplifiedChinese} • {cmd.pinyin}</p>
              </div>
              <span className="text-[10px] font-mono text-silver-400 px-2 py-0.5 rounded bg-white border border-charcoal-750">
                {cmd.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Distinct Commands Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Unique to A */}
        <div className="glass-panel p-4 rounded-2xl border border-charcoal-750 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-silver-100 flex items-center gap-1.5">
              <Sparkles size={14} className="text-electric-blue" />
              <span>Unique to {modelA.name} ({uniqueToA.length})</span>
            </h4>
          </div>
          {uniqueToA.length > 0 ? (
            <div className="space-y-2">
              {uniqueToA.map((cmd: VoiceCommand) => (
                <div key={cmd.id} className="p-2.5 rounded-xl bg-electric-blue/5 border border-electric-blue/20 text-xs">
                  <p className="font-bold text-silver-100">{cmd.englishCommand}</p>
                  <p className="text-[11px] text-silver-400 font-mono">{cmd.simplifiedChinese} • {cmd.pinyin}</p>
                  <p className="text-[10px] text-silver-400 mt-1">{cmd.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-silver-400 italic p-3 bg-charcoal-850 rounded-xl">
              All commands of {modelA.name} are also supported by {modelB.name}.
            </p>
          )}
        </div>

        {/* Unique to B */}
        <div className="glass-panel p-4 rounded-2xl border border-charcoal-750 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-silver-100 flex items-center gap-1.5">
              <Sparkles size={14} className="text-purple-600" />
              <span>Unique to {modelB.name} ({uniqueToB.length})</span>
            </h4>
          </div>
          {uniqueToB.length > 0 ? (
            <div className="space-y-2">
              {uniqueToB.map((cmd: VoiceCommand) => (
                <div key={cmd.id} className="p-2.5 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs">
                  <p className="font-bold text-silver-100">{cmd.englishCommand}</p>
                  <p className="text-[11px] text-silver-400 font-mono">{cmd.simplifiedChinese} • {cmd.pinyin}</p>
                  <p className="text-[10px] text-silver-400 mt-1">{cmd.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-silver-400 italic p-3 bg-charcoal-850 rounded-xl">
              All commands of {modelB.name} are also supported by {modelA.name}.
            </p>
          )}
        </div>
      </div>

      {/* Specifications & Firmware Verification Comparison Table */}
      <ModelCompareDocsCard modelA={modelA} modelB={modelB} />
    </div>
  );
};
