import { ILanguageInfo } from '../types/ILanguageData';

export const languagesInfos: Readonly<Record<string, Readonly<ILanguageInfo>>> = {
  en: { name: 'English', flag: '🇬🇧' },
  fr: { name: 'Français', flag: '🇫🇷' },
  es: { name: 'Español', flag: '🇪🇸' },
};
