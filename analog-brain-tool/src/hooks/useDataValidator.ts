import { ICardSet } from '../interfaces/ICardSet';

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

const useDataValidator = () => {

  const validateCardSet = (cardSet: ICardSet): ValidationResult => {
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

  return { validateCardSet };
};

export default useDataValidator;
