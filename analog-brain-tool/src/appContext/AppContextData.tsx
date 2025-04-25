import { i18n } from 'i18next';

export interface AppContextState {
  lang: LangId;
}

export type LangId = string;

export class AppContextData {
  private state: AppContextState;
  private setState: (state: AppContextState) => void;
  private i18n: i18n;

  constructor(appState: AppContextState, setAppState: (appState: AppContextState) => void, i18n: i18n) {
    this.state = appState;
    this.setState = setAppState;
    this.i18n = i18n;
  }

  public get language(): LangId {
    return this.state.lang;
  }

  // returns success
  public setLanguage = (lang: LangId) => {
    // const defaultSet = this.deckStorage.getDefaultSetForLanguage(lang);
    // if (defaultSet === undefined) {
    //   console.error(`Can't switch language. No available default set for chosen lang ${lang}`);
    //   return false;
    // }

    console.debug('AppContext: Set language ' + lang);
    this.i18n.changeLanguage(lang);

    this.setState({ ...this.state, lang: lang });
    return true;
  };
}
