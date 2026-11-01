import type { FC } from 'react';
import {
  Camera,
  ShieldAlert,
  Mic,
  MicOff,
  Wifi,
  WifiOff,
  HelpCircle,
  Play,
  Square,
  Copy,
  Check,
  Star,
  Sparkles,
  Info,
  Radio,
  RefreshCw,
  Download,
  AlertTriangle,
  Volume2,
  RotateCw,
  RotateCcw,
  Smile,
  Video,
  Tv,
  Sun,
  Moon,
  Award,
  Layers,
  Maximize2,
  GitCompare
} from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: FC<IconRendererProps> = ({ name, className = '', size = 20 }) => {
  switch (name) {
    case 'Camera':
      return <Camera className={className} size={size} />;
    case 'ShieldAlert':
      return <ShieldAlert className={className} size={size} />;
    case 'Mic':
      return <Mic className={className} size={size} />;
    case 'MicOff':
      return <MicOff className={className} size={size} />;
    case 'Wifi':
      return <Wifi className={className} size={size} />;
    case 'WifiOff':
      return <WifiOff className={className} size={size} />;
    case 'Play':
      return <Play className={className} size={size} />;
    case 'Square':
      return <Square className={className} size={size} />;
    case 'Copy':
      return <Copy className={className} size={size} />;
    case 'Check':
      return <Check className={className} size={size} />;
    case 'Star':
      return <Star className={className} size={size} />;
    case 'Sparkles':
      return <Sparkles className={className} size={size} />;
    case 'Info':
      return <Info className={className} size={size} />;
    case 'Radio':
      return <Radio className={className} size={size} />;
    case 'RefreshCw':
      return <RefreshCw className={className} size={size} />;
    case 'Download':
      return <Download className={className} size={size} />;
    case 'AlertTriangle':
      return <AlertTriangle className={className} size={size} />;
    case 'Volume2':
      return <Volume2 className={className} size={size} />;
    case 'RotateCw':
      return <RotateCw className={className} size={size} />;
    case 'RotateCcw':
      return <RotateCcw className={className} size={size} />;
    case 'Smile':
      return <Smile className={className} size={size} />;
    case 'Video':
      return <Video className={className} size={size} />;
    case 'Tv':
      return <Tv className={className} size={size} />;
    case 'Sun':
      return <Sun className={className} size={size} />;
    case 'Moon':
      return <Moon className={className} size={size} />;
    case 'Award':
      return <Award className={className} size={size} />;
    case 'Layers':
      return <Layers className={className} size={size} />;
    case 'Maximize2':
      return <Maximize2 className={className} size={size} />;
    case 'GitCompare':
      return <GitCompare className={className} size={size} />;
    default:
      return <HelpCircle className={className} size={size} />;
  }
};
