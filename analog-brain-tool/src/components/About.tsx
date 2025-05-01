import { Trans, useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();

  const date = BUILD_MS_TIME_SINCE_EPOCH ? new Date(BUILD_MS_TIME_SINCE_EPOCH) : undefined;
  const formattedDate = date?.toISOString().split('T')[0]; // "YYYY-MM-DD" format

  return (
    <>
      {formattedDate && (
        <p>
          {t('footer.lastUpdated')} {formattedDate}
        </p>
      )}

      <Trans i18nKey="footer.adaptedFrom">
        This tool is adapted from
        <a href="http://adhdanalogbrain.tumblr.com" className="brain-a-link">
          adhdanalogbrain.tumblr.com
        </a>
      </Trans>
    </>
  );
};
