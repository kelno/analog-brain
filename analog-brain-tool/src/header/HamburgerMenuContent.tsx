import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

const Settings = lazy(() =>
  import('../settings/Settings').then((settingsModule) => ({ default: settingsModule.Settings })),
);

interface HamburgerMenuContentProps {
  isOpen: boolean;
}

export const HamburgerMenuContent: React.FC<HamburgerMenuContentProps> = ({ isOpen }) => {
  const { t } = useTranslation();

  if (isOpen === false) return null;

  return (
    <Suspense fallback={<div className="p-6">{t('suspenseLoading')}</div>}>
      <Settings />
    </Suspense>
  );
};
