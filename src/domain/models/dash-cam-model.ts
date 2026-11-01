export type ModelSeriesId =
  | 'm-series'
  | 'omni-series'
  | 'rearview-mirror'
  | 'a-series'
  | 't-series';

export interface ModelSpecItem {
  readonly label: string;
  readonly value: string;
  readonly highlight?: boolean;
}

export interface DashCamModel {
  readonly id: string;
  readonly name: string;
  readonly series: string;
  readonly seriesId: ModelSeriesId;
  readonly languages: readonly string[];
  readonly commandIds: readonly string[];
  readonly sourceUrl: string;
  readonly marketingName: string;
  readonly resolution: string;
  readonly fieldOfView: string;
  readonly verificationStatus: 'verified' | 'provisional' | 'unverified';
  readonly specs: readonly ModelSpecItem[];
  readonly firmwareNotice: string;
  readonly releaseYear: number;
}

export interface ModelSeriesInfo {
  readonly id: ModelSeriesId;
  readonly name: string;
  readonly description: string;
  readonly badgeColor: string;
  readonly iconName: string;
}

export const MODEL_SERIES_LIST: readonly ModelSeriesInfo[] = [
  {
    id: 'm-series',
    name: 'M-Series (Essential & Flagship Value)',
    description: 'Compact screenless dash cams optimized for discreet windshield mounting and acoustic DSP commands.',
    badgeColor: 'text-electric-blue bg-electric-blue/10 border-electric-blue/30',
    iconName: 'Camera'
  },
  {
    id: 'omni-series',
    name: 'Omni Series (360° Patented PTZ)',
    description: 'Motorized 360-degree rotating dash cams with directional voice triggers (Shoot Left, Shoot Right, Selfie, Vlog).',
    badgeColor: 'text-purple-600 bg-purple-500/10 border-purple-500/30',
    iconName: 'RotateCw'
  },
  {
    id: 'rearview-mirror',
    name: 'Rearview Mirror Series',
    description: 'Full-screen streaming media mirrors with display-switching and camera-toggling voice commands.',
    badgeColor: 'text-amber-700 bg-amber-500/10 border-amber-500/30',
    iconName: 'Maximize2'
  },
  {
    id: 'a-series',
    name: 'A-Series (4K & Premium Imaging)',
    description: 'Flagship Sony STARVIS 2 sensors with HDR and high-definition cabin recording controls.',
    badgeColor: 'text-emerald-700 bg-emerald-500/10 border-emerald-500/30',
    iconName: 'Award'
  },
  {
    id: 't-series',
    name: 'T-Series (Multi-Channel Fleet & Cabin)',
    description: 'Multi-camera systems capturing road, cabin, and rear with instant camera-channel voice selection.',
    badgeColor: 'text-sky-700 bg-sky-500/10 border-sky-500/30',
    iconName: 'Layers'
  }
];

