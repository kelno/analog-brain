import { FC } from 'react';
import { ICard, CardId, ICardItem } from '../../types/Card/ICard';
import { CardItem } from './CardItem';

interface CardProps {
  card: ICard;
  handleClickCard: (id: CardId) => void;
}

export const Card: FC<CardProps> = ({ card, handleClickCard }) => {
  return (
    <div
      className="flex-1 p-6 border rounded-2xl shadow-md w-full h-full"
      id={card.id}
      onClick={() => handleClickCard(card.id)}
    >
      <div className="float-right text-xs">{card.id}</div>
      <h2 className="text-xl font-bold">{card.title}</h2>
      {card.text && <p className="mt-2">{card.text}</p>}
      <ul className="mt-4 space-y-2">
        {card.items.map((carditem: ICardItem, index: number) => (
          <CardItem key={index} carditem={carditem} handleClickCard={handleClickCard} />
        ))}
      </ul>
    </div>
  );
};
