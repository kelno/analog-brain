import CardSet from './CardSet';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useCardSetStorage } from '../../cardSets/CardSetStorage';
import { useBrainContext } from '../../hooks/useBrainContext';

const BrainTool = () => {
  const brainContext = useBrainContext();
  const { t } = useTranslation();
  const cardSetStorage = useCardSetStorage();

  if (!brainContext.loaded) {
    return <div>(No card sets loaded)</div>;
  }

  const lang = brainContext.language;
  if (!lang) throw new Error('BrainTool: Language is not set in BrainContext. This should never happen.');

  const availableSets = cardSetStorage.getAvailableSets(lang);
  if (!availableSets) {
    console.error('No available card sets for language ' + lang);
    toast.error(t('toast.noCardSetsForLang', { lang }));
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
          {availableSets &&
            Object.values(availableSets).map((set) => {
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
