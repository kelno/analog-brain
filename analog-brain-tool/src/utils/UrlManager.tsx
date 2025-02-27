import { CardId } from '../interfaces/ICard';

enum UrlParams {
  SET = 'set',
  LANG = 'lang',
  CARD = 'card',
}

/* Helps store and retrieve values from URL.
URL is only used for sharing and is not used as state storage after initial load.
*/
export class UrlManager {
  static UrlParams = UrlParams; // Attach the enum as a static property

  static getParam(paramName: string): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName);
  }

  static setCurrentCard(cardId: CardId): void {
    this.setParam(UrlParams.CARD, cardId);
  }

  static clearCurrentCard(): void {
    history.replaceState(null, '', ``);
  }

  static getCardSet(): string | null {
    return UrlManager.getParam(UrlParams.SET);
  }
  static selectSet(setId: string): void {
    this.setParam(UrlParams.SET, setId);
  }

  static getLanguage(): string | null {
    return UrlManager.getParam(UrlParams.LANG);
  }

  static selectLanguage(lang: string): void {
    this.setParam(UrlParams.LANG, lang);
  }

  private static setParam(paramName: string, paramValue: string): void {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    // Set or overwrite the query parameter
    params.set(paramName, paramValue);

    // Update the URL without reloading the page
    window.history.pushState({}, '', `${url.pathname}?${params.toString()}`);
  }

  static getCurrentCard(): string | null {
    return UrlManager.getParam(UrlParams.CARD);
  }
}

export default UrlManager;
