import { FC, useContext } from 'react';
import ICardSet from '../../interfaces/ICardSet';
import Card from './Card';
import CardNavigation from './CardNavigation';
import BrainContext from '../../store/BrainContext';
import { CardId } from '../../interfaces/ICard';
import DataValidator from '../../utils/DataValidator';

interface CardSetProps {
  cardSet: ICardSet;
}

const CardSet: FC<CardSetProps> = ({ cardSet }) => {
  const context = useContext(BrainContext);

  const previousCardId = context.getPreviousCard();

  if (!DataValidator.validateCardSet(cardSet))
    return (
      <div className="py-6">Found invalid data within the card set. Check console for more information.</div>
    );

  const handleClickCard = (cardId: CardId, isPrevious: boolean) => {
    console.log('click');
    if (isPrevious) context.popCurrentCard();
    else context.selectCard(cardId, true);
  };

  const handleClickPrevious = () => {
    console.log('Click previous');
    context.popCurrentCard();
  };

  const handleClickBackToTop = () => {
    context.resetHistory();
  };

  const currentCardData = cardSet.cards.find((card) => card.id === context.currentCard);
  const previousCardData = cardSet.cards.find((card) => card.id === previousCardId);

  if (!currentCardData) return <></>;

  return (
    <div
      className="mx-8 py-20 mt-[var(--previous-card-offset-y)] flex flex-col-reverse"
      style={{ height: 'calc(100vh - var(--spacing-header))' }}
    >
      <div className="flex-none">
        <div className="flex justify-center py-4">
          <CardNavigation
            handleClickPrevious={handleClickPrevious}
            handleClickBackToTop={handleClickBackToTop}
            disableBackToTop={currentCardData.id === cardSet.cards[0].id}
          />
        </div>
      </div>
      <div className="relative flex-col flex-auto">
        {previousCardData && (
          <div
            id="previousCard"
            className="absolute transform -translate-x-6 -translate-y-[var(--previous-card-offset-y)] opacity-50 w-full h-full"
          >
            <Card card={previousCardData} handleClickCard={handleClickCard} isPrevious />
          </div>
        )}
        <div id="currentCard" className="relative z-10 w-full h-full">
          <Card card={currentCardData} handleClickCard={handleClickCard} />
        </div>
      </div>
    </div>
  );
};

export default CardSet;
