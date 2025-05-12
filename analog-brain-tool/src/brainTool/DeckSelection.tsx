import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeckManager } from '../deckManager/useDeckManager';
import { useAppContext } from '../appContext/useAppContext';
import { IDeck } from '../types/Deck';
import { languagesInfos } from '../language/languageInfo';
import { useBrainContext } from './store/useBrainContext';
import { Button } from '../components/Button';
import { processTextContent } from '../utils/TextProcessing';

interface DeckSelectionProps {}

export const DeckSelection: FC<DeckSelectionProps> = ({}) => {
  const appContext = useAppContext();
  const { t } = useTranslation();
  const deckManager = useDeckManager();
  const brainContext = useBrainContext();

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

  return (
    <section
      className="flex flex-col min-h-full w-full justify-center items-center"
      aria-labelledby={t('tool.deck.deckSelectionTitle')}
    >
      <div className="mx-4 min-w-3/4 md:min-w-2xl lg:min-w-3xl">
        <div className="text-xl my-4">
          <form onSubmit={(e) => e.preventDefault()} className="mb-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center">
                <label htmlFor="deck-selector" className="text-xl mr-2">
                  {t('tool.deck.choosePrompt')}
                </label>
                <div className="flex items-center">
                  <select
                    id="deck-selector"
                    onChange={handleSelectDeck}
                    className="py-1 px-2 border rounded-2xl shadow-md"
                    defaultValue={selectedDeckInfo?.id ?? ''}
                    aria-invalid={hasErrors}
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
                    <span className="ml-2 text-yellow-500" aria-label={t('tool.errors.warnErrors')}>
                      ⚠️
                    </span>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        {selectedDeckInfo && (
          <article
            className="border rounded-lg p-4 shadow-md flex flex-col space-y-1"
            aria-labelledby="selected-deck-title"
          >
            <h1 id="selected-deck-title" className="font-bold text-xl text-center">
              {selectedDeckInfo.title}
            </h1>

            {selectedDeckInfo.description && (
              <div className="">
                <h2 className="font-bold">{t('tool.deck.description')}</h2>
                {processTextContent(selectedDeckInfo.description)}
              </div>
            )}
            {selectedDeckInfo.author && (
              <div className="">
                <h2 className="font-bold">{t('tool.deck.author')}</h2> {selectedDeckInfo.author}
              </div>
            )}
            <Button
              handleClick={() => brainContext.selectDeck(selectedDeckInfo.id, true)}
              className="font-bold mt-4"
            >
              {t('tool.deck.start')}
            </Button>
          </article>
        )}
      </div>
    </section>
  );
};
