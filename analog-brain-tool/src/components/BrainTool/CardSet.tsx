import { FC, useContext } from 'react';
import ICardSet from '../../interfaces/ICardSet';
import Card from './Card';
import CardSelector from './CardSelector';
import BrainContext from '../../store/BrainContext';
import { CardId } from '../../interfaces/ICard';
import DataValidator from '../../utils/DataValidator';

interface CardSetProps {
  cardSet: ICardSet;
}

const CardSet: FC<CardSetProps> = ({ cardSet }) => {
  const brainContext = useContext(BrainContext);

  const firstCardId = cardSet.cards[0].id;

  console.debug(
    'CardSet: Rendering (' + cardSet.title + ') with current card id ' + brainContext.currentCard,
  );

  if (!DataValidator.validateCardSet(cardSet))
    return (
      <div className="py-6">Found invalid data within the card set. Check console for more information.</div>
    );

  const handleClickPrevious = () => {
    const previousId = brainContext.popCurrentCard(); // pop current card
    if (previousId) handleSelectCard(previousId, true, false);
  };

  function handleSelectCard(cardId: CardId, scrollTo: boolean, pushHistory: boolean) {
    brainContext.selectCard(cardId, pushHistory);

    if (cardId) {
      const element = document.getElementById(cardId);
      if (element) {
        if (scrollTo) element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        console.debug('Selected card ' + cardId);
      } else {
        console.debug(`Element with id '${cardId}' not found`);
      }
    } else {
      console.debug('No id provided');
    }
  }

  function handleClickBackToTop() {
    brainContext.resetHistory();
    handleSelectCard(firstCardId, true, true);
  }

  return (
    <div className="py-6">
      {cardSet.cards.map((card) => (
        <div key={card.id} className="flex flex-col relative mb-14">
          <Card card={card} handleSelectCard={handleSelectCard} />
          {card.id == brainContext.currentCard && (
            <CardSelector
              key={`${card.id}-selector`}
              handleClickPrevious={handleClickPrevious}
              handleClickBackToTop={handleClickBackToTop}
              disableBackToTop={firstCardId === card.id}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CardSet;
