import { FC, useContext, useState } from 'react';
import ICardSet from '../../interfaces/ICardSet';
import Card from './Card';
import CardSelector from './CardSelector';
import BrainContext from '../../store/BrainContext';
import { CardId } from '../../interfaces/ICard';

interface CardSetProps {
  set: ICardSet;
}

const CardSetComponent: FC<CardSetProps> = ({ set }) => {
  const brainContext = useContext(BrainContext);
  const firstCardId = brainContext.getCurrentCard() ?? set.cards[0].id;
  const [currentCardId, setCurrentCardId] = useState(firstCardId);

  const handleClickPrevious = () => {
    const previousId = brainContext.popCurrentCard(); // pop current card
    if (previousId) handleSelectCard(previousId, true, false);
  };

  function handleSelectCard(cardId: CardId, scrollTo: boolean, pushHistory: boolean) {
    brainContext.selectCard(cardId, pushHistory);

    if (cardId) {
      const element = document.getElementById(cardId);
      if (element) {
        if (scrollTo) element.scrollIntoView({ behavior: 'smooth' });

        setCurrentCardId(cardId);
        window.location.hash = cardId;
        console.debug('Selected card ' + cardId);
      } else {
        console.debug(`Element with id '${cardId}' not found`);
      }
    } else {
      console.debug('No id provided');
    }
  }

  function handleClickBackToTop() {
    brainContext.clearCardHistory();
    handleSelectCard(firstCardId, true, true);
  }

  const hasDuplicateCardIds = (set: ICardSet): boolean => {
    const ids = set.cards.map((card) => card.id);
    return new Set(ids).size !== ids.length;
  };
  if (hasDuplicateCardIds(set)) {
    console.error('Duplicate card IDs found!');
    console.error(set.cards);
  }

  return (
    <div className="py-6">
      {set.cards.map((card) => (
        <div key={card.id} className="flex flex-col relative mb-14">
          <Card card={card} handleSelectCard={handleSelectCard} />
          {card.id == currentCardId && (
            <CardSelector
              key={`${card.id}-selector`}
              handleClickPrevious={handleClickPrevious}
              handleClickBackToTop={handleClickBackToTop}
              disableBackToTop={firstCardId === card.id}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CardSetComponent;
