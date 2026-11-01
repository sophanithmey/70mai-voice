import type { FC } from 'react';
import type { PracticeResult } from '../../domain/models/practice-model';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

interface PracticeFeedbackCardProps {
  result: PracticeResult;
  onReset: () => void;
}

export const PracticeFeedbackCard: FC<PracticeFeedbackCardProps> = ({
  result,
  onReset,
}) => {
  const getQualityTheme = () => {
    switch (result.quality) {
      case 'excellent':
        return {
          badgeBg:
            'bg-automotive-emerald/15 text-automotive-emerald border-automotive-emerald/30',
          title: 'Acoustic DSP Match: High Confidence',
          desc: '70mai acoustic DSP will reliably execute this command in cabin conditions.',
        };
      case 'good':
        return {
          badgeBg:
            'bg-electric-blue/15 text-electric-blue border-electric-blue/30',
          title: 'Acoustic DSP Match: Moderate Confidence',
          desc: 'Likely to trigger. Maintain consistent volume without shouting.',
        };
      case 'fair':
        return {
          badgeBg:
            'bg-automotive-amber/15 text-automotive-amber border-automotive-amber/30',
          title: 'Acoustic DSP Match: Borderline',
          desc: 'May be rejected if road noise or AC blower is running on high.',
        };
      default:
        return {
          badgeBg:
            'bg-automotive-red/15 text-automotive-red border-automotive-red/30',
          title: 'Acoustic DSP Match: Missed',
          desc: 'Check syllable tones and minimize background cabin interference.',
        };
    }
  };

  const theme = getQualityTheme();

  return (
    <div className='glass-panel rounded-2xl p-5 border border-charcoal-750 space-y-4 animate-fade-in'>
      {/* Header Evaluation Result */}
      <div className='flex items-start justify-between gap-3 pb-3 border-b border-charcoal-750'>
        <div>
          <span className='text-[10px] font-mono uppercase text-silver-400 tracking-wider'>
            EVALUATION REPORT
          </span>
          <h3 className='text-base font-bold text-silver-100 flex items-center gap-2 mt-0.5'>
            <Sparkles size={16} className='text-electric-blue' />
            <span>{theme.title}</span>
          </h3>
        </div>

        <div className='text-right'>
          <div className='text-2xl font-black font-mono text-silver-100'>
            {result.similarityScore}%
          </div>
          <span
            className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${theme.badgeBg}`}
          >
            {result.quality}
          </span>
        </div>
      </div>

      <p className='text-xs text-silver-300 leading-relaxed'>{theme.desc}</p>

      {/* Syllable-by-syllable breakdown */}
      {result.syllableEvaluations.length > 0 && (
        <div className='space-y-2'>
          <h4 className='text-xs font-mono uppercase text-silver-400 font-semibold'>
            Syllable Breakdown
          </h4>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
            {result.syllableEvaluations.map((item, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-xs flex flex-col justify-between ${
                  item.matched
                    ? 'bg-automotive-emerald/10 border-automotive-emerald/30 text-silver-200'
                    : 'bg-charcoal-900 border-charcoal-800 text-silver-400'
                }`}
              >
                <div className='flex items-center justify-between'>
                  <span className='font-bold text-sm text-silver-100'>
                    {item.expected}
                  </span>
                  {item.matched ? (
                    <CheckCircle2
                      size={14}
                      className='text-automotive-emerald'
                    />
                  ) : (
                    <XCircle size={14} className='text-silver-500' />
                  )}
                </div>
                {item.tip && (
                  <span className='text-[10px] font-mono text-silver-400 mt-1'>
                    {item.tip}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actionable Suggestions */}
      {result.suggestions.length > 0 && (
        <div className='bg-charcoal-900/90 rounded-xl p-3.5 border border-charcoal-800 space-y-1.5 text-xs'>
          <div className='flex items-center gap-1.5 font-semibold text-silver-200'>
            <AlertCircle size={14} className='text-electric-blue' />
            <span>Driver Pronunciation Tips</span>
          </div>
          <ul className='space-y-1 text-silver-400 text-[11px] list-disc list-inside'>
            {result.suggestions.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Button: Try Again */}
      <div className='pt-1 flex justify-end'>
        <button
          type='button'
          onClick={onReset}
          className='inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-silver-200 border border-charcoal-700 text-xs font-semibold transition-colors cursor-pointer'
        >
          <RefreshCw size={14} />
          <span>Practice Again</span>
        </button>
      </div>
    </div>
  );
};
