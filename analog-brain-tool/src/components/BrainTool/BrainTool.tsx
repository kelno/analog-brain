import { useContext } from 'react';
import { availableSets } from '../../content/cards';
import CardSet from './CardSet';
import BrainContext from '../../store/BrainContext';

const BrainTool = () => {
  const brainContext = useContext(BrainContext);

  const handleSelectSet = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const title: string = event.target.value;

    const set = availableSets.find((set) => set.title === title);
    if (set === undefined) {
      console.error('Could not find set with title ' + title);
      return;
    }

    brainContext.selectSet(set.id);
  };

  const cardSet = brainContext.currentSet;
  console.debug('Rendering BrainTool with cardSet:');
  console.debug(cardSet);

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
      {cardSet && <CardSet cardSet={cardSet}></CardSet>}
    </>
  );
};

export default BrainTool;
