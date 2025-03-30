import { use } from 'react';
import { BrainContext } from '../components/BrainTool/store/BrainContext';
import { DataValidator } from './DataValidator';
import { UrlManager } from '../utils/UrlManager/UrlManager';
import { BrainToolError, BrainToolErrorType } from '../components/BrainTool/BrainToolErrorHandler';

let dataValidator: DataValidator | undefined = undefined;

async function doFetchSchemaJSON(): Promise<any> {
  const schemaURL = `${UrlManager.getBaseURL()}sets/schema.json`; // fixed URL in public dir
  const response = await fetch(schemaURL, { cache: 'no-store' });
  if (!response.ok) throw new Error(`${response.status}:${response.statusText} from URL ${schemaURL}`);

  const schemaJson = await response.json();
  return schemaJson;
}

// get data validator, initializing it if needed
async function getDataValidator(): Promise<DataValidator> {
  if (dataValidator === undefined) {
    try {
      const schemaJson = await doFetchSchemaJSON();
      dataValidator = new DataValidator(schemaJson);
    } catch (error) {
      if (error instanceof Error)
        throw new BrainToolError(
          `useDataValidator: Failed to fetch or process schema file (error: ${error.message})`,
          BrainToolErrorType.FAILED_TO_LOAD_DATA_VALIDATOR,
        );
      else throw error; // else it's a promise??
    }
  }
  return dataValidator;
}

// can throw BrainToolError, so it must be instanciated under BrainToolErrorHandler
export const useDataValidator = () => {
  // we don't really use the context but it allows us to ~check we're under BrainToolErrorHandler
  const context = use(BrainContext);
  if (!context) {
    throw new Error('useDataValidator must be used within a BrainContextProvider');
  }

  const dataValidator = use(getDataValidator());

  return dataValidator;
};
