import { useCardSets } from "../cardSets/useCardSets";
import { BrainToolError } from "../components/BrainTool/BrainToolErrorHandler";

// can throw
export const useAvailableLanguages = () => {
  let cardSetStorage;
  try {
    cardSetStorage = useCardSets();
  } catch (errorOrPromise) {
    // If it's an error, we should just use the availableLanguages in it's default state
    if (errorOrPromise instanceof BrainToolError)
      console.debug(
        `useAvailableLanguages couldn't get available languages. This is expected if sets are not yet loaded.`,
      );
    // if it's a promise, this is normal behavior too and can be passed up
    else throw errorOrPromise;
  }


  const availableSets = cardSetStorage?.getAvailableSetsPerLanguage();
  const fallbackLanguage = 'en';
  return availableSets ? Object.keys(availableSets) : [ fallbackLanguage ]; 
};

