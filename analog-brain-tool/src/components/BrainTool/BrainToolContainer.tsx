import { useTranslation } from 'react-i18next';
import BrainToolErrorHandler from './BrainToolErrorHandler';
import { Suspense } from 'react';
import { BrainContextProvider } from './store/BrainContextProvider';
import BrainTool from './BrainTool';

export const BrainToolContainer = () => {
  const { t } = useTranslation();

  return (
    <BrainToolErrorHandler>
      <Suspense fallback={t(`suspenseLoading`)}>
        <BrainContextProvider>
          <BrainTool />
        </BrainContextProvider>
      </Suspense>
    </BrainToolErrorHandler>
  );
};
