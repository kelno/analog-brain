import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { languagesInfos } from './language/languageInfo';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const baseUrl = import.meta.env.BASE_URL ?? '/';

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      loadPath: function (lng: any, ns: any) {
        // Use URL constructor to properly join paths regardless of trailing slash
        const url = new URL(`locales/${lng}/${ns}.json`, window.location.origin + baseUrl);
        return url.toString();
      },
    },
    fallbackLng: 'en',
    nonExplicitSupportedLngs: false,
    debug: true,
    // restrict supported languages to those defined in languagesInfos
    supportedLngs: Object.keys(languagesInfos),

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
