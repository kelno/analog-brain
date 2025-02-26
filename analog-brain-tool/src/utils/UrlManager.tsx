import { CardId } from '../interfaces/ICard';

class UrlManager {
  static setCurrentCard(newHash: CardId): void {
    history.replaceState(null, '', `#${newHash}`);
  }

  static clearCurrentCard(): void {
    history.replaceState(null, '', ``);
  }

  static selectSet(setId: string): void {
    alert('selectSet ' + setId);
  }

  static selectLanguage(lang: string): void {
    alert('selectLanguage ' + lang);
  }

  static getLanguage(): string | null {
    return null;
  }

  static getCardSet(): string | null {
    return null;
  }

  static getCurrentCard(setId: string): string | null {
    console.debug('UrlManager get current card for setId ' + setId);
    return window.location.hash.slice(1) || null; // debug for now
    /*
    console.log('UrlManager get current card for setId ' + setId);
    return null;*/
  }
}

export default UrlManager;
