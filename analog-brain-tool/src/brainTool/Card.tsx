import { FC } from 'react';
import { ICard, CardId, ICardItem } from '../types/Card/ICard';
import { CardItem } from './CardItem';
import { useShare } from '../share/useShare';
import { useDeckContext } from './Deck/useDeckContext';
import { SimpleIconButton } from '../components/SimpleIconButton';
import { useTranslation } from 'react-i18next';
import { Share2 } from 'lucide-react';
import { processTextContent } from '../utils/TextProcessing';

interface CardProps {
  card: ICard | undefined;
}

export const Card: FC<CardProps> = ({ card }) => {
  const { shareFromParams } = useShare();
  const context = useDeckContext();
  const { t } = useTranslation();

  const handleShare = () => {
    shareFromParams(context.deck.id, context.currentCardId);
  };

  const handleClickCard = (cardId: CardId) => {
    context.selectCard(cardId, true);
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
              {card.items.map((carditem: ICardItem) => (
                <CardItem
                  key={
                    `${card.id}-item-${carditem.text.substring(
                      0,
                      10,
                    )}` /* maybe not great, we could use a cardItem id later we we have a proper editor*/
                  }
                  carditem={carditem}
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
