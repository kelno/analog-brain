export enum BrainToolErrorType {
  FAILED_NO_VALID_DECK = 'FAILED_NO_VALID_DECK',
  FAILED_TO_FETCH_INDEX = 'FAILED_TO_FETCH_INDEX',
  FAILED_TO_FETCH_DECK = 'FAILED_TO_FETCH_DECK',
  NO_AVAILABLE_DECK_FOR_LANG = 'NO_AVAILABLE_DECK_FOR_LANG',
  FAILED_TO_LOAD_DATA_VALIDATOR = 'FAILED_TO_LOAD_DATA_VALIDATOR',
  DECK_NO_ID_PROVIDED = 'DECK_NO_ID_PROVIDED',
}

export class BrainToolError extends Error {
  constructor(message: string, public brainError: BrainToolErrorType, printToConsole: boolean = true) {
    super(message);
    Object.setPrototypeOf(this, BrainToolError.prototype);
    if (printToConsole) console.error(message);
  }
}
