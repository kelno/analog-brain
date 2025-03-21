import { useCardSetStorage } from '../cardSets/CardSetStorage';

export const useAvailableLanguages = () => {
  const cardSetStorage = useCardSetStorage();
  const availableSets = cardSetStorage.getAvailableSetsPerLanguage();
  return Object.keys(availableSets);
};

