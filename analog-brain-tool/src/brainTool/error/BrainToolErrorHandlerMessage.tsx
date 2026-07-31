import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BrainToolError, BrainToolErrorType } from './BrainToolError';

interface BrainToolErrorHandlerProps {
  error: BrainToolError;
}
export const BrainToolErrorHandlerMessage: FC<BrainToolErrorHandlerProps> = ({ error }) => {
  const { t } = useTranslation();

  let errorMsg = '';
  switch (error.brainError) {
    case BrainToolErrorType.FAILED_NO_VALID_DECK:
      errorMsg = t('tool.errors.noValidDecks');
      break;
    case BrainToolErrorType.FAILED_TO_FETCH_INDEX:
      errorMsg = t('tool.errors.failedToFetchIndex');
      break;
    case BrainToolErrorType.FAILED_TO_FETCH_DECK:
      errorMsg = t('tool.errors.failedToFetchDeck');
      break;
    case BrainToolErrorType.NO_AVAILABLE_DECK_FOR_LANG:
      errorMsg = t('tool.errors.noDeckForCurrentLang');
      break;
    case BrainToolErrorType.FAILED_TO_LOAD_DATA_VALIDATOR:
      errorMsg = t('tool.errors.generic');
      break;
  }

  return (
    <div className="p-20">
      <div className="text-xl font-bold mb-2">{t('tool.errors.errorIntro')}</div>
      {errorMsg && <div>{errorMsg}</div>}
    </div>
  );
};
