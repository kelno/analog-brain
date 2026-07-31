import './App.css';
import { Toaster } from 'sonner';
import './i18n';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrainToolContainer } from './brainTool/BrainToolContainer';
import { SettingsProvider } from './settings/settingsContext/SettingsProvider';
import { Header } from './header/Header';
import { AppContextProvider } from './appContext/AppContextProvider';
import useThemeManager from './theme/useThemeManager';
import { useSearchParams } from 'react-router';
import { UrlParams } from './utils/UrlManager/UrlParams';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false, // Do not refetch on window focus
    },
  },
});

export function App() {
  const { t } = useTranslation();
  const themeManager = useThemeManager(); // make sure it's loaded already
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchWasCleared = useRef(false);
  const [initialUrlOptions] = useState(() => {
    const remainingSearchParams = new URLSearchParams(searchParams);
    const language = remainingSearchParams.get(UrlParams.LANG);
    const deckUrl = remainingSearchParams.get(UrlParams.DECK_URL);

    remainingSearchParams.delete(UrlParams.LANG);
    remainingSearchParams.delete(UrlParams.DECK_URL);

    return {
      language,
      deckUrl,
      remainingSearch: remainingSearchParams.toString(),
      shouldReplaceSearch: language !== null || deckUrl !== null,
    };
  });

  themeManager.initialize();

  const setPageTitle = () => {
    document.title = t(`pageTitle`);
  };

  useEffect(() => {
    setPageTitle();
  });

  useEffect(() => {
    // Query options only initialize app state; repeating this replacement after
    // route changes would discard the decision trail stored on that history entry.
    if (!initialSearchWasCleared.current && initialUrlOptions.shouldReplaceSearch) {
      initialSearchWasCleared.current = true;
      setSearchParams(initialUrlOptions.remainingSearch, { replace: true });
    }
  }, [initialUrlOptions, setSearchParams]);

  return (
    <>
      <div className="default-theme h-screen w-screen flex flex-col bg-brain-bg">
        <QueryClientProvider client={queryClient}>
          <AppContextProvider initialLanguage={initialUrlOptions.language}>
            <SettingsProvider initialIndexUrl={initialUrlOptions.deckUrl}>
              <ErrorBoundary>
                <Header />
                {/* Layout if locked in width, but vertical scrolling is allowed in main */}
                <main id="body" className="flex-grow overflow-x-hidden relative">
                  <Toaster position="bottom-right" />
                  <BrainToolContainer />
                </main>
              </ErrorBoundary>
            </SettingsProvider>
          </AppContextProvider>
        </QueryClientProvider>
      </div>
    </>
  );
}
