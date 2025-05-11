import { Deck } from './Deck/Deck';
import { useBrainContext } from './store/useBrainContext';
import { DeckContextProvider } from './Deck/DeckContextProvider';
import { DeckSelection } from './DeckSelection';

export const BrainTool = () => {
  const brainContext = useBrainContext();

  console.debug(`Rendering BrainTool`);

  return (
    <div className="relative min-h-full flex">
      {/* We take at least the whole screen, but maybe more*/}
      <div className="flex flex-grow flex-col relative min-h-full ">
        {!brainContext.currentDeck && <DeckSelection />}
        {brainContext.currentDeck && (
          <DeckContextProvider deck={brainContext.currentDeck}>
            <Deck />
          </DeckContextProvider>
        )}
      </div>
    </div>
  );
};
