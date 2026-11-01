import type { VoiceCommand } from '../../domain/models/voice-command';
import { BASE_RECORDING_COMMANDS } from './base-commands';
import { SPECIALIZED_COMMANDS } from './specialized-commands';

export const ALL_VOICE_COMMANDS: readonly VoiceCommand[] = [
  ...BASE_RECORDING_COMMANDS,
  ...SPECIALIZED_COMMANDS
];

export const COMMANDS_BY_ID: ReadonlyMap<string, VoiceCommand> = new Map(
  ALL_VOICE_COMMANDS.map((cmd) => [cmd.id, cmd])
);

// Backward compatibility export for M310
export const M310_COMMANDS: readonly VoiceCommand[] = BASE_RECORDING_COMMANDS;

