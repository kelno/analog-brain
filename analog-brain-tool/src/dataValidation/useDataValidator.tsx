//import { use } from 'react';
import { DataValidator } from './DataValidator';

const dataValidator = new DataValidator();

// can throw
export const useDataValidator = () => {
  return dataValidator;
};
