import { CardId } from '../interfaces/ICard';
import { SetId } from '../interfaces/ICardSet';

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

  public static getCurrentCard(): string | null {
    return UrlManager.getParam(UrlParams.CARD);
  }

  public static selectCurrentCard(cardId: CardId): void {
    this.setParam(UrlParams.CARD, cardId);
  }

  public static clearCurrentCard(): void {
    history.replaceState(null, '', ``);
  }

  public static getCardSet(): SetId | null {
    return UrlManager.getParam(UrlParams.SET);
  }

  public static selectSet(setId: SetId): void {
    this.setParam(UrlParams.SET, setId);
  }

  public static getLanguage(): string | null {
    return UrlManager.getParam(UrlParams.LANG);
  }

  public static selectLanguage(lang: string): void {
    this.setParam(UrlParams.LANG, lang);
  }

  /* Generic functions */

  public static getParam(paramName: string): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName);
  }

  public static setParam(paramName: string, paramValue: string): void {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    // Set or overwrite the query parameter
    params.set(paramName, paramValue);

    // Update the URL without reloading the page
    window.history.pushState({}, '', `${url.pathname}?${params.toString()}`);
  }
}

export default UrlManager;
