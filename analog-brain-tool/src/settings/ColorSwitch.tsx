import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Switch from 'react-switch';
import { PersistentStorageManager } from '../utils/PersistentStorageManager/PersistentStorageManager';
import { PersistentStorageTypes } from '../utils/PersistentStorageManager/PersistentStorageTypes';

// Doc for the react-switch API https://www.npmjs.com/package/react-switch

// look here for a pretty example to look at: https://help.kagi.com/kagi/

enum LightMode {
  LIGHT = 'light',
  DARK = 'dark',
}

// checked = dark
// unchecked = light
export const ColorSwitch: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);

  // Get the browser's preferred color scheme
  const getBrowserColorScheme = (): LightMode => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? LightMode.DARK : LightMode.LIGHT;
  };

  // Load the saved user preference from storage
  const loadSavedPreference = (): LightMode | null => {
    const savedPreference = PersistentStorageManager.get(PersistentStorageTypes.COLOR_SCHEME);
    return savedPreference === LightMode.LIGHT || savedPreference === LightMode.DARK ? savedPreference : null;
  };

  // Initialize the state based on browser preference or saved preference
  useEffect(() => {
    const savedPreference = loadSavedPreference();
    const browserPreference = getBrowserColorScheme();

    if (savedPreference !== null) {
      setChecked(savedPreference === LightMode.DARK);
    } else {
      setChecked(browserPreference === LightMode.DARK);
    }
  }, []);

  function setLightMode(mode: LightMode) {
    /* This works with `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));` */
    document.documentElement.setAttribute('data-theme', mode);
  }

  const handleChange = (checked: boolean) => {
    const browserPreference = getBrowserColorScheme();
    const userChoice = checked ? LightMode.DARK : LightMode.LIGHT;

    if (userChoice === browserPreference) {
      // If the user selects the browser preference, remove the saved choice
      PersistentStorageManager.remove(PersistentStorageTypes.COLOR_SCHEME);
    } else {
      // Otherwise, save the user's choice to localStorage
      PersistentStorageManager.set(PersistentStorageTypes.COLOR_SCHEME, userChoice);
    }

    // Update the state
    setChecked(checked);

    // Apply the selected color scheme to the document
    setLightMode(userChoice);
  };

  // Apply the color scheme to the document on initial load
  useEffect(() => {
    const savedPreference = loadSavedPreference();
    const browserPreference = getBrowserColorScheme();
    const theme = savedPreference || browserPreference;
    setLightMode(theme);
  }, []);

  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      <Switch
        onChange={handleChange}
        checked={checked}
        aria-label={t('label.lightModeSwitch')}
        checkedIcon={
          <svg viewBox="0 0 24 24" height="100%" width="100%" fill="white" style={{ padding: '2px' }}>
            {/* Moon Icon for Dark Mode */}
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
          </svg>
        }
        uncheckedIcon={
          <svg viewBox="0 0 24 24" height="100%" width="100%" fill="black" style={{ padding: '2px' }}>
            {/* Sun Icon for Light Mode */}
            <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121z" />
          </svg>
        }
        offColor="#f1c40f" // Light yellow for light mode
        onColor="#2c3eff" // Dark blue for dark mode
      />
    </div>
  );
};
