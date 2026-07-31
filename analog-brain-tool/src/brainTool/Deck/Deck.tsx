import { Card } from '../Card/Card';
import { useDeckContext } from './useDeckContext';
import { useTranslation } from 'react-i18next';
import { RotateCcw, CircleX, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBrainContext } from '../store/useBrainContext';
import { SimpleIconButton } from '../../components/SimpleIconButton';
import { useNavigate } from 'react-router';
import { DeckNavigationButton } from './DeckNavigationButton';
import { getCardPath } from '../routing/routePaths';

export const Deck = () => {
  const navigate = useNavigate();

  const context = useDeckContext();
  const brainContext = useBrainContext();
  const { t } = useTranslation();

  const currentCardData = context.deck.cards.find((card) => card.id === context.currentCardId);
  if (currentCardData === undefined) {
    console.error('Deck: Card not found in deck', context.currentCardId, context.deck.cards);
  }

  const handleClickClose = () => {
    brainContext.closeDeck();
    navigate('/');
  };

  const handleClickReset = () => {
    const firstCardId = context.resetHistory();
    navigate(getCardPath(context.deck.id, firstCardId), { replace: true });
  };

  const handlePrevious = () => {
    const previousCardId = context.popCurrentCard();
    if (previousCardId) navigate(-1);
  };

  const handleNext = () => {
    //NYI
  };

  const previousDisabled = !context.hasCardHistory;
  const nextDisabled = true; //NYI

  return (
    <>
      <div className="m-2 gap-2">
        <SimpleIconButton handleClick={handleClickClose} label={t('tool.deck.close')} icon={CircleX} />
        <SimpleIconButton
          handleClick={handleClickReset}
          label={t('tool.deck.reset')}
          icon={RotateCcw}
          disabled={!context.canReset}
        />
      </div>
      <div className="flex flex-grow w-full mb-4">
        <DeckNavigationButton
          onClick={previousDisabled ? undefined : handlePrevious}
          label={t('tool.deck.previous')}
          disabled={previousDisabled}
          icon={ChevronLeft}
        />
        <div className="flex-1">
          <Card card={currentCardData} />
        </div>
        <DeckNavigationButton
          onClick={nextDisabled ? undefined : handleNext}
          label={t('tool.deck.next')}
          disabled={nextDisabled}
          icon={ChevronRight}
        />
      </div>
    </>
  );
};
