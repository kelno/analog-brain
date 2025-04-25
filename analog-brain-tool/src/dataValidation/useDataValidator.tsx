import { DataValidator } from './DataValidator';
import { UrlManager } from '../utils/UrlManager/UrlManager';
import { useSuspenseQuery } from '@tanstack/react-query';

// Suspension enabled hook
export const useDataValidator = () => {
  const schemaURL = `${UrlManager.getBaseURL()}decks/schema.json`; // fixed URL in public dir

  const dataValidator = useSuspenseQuery({
    queryKey: ['dataValidator', schemaURL],
    queryFn: async (): Promise<DataValidator> => {
      const response = await fetch(schemaURL);
      const schemaJson = await response.json();
      const dataValidator = new DataValidator(schemaJson);
      return dataValidator;
    },
  }).data; // useSuspenseQuery is guaranteed to succeed or throw.

  return dataValidator;
};
