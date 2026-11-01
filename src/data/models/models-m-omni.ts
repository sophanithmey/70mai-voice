import type { DashCamModel } from '../../domain/models/dash-cam-model';

export const M_AND_OMNI_MODELS: readonly DashCamModel[] = [
  // M-Series
  {
    id: 'm310',
    name: '70mai Dash Cam M310',
    series: 'M-Series',
    seriesId: 'm-series',
    languages: ['en', 'zh-CN', 'zh-TW'],
    commandIds: [
      'cmd-take-photo',
      'cmd-lock-video',
      'cmd-turn-on-audio',
      'cmd-turn-off-audio',
      'cmd-turn-on-hotspot',
      'cmd-turn-off-hotspot'
    ],
    sourceUrl: 'https://www.70mai.com/m310/',
    marketingName: '70mai Dash Cam M310 (Entry Flagship)',
    resolution: '2304 x 1296 (3MP / 1296P QHD)',
    fieldOfView: '130° FOV / F2.0',
    verificationStatus: 'verified',
    releaseYear: 2024,
    firmwareNotice: 'Voice control paused while smartphone app is connected to dash cam Wi-Fi.',
    specs: [
      { label: 'Sensor', value: '3MP QHD 1296P' },
      { label: 'Voice Engine', value: 'Instant DSP Acoustic' },
      { label: 'Power Input', value: 'Type-C 5V/1.5A' }
    ]
  },
  {
    id: 'm310-plus-2k',
    name: 'M310 Plus 2K',
    series: 'M-Series',
    seriesId: 'm-series',
    languages: ['en', 'zh-CN', 'zh-TW'],
    commandIds: [
      'cmd-take-photo',
      'cmd-lock-video',
      'cmd-turn-on-audio',
      'cmd-turn-off-audio',
      'cmd-turn-on-hotspot',
      'cmd-turn-off-hotspot'
    ],
    sourceUrl: 'https://www.70mai.com/m310-plus/',
    marketingName: '70mai M310 Plus 2K Edition',
    resolution: '2560 x 1440 (2K HDR)',
    fieldOfView: '135° FOV / F1.8',
    verificationStatus: 'verified',
    releaseYear: 2025,
    firmwareNotice: 'Upgraded 2K HDR sensor with identical acoustic DSP voice core.',
    specs: [
      { label: 'Sensor', value: '2K 1440P HDR' },
      { label: 'Night Vision', value: 'Night Owl Vision' }
    ]
  },
  {
    id: 'm310-plus-3k',
    name: 'M310 Plus 3K',
    series: 'M-Series',
    seriesId: 'm-series',
    languages: ['en', 'zh-CN', 'zh-TW'],
    commandIds: [
      'cmd-take-photo',
      'cmd-lock-video',
      'cmd-turn-on-audio',
      'cmd-turn-off-audio',
      'cmd-turn-on-hotspot',
      'cmd-turn-off-hotspot'
    ],
    sourceUrl: 'https://www.70mai.com/m310-pro/',
    marketingName: '70mai M310 Plus 3K Ultra',
    resolution: '2880 x 1620 (3K QHD+)',
    fieldOfView: '140° FOV / F1.8',
    verificationStatus: 'verified',
    releaseYear: 2025,
    firmwareNotice: '3K Ultra resolution with dual-mic noise suppression.',
    specs: [
      { label: 'Sensor', value: '3K 1620P' },
      { label: 'Microphone', value: 'Dual-Array Noise Cancel' }
    ]
  },

  // Omni Series
  {
    id: 'omni',
    name: '70mai Omni',
    series: 'Omni Series',
    seriesId: 'omni-series',
    languages: ['en', 'zh-CN'],
    commandIds: [
      'cmd-shoot-left',
      'cmd-shoot-right',
      'cmd-take-selfie',
      'cmd-shoot-vlog',
      'cmd-take-photo',
      'cmd-lock-video'
    ],
    sourceUrl: 'https://www.70mai.com/omni/',
    marketingName: '70mai Omni (X200) 360° Patented Design',
    resolution: '1920 x 1080 (60FPS HDR)',
    fieldOfView: '340° Swivel + 140° FOV (Total 360°)',
    verificationStatus: 'verified',
    releaseYear: 2023,
    firmwareNotice: 'Motorized PTZ voice commands require unobstructed stepper motor rotation path.',
    specs: [
      { label: 'Rotation', value: '340° Stepper Motor (360° View)' },
      { label: 'PTZ Trigger', value: 'Shoot Left/Right/Selfie/Vlog' }
    ]
  },
  {
    id: 'omni-4k',
    name: '4K Omni',
    series: 'Omni Series',
    seriesId: 'omni-series',
    languages: ['en', 'zh-CN'],
    commandIds: [
      'cmd-shoot-left',
      'cmd-shoot-right',
      'cmd-take-selfie',
      'cmd-shoot-vlog',
      'cmd-take-photo',
      'cmd-lock-video'
    ],
    sourceUrl: 'https://www.70mai.com/omni-4k/',
    marketingName: '70mai 4K Omni Flagship',
    resolution: '3840 x 2160 (4K UHD Sony STARVIS 2)',
    fieldOfView: '360° Motorized Panoramic',
    verificationStatus: 'verified',
    releaseYear: 2025,
    firmwareNotice: '4K STARVIS 2 optical sensor with full 360-degree motorized voice directional control.',
    specs: [
      { label: 'Sensor', value: '4K Sony STARVIS 2' },
      { label: 'AI Motion', value: 'AI Human & Vehicle Tracking' }
    ]
  },
  {
    id: 'omni-x800',
    name: 'Omni X800',
    series: 'Omni Series',
    seriesId: 'omni-series',
    languages: ['en', 'zh-CN'],
    commandIds: [
      'cmd-shoot-left',
      'cmd-shoot-right',
      'cmd-take-selfie',
      'cmd-shoot-vlog',
      'cmd-take-photo',
      'cmd-lock-video'
    ],
    sourceUrl: 'https://www.70mai.com/omni-x800/',
    marketingName: '70mai Omni X800 Pro 360° Dual Channel',
    resolution: '4K Front + 1080P Rear',
    fieldOfView: '360° Full Pan / F1.75',
    verificationStatus: 'provisional',
    releaseYear: 2026,
    firmwareNotice: 'Provisional firmware specifications based on 70mai Omni series architecture.',
    specs: [
      { label: 'Channels', value: 'Dual 4K + FHD' },
      { label: 'Voice Control', value: '360° Directional Voice' }
    ]
  }
];

