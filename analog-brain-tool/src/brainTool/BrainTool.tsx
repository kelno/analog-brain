import { Deck } from './Deck/Deck';
import { useBrainContext } from './store/useBrainContext';
import { DeckContextProvider } from './Deck/DeckContextProvider';
import { DeckSelection } from './DeckSelection';
import { Route, Routes } from 'react-router-dom';

export const BrainTool = () => {
  const brainContext = useBrainContext();

  console.debug(`Rendering BrainTool`);

  // url can be deck/<deck_name>
  // some checks to do?

  return (
    <div className="relative min-h-full flex">
      {/* We take at least the whole screen, but maybe more*/}
      <div className="flex flex-grow flex-col relative min-h-full ">
        <Routes>
          <Route path="/" element={<DeckSelection />} />
          <Route
            path="/deck/:id"
            element={
              brainContext.currentDeck && (
                <DeckContextProvider deck={brainContext.currentDeck}>
                  <Deck />
                </DeckContextProvider>
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};
