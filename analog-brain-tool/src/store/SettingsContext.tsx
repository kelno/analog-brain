import { createContext } from 'react';

interface SettingsContextType {
  indexUrl: string;
  setIndexUrl: (url: string) => void;
  resetIndexUrl: () => void;
  defaultUrl: string;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
