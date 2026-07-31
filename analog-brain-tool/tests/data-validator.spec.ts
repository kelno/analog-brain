import { expect, test } from '@playwright/test';
import { DataValidator } from '../src/dataValidation/DataValidator';
import { DeckSchemaValidator } from '../src/dataValidation/DeckSchemaValidator';
import validateDeckSchema from '../src/dataValidation/generated/deckValidator.js';
import { IDeck } from '../src/types/Deck';

const validDeck = (): IDeck => ({
  id: 'test-deck',
  title: 'Test deck',
  formatVersion: 1,
  lang: 'en',
  isDefaultForLanguage: true,
  cards: [
    {
      id: 'first-card',
      title: 'First card',
      items: [{ text: 'Done' }],
    },
  ],
});

const createValidator = (isValid: boolean, errors: readonly unknown[] = []): DeckSchemaValidator => {
  const validate: DeckSchemaValidator = () => isValid;
  validate.errors = errors;
  return validate;
};

test.describe('DataValidator', () => {
  test('accepts a deck that passes schema and domain validation', () => {
    const dataValidator = new DataValidator(createValidator(true));
    const deck = validDeck();

    expect(dataValidator.validateDeckJSON(deck)).toEqual({ isValid: true });
    expect(dataValidator.validateDeckData(deck)).toEqual({ isValid: true });
  });

  test('returns serialized schema errors', () => {
    const schemaError = {
      instancePath: '',
      keyword: 'required',
      message: "must have required property 'title'",
    };
    const dataValidator = new DataValidator(createValidator(false, [schemaError]));

    expect(dataValidator.validateDeckJSON(validDeck())).toEqual({
      isValid: false,
      errorMessages: [JSON.stringify(schemaError)],
    });
  });

  test('rejects duplicate card IDs during domain validation', () => {
    const dataValidator = new DataValidator(createValidator(true));
    const deck = validDeck();
    deck.cards.push({ ...deck.cards[0] });

    expect(dataValidator.validateDeckData(deck)).toEqual({
      isValid: false,
      errorMessages: ['Duplicate card IDs found.'],
    });
  });

  test('keeps accepting older format versions whose schema remains valid', () => {
    const dataValidator = new DataValidator(createValidator(true));
    const deck = validDeck();
    deck.formatVersion = 0;

    expect(dataValidator.validateDeckJSON(deck)).toEqual({ isValid: true });
  });
});

test.describe('generated deck schema validator', () => {
  test('accepts the canonical deck shape', () => {
    const dataValidator = new DataValidator(validateDeckSchema);

    expect(dataValidator.validateDeckJSON(validDeck())).toEqual({ isValid: true });
  });

  test('rejects a deck missing a required property', () => {
    const dataValidator = new DataValidator(validateDeckSchema);
    const deckWithoutTitle = validDeck() as Partial<IDeck>;
    delete deckWithoutTitle.title;

    const result = dataValidator.validateDeckJSON(deckWithoutTitle as IDeck);

    expect(result.isValid).toBe(false);
    expect(result.errorMessages?.join(' ')).toContain("must have required property 'title'");
  });
});
