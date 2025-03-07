import { FC, RefAttributes } from 'react';
import ICard, { CardId } from '../../interfaces/ICard';

interface CardProps extends RefAttributes<HTMLDivElement> {
  card: ICard;
  handleSelectCard: (id: CardId, scrollTo: boolean, pushHistory: boolean) => void;
}

const Card: FC<CardProps> = ({ card, handleSelectCard, ref }) => {
  return (
    <div
      ref={ref}
      className="flex-1 p-4 border rounded-2xl shadow-md "
      id={card.id}
      onClick={() => handleSelectCard(card.id, false, true)}
    >
      <div className="float-right text-xs">{card.id}</div>
      <h2 className="text-xl font-bold">{card.title}</h2>
      <ul className="mt-2">
        {card.items.map((carditem, index) => (
          <li
            key={index}
            className={`ml-1 ${carditem.nextCardId ? 'cursor-pointer' : ''}`} // Add cursor-pointer if there is a nextCardId
            onClick={(e) => {
              e.stopPropagation(); // don't click on the whole card if we're clicking on a specific card item
              if (carditem.nextCardId) handleSelectCard(carditem.nextCardId, true, true);
            }}
          >
            {carditem.text}
            {carditem.nextCardId && (
              <span>
                {' ➜ '}({carditem.nextCardId})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
