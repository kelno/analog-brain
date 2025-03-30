import { ICardSet } from '../interfaces/ICardSet';
import Ajv from 'ajv';

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

const ajv = new Ajv({ allErrors: true });

export class DataValidator {
  public validateCardSetData = (cardSet: ICardSet): ValidationResult => {
    if (cardSet.cards.length === 0) {
      return { isValid: false, errorMessage: 'Found empty card set with id ' + cardSet.id };
    }

    const hasDuplicateCardIds = (set: ICardSet): boolean => {
      const ids = set.cards.map((card) => card.id);
      return new Set(ids).size !== ids.length;
    };

    if (hasDuplicateCardIds(cardSet)) {
      return { isValid: false, errorMessage: 'Duplicate card IDs found!' };
    }

    return { isValid: true };
  };

  public validateCardSetJSON = (cardSet: ICardSet): ValidationResult => {
    console.debug(cardSet);
    console.debug(ajv.errors);

    // TODO: validate formatVersion
    return { isValid: true };
  };
}
