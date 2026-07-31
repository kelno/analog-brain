import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

interface RouteFallbackProps {
  title: string;
  children: ReactNode;
}

export const RouteFallback = ({ title, children }: RouteFallbackProps) => {
  const { t } = useTranslation();

  return (
    <section
      className="flex min-h-full w-full flex-col items-center justify-center gap-4 p-6 text-center"
      aria-labelledby="route-fallback-title"
    >
      <h1 id="route-fallback-title" className="text-2xl font-bold">
        {title}
      </h1>
      <div>{children}</div>
      <Link className="font-bold underline hover:no-underline" to="/">
        {t('routing.backToDeckSelection')}
      </Link>
    </section>
  );
};
