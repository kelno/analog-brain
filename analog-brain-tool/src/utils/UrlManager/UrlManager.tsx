import { LangId } from '../../appContext/AppContextData';
import { CardId } from '../../types/Card/ICard';
import { DeckId } from '../../types/Deck/IDeck';
import { UrlParams } from './UrlParams';

/**
 * Builds URLs for sharing and static resources. Route and search state are
 * owned by React Router and must not be changed here.
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

  // ending with a /
  public static getBaseURL(): string {
    const baseUrl = window.location.origin + import.meta.env.BASE_URL;
    return baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  }
}
