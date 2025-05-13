import { LangId } from '../../appContext/AppContextData';
import { CardId } from '../../types/Card/ICard';
import { DeckId } from '../../types/Deck/IDeck';
import { UrlParams } from './UrlParams';

/* Helps store and retrieve values from URL.
URL is only used for sharing and is not used as state storage after initial load.
*/
export class UrlManager {
  public static getShareURL(deck?: DeckId, card?: CardId, lang?: LangId, deckUrl?: string): string {
    const params = new URLSearchParams();
    if (deck) params.set(UrlParams.DECK, deck);
    if (lang) params.set(UrlParams.LANG, lang);
    if (card) params.set(UrlParams.CARD, card);
    if (deckUrl) params.set(UrlParams.DECK_URL, deckUrl);

    const paramsString = params.toString();
    return `${window.location.href}?${paramsString}`;
  }

  public static getCurrentCard(): string | null {
    return UrlManager.getParam(UrlParams.CARD);
  }

  public static getDeck(): DeckId | null {
    return UrlManager.getParam(UrlParams.DECK);
  }

  public static getLanguage(): string | null {
    return UrlManager.getParam(UrlParams.LANG);
  }

  public static getParam(paramName: string): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName);
  }

  public static getDeckURL(): string | null {
    return UrlManager.getParam(UrlParams.DECK_URL);
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
    const baseUrl = window.location.origin + import.meta.env.BASE_URL;
    return baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  }
}
