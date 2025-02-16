import { FC, RefAttributes } from 'react';
import ICard, { CardId } from '../../interfaces/ICard';

interface CardProps extends RefAttributes<HTMLDivElement> {
  card: ICard;
  handleSelectCard: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: CardId,
    scrollTo: boolean,
    pushHistory: boolean,
  ) => void;
}

const Card: FC<CardProps> = ({ card, handleSelectCard, ref }) => {
  return (
    <div
      ref={ref}
      className="flex-1 p-4 border rounded-2xl shadow-md"
      id={card.id}
      onClick={(e) => handleSelectCard(e, card.id, false, true)}
    >
      <div className="float-right text-xs">{card.id}</div>
      <h2 className="text-xl font-bold">{card.title}</h2>
      <ul className="mt-2">
        {card.items.map((carditem, index) => (
          <li
            key={index}
            className={`ml-1 ${carditem.nextCardId ? 'cursor-pointer' : ''}`} // Add cursor-pointer if there is a nextCardId
            onClick={(e) => carditem.nextCardId && handleSelectCard(e, carditem.nextCardId, true, true)} // Makes the whole line clickable
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
