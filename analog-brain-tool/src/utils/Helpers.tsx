import { availableSets } from '../content/cards';
import ICardSet, { SetId } from '../interfaces/ICardSet';

export default class Helpers {
  public static getSetById(id: SetId): ICardSet | undefined {
    return availableSets.find((set) => set.id === id);
  }
}
