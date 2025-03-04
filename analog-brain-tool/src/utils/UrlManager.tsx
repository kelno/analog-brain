import { CardId } from '../interfaces/ICard';
import { SetId } from '../interfaces/ICardSet';
import { LangId } from '../store/BrainContextData';

enum UrlParams {
  SET = 'set',
  LANG = 'lang',
  CARD = 'card',
}

/* Helps store and retrieve values from URL.
URL is only used for sharing and is not used as state storage after initial load.
*/
export class UrlManager {
  public static UrlParams = UrlParams; // Attach the enum as a static property

  public static getShareURLParams(set: SetId, card: CardId, lang: LangId) {
    const params = new URLSearchParams();
    params.set(UrlParams.SET, set);
    params.set(UrlParams.LANG, lang);
    params.set(UrlParams.CARD, card);

    return params.toString();
  }

  public static getCurrentCard(): string | null {
    return UrlManager.getParam(UrlParams.CARD);
  }

  public static getCardSet(): SetId | null {
    return UrlManager.getParam(UrlParams.SET);
  }

  public static getLanguage(): string | null {
    return UrlManager.getParam(UrlParams.LANG);
  }

  public static getParam(paramName: string): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName);
  }

  // Without page reload
  public static clearURLParams() {
    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
  }
}

export default UrlManager;
