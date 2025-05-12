import './App.css';
import { Toaster } from 'sonner';
import './i18n';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrainToolContainer } from './brainTool/BrainToolContainer';
import { SettingsProvider } from './settings/settingsContext/SettingsProvider';
import { Header } from './header/Header';
import { AppContextProvider } from './appContext/AppContextProvider';
import useThemeManager from './theme/useThemeManager';
import { BrowserRouter } from 'react-router-dom';

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

  themeManager.initialize();

  const setPageTitle = () => {
    document.title = t(`pageTitle`);
  };

  useEffect(() => {
    setPageTitle();
  });

  return (
    <>
      <div className="default-theme h-screen w-screen flex flex-col bg-brain-bg">
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <QueryClientProvider client={queryClient}>
            <AppContextProvider>
              <SettingsProvider>
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
        </BrowserRouter>
      </div>
    </>
  );
}
