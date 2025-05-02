import { Card } from '../Card';
import { useDeckContext } from './../Deck/useDeckContext';
import { useTranslation } from 'react-i18next';
import { RotateCcw, CircleX, ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';
import { useBrainContext } from '../store/useBrainContext';
import { SimpleIconButton } from '../../SimpleIconButton';

interface DeckNavigationButtonProps {
  onClick?: () => void;
  label: string;
  icon: LucideIcon;
  disabled: boolean;
}

const DeckNavigationButton = ({ onClick, label, icon: Icon, disabled }: DeckNavigationButtonProps) => (
  <button
    onClick={disabled ? undefined : onClick}
    className={`h-full transition-colors align-stretch rounded-xl [&>svg]:scale-y-[3] ${
      disabled ? 'cursor-default opacity-50' : 'cursor-pointer hover:bg-brain-secondary'
    }`}
    aria-label={label}
    disabled={disabled}
  >
    <Icon size={50} />
  </button>
);

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

  const previousDisabled = !context.hasCardHistory;
  const nextDisabled = true; //NYI

  return (
    <>
      <div className="absolute top-2 left-2 flex gap-2">
        {context.hasCardHistory ? (
          <SimpleIconButton handleClick={handleClickReset} label={t('tool.deck.reset')} icon={RotateCcw} />
        ) : (
          <SimpleIconButton handleClick={handleClickClose} label={t('tool.deck.close')} icon={CircleX} />
        )}
      </div>
      <div className="flex w-full min-h-full mt-12">
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
