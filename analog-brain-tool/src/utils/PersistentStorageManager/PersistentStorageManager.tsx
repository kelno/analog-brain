import { PersistentStorageTypes } from './PersistentStorageTypes';

/* Helps store and retrieve values from URL.
URL is only used for sharing and is not used as state storage after initial load.
*/
export class PersistentStorageManager {
  public static get(key: PersistentStorageTypes): string | null {
    return localStorage.getItem(key);
  }

  public static set(key: PersistentStorageTypes, value: string) {
    localStorage.setItem(key, value);
  }

  public static remove(key: PersistentStorageTypes) {
    localStorage.removeItem(key);
  }
}
