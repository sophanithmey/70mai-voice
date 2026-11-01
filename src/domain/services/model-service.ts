import type { DashCamModel } from '../models/dash-cam-model';
import type { VoiceCommand } from '../models/voice-command';
import { ALL_MODELS, MODELS_BY_ID, DEFAULT_MODEL_ID } from '../../data/models/models-registry';
import { ALL_VOICE_COMMANDS, COMMANDS_BY_ID } from '../../data/commands/all-commands';

const MODEL_STORAGE_KEY = '70mai_selected_model_id';

export interface ModelComparisonResult {
  readonly modelA: DashCamModel;
  readonly modelB: DashCamModel;
  readonly sharedCommands: readonly VoiceCommand[];
  readonly uniqueToA: readonly VoiceCommand[];
  readonly uniqueToB: readonly VoiceCommand[];
  readonly totalCommandsA: number;
  readonly totalCommandsB: number;
}

export class ModelService {
  public static getAllModels(): readonly DashCamModel[] {
    return ALL_MODELS;
  }

  public static getModelById(id: string): DashCamModel | undefined {
    return MODELS_BY_ID.get(id);
  }

  public static getDefaultModel(): DashCamModel {
    return MODELS_BY_ID.get(DEFAULT_MODEL_ID) ?? ALL_MODELS[0]!;
  }

  public static getCommandsForModel(modelId: string): readonly VoiceCommand[] {
    const model = this.getModelById(modelId);
    if (!model) return ALL_VOICE_COMMANDS;

    const commandSet = new Set(model.commandIds);
    return ALL_VOICE_COMMANDS.filter((cmd) => commandSet.has(cmd.id));
  }

  public static loadSelectedModelId(): string {
    try {
      const stored = localStorage.getItem(MODEL_STORAGE_KEY);
      if (stored && MODELS_BY_ID.has(stored)) {
        return stored;
      }
    } catch {
      // LocalStorage unavailable
    }
    return DEFAULT_MODEL_ID;
  }

  public static saveSelectedModelId(id: string): void {
    try {
      if (MODELS_BY_ID.has(id)) {
        localStorage.setItem(MODEL_STORAGE_KEY, id);
      }
    } catch {
      // Quota exceeded or private browsing
    }
  }

  public static compareModels(modelAId: string, modelBId: string): ModelComparisonResult | null {
    const modelA = this.getModelById(modelAId);
    const modelB = this.getModelById(modelBId);
    if (!modelA || !modelB) return null;

    const setA = new Set(modelA.commandIds);
    const setB = new Set(modelB.commandIds);

    const sharedCommands: VoiceCommand[] = [];
    const uniqueToA: VoiceCommand[] = [];
    const uniqueToB: VoiceCommand[] = [];

    modelA.commandIds.forEach((cmdId) => {
      const cmd = COMMANDS_BY_ID.get(cmdId);
      if (!cmd) return;
      if (setB.has(cmdId)) {
        sharedCommands.push(cmd);
      } else {
        uniqueToA.push(cmd);
      }
    });

    modelB.commandIds.forEach((cmdId) => {
      const cmd = COMMANDS_BY_ID.get(cmdId);
      if (!cmd) return;
      if (!setA.has(cmdId)) {
        uniqueToB.push(cmd);
      }
    });

    return {
      modelA,
      modelB,
      sharedCommands,
      uniqueToA,
      uniqueToB,
      totalCommandsA: modelA.commandIds.length,
      totalCommandsB: modelB.commandIds.length
    };
  }
}

