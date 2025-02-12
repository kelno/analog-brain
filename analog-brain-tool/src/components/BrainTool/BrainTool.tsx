import { useState } from 'react';
import { availableSets } from '../../content/cards';
import CardSet from './CardSet';
import Lorem from './Lorem';

const BrainTool = () => {
  const [selectedCardSet, setSelectedCardSet] = useState(availableSets[0]);
  //todo const [currentCard, setCurrentCard] = useState(null);

  const handleSelectSet = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const title: string = event.target.value;
    console.debug('Selected set: ' + title);

    const set = availableSets.find((set) => set.title === title);
    if (set === undefined) {
      console.error('Could not find set with title ' + title);
      return;
    }

    setSelectedCardSet(set);
  };

  function handleGoTo(id?: string) {
    if (id) {
      // Find the element with the given ID
      const element = document.getElementById(id);
      if (element) {
        // Scroll to that element smoothly
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.debug(`Element with id '${id}' not found`);
      }
    } else {
      console.debug('No id provided');
    }
  }

  return (
    <>
      <select onChange={handleSelectSet} className="my-4 p-2 border rounded">
        {Object.values(availableSets).map((set) => {
          return (
            <option key={set.title} value={set.title}>
              {set.title}
            </option>
          );
        })}
      </select>
      <CardSet set={selectedCardSet} handleGoTo={handleGoTo}></CardSet>
      <Lorem></Lorem>
    </>
  );
};

export default BrainTool;
