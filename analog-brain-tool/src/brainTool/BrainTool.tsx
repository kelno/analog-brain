import { Deck } from './Deck/Deck';
import { DeckContextProvider } from './Deck/DeckContextProvider';
import { Route, Routes } from 'react-router';
import { DeckSelection } from './Deck/DeckSelection';
import { RouteFallback } from './routing/RouteFallback';
import { useTranslation } from 'react-i18next';
import { CARD_ROUTE_PATH, DECK_ROUTE_PATH } from './routing/routePaths';

const DeckRoute = () => (
  <DeckContextProvider>
    <Deck />
  </DeckContextProvider>
);

export const BrainTool = () => {
  const { t } = useTranslation();

  console.debug(`Rendering BrainTool`);

  return (
    <Routes>
      <Route path="/" element={<DeckSelection />} />
      <Route path={DECK_ROUTE_PATH} element={<DeckRoute />} />
      <Route path={CARD_ROUTE_PATH} element={<DeckRoute />} />
      <Route
        path="*"
        element={
          <RouteFallback title={t('routing.notFoundTitle')}>
            {t('routing.notFoundMessage')}
          </RouteFallback>
        }
      />
    </Routes>
  );
};
