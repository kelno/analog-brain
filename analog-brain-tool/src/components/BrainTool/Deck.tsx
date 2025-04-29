import { FC } from 'react';
import { IDeck } from '../../types/Deck/IDeck';
import { Card } from './Card';
import { CardNavigation } from './CardNavigation';
import { CardId } from '../../types/Card/ICard';
import { useBrainContext } from './store/useBrainContext';

interface DeckProps {
  deck: IDeck;
}

export const Deck: FC<DeckProps> = ({ deck }) => {
  const context = useBrainContext();

  const handleClickCard = (cardId: CardId, isPrevious: boolean) => {
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

  const currentCardData = deck.cards.find((card) => card.id === context.currentCardId);

  if (!currentCardData) return <></>;

  return (
    <>
      {/* We take at least the whole screen, but maybe more*/}
      <div className="mx-8 mb-8 flex flex-grow flex-col relative">
        <div className="flex justify-center py-4">
          <CardNavigation
            handleClickPrevious={handleClickPrevious}
            handleClickBackToTop={handleClickBackToTop}
            disableBackToTop={currentCardData.id === deck.cards[0].id}
          />
        </div>
        <div className="relative flex-grow">
          <Card card={currentCardData} handleClickCard={handleClickCard} />
        </div>
      </div>
    </>
  );
};
