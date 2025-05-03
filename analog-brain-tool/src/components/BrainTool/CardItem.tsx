import React, { FC } from 'react';
import { CardId, ICardItem } from '../../types/Card/ICard';
import { DeckUtils } from '../../types/Deck';
import { useBrainContext } from './store/useBrainContext';
import { useTranslation } from 'react-i18next';
import { processTextContent } from '../../utils/TextProcessing';

interface CardItemProps {
  carditem: ICardItem;
  handleClickCard: (id: CardId) => void;
}

export const CardItem: FC<CardItemProps> = ({ carditem, handleClickCard }) => {
  const brainContext = useBrainContext();
  const { t } = useTranslation();
  const deck = brainContext.currentDeck;
  if (!deck) throw new Error('CardItem : No deck found in context'); // should never happen at this point

  const hasLinkedCard = carditem.nextCardId !== undefined;
  const linkedCard = carditem.nextCardId ? DeckUtils.findCard(deck, carditem.nextCardId) : undefined;
  const linkedCardError = hasLinkedCard && linkedCard === undefined;
  const tooltipText = linkedCard
    ? t('tool.cardItem.nextCardTooltip', { cardName: linkedCard.title })
    : hasLinkedCard
    ? t('tool.cardItem.nextCardTooltipError')
    : undefined;
  const isClickable = linkedCard;

  const handleClick = (event: React.MouseEvent) => {
    if (isClickable) {
      event.stopPropagation(); // Prevent the click event from bubbling up to the parent card
      handleClickCard(carditem.nextCardId!);
    }
  };

  const borderColor = linkedCardError ? 'red' : carditem.borderColor || 'inherit';
  const cursor = linkedCardError ? 'cursor-not-allowed' : isClickable ? 'cursor-pointer' : undefined;

  return (
    <li
      className={`p-2 border 
        ${hasLinkedCard ? 'rounded hover:bg-gray-200' : 'border-dashed'} 
        ${cursor}`}
      style={{ borderColor: borderColor }}
      onClick={handleClick}
      aria-label={tooltipText}
      title={tooltipText}
    >
      <p>{processTextContent(carditem.text)}</p>
    </li>
  );
};
