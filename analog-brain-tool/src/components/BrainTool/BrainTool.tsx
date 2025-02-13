import { useState } from 'react';
import { availableSets } from '../../content/cards';
import CardSet from './CardSet';

const BrainTool = () => {
  const [selectedCardSet, setSelectedCardSet] = useState(availableSets[0]);

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

  return (
    <>
      <div>
        <span>Card set: </span>
        <select onChange={handleSelectSet} className="my-4 p-1 border rounded bg-white dark:bg-slate-900">
          {Object.values(availableSets).map((set) => {
            return (
              <option key={set.title} value={set.title}>
                {set.title}
              </option>
            );
          })}
        </select>
      </div>
      <CardSet set={selectedCardSet}></CardSet>
    </>
  );
};

export default BrainTool;
