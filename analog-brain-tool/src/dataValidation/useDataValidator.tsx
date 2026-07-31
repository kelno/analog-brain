import { DataValidator } from './DataValidator';
import validateDeckSchema from './generated/deckValidator.js';

const dataValidator = new DataValidator(validateDeckSchema);

// Retain the hook-shaped API used by DeckManager while validation is now ready synchronously.
export const useDataValidator = () => dataValidator;
