import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const useShare = () => {
  const { t } = useTranslation();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t('toast.share.success'));
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error(t('toast.share.errors.generic', { error }));
    }
  };

  const share = async (url: string, title: string, description: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
        console.log('Successfully shared');
      } catch (error) {
        console.error('Error sharing:', error);
        toast.error(t('toast.share.errors.generic', { error }));
        await copy(url);
      }
    } else {
      console.error('Web Share API not supported');
      toast.error(t('toast.share.errors.WebAPI'));
      await copy(url);
    }
  };

  return { copy, share };
};

export default useShare;
