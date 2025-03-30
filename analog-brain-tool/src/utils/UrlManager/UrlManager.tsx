import { CardId } from '../../interfaces/ICard';
import { SetId } from '../../interfaces/ICardSet';
import { LangId } from '../../store/BrainContextData';
import { UrlParams } from './UrlParams';

/* Helps store and retrieve values from URL.
URL is only used for sharing and is not used as state storage after initial load.
*/
export class UrlManager {
  //public static UrlParams = UrlParams; // Attach the enum as a static property

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

  public static consumeParam(paramName: string): string | null {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(paramName);

    if (value !== null) {
      params.delete(paramName);
      // Update URL without page reload
      window.history.replaceState(
        {},
        document.title,
        `${UrlManager.getBaseURL()}${params.toString() ? `?${params.toString()}` : ''}`,
      );
    }

    return value;
  }

  // Without page reload
  public static clearURLParams() {
    window.history.replaceState({}, document.title, UrlManager.getBaseURL());
  }

  // ending with a /
  public static getBaseURL(): string {
    const baseUrl = window.location.origin + window.location.pathname;
    return baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  }
}
