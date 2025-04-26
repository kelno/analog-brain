import { FC } from 'react';
import { CardId, ICardItem } from '../../interfaces/ICard';

interface CardItemProps {
  carditem: ICardItem;
  handleClickCard: (id: CardId, isPrevious: boolean) => void;
}

export const CardItem: FC<CardItemProps> = ({ carditem, handleClickCard }) => {
  const isClickable = !!carditem.nextCardId;

  //DeckManager.getCardInDeckById(yay, carditem.nextCardId);
  const linkedCardName = carditem.nextCardId ? carditem.nextCardId : 'No linked card'; //NYI
  const tooltipText = isClickable ? `Click to navigate to ${linkedCardName}` : undefined;

  const handleClick = (event: React.MouseEvent) => {
    if (isClickable) {
      event.stopPropagation(); // Prevent the click event from bubbling up to the parent card
      handleClickCard(carditem.nextCardId!, false);
    }
  };

  return (
    <li
      className={`p-2 border ${isClickable ? 'rounded cursor-pointer hover:bg-gray-200' : 'border-dashed'}`}
      style={{ borderColor: carditem.borderColor || 'inherit' }}
      onClick={handleClick}
      aria-label={tooltipText}
      title={tooltipText}
    >
      <p>{carditem.text}</p>
      {/* {isClickable && (
        <span>
          {' '}
          {' ➜ '}({carditem.nextCardId})
        </span>
      )} */}
    </li>
  );
};
