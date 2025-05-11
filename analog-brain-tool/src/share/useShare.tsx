import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useRef } from 'react';
import { ErrorHelpers } from '../utils/ErrorHelpers';
import { useAppContext } from '../appContext/useAppContext';
import { DeckId } from '../types/Deck/IDeck';
import { CardId } from '../types/Card/ICard';
import { UrlManager } from '../utils/UrlManager/UrlManager';
import { useSettings } from '../settings/settingsContext/useSettings';

export const useShare = () => {
  const { t } = useTranslation();
  const lastShareAttempt = useRef<number>(0);

  const { indexUrl, isDefaultUrl } = useSettings();
  const { language } = useAppContext();

  const isRecentAttempt = () => {
    const now = Date.now();
    const isRecent = now - lastShareAttempt.current < 1000;
    lastShareAttempt.current = now;
    return isRecent;
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t('toast.share.success'));
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error(t('toast.share.errors.generic', { error: ErrorHelpers.getErrorMessage(error) }));
    }
  };

  const shareFromParams = (currentDeckId: DeckId | undefined, currentCardId: CardId | undefined) => {
    const shareUrl = UrlManager.getShareURL(
      currentDeckId,
      currentCardId,
      language,
      isDefaultUrl ? undefined : indexUrl,
    );
    share(shareUrl, t('share.title'), t('share.description'));
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
        if (!isRecentAttempt()) {
          console.error('Error sharing:', error);
          toast.error(t('toast.share.errors.generic', { error: ErrorHelpers.getErrorMessage(error) }));
          await copy(url);
        }
      }
    } else {
      if (!isRecentAttempt()) {
        console.error('Web Share API not supported');
        toast.error(t('toast.share.errors.WebAPI'));
        await copy(url);
      }
    }
  };

  return { copy, shareFromParams };
};
