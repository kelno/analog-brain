import { FC } from 'react';
import { ICardItem } from '../../types/Card/ICard';
import { DeckUtils } from '../../types/Deck';
import { useTranslation } from 'react-i18next';
import { processTextContent } from '../../utils/TextProcessing';
import { Link } from 'react-router';
import { useDeckContext } from '../Deck/useDeckContext';
import { getCardPath } from '../routing/routePaths';
import { getNextCardRouteState } from '../routing/cardRouteState';

interface CardItemProps {
  cardItem: ICardItem;
}

export const CardItem: FC<CardItemProps> = ({ cardItem }) => {
  const deckContext = useDeckContext();
  const { t } = useTranslation();

  const hasLinkedCard = cardItem.nextCardId !== undefined;
  const linkedCard = cardItem.nextCardId
    ? DeckUtils.findCard(deckContext.deck, cardItem.nextCardId)
    : undefined;
  const linkedCardError = hasLinkedCard && linkedCard === undefined;
  const tooltipText = linkedCard
    ? t('tool.cardItem.nextCardTooltip', { cardName: linkedCard.title })
    : hasLinkedCard
    ? t('tool.cardItem.nextCardTooltipError')
    : undefined;

  const borderColor = linkedCardError ? 'red' : cardItem.borderColor || 'inherit';
  const cursor = linkedCardError ? 'cursor-not-allowed' : linkedCard ? 'cursor-pointer' : undefined;

  return (
    <li
      className={`relative p-2 border
        ${hasLinkedCard ? 'rounded hover:bg-brain-secondary-hover' : 'border-dashed'} 
        ${cursor}`}
      style={{ borderColor }}
      title={linkedCard ? undefined : tooltipText}
    >
      {/* The link sits behind the text so inline detail buttons remain
          separate interactive controls. */}
      {linkedCard && (
        <Link
          className="absolute inset-0 rounded"
          to={getCardPath(deckContext.deck.id, linkedCard.id)}
          state={getNextCardRouteState(deckContext.previousCardIds, deckContext.currentCardId)}
          title={tooltipText}
        >
          <span className="sr-only">{tooltipText}</span>
        </Link>
      )}
      <p className="relative pointer-events-none [&_button]:relative [&_button]:z-10 [&_button]:pointer-events-auto">
        {processTextContent(cardItem.text)}
      </p>
    </li>
  );
};
