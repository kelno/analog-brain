import { LangId } from '../../appContext/AppContextData';
import { UrlParams } from './UrlParams';

/**
 * Builds URLs for sharing and static resources. Route and search state are
 * owned by React Router and must not be changed here.
 */
export class UrlManager {
  public static getShareURL(routePath: string, lang?: LangId, deckUrl?: string): string {
    const params = new URLSearchParams();
    if (lang) params.set(UrlParams.LANG, lang);
    if (deckUrl) params.set(UrlParams.DECK_URL, deckUrl);

    const paramsString = params.toString();
    const routeSearch = paramsString ? `?${paramsString}` : '';
    const shareUrl = new URL(this.getBaseURL());
    shareUrl.hash = `${routePath}${routeSearch}`;

    return shareUrl.toString();
  }

  // ending with a /
  public static getBaseURL(): string {
    const baseUrl = window.location.origin + import.meta.env.BASE_URL;
    return baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  }
}
