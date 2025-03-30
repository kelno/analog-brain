import { useState, ReactNode } from 'react';
import { BrainContextData, BrainContextState, LangId } from './BrainContextData';
import { BrainContext } from './BrainContext';
import { Stack } from '@datastructures-js/stack';
import { CardId } from '../../../interfaces/ICard';
import { UrlManager } from '../../../utils/UrlManager/UrlManager';
import { UrlParams } from '../../../utils/UrlManager/UrlParams';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { BrainToolError, BrainToolErrorType } from '../BrainToolErrorHandler';
import { useCardSets } from '../../../cardSets/useCardSets';
import { AppContextData } from '../../../appContext/AppContextData';
import { useAppContext } from '../../../appContext/useAppContext';

export const BrainContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cardSetStorage = useCardSets();
  const appContext = useAppContext();

  // We recreate the brain context every time sets or lang changes
  const key = `${cardSetStorage.lastUpdateId}_${appContext.language}`;

  return (
    <BrainContextCore cardSetStorage={cardSetStorage} appContext={appContext} key={key}>
      {children}
    </BrainContextCore>
  );
};

// can throw
// This provider will generate a fresh new context every time it's re rendered
export const BrainContextCore: React.FC<{
  children: ReactNode;
  appContext: AppContextData;
  cardSetStorage: ReturnType<typeof useCardSets>;
}> = ({ children, appContext, cardSetStorage }) => {
  const { t } = useTranslation();
  const lang = appContext.language;

  const validateSetFromUrl = (lang: LangId, urlCardSetId: string) => {
    if (urlCardSetId) {
      const set = cardSetStorage.getSetById(lang, urlCardSetId);
      if (!set) {
        console.log(
          `BrainContextProvider: Trying to load set ${urlCardSetId} from URL but couldn't find it for language ${lang}`,
        );
      }
      return set;
    }
    return undefined;
  };

  const urlCurrentCard = UrlManager.consumeParam(UrlParams.CARD);
  const urlCardSetId = UrlManager.consumeParam(UrlParams.SET);

  const defaultSetForLanguage = cardSetStorage.getDefaultSetForLanguage(lang);
  if (!defaultSetForLanguage) {
    const availableSets = cardSetStorage.getAvailableSetsPerLanguage();
    if (Object.keys(availableSets).length === 0) {
      const error = 'Could not find any available sets, cant start BrainContext';
      throw new BrainToolError(error, BrainToolErrorType.FAILED_NO_VALID_SETS);
    }

    const fallbackLanguage = Object.keys(availableSets)[0];
    const error = `No default set for language ${lang}. Falling back to ${fallbackLanguage}`;
    console.error(error);
    toast.error(t('toast.noCardSetsForLang', { lang }));
    appContext.setLanguage(fallbackLanguage);
    throw new Error(error);
    // we'll be redrawn when the language changes
  }

  const setFromURL = urlCardSetId ? validateSetFromUrl(lang, urlCardSetId) : undefined;
  const defaultSet = setFromURL ?? defaultSetForLanguage;

  const urlCard = setFromURL ? urlCurrentCard : null;
  const defaultCardId = urlCard ?? defaultSet.cards[0].id;

  const [brainState, setBrainState] = useState<BrainContextState>({
    cardHistory: new Stack<CardId>([defaultCardId]),
    currentSetId: defaultSet.id,
  });

  const brainContext: BrainContextData = new BrainContextData(
    brainState,
    setBrainState,
    cardSetStorage,
    lang,
  );

  return <BrainContext.Provider value={brainContext}>{children}</BrainContext.Provider>;
};
