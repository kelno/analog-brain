import { Deck } from './Deck/Deck';
import { useTranslation } from 'react-i18next';
import { useBrainContext } from './store/useBrainContext';
import { DeckContextProvider } from './Deck/DeckContextProvider';
import { DeckSelection } from './DeckSelection';

export const BrainTool = () => {
  const brainContext = useBrainContext();
  const { t } = useTranslation();

  console.debug(`Rendering BrainTool`);

  return (
    <div className="relative min-h-full flex">
      {/* We take at least the whole screen, but maybe more*/}
      <div className="mx-8 mb-8 flex flex-grow flex-col relative">
        {!brainContext.currentDeck && <DeckSelection />}
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
    </div>
  );
};
