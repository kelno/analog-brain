import { useCardSets } from "../cardSets/useCardSets";

export const useAvailableLanguages = () => {
  const cardSetStorage = useCardSets();
  const availableSets = cardSetStorage.getAvailableSetsPerLanguage();
  return Object.keys(availableSets);
};

