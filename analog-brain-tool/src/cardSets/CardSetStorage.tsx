import { useState, useEffect } from 'react';
import { ICardSet, SetId } from '../interfaces/ICardSet';
import { LangId } from '../store/BrainContextData';
import { useSettings } from '../hooks/useSettings';
import { toast } from 'sonner';
import useDataValidator from '../hooks/useDataValidator';

export const useCardSetStorage = () => {
  const { indexUrl } = useSettings();
  const [loadingUrl, setLoadingUrl] = useState('');
  const [loadedURL, setLoadedURL] = useState('');
  const [availableSetsPerLanguage, setAvailableSetsPerLanguage] = useState<
    Record<LangId, Readonly<ICardSet[]>>
  >({});
  const { validateCardSet } = useDataValidator();

  const loadCardSets = async () => {
    console.debug(`Loading card sets from ${indexUrl}`);
    try {
      const response = await fetch(indexUrl, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to fetch index file, with response ${response}`);
      }

      const indexData = await response.json();
      const cardSets: ICardSet[] = [];

      // Get the base URL from the index file location
      const baseUrl = indexUrl.substring(0, indexUrl.lastIndexOf('/') + 1);

      for (const fileName of indexData.files) {
        try {
          const response = await fetch(`${baseUrl}${fileName}`, { cache: 'no-store' });
          if (!response.ok) {
            throw new Error(`Failed to fetch card set ${fileName}`);
          }
          const cardSet = (await response.json()) as ICardSet;
          const result = validateCardSet(cardSet);
          if (result.isValid === false) {
            console.error(
              `Invalid card set in database: ${cardSet.title} (id: ${cardSet.id}). Error: ${result.errorMessage}`,
            );
            continue;
          }
          cardSets.push(cardSet);
        } catch (error) {
          console.error(`Error loading card set ${fileName}: ${error}`);
        }
      }

      const newSets = cardSets.reduce((acc, set) => {
        if (!acc[set.lang]) acc[set.lang] = [];
        if (set.isDefaultForLanguage) acc[set.lang].unshift(set);
        else acc[set.lang].push(set);
        return acc;
      }, {} as Record<LangId, ICardSet[]>);

      setAvailableSetsPerLanguage(newSets);
    } catch (error) {
      setAvailableSetsPerLanguage({});
      console.error(`Error loading card sets from URL ${indexUrl}: ${error}`);
      toast.error(`Error loading card sets from URL ${indexUrl}`);
    }
    setLoadedURL(indexUrl);
  };

  useEffect(() => {
    if (loadingUrl !== indexUrl && indexUrl !== loadedURL) {
      setLoadingUrl(indexUrl);
      loadCardSets();
    }
  }, [indexUrl, loadingUrl, loadedURL]);

  return {
    get loadedURL(): string {
      return loadedURL;
    },
    getAvailableSets: (lang: LangId): Readonly<ICardSet[]> | undefined => {
      return availableSetsPerLanguage[lang];
    },
    getSetById: (lang: LangId, id: SetId): ICardSet | undefined => {
      return availableSetsPerLanguage[lang]?.find((set) => set.id === id);
    },
    getDefaultSetForLanguage: (lang: LangId): ICardSet | undefined => {
      return availableSetsPerLanguage[lang]?.[0];
    },
    getAvailableSetsPerLanguage: () => availableSetsPerLanguage,
  };
};
