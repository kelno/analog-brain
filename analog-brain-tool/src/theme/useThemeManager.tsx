import { useEffect, useState } from 'react';
import { PersistentStorageManager } from '../utils/PersistentStorageManager/PersistentStorageManager';
import { PersistentStorageTypes } from '../utils/PersistentStorageManager/PersistentStorageTypes';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ThemeManager {
  theme: Theme;
  switchTheme: (userChoice: Theme) => void;
  initialize: () => void;
}

const useThemeManager = (): ThemeManager => {
  // Get the browser's preferred color scheme
  const getBrowserColorScheme = (): Theme => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;
  };

  // Load the saved user preference from storage
  const loadSavedPreference = (): Theme | null => {
    const savedPreference = PersistentStorageManager.get(PersistentStorageTypes.COLOR_SCHEME);
    return savedPreference === Theme.LIGHT || savedPreference === Theme.DARK ? savedPreference : null;
  };

  const getDefaultTheme = () => {
    return loadSavedPreference() ?? getBrowserColorScheme();
  };

  function setLightMode(mode: Theme) {
    /* This works with `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));` */
    document.documentElement.setAttribute('data-theme', mode);
  }

  const [theme, setTheme] = useState<Theme>(getDefaultTheme());

  //console.debug(`useThemeManager loaded with ${theme}`);

  const switchTheme = (userChoice: Theme): void => {
    const browserPreference = getBrowserColorScheme();
    if (userChoice === browserPreference) {
      // If the user selects the browser preference, remove the saved choice
      PersistentStorageManager.remove(PersistentStorageTypes.COLOR_SCHEME);
    } else {
      // Otherwise, save the user's choice to localStorage
      PersistentStorageManager.set(PersistentStorageTypes.COLOR_SCHEME, userChoice);
    }

    // Update the state
    setTheme(userChoice);

    setLightMode(userChoice);
  };

  // Apply the color scheme to the document on initial load
  useEffect(() => {
    const savedPreference = loadSavedPreference();
    const browserPreference = getBrowserColorScheme();
    const theme = savedPreference || browserPreference;
    setLightMode(theme);
  }, []);

  const initialize = (): void => {
    // Nothing to do for now, just loading this component is enough
  };

  return { theme, switchTheme, initialize };
};

export default useThemeManager;
