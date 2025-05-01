import { Card } from '../Card';
import { CardNavigation } from '../CardNavigation';
import { CardId } from '../../../types/Card/ICard';
import { useDeckContext } from './../Deck/useDeckContext';

export const Deck = ({}) => {
  const context = useDeckContext();

  const handleClickCard = (cardId: CardId) => {
    context.selectCard(cardId, true);
  };

  const currentCardData = context.deck.cards.find((card) => card.id === context.currentCardId);

  if (!currentCardData) return <></>;

  return (
    <>
      <div className="flex justify-center py-4">
        <CardNavigation disableBackToTop={currentCardData.id === context.deck.cards[0].id} />
      </div>
      <div className="relative flex-grow">
        <Card card={currentCardData} handleClickCard={handleClickCard} />
      </div>
    </>
  );
};
