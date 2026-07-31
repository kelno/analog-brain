import { PersistentStorageManager } from '../../utils/PersistentStorageManager/PersistentStorageManager';
import { PersistentStorageTypes } from '../../utils/PersistentStorageManager/PersistentStorageTypes';

export interface SettingsContextState {
  indexUrl: string;
}

export type LangId = string;

export class SettingsContextData {
  private _state: SettingsContextState;
  private _setState: (state: SettingsContextState) => void;
  private _defaultUrl: string;

  constructor(
    state: SettingsContextState,
    setState: (state: SettingsContextState) => void,
    defaultUrl: string,
  ) {
    this._state = state;
    this._setState = setState;
    this._defaultUrl = defaultUrl;
  }

  private updateIndexUrl = (url: string): boolean => {
    if (url === this._state.indexUrl) return false;

    // A selected deck belongs to the source that provided it and must not be
    // restored against a different index merely because the IDs happen to match.
    PersistentStorageManager.remove(PersistentStorageTypes.CHOSEN_DECK);
    this._setState({ ...this._state, indexUrl: url });
    return true;
  };

  public setIndexUrl = (url: string): boolean => {
    if (url === this._state.indexUrl) return false;

    PersistentStorageManager.set(PersistentStorageTypes.DECK_INDEX_URL, url);
    return this.updateIndexUrl(url);
  };

  public get indexUrl(): string {
    return this._state.indexUrl;
  }

  public get isDefaultUrl(): boolean {
    return this._state.indexUrl === this._defaultUrl;
  }

  public resetIndexUrl = (): boolean => {
    PersistentStorageManager.remove(PersistentStorageTypes.DECK_INDEX_URL);
    return this.updateIndexUrl(this.defaultUrl);
  };

  public get defaultUrl(): string {
    return this._defaultUrl;
  }
}
