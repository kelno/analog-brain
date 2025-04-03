export class ErrorHelpers {
  static getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (error instanceof DOMException) return error.message;
    if (typeof error === 'string') return error;
    return 'Unknown error occurred';
  };
}
