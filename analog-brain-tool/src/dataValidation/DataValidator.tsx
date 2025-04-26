import { IDeck, MINIMAL_CARD_DECK_FORMAT_VERSION } from '../types/Deck/IDeck';
import { ValidateFunction } from 'ajv';
import { ajv } from './useAjv';
import { DeckUtils } from '../types/Deck';

interface ValidationResult {
  isValid: boolean;
  errorMessages?: string[];
}

export class DataValidator {
  private _validate: ValidateFunction<IDeck>;

  public constructor(schemaJSON: any) {
    console.debug('Constructing new DataValidator');
    this._validate = ajv.compile<IDeck>(schemaJSON);
  }

  public validateDeckData = (deck: IDeck): ValidationResult => {
    if (DeckUtils.isEmpty(deck)) {
      return { isValid: false, errorMessages: [`Found empty card deck with id ${deck.id}.`] };
    }

    const hasDuplicateCardIds = (deck: IDeck): boolean => {
      const ids = deck.cards.map((card) => card.id);
      return new Set(ids).size !== ids.length;
    };

    if (hasDuplicateCardIds(deck)) {
      return { isValid: false, errorMessages: ['Duplicate card IDs found.'] };
    }

    return { isValid: true };
  };

  public validateDeckJSON = (deck: IDeck): ValidationResult => {
    let errors: string[] = [];

    if (deck.formatVersion < MINIMAL_CARD_DECK_FORMAT_VERSION) {
      const error = `Card deck ${deck.id} format version is below minimal version ${MINIMAL_CARD_DECK_FORMAT_VERSION}`;
      console.warn(error);
      errors.push(error);
    }

    if (this._validate(deck)) {
      console.debug(`Validating ${deck.id} passed`);

      return { isValid: true };
    } else {
      console.error(`Validating failed for deck: ${JSON.stringify(deck)}`);
      const ajvErrors: string[] | undefined = this._validate.errors?.map((ajvError) =>
        JSON.stringify(ajvError),
      );
      return { isValid: false, errorMessages: [...errors, ...(ajvErrors ?? [])] }; // concat ajvErrors if any
    }
  };
}
