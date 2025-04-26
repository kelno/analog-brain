import { FC } from 'react';
import { CardId, ICardItem } from '../../types/Card/ICard';
import { DeckUtils } from '../../types/Deck';
import { useBrainContext } from './store/useBrainContext';
import { useTranslation } from 'react-i18next';

interface CardItemProps {
  carditem: ICardItem;
  handleClickCard: (id: CardId, isPrevious: boolean) => void;
}

export const CardItem: FC<CardItemProps> = ({ carditem, handleClickCard }) => {
  const isClickable = !!carditem.nextCardId;
  const brainContext = useBrainContext();
  const { t } = useTranslation();

  const getLinkedCardName = (cardId: CardId) => {
    const deck = brainContext.currentDeck;
    if (!deck) throw new Error('No deck found in context'); // should never happen at this point
    return DeckUtils.findCard(deck, cardId)?.title ?? 'Unknown card';
  };

  const tooltipText =
    carditem.nextCardId !== undefined
      ? t('tool.cardItem.nextCardTooltip', { cardName: getLinkedCardName(carditem.nextCardId) })
      : undefined;

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
    </li>
  );
};
