import type { VoiceCommand } from '../../domain/models/voice-command';

const OMNI_MODELS = ['omni', 'omni-4k', 'omni-x800'] as const;

export const OMNI_COMMANDS: readonly VoiceCommand[] = [
  {
    id: 'cmd-shoot-left',
    phrase: 'Shoot left',
    chinese: '向左拍',
    pinyin: 'xiàng zuǒ pāi',
    description: 'Motor rotates camera lens 90° to the driver side window to record a 10s short clip.',
    category: 'ptz-motion',
    name: 'Shoot Left',
    traditionalChinese: '向左拍',
    simplifiedChinese: '向左拍',
    englishCommand: 'Shoot left',
    actionKey: 'shoot-left',
    englishAliases: ['Shoot left', 'Pan left', 'Look left'],
    chineseAliases: ['向左拍', '往左拍'],
    phoneticGuide: {
      syllables: ['xiàng', 'zuǒ', 'pāi'],
      tones: ['4th Tone (Falling)', '3rd Tone (Dipping)', '1st Tone (High-flat)'],
      description: 'Firm descending "xiàng", dipped "zuǒ", and crisp flat "pāi".'
    },
    dashcamBehavior: 'Omni stepper motor smoothly pans 90° left and records a 10s video before returning.',
    audioFileZh: '/audio/shoot-left-zh.mp3',
    audioFileEn: '/audio/shoot-left-en.mp3',
    iconName: 'RotateCcw',
    priority: 10,
    officialManualNote: 'Exclusive to 70mai Omni 360° motorized PTZ hardware.',
    verificationStatus: 'verified',
    sourceReference: '70mai Omni (X200) User Manual & Patent Spec',
    supportedModelIds: [...OMNI_MODELS]
  },
  {
    id: 'cmd-shoot-right',
    phrase: 'Shoot right',
    chinese: '向右拍',
    pinyin: 'xiàng yòu pāi',
    description: 'Motor rotates camera lens 90° to the passenger side window to record a 10s short clip.',
    category: 'ptz-motion',
    name: 'Shoot Right',
    traditionalChinese: '向右拍',
    simplifiedChinese: '向右拍',
    englishCommand: 'Shoot right',
    actionKey: 'shoot-right',
    englishAliases: ['Shoot right', 'Pan right', 'Look right'],
    chineseAliases: ['向右拍', '往右拍'],
    phoneticGuide: {
      syllables: ['xiàng', 'yòu', 'pāi'],
      tones: ['4th Tone (Falling)', '4th Tone (Falling)', '1st Tone (High-flat)'],
      description: 'Double falling punch on "xiàng yòu" followed by crisp "pāi".'
    },
    dashcamBehavior: 'Omni stepper motor smoothly pans 90° right and captures 10s passenger-side video.',
    audioFileZh: '/audio/shoot-right-zh.mp3',
    audioFileEn: '/audio/shoot-right-en.mp3',
    iconName: 'RotateCw',
    priority: 11,
    officialManualNote: 'Exclusive to 70mai Omni 360° motorized PTZ hardware.',
    verificationStatus: 'verified',
    sourceReference: '70mai Omni (X200) User Manual & Patent Spec',
    supportedModelIds: [...OMNI_MODELS]
  },
  {
    id: 'cmd-take-selfie',
    phrase: 'Take selfie',
    chinese: '拍自拍',
    pinyin: 'pāi zì pāi',
    description: 'Motor turns lens 180° into the vehicle cabin to snap a candid interior photo of occupants.',
    category: 'ptz-motion',
    name: 'Take Selfie',
    traditionalChinese: '拍自拍',
    simplifiedChinese: '拍自拍',
    englishCommand: 'Take selfie',
    actionKey: 'take-selfie',
    englishAliases: ['Take selfie', 'Shoot selfie', 'Cabin selfie', 'Take a selfie'],
    chineseAliases: ['拍自拍', '来张自拍', '拍攝自拍'],
    phoneticGuide: {
      syllables: ['pāi', 'zì', 'pāi'],
      tones: ['1st Tone (High-flat)', '4th Tone (Falling)', '1st Tone (High-flat)'],
      description: 'Brisk sandwich rhythm: high "pāi", sharp drop "zì", high "pāi".'
    },
    dashcamBehavior: 'Omni lens spins 180° facing cabin, triggers shutter chime, and returns to road.',
    audioFileZh: '/audio/take-selfie-zh.mp3',
    audioFileEn: '/audio/take-selfie-en.mp3',
    iconName: 'Smile',
    priority: 12,
    officialManualNote: 'Takes interior photo with face detection illumination.',
    verificationStatus: 'verified',
    sourceReference: '70mai Omni (X200) User Manual',
    supportedModelIds: [...OMNI_MODELS]
  },
  {
    id: 'cmd-shoot-vlog',
    phrase: 'Shoot Vlog',
    chinese: '拍短视频',
    pinyin: 'pāi duǎn shì pín',
    description: 'Records dynamic 15-second multi-angle video with synchronized pan movements.',
    category: 'ptz-motion',
    name: 'Shoot Vlog',
    traditionalChinese: '拍短視頻',
    simplifiedChinese: '拍短视频',
    englishCommand: 'Shoot Vlog',
    actionKey: 'shoot-vlog',
    englishAliases: ['Shoot Vlog', 'Shoot video', 'Record vlog', 'Capture vlog'],
    chineseAliases: ['拍短视频', '拍短視頻', '拍vlog'],
    phoneticGuide: {
      syllables: ['pāi', 'duǎn', 'shì', 'pín'],
      tones: ['1st Tone (High-flat)', '3rd Tone (Dipping)', '4th Tone (Falling)', '2nd Tone (Rising)'],
      description: 'Fluid melodic sequence ending with clear rising "pín".'
    },
    dashcamBehavior: 'Records 15-second scenic panning video saved to Vlog album.',
    audioFileZh: '/audio/shoot-vlog-zh.mp3',
    audioFileEn: '/audio/shoot-vlog-en.mp3',
    iconName: 'Video',
    priority: 13,
    officialManualNote: 'Creates short panoramic video clips.',
    verificationStatus: 'verified',
    sourceReference: '70mai Omni (X200) User Manual',
    supportedModelIds: [...OMNI_MODELS]
  }
];

