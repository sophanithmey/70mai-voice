import type { VoiceCommand } from '../../domain/models/voice-command';
import { OMNI_COMMANDS } from './omni-commands';
import { MIRROR_HARDWARE_COMMANDS } from './mirror-hardware-commands';

export const SPECIALIZED_COMMANDS: readonly VoiceCommand[] = [
  ...OMNI_COMMANDS,
  ...MIRROR_HARDWARE_COMMANDS,
];
