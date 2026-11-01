import { useEffect, useMemo, type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DisclaimerBanner } from '../../components/disclaimer-banner';
import { PracticeSelector } from './practice-selector';
import { PracticeRecorderCard } from './practice-recorder-card';
import { PracticeFeedbackCard } from './practice-feedback-card';
import { PracticeManualFallback } from './practice-manual-fallback';
import { useVoicePractice } from '../../hooks/use-voice-practice';
import { useSelectedModel } from '../../hooks/use-selected-model';
import { CommandService } from '../../domain/services/command-service';
import { ALL_VOICE_COMMANDS } from '../../data/commands/all-commands';

interface VoicePracticeViewProps {
  currentLanguage: 'zh-TW' | 'zh-CN' | 'en';
}

export const VoicePracticeView: FC<VoicePracticeViewProps> = ({
  currentLanguage,
}) => {
  const [searchParams] = useSearchParams();
  const commandParam = searchParams.get('command');
  const { selectedModel, selectedModelId } = useSelectedModel();

  const availableCommands = useMemo(() => {
    const list = CommandService.getCommandsForModel(selectedModelId);
    return list.length > 0 ? list : ALL_VOICE_COMMANDS;
  }, [selectedModelId]);

  const initialCommand = useMemo(() => {
    if (commandParam) {
      const found = ALL_VOICE_COMMANDS.find(
        (c) => c.actionKey === commandParam,
      );
      if (found) return found;
    }
    return availableCommands[0] ?? ALL_VOICE_COMMANDS[0]!;
  }, [commandParam, availableCommands]);

  const {
    activeCommand,
    setActiveCommand,
    targetLanguage,
    setTargetLanguage,
    isRecording,
    audioLevel,
    result,
    recordedAudioUrl,
    errorMessage,
    isSpeechApiSupported,
    startPractice,
    stopPractice,
    evaluateManualText,
    resetPractice,
  } = useVoicePractice(initialCommand);

  // Sync when query param changes
  useEffect(() => {
    if (commandParam) {
      const found = ALL_VOICE_COMMANDS.find(
        (c) => c.actionKey === commandParam,
      );
      if (found && found.id !== activeCommand.id) {
        setActiveCommand(found);
        resetPractice();
      }
    }
  }, [commandParam, activeCommand.id, setActiveCommand, resetPractice]);

  return (
    <div className='space-y-5 animate-fade-in pb-16'>
      {/* Disclaimer */}
      <DisclaimerBanner />

      {/* View Header */}
      <div>
        <span className='text-[10px] font-mono uppercase text-electric-blue font-semibold tracking-wider'>
          HANDS-FREE PRONUNCIATION TRAINER • {selectedModel.name}
        </span>
        <h2 className='text-xl font-black text-silver-100 tracking-tight'>
          Acoustic Voice Practice Studio
        </h2>
        <p className='text-xs text-silver-400 mt-1'>
          Train your speech cadence and tones to trigger {selectedModel.name}{' '}
          acoustic DSP reliably while driving.
        </p>
      </div>

      {/* Step 1: Command Selection & Target Language */}
      <PracticeSelector
        activeCommand={activeCommand}
        availableCommands={availableCommands}
        onSelectCommand={(cmd) => {
          setActiveCommand(cmd);
          resetPractice();
        }}
        targetLanguage={targetLanguage}
        onLanguageChange={(lang) => {
          setTargetLanguage(lang);
          resetPractice();
        }}
        currentLanguage={currentLanguage}
      />

      {/* Step 2: Live Recording & Visualizer */}
      <PracticeRecorderCard
        activeCommand={activeCommand}
        targetLanguage={targetLanguage}
        isRecording={isRecording}
        audioLevel={audioLevel}
        recordedAudioUrl={recordedAudioUrl}
        errorMessage={errorMessage}
        isSpeechApiSupported={isSpeechApiSupported}
        onStartPractice={() => void startPractice()}
        onStopPractice={() => void stopPractice()}
        currentLanguage={currentLanguage}
      />

      {/* Step 3: Evaluation & Feedback */}
      {result && (
        <PracticeFeedbackCard result={result} onReset={resetPractice} />
      )}

      {/* Step 4: Offline Manual Testing Fallback */}
      <PracticeManualFallback
        activeCommand={activeCommand}
        targetLanguage={targetLanguage}
        onEvaluateManualText={evaluateManualText}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};
