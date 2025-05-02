import { Card } from '../Card';
import { useDeckContext } from './../Deck/useDeckContext';
import { useTranslation } from 'react-i18next';
import { RotateCcw, CircleX, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBrainContext } from '../store/useBrainContext';
import { SimpleIconButton } from '../../SimpleIconButton';

export const Deck = ({}) => {
  const context = useDeckContext();
  const brainContext = useBrainContext();
  const { t } = useTranslation();

  const currentCardData = context.deck.cards.find((card) => card.id === context.currentCardId);
  if (currentCardData === undefined) {
    console.error('Deck: Card not found in deck', context.currentCardId, context.deck.cards);
  }

  const handleClickClose = () => {
    brainContext.closeDeck();
  };

  const handleClickReset = () => {
    context.resetHistory();
  };

  const handlePrevious = () => {
    context.popCurrentCard();
  };

  const handleNext = () => {
    //NYI
  };

  return (
    <>
      <div className="absolute top-2 left-2 flex gap-2">
        {context.hasCardHistory ? (
          <SimpleIconButton handleClick={handleClickReset} label={t('tool.deck.reset')} icon={RotateCcw} />
        ) : (
          <SimpleIconButton handleClick={handleClickClose} label={t('tool.deck.close')} icon={CircleX} />
        )}
      </div>
      <SimpleIconButton
        handleClick={handlePrevious}
        label={t('tool.deck.previous')}
        icon={ChevronLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2"
        disabled={!context.hasCardHistory}
      />
      <div className="relative flex-grow m-8 mt-12">
        <Card card={currentCardData} />
      </div>
      <SimpleIconButton
        handleClick={handleNext}
        label={t('tool.deck.next')}
        icon={ChevronRight}
        className="absolute right-0 top-1/2 -translate-y-1/2"
      />
    </>
  );
};
