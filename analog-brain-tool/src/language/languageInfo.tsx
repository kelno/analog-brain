import ILanguageInfo from '../interfaces/ILanguageData';

const languagesInfos: Readonly<Record<string, Readonly<ILanguageInfo>>> = {
  en: { name: 'English', flag: '🇬🇧' },
  fr: { name: 'Français', flag: '🇫🇷' },
  es: { name: 'Español', flag: '🇪🇸' },
};

export default languagesInfos;
