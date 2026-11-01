import type { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardView } from '../features/dashboard/dashboard-view';
import { CommandsView } from '../features/commands/commands-view';
import { VoicePracticeView } from '../features/voice-practice/voice-practice-view';
import { SettingsView } from '../features/settings/settings-view';
import { ModelCompareView } from '../features/models/components/model-compare-view';
import { HudView } from '../features/hud/components/hud-view';
import { CheatSheetView } from '../features/cheat-sheet/components/cheat-sheet-view';

interface AppRouterProps {
  currentLanguage: 'zh-TW' | 'zh-CN' | 'en';
}

export const AppRouter: FC<AppRouterProps> = ({ currentLanguage }) => {
  return (
    <Routes>
      <Route
        path='/'
        element={<DashboardView currentLanguage={currentLanguage} />}
      />
      <Route
        path='/commands'
        element={<CommandsView currentLanguage={currentLanguage} />}
      />
      <Route
        path='/practice'
        element={<VoicePracticeView currentLanguage={currentLanguage} />}
      />
      <Route path='/compare' element={<ModelCompareView />} />
      <Route path='/hud' element={<HudView />} />
      <Route path='/cheat-sheet' element={<CheatSheetView />} />
      <Route path='/settings' element={<SettingsView />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
