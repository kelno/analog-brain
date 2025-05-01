import './App.css';
import { Toaster } from 'sonner';
import { SettingsProvider } from './settingsContext/SettingsProvider';
import './i18n';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header/Header';
import { useEffect } from 'react';
import { AppContextProvider } from './appContext/AppContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrainToolContainer } from './components/BrainTool/BrainToolContainer';

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

  const setPageTitle = () => {
    document.title = t(`pageTitle`);
  };

  useEffect(() => {
    setPageTitle();
  });

  return (
    <>
      <div className="default-theme h-screen w-screen flex flex-col">
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
      </div>
    </>
  );
}
