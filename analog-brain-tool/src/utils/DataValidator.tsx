import ICardSet from '../interfaces/ICardSet';

export class DataValidator {
  static validateCardSet(cardSet: ICardSet): boolean {
    if (cardSet.cards.length == 0) {
      console.error('Found empty card set with id ' + cardSet.id);
      return false;
    }

    const hasDuplicateCardIds = (set: ICardSet): boolean => {
      const ids = set.cards.map((card) => card.id);
      return new Set(ids).size !== ids.length;
    };
    if (hasDuplicateCardIds(cardSet)) {
      console.error('Duplicate card IDs found!');
      console.error(cardSet.cards);
      return false;
    }

    return true;
  }
}

export default DataValidator;
