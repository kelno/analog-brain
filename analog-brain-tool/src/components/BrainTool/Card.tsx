import { FC } from 'react';
import ICard from '../../interfaces/ICard';

interface CardProps {
  card: ICard;
  handleGoTo: (id?: string) => void;
}

const Card: FC<CardProps> = ({ card, handleGoTo }) => {
  return (
    <div className="p-4 border rounded-2xl shadow-md mb-4" id={card.id}>
      <div className="float-right text-xs">{card.id}</div>
      <h2 className="text-xl font-bold">{card.title}</h2>
      <ul className="mt-2">
        {card.items.map((carditem, index) => (
          <li
            key={index}
            className={`ml-4 ${carditem.nextCardId ? 'cursor-pointer' : ''}`} // Add cursor-pointer if there is a nextCardId
            onClick={() => carditem.nextCardId && handleGoTo(carditem.nextCardId)} // Makes the whole line clickable
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
      <a className="mt-4 text-blue-500 cursor-pointer" href="#tool">
        - Back to top -
      </a>
    </div>
  );
};

export default Card;
