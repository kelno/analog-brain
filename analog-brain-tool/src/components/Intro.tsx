import { useTranslation } from 'react-i18next';

export const Intro = () => {
  const { t } = useTranslation();

  return (
    <>
      <p className="my-4">
        <a className="mt-6 p-2 bg-teal-500 hover:bg-teal-400 text-white rounded-2xl" href="#tool">
          {t('skipButton')}
        </a>
      </p>

      {t('intro.content')
        .split('\n\n')
        .map((paragraph, index) => (
          <p key={index} className="pt-6">
            {paragraph}
          </p>
        ))}
    </>
  );
};
