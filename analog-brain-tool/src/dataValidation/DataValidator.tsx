import { ICardSet, MINIMAL_CARD_SET_FORMAT_VERSION } from '../interfaces/ICardSet';
import { ValidateFunction } from 'ajv';
import { ajv } from './useAjv';

interface ValidationResult {
  isValid: boolean;
  errorMessages?: string[];
}

export class DataValidator {
  private _validate: ValidateFunction<ICardSet>;

  public constructor(schemaJSON: any) {
    this._validate = ajv.compile<ICardSet>(schemaJSON);
  }

  public validateCardSetData = (cardSet: ICardSet): ValidationResult => {
    if (cardSet.cards.length === 0) {
      return { isValid: false, errorMessages: [`Found empty card set with id ${cardSet.id}`] };
    }

    const hasDuplicateCardIds = (set: ICardSet): boolean => {
      const ids = set.cards.map((card) => card.id);
      return new Set(ids).size !== ids.length;
    };

    if (hasDuplicateCardIds(cardSet)) {
      return { isValid: false, errorMessages: ['Duplicate card IDs found!'] };
    }

    return { isValid: true };
  };

  public validateCardSetJSON = (cardSet: ICardSet): ValidationResult => {
    let errors: string[] = [];

    if (cardSet.formatVersion < MINIMAL_CARD_SET_FORMAT_VERSION) {
      const error = `Card set ${cardSet.id} format version is below minimal version ${MINIMAL_CARD_SET_FORMAT_VERSION}`;
      console.warn(error);
      errors.push(error);
    }

    if (this._validate(cardSet)) {
      console.debug(`Validating ${cardSet.id} passed`);

      return { isValid: true };
    } else {
      console.error(`Validating failed for set: ${JSON.stringify(cardSet)}`);
      const ajvErrors: string[] | undefined = this._validate.errors?.map((ajvError) =>
        JSON.stringify(ajvError),
      );
      return { isValid: false, errorMessages: [...errors, ...(ajvErrors ?? [])] }; // concat ajvErrors if any
    }

    // TODO: validate/warn about formatVersion
  };
}
