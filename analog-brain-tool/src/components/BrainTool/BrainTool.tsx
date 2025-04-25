import { Deck } from './Deck';
import { useTranslation } from 'react-i18next';
import { useBrainContext } from './store/useBrainContext';
import { useAppContext } from '../../appContext/useAppContext';
import { useDeckManager } from '../../decks/useDeckManager';

export const BrainTool = () => {
  const appContext = useAppContext();
  const brainContext = useBrainContext();
  const { t } = useTranslation();
  const deckManager = useDeckManager();

  console.debug(`Rendering BrainTool with set manager loaded url ${deckManager.loadedUrl}`);

  const lang = appContext.language;

  // this should already be checked and prevented by BrainContext
  const availableSets = deckManager.getAvailableSets(lang);
  if (!availableSets) {
    const error = `'No available decks for language ${lang}`;
    console.error(error);
    throw Error(error);
  }

  const handleSelectSet = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (availableSets === undefined) return;

    const id: string = event.target.value;

    const set = availableSets.find((set) => set.id === id);
    if (set === undefined) {
      console.error('BrainTool: Could not find set with id ' + id);
      return;
    }

    brainContext.selectSet(set.id);
  };

  const deck = brainContext.currentSet;
  const currentDeckId = deck?.id;
  const hasErrors = deckManager.errors.length > 0 ? true : undefined;

  return (
    <>
      <div>
        <span>{t('tool.deck')}: </span>
        <select
          onChange={handleSelectSet}
          defaultValue={currentDeckId}
          className="my-4 p-1 border rounded bg-white dark:bg-slate-900"
        >
          {availableSets &&
            Object.values(availableSets).map((set) => {
              return (
                <option key={set.title} value={set.id}>
                  {set.title}
                </option>
              );
            })}
        </select>
        {hasErrors && (
          <span className="ml-2 text-yellow-500" title={t('tool.errors.warnErrors')}>
            ⚠️
          </span>
        )}
        {deck?.description && <div>Description: {deck.description}</div>}
      </div>
      {deck && <Deck deck={deck}></Deck>}
    </>
  );
};
