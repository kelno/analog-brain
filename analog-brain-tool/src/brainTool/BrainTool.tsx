import { Deck } from './Deck/Deck';
import { DeckContextProvider } from './Deck/DeckContextProvider';
import { Route, Routes } from 'react-router';
import { DeckSelection } from './Deck/DeckSelection';

export const BrainTool = () => {
  console.debug(`Rendering BrainTool`);

  return (
    <Routes>
      <Route path="/" element={<DeckSelection />} />
      <Route
        path="/deck/:deckId"
        element={
          <DeckContextProvider>
            <Deck />
          </DeckContextProvider>
        }
      />
    </Routes>
  );
};
