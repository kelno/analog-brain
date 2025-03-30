import CardSet from './CardSet';
import { useTranslation } from 'react-i18next';
import { useBrainContext } from '../../hooks/useBrainContext';
import { useCardSets } from '../../cardSets/useCardSets';
import { useAppContext } from '../../appContext/useAppContext';

const BrainTool = () => {
  const appContext = useAppContext();
  const brainContext = useBrainContext();
  const { t } = useTranslation();
  const cardSetStorage = useCardSets();

  const lang = appContext.language;

  // this should already be checked and prevented by BrainContext
  const availableSets = cardSetStorage.getAvailableSets(lang);
  if (!availableSets) {
    const error = `'No available card sets for language ${lang}`;
    console.error(error);
    throw Error(error);
  }

  const handleSelectSet = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (availableSets === undefined) return;

    const id: string = event.target.value;

    const set = availableSets.find((set) => set.id === id);
    if (set === undefined) {
      console.error('BrainTool: Could not find set with id ' + id);
      return;
    }

    brainContext.selectSet(set.id);
  };

  const cardSet = brainContext.currentSet;
  const currentSetId = cardSet?.id;
  const hasErrors = cardSetStorage.errors.length > 0 ? true : undefined;

  return (
    <>
      <div>
        <span>{t('tool.cardset')}: </span>
        <select
          onChange={handleSelectSet}
          defaultValue={currentSetId}
          className="my-4 p-1 border rounded bg-white dark:bg-slate-900"
        >
          {availableSets &&
            Object.values(availableSets).map((set) => {
              return (
                <option key={set.title} value={set.id}>
                  {set.title}
                </option>
              );
            })}
        </select>
        {hasErrors && (
          <span className="ml-2 text-yellow-500" title={t('tool.errors.warnErrors')}>
            ⚠️
          </span>
        )}
        {cardSet?.description && <div>Description: {cardSet.description}</div>}
      </div>
      {cardSet && <CardSet cardSet={cardSet}></CardSet>}
    </>
  );
};

export default BrainTool;
