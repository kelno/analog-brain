import './App.css';
/*import HowTo from './components/HowTo';
import Intro from './components/Intro';*/
import Outro from './components/Outro';
import Section from './components/Section';
import { Toaster } from 'sonner';
import SettingsProvider from './settingsContext/SettingsProvider';
import './i18n';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header/Header';
import { useEffect } from 'react';
import Settings from './components/Settings';
import { AppContextProvider } from './appContext/AppContextProvider';
import { BrainToolContainer } from './components/BrainTool/BrainToolContainer';

function App() {
  const { t } = useTranslation();

  const setPageTitle = () => {
    document.title = t(`pageTitle`);
  };

  useEffect(() => {
    setPageTitle();
  });

  return (
    <div className="bg-brain-bg text-brain-text min-h-screen leading-relaxed">
      <AppContextProvider>
        <SettingsProvider>
          <ErrorBoundary>
            <Header />
            <div className="px-2 max-w-250 mx-auto mt-header pt-2">
              <Toaster position="bottom-right" />
              {/*
              <Section id="intro" title={t('intro.title')}>
                <Intro />
              </Section>

              <Section id="howto" title={t('howto.title')}>
                <HowTo />
              </Section>
*/}

              {/* <Section id="tool" title={t('tool.title')}> */}
              <BrainToolContainer />
              {/* </Section> */}

              <Settings />

              <Section id="outro" title={t('about.title')}>
                <Outro />
              </Section>
            </div>
          </ErrorBoundary>
        </SettingsProvider>
      </AppContextProvider>
    </div>
  );
}

export default App;
