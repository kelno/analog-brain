import { FC } from 'react';
import { ICard, CardId, ICardItem } from '../../types/Card/ICard';
import { CardItem } from './CardItem';
import { useShare } from '../../share/useShare';
import { SimpleIconButton } from '../../components/SimpleIconButton';
import { useTranslation } from 'react-i18next';
import { Share2 } from 'lucide-react';
import { processTextContent } from '../../utils/TextProcessing';
import { useDeckContext } from '../Deck/useDeckContext';
import { useNavigate } from 'react-router';
import { getCardPath } from '../routing/routePaths';
import { getNextCardRouteState } from '../routing/cardRouteState';

interface CardProps {
  card: ICard | undefined;
}

export const Card: FC<CardProps> = ({ card }) => {
  const { shareCurrentRoute } = useShare();
  const context = useDeckContext();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleShare = () => {
    shareCurrentRoute();
  };

  const handleClickCard = (cardId: CardId) => {
    navigate(getCardPath(context.deck.id, cardId), {
      state: getNextCardRouteState(context.previousCardIds, context.currentCardId),
    });
  };

  return (
    <div className="flex-1 border rounded-2xl shadow-md w-full h-full relative">
      {card && (
        <>
          <div className="absolute top-1 right-1">
            <SimpleIconButton handleClick={handleShare} label={t('tool.card.shareLabel')} icon={Share2} />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold">{card.title}</h2>
            {card.text && <p className="mt-2">{processTextContent(card.text)}</p>}
            <ul className="mt-4 space-y-2">
              {/* Deck content is immutable at runtime, so position is stable until card items have IDs. */}
              {card.items.map((cardItem: ICardItem, index) => (
                <CardItem
                  key={`${card.id}-item-${index}`}
                  cardItem={cardItem}
                  handleClickCard={handleClickCard}
                />
              ))}
            </ul>
          </div>
          <div className="absolute bottom-1 right-2 text-xs opacity-50">{card.id}</div>
        </>
      )}
      {!card && (
        <div className="flex p-6 justify-center items-center h-full">
          <span className="font-bold">(Card not found)</span>
        </div>
      )}
    </div>
  );
};
