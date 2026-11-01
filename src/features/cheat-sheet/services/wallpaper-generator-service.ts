import type { DashCamModel } from '../../../domain/models/dash-cam-model';
import type { VoiceCommand } from '../../../domain/models/voice-command';

export interface WallpaperOptions {
  model: DashCamModel;
  commands: readonly VoiceCommand[];
  theme: 'dark' | 'cream';
}

export class WallpaperGeneratorService {
  public static async generateWallpaperBlob(options: WallpaperOptions): Promise<Blob> {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable');

    const { model, commands, theme } = options;
    const isDark = theme === 'dark';

    // Background Fill
    if (isDark) {
      const grad = ctx.createLinearGradient(0, 0, 0, 1920);
      grad.addColorStop(0, '#090D16');
      grad.addColorStop(0.5, '#0F172A');
      grad.addColorStop(1, '#090D16');
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = '#F7F4EE';
    }
    ctx.fillRect(0, 0, 1080, 1920);

    // Accent header lines & glow
    ctx.strokeStyle = isDark ? '#0284C7' : '#0284C7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(80, 480);
    ctx.lineTo(1000, 480);
    ctx.stroke();

    // Top Brand Tag (below the phone clock clearance ~420px)
    ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = isDark ? '#38BDF8' : '#0284C7';
    ctx.textAlign = 'center';
    ctx.fillText('70MAI VOICE COMMAND REFERENCE', 540, 440);

    // Model Name Header
    ctx.font = '900 46px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = isDark ? '#F8FAFC' : '#1C1917';
    ctx.fillText(model.marketingName, 540, 540);

    // Series & Resolution Tag
    ctx.font = 'bold 22px monospace';
    ctx.fillStyle = isDark ? '#94A3B8' : '#6B6256';
    ctx.fillText(`${model.series.toUpperCase()} • ${model.resolution} • ${commands.length} COMMANDS`, 540, 580);

    // Draw Commands Grid / List
    const startY = 640;
    const availableHeight = 1100;
    const maxItems = Math.min(commands.length, 10);
    const itemHeight = Math.min(100, Math.floor(availableHeight / maxItems));

    commands.slice(0, 10).forEach((cmd, idx) => {
      const y = startY + idx * itemHeight;

      // Card Background
      ctx.fillStyle = isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.roundRect(80, y, 920, itemHeight - 14, 16);
      ctx.fill();

      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(226, 216, 201, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Chinese Command Text (Left)
      ctx.textAlign = 'left';
      ctx.font = '900 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = isDark ? '#FFFFFF' : '#1C1917';
      ctx.fillText(cmd.traditionalChinese, 110, y + (itemHeight - 14) * 0.44);

      // Pinyin Pronunciation
      ctx.font = 'bold 22px monospace';
      ctx.fillStyle = isDark ? '#38BDF8' : '#0284C7';
      ctx.fillText(cmd.pinyin ?? '', 110, y + (itemHeight - 14) * 0.82);

      // English Command (Right)
      ctx.textAlign = 'right';
      ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      ctx.fillStyle = isDark ? '#E2E8F0' : '#292524';
      ctx.fillText(cmd.englishCommand, 970, y + (itemHeight - 14) * 0.44);

      // Category / Dashcam Action
      ctx.font = '19px monospace';
      ctx.fillStyle = isDark ? '#94A3B8' : '#6B6256';
      ctx.fillText(cmd.dashcamBehavior.split(';')[0]?.slice(0, 36) ?? '', 970, y + (itemHeight - 14) * 0.8);
    });

    // Footer info
    ctx.textAlign = 'center';
    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = isDark ? '#64748B' : '#8C8070';
    ctx.fillText('DISCONNECT 70MAI SMARTPHONE APP TO ENABLE CABIN VOICE COMMANDS', 540, 1820);

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to generate wallpaper blob'));
      }, 'image/png');
    });
  }

  public static async downloadWallpaper(options: WallpaperOptions): Promise<void> {
    const blob = await this.generateWallpaperBlob(options);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `70mai-${options.model.id}-voice-wallpaper.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

