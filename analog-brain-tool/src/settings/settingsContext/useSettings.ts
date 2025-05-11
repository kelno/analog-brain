
import { use } from 'react';
import { SettingsContext } from './SettingsContext';

export const useSettings = () => {
  const context = use(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
