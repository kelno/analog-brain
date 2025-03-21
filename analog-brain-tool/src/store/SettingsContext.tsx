import { createContext } from 'react';

interface SettingsContextType {
  indexUrl: string;
  setIndexUrl: (url: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
export default SettingsContext;
