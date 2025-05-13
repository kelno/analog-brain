import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../appContext/useAppContext';
import { useDeckManager } from '../../deckManager/useDeckManager';
import { languagesInfos } from '../../language/languageInfo';
import { IDeck } from '../../types/Deck';
import { processTextContent } from '../../utils/TextProcessing';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router';

interface DeckSelectionProps extends Record<never, never> {}

export const DeckSelection: FC<DeckSelectionProps> = () => {
  const appContext = useAppContext();
  const { t } = useTranslation();
  const deckManager = useDeckManager();
  const navigate = useNavigate(); // Initialize useNavigate

  const [invalidSelection, setInvalidSelection] = useState(false);

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

  const hasWarnings = deckManager.errors.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeckInfo) {
      setInvalidSelection(true);
      return;
    }
    navigate(`/deck/${selectedDeckInfo.id}`); // Navigate to the selected deck
  };

  return (
    <section
      className="flex flex-col min-h-full w-full justify-center items-center"
      aria-labelledby={t('tool.deck.deckSelectionTitle')}
    >
      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="mx-4 min-w-3/4 md:min-w-2xl lg:min-w-3xl">
          <div className="my-4">
            <div className="flex flex-col gap-4">
              <div className="text-xl flex flex-wrap items-center">
                <label htmlFor="deck-selector" className="mr-2">
                  {t('tool.deck.choosePrompt')}
                </label>
                <div className="flex items-center">
                  <select
                    id="deck-selector"
                    onChange={handleSelectDeck}
                    className="py-1 px-2 border rounded-2xl shadow-md"
                    defaultValue={selectedDeckInfo?.id ?? ''}
                    aria-errormessage="selectError"
                    aria-required
                    aria-invalid={invalidSelection}
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
                  {hasWarnings && (
                    <span className="ml-2 text-yellow-500" aria-label={t('tool.errors.warnErrors')}>
                      ⚠️
                    </span>
                  )}
                </div>
              </div>
              {invalidSelection ? <div id="selectError">Invalid selection</div> : undefined}
            </div>
          </div>

          <article
            className="border rounded-lg p-4 shadow-md flex flex-col space-y-1"
            aria-labelledby="selected-deck-title"
          >
            {selectedDeckInfo && (
              <>
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
              </>
            )}
            <Button type="submit" className="font-bold mt-4">
              {t('tool.deck.start')}
            </Button>
          </article>
        </div>
      </form>
    </section>
  );
};
