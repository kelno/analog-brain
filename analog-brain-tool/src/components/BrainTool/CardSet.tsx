import ICardSet from '../../interfaces/ICardSet';
import Card from './Card';

interface CardSetProps {
  set: ICardSet;
  handleGoTo: (id?: string) => void;
}

const CardSetComponent: React.FC<CardSetProps> = ({ set, handleGoTo }) => {
  return (
    <div className="py-6">
      {set.cards.map((card) => (
        <Card key={card.id} card={card} handleGoTo={handleGoTo} />
      ))}
    </div>
  );
};

export default CardSetComponent;
