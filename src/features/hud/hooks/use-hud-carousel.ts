import { useState, useEffect, useCallback, useRef } from 'react';
import type { VoiceCommand } from '../../../domain/models/voice-command';
import { AudioPlayerService } from '../../../infrastructure/audio/audio-player-service';

interface UseHudCarouselOptions {
  commands: readonly VoiceCommand[];
  defaultIntervalSeconds?: number;
}

export function useHudCarousel({ commands, defaultIntervalSeconds = 6 }: UseHudCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [intervalSeconds, setIntervalSeconds] = useState(defaultIntervalSeconds);
  const [audioLanguage, setAudioLanguage] = useState<'zh' | 'en'>('zh');
  const timerRef = useRef<number | null>(null);

  const activeCommand = commands[currentIndex] ?? commands[0];

  const playAudioFor = useCallback(async (cmd?: VoiceCommand, lang: 'zh' | 'en' = audioLanguage) => {
    if (!cmd) return;
    const path = lang === 'zh' ? cmd.audioFileZh : cmd.audioFileEn;
    const fallbackText = lang === 'zh' ? cmd.simplifiedChinese : cmd.englishCommand;
    await AudioPlayerService.playCommandAudio(path, fallbackText, lang);
  }, [audioLanguage]);

  const nextCommand = useCallback(() => {
    if (commands.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % commands.length);
  }, [commands.length]);

  const prevCommand = useCallback(() => {
    if (commands.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + commands.length) % commands.length);
  }, [commands.length]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => {
      const next = !prev;
      if (next && activeCommand) {
        void playAudioFor(activeCommand);
      }
      return next;
    });
  }, [activeCommand, playAudioFor]);

  // Handle slideshow auto-advance
  useEffect(() => {
    if (!isAutoPlaying || commands.length <= 1) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % commands.length;
        const nextCmd = commands[nextIndex];
        if (nextCmd) {
          void playAudioFor(nextCmd);
        }
        return nextIndex;
      });
    }, intervalSeconds * 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isAutoPlaying, commands, intervalSeconds, playAudioFor]);

  // Reset index if commands change and index is out of bounds
  useEffect(() => {
    if (currentIndex >= commands.length && commands.length > 0) {
      setCurrentIndex(0);
    }
  }, [commands.length, currentIndex]);

  return {
    currentIndex,
    setCurrentIndex,
    activeCommand,
    isAutoPlaying,
    toggleAutoPlay,
    intervalSeconds,
    setIntervalSeconds,
    audioLanguage,
    setAudioLanguage,
    nextCommand,
    prevCommand,
    playCurrentAudio: () => void playAudioFor(activeCommand)
  };
}

