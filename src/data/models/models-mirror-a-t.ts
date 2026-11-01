import type { DashCamModel } from '../../domain/models/dash-cam-model';

export const MIRROR_A_AND_T_MODELS: readonly DashCamModel[] = [
  // Rearview Mirror Series
  {
    id: 's500',
    name: '70mai S500',
    series: 'Rearview Mirror',
    seriesId: 'rearview-mirror',
    languages: ['en', 'zh-CN', 'zh-TW'],
    commandIds: [
      'cmd-show-front-cam',
      'cmd-show-rear-cam',
      'cmd-turn-on-screen',
      'cmd-turn-off-screen',
      'cmd-take-photo',
      'cmd-lock-video'
    ],
    sourceUrl: 'https://www.70mai.com/s500/',
    marketingName: '70mai Rearview Dash Cam S500 (Streaming Mirror)',
    resolution: '2592 x 1944 (3K HDR Sony IMX675)',
    fieldOfView: '138° Front + 138° Rear',
    verificationStatus: 'verified',
    releaseYear: 2024,
    firmwareNotice: 'Exclusive mirror streaming commands (Show Front/Rear, Turn On/Off Screen).',
    specs: [
      { label: 'Display', value: '9.35" Fully Laminated IPS' },
      { label: 'Sensor', value: 'Sony STARVIS 2 IMX675' }
    ]
  },

  // A-Series
  {
    id: 'a810s',
    name: '70mai A810S',
    series: 'A-Series',
    seriesId: 'a-series',
    languages: ['en', 'zh-CN', 'zh-TW'],
    commandIds: [
      'cmd-take-photo',
      'cmd-lock-video',
      'cmd-turn-on-audio',
      'cmd-turn-off-audio',
      'cmd-turn-on-hotspot',
      'cmd-turn-off-hotspot'
    ],
    sourceUrl: 'https://www.70mai.com/a810/',
    marketingName: '70mai 4K A810S (Sony STARVIS 2 Flagship)',
    resolution: '3840 x 2160 (True 4K UHD)',
    fieldOfView: '150° Ultra Wide / F1.8',
    verificationStatus: 'verified',
    releaseYear: 2024,
    firmwareNotice: '4K Sony STARVIS 2 flagship with HDR 60FPS dual-channel recording.',
    specs: [
      { label: 'Optics', value: 'Sony STARVIS 2 IMX678' },
      { label: 'Frame Rate', value: '4K 60FPS / HDR 30FPS' }
    ]
  },
  {
    id: 'a810-lite',
    name: 'A810 Lite',
    series: 'A-Series',
    seriesId: 'a-series',
    languages: ['en', 'zh-CN'],
    commandIds: [
      'cmd-take-photo',
      'cmd-lock-video',
      'cmd-turn-on-audio',
      'cmd-turn-off-audio',
      'cmd-turn-on-hotspot',
      'cmd-turn-off-hotspot'
    ],
    sourceUrl: 'https://www.70mai.com/a810-lite/',
    marketingName: '70mai A810 Lite 4K Edition',
    resolution: '3840 x 2160 (4K UHD Single Channel)',
    fieldOfView: '145° FOV / F2.0',
    verificationStatus: 'verified',
    releaseYear: 2024,
    firmwareNotice: 'Streamlined single-channel 4K edition with standard acoustic DSP voice controls.',
    specs: [
      { label: 'Resolution', value: '4K 2160P' },
      { label: 'GPS', value: 'Built-in GPS ADAS' }
    ]
  },
  {
    id: 'a800se',
    name: 'A800SE',
    series: 'A-Series',
    seriesId: 'a-series',
    languages: ['en', 'zh-CN', 'zh-TW'],
    commandIds: [
      'cmd-take-photo',
      'cmd-lock-video',
      'cmd-turn-on-audio',
      'cmd-turn-off-audio',
      'cmd-turn-on-hotspot',
      'cmd-turn-off-hotspot'
    ],
    sourceUrl: 'https://www.70mai.com/a800s/',
    marketingName: '70mai A800SE Special Edition',
    resolution: '3840 x 2160 (4K UHD)',
    fieldOfView: '140° FOV / F1.8',
    verificationStatus: 'verified',
    releaseYear: 2023,
    firmwareNotice: 'Proven 4K platform with dual-channel recording support.',
    specs: [
      { label: 'Storage', value: 'Up to 128GB' },
      { label: 'Night Vision', value: '3D DNR + WDR' }
    ]
  },

  // T-Series
  {
    id: 't800',
    name: '70mai T800',
    series: 'T-Series',
    seriesId: 't-series',
    languages: ['en', 'zh-CN'],
    commandIds: [
      'cmd-take-photo',
      'cmd-lock-video',
      'cmd-switch-camera',
      'cmd-turn-on-audio',
      'cmd-turn-off-audio',
      'cmd-turn-on-hotspot',
      'cmd-turn-off-hotspot'
    ],
    sourceUrl: 'https://www.70mai.com/t800/',
    marketingName: '70mai T800 3-Channel Fleet & Cabin System',
    resolution: '4K Front + 1080P Cabin + 1080P Rear',
    fieldOfView: '150° Road + 130° Cabin + 130° Rear',
    verificationStatus: 'verified',
    releaseYear: 2025,
    firmwareNotice: '3-Channel multi-camera with dedicated "Switch camera" voice cycle command.',
    specs: [
      { label: 'Channels', value: '3-Channel (Road, Cabin, Rear)' },
      { label: 'IR Vision', value: 'Cabin Infrared Night Vision' }
    ]
  },
  {
    id: 't800e',
    name: 'T800E',
    series: 'T-Series',
    seriesId: 't-series',
    languages: ['en', 'zh-CN'],
    commandIds: [
      'cmd-take-photo',
      'cmd-lock-video',
      'cmd-switch-camera',
      'cmd-turn-on-audio',
      'cmd-turn-off-audio',
      'cmd-turn-on-hotspot',
      'cmd-turn-off-hotspot'
    ],
    sourceUrl: 'https://www.70mai.com/t800e/',
    marketingName: '70mai T800E Commercial Fleet Edition',
    resolution: '2K Front + 1080P Cabin + 1080P Rear',
    fieldOfView: '145° Triple View',
    verificationStatus: 'verified',
    releaseYear: 2025,
    firmwareNotice: 'Commercial fleet edition with tamper-proof SD slot and multi-cam voice commands.',
    specs: [
      { label: 'Channels', value: 'Triple Channel Commercial' },
      { label: 'Connectivity', value: '4G Cloud Fleet Monitor' }
    ]
  },
  {
    id: 't400',
    name: 'T400',
    series: 'T-Series',
    seriesId: 't-series',
    languages: ['en', 'zh-CN'],
    commandIds: [
      'cmd-take-photo',
      'cmd-lock-video',
      'cmd-switch-camera',
      'cmd-turn-on-audio',
      'cmd-turn-off-audio',
      'cmd-turn-on-hotspot',
      'cmd-turn-off-hotspot'
    ],
    sourceUrl: 'https://www.70mai.com/t400/',
    marketingName: '70mai T400 Dual-Channel Taxi & Rideshare',
    resolution: '1440P Front + 1080P Interior IR',
    fieldOfView: '140° Front + 130° Interior',
    verificationStatus: 'verified',
    releaseYear: 2024,
    firmwareNotice: 'Compact rideshare dual-channel camera with interior mic & lens cycling.',
    specs: [
      { label: 'Channels', value: 'Dual Channel Front + Cabin' },
      { label: 'Interior Mic', value: 'High Sensitivity Voice DSP' }
    ]
  }
];

