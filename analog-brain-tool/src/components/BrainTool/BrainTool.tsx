import { Deck } from './Deck/Deck';
import { useTranslation } from 'react-i18next';
import { useBrainContext } from './store/useBrainContext';
import { useAppContext } from '../../appContext/useAppContext';
import { useDeckManager } from '../../decks/useDeckManager';
import { DeckContextProvider } from './Deck/DeckContextProvider';
import { useState } from 'react';
import { IDeck } from '../../types/Deck';
import { languagesInfos } from '../../language/languageInfo';

export const BrainTool = () => {
  const appContext = useAppContext();
  const brainContext = useBrainContext();
  const { t } = useTranslation();
  const deckManager = useDeckManager();

  console.debug(`Rendering BrainTool with deck manager loaded url ${deckManager.loadedUrl}`);

  const lang = appContext.language;
  const languageName = languagesInfos[lang]?.name ?? lang;

  const availableDecks = deckManager.getAvailableDecks(lang);

  const defaultDeck = availableDecks && availableDecks.length > 0 ? availableDecks[0] : null;
  const [selectedDeckInfo, setSelectedDeckInfo] = useState<IDeck | null>(defaultDeck);

  const handleSelectDeck = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (availableDecks === undefined) return;

    const id: string = event.target.value;

    const deck = availableDecks.find((deck) => deck.id === id);
    if (deck === undefined) {
      console.error('BrainTool: Could not find deck with id ' + id);
      return;
    }

    setSelectedDeckInfo(deck);
  };

  const hasErrors = deckManager.errors.length > 0;

  const renderDeckSelection = () => (
    <div className="p-4">
      <div className="mb-4">
        <span>{t('tool.deck.title')}: </span>
        <select
          onChange={handleSelectDeck}
          className="my-4 p-1 border rounded"
          defaultValue={selectedDeckInfo?.id ?? ''}
        >
          {!availableDecks && (
            <option value="" disabled>
              {t('tool.errors.noDecksForLanguage', { lang: languageName })}
            </option>
          )}
          {availableDecks &&
            availableDecks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.title}
              </option>
            ))}
        </select>
        {hasErrors && (
          <span className="ml-2 text-yellow-500" title={t('tool.errors.warnErrors')}>
            ⚠️
          </span>
        )}
      </div>

      {selectedDeckInfo && (
        <div className="border p-4 rounded">
          <h3 className="font-bold mb-2">{selectedDeckInfo.title}</h3>
          {selectedDeckInfo.description && (
            <div className="mb-2">
              <strong>{t('tool.deck.description')}</strong> {selectedDeckInfo.description}
            </div>
          )}
          {selectedDeckInfo.author && (
            <div className="mb-4">
              <strong>{t('tool.deck.author')}</strong> {selectedDeckInfo.author}
            </div>
          )}
          <button
            onClick={() => brainContext.selectDeck(selectedDeckInfo.id, true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {t('tool.deck.start')}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative min-h-full flex">
      {!brainContext.currentDeck && renderDeckSelection()}
      {brainContext.currentDeck && (
        <>
          <button
            onClick={() => brainContext.closeDeck()}
            className="absolute top-2 left-2 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
            title={t('tool.deck.close')}
          >
            ✕
          </button>
          <DeckContextProvider deck={brainContext.currentDeck}>
            <Deck />
          </DeckContextProvider>
        </>
      )}
    </div>
  );
};
