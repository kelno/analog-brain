import { useRef, useState } from 'react';
import ICardSet from '../../interfaces/ICardSet';
import Card from './Card';
import CardSelector from './CardSelector';

interface CardSetProps {
  set: ICardSet;
}

const CardSetComponent: React.FC<CardSetProps> = ({ set }) => {
  const [currentCardId, setCurrentCard] = useState<string>(set.cards[0].id);

  const cardRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  function handleSelectCard(event: React.MouseEvent<HTMLElement, MouseEvent>, id: string, scrollTo: boolean) {
    event.stopPropagation(); // don't click on the whole card if we're clicking on a specific card item

    if (id) {
      const element = document.getElementById(id);
      if (element) {
        if (scrollTo) element.scrollIntoView({ behavior: 'smooth' });

        setCurrentCard(id);
        console.debug('Selected card ' + id);
      } else {
        console.debug(`Element with id '${id}' not found`);
      }
    } else {
      console.debug('No id provided');
    }
  }

  return (
    <div className="py-6 relative">
      {set.cards.map((card) => (
        <Card
          ref={card.id === currentCardId ? cardRef : null}
          key={card.id}
          card={card}
          handleSelectCard={handleSelectCard}
        />
      ))}
      {<CardSelector ref={selectorRef} cardRef={cardRef} />}
    </div>
  );
};

export default CardSetComponent;
