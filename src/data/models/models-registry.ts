import type { DashCamModel } from '../../domain/models/dash-cam-model';
import { M_AND_OMNI_MODELS } from './models-m-omni';
import { MIRROR_A_AND_T_MODELS } from './models-mirror-a-t';

export const ALL_MODELS: readonly DashCamModel[] = [
  ...M_AND_OMNI_MODELS,
  ...MIRROR_A_AND_T_MODELS
];

export const MODELS_BY_ID: ReadonlyMap<string, DashCamModel> = new Map(
  ALL_MODELS.map((model) => [model.id, model])
);

export const DEFAULT_MODEL_ID = 'm310';
