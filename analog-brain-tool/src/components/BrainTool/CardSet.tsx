import { FC, useContext, useEffect, useState } from 'react';
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
  const [currentCardId, setCurrentCardId] = useState<CardId>(set.cards[0].id);
  useEffect(() => {
    brainContext.selectCard(set.cards[0].id);
  }, [set.cards]); // Empty dependency array -> runs only once when the component mounts

  const handleClickPrevious = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    brainContext.popPreviousCard(); // pop current card
    const previousId = brainContext.getPreviousCard();
    if (previousId) handleSelectCard(event, previousId, true, false);
  };

  function handleSelectCard(
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: CardId,
    scrollTo: boolean,
    pushHistory: boolean,
  ) {
    event.stopPropagation(); // don't click on the whole card if we're clicking on a specific card item
    if (pushHistory) brainContext.selectCard(id);

    if (id) {
      const element = document.getElementById(id);
      if (element) {
        if (scrollTo) element.scrollIntoView({ behavior: 'smooth' });

        setCurrentCardId(id);
        console.debug('Selected card ' + id);
      } else {
        console.debug(`Element with id '${id}' not found`);
      }
    } else {
      console.debug('No id provided');
    }
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
            <CardSelector key={`${card.id}-selector`} handleClickPrevious={handleClickPrevious} />
          )}
        </div>
      ))}
    </div>
  );
};

export default CardSetComponent;
