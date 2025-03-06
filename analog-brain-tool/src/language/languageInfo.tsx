import ILanguageInfo from '../interfaces/ILanguageData';

const languagesInfos: Readonly<Record<string, Readonly<ILanguageInfo>>> = {
  en: { name: 'English', flag: '🇬🇧' },
  fr: { name: 'Français', flag: '🇫🇷' },
};

export default languagesInfos;
