import { useContext } from 'react';
import { availableSets } from '../../content/cards';
import CardSet from './CardSet';
import BrainContext from '../../store/BrainContext';
import { useTranslation } from 'react-i18next';

const BrainTool = () => {
  const brainContext = useContext(BrainContext);
  const { t } = useTranslation();

  const handleSelectSet = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id: string = event.target.value;

    const set = availableSets.find((set) => set.id === id);
    if (set === undefined) {
      console.error('BrainTool: Could not find set with id ' + id);
      return;
    }

    brainContext.selectSet(set.id);
  };

  const cardSet = brainContext.currentSet;
  // console.debug('BrainTool: Rendering BrainTool with cardSet:');
  // console.debug(cardSet);

  const currentSetId = cardSet?.id;

  return (
    <>
      <div>
        <span>{t('tool.cardset')}: </span>
        <select
          onChange={handleSelectSet}
          defaultValue={currentSetId}
          className="my-4 p-1 border rounded bg-white dark:bg-slate-900"
        >
          {Object.values(availableSets).map((set) => {
            return (
              <option key={set.title} value={set.id}>
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
