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

  console.debug(`Rendering BrainTool with deck manager loaded url ${deckManager.loadedUrl}`);

  const lang = appContext.language;

  // this should already be checked and prevented by BrainContext
  const availableDecks = deckManager.getAvailableDecks(lang);
  if (!availableDecks) {
    const error = `'No available decks for language ${lang}`;
    console.error(error);
    throw Error(error);
  }

  const handleSelectDeck = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (availableDecks === undefined) return;

    const id: string = event.target.value;

    const deck = availableDecks.find((deck) => deck.id === id);
    if (deck === undefined) {
      console.error('BrainTool: Could not find deck with id ' + id);
      return;
    }

    brainContext.selectDeck(deck.id, true);
  };

  //TODO: Have a deck selection here, making this a dropdown to select one, see the info, then have a button to confirm that's the one we want

  const deck = brainContext.currentDeck;
  const currentDeckId = deck?.id;
  const hasErrors = deckManager.errors.length > 0 ? true : undefined;

  const renderDeckSelection = () => (
    <div>
      <span>{t('tool.deck.title')}: </span>
      <select onChange={handleSelectDeck} defaultValue={currentDeckId} className="my-4 p-1 border rounded">
        {availableDecks &&
          Object.values(availableDecks).map((deck) => {
            return (
              <option key={deck.title} value={deck.id}>
                {deck.title}
              </option>
            );
          })}
      </select>
      {hasErrors && (
        <span className="ml-2 text-yellow-500" title={t('tool.errors.warnErrors')}>
          ⚠️
        </span>
      )}
      {deck?.description && (
        <div>
          {' '}
          {t('tool.deck.description')} {deck.description}
        </div>
      )}
      {deck?.author && (
        <div>
          {t('tool.deck.author')} {deck.author}
        </div>
      )}
    </div>
  );

  return (
    <div className="relative min-h-full flex">
      {!deck && renderDeckSelection()}
      {deck && (
        <>
          {' '}
          <button
            onClick={() => brainContext.closeDeck()}
            className="absolute top-2 left-2 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
            title="Close deck"
          >
            ✕
          </button>
          <Deck deck={deck} />
        </>
      )}
    </div>
  );
};
