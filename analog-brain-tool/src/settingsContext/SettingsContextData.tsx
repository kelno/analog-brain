import { PersistentStorageManager } from '../utils/PersistentStorageManager/PersistentStorageManager';
import { PersistentStorageTypes } from '../utils/PersistentStorageManager/PersistentStorageTypes';

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

  public setIndexUrl = (url: string) => {
    PersistentStorageManager.set(PersistentStorageTypes.DECK_INDEX_URL, url);
    this._setState({ ...this._state, indexUrl: url });
  };

  public get indexUrl(): string {
    return this._state.indexUrl;
  }

  public get isDefaultUrl(): boolean {
    return this._state.indexUrl === this._defaultUrl;
  }

  public resetIndexUrl = () => {
    PersistentStorageManager.remove(PersistentStorageTypes.DECK_INDEX_URL);
    this._setState({ ...this._state, indexUrl: this.defaultUrl });
  };

  public get defaultUrl(): string {
    return this._defaultUrl;
  }
}
