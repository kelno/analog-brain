import { Card } from '../Card';
import { useDeckContext } from './useDeckContext';
import { useTranslation } from 'react-i18next';
import { RotateCcw, CircleX, ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';
import { useBrainContext } from '../store/useBrainContext';
import { SimpleIconButton } from '../../components/SimpleIconButton';
import { useParams } from 'react-router-dom';
import { BrainToolError, BrainToolErrorType } from '../BrainToolErrorHandler';

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

export const Deck = () => {
  const { id } = useParams();
  if (id === undefined)
    throw new BrainToolError('No id provided for Deck', BrainToolErrorType.DECK_NO_ID_PROVIDED);

  const context = useDeckContext(id);
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
      <div className="m-2 gap-2">
        <SimpleIconButton handleClick={handleClickClose} label={t('tool.deck.close')} icon={CircleX} />
        <SimpleIconButton
          handleClick={handleClickReset}
          label={t('tool.deck.reset')}
          icon={RotateCcw}
          disabled={!context.hasCardHistory}
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
