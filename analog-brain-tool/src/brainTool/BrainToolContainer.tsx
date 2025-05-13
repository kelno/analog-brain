import { useTranslation } from 'react-i18next';
import { BrainToolErrorHandler } from './error/BrainToolErrorHandler';
import { Suspense } from 'react';
import { BrainContextProvider } from './store/BrainContextProvider';
import { BrainTool } from './BrainTool';

export const BrainToolContainer = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-full flex">
      {/* We take at least the whole screen, but maybe more*/}
      <div className="flex flex-grow flex-col relative min-h-full ">
        <BrainToolErrorHandler>
          <Suspense fallback={t(`suspenseLoading`)}>
            <BrainContextProvider>
              <BrainTool />
            </BrainContextProvider>
          </Suspense>
        </BrainToolErrorHandler>
      </div>
    </div>
  );
};
