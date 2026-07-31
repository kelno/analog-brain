/**
 * Runtime contract shared by generated and test validators.
 *
 * This mirrors the part of AJV's ValidateFunction API that the application
 * consumes without coupling domain validation to AJV itself.
 */
export interface DeckSchemaValidator {
  (deck: unknown): boolean;
  errors?: readonly unknown[] | null;
}
