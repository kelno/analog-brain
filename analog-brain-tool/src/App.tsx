import './App.css';
import BrainTool from './components/BrainTool/BrainTool';
import HowTo from './components/HowTo';
import Intro from './components/Intro';
import Outro from './components/Outro';
import Section from './components/Section';
import { Toaster } from 'sonner';
import BrainContextProvider from './store/BrainContextProvider';
import './i18n';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header/Header';
import { useEffect } from 'react';

function App() {
  const { t } = useTranslation();

  const setPageTitle = () => {
    document.title = t(`pageTitle`);
  };

  useEffect(() => {
    setPageTitle();
  });

  return (
    <ErrorBoundary>
      <div className="bg-brain-bg text-brain-text min-h-screen leading-relaxed">
        <BrainContextProvider>
          <Header />
          <div className="px-2 max-w-250 mx-auto mt-header pt-2">
            <Toaster position="bottom-right" />

            <Section id="intro" title={t('intro.title')}>
              <Intro />
            </Section>

            <Section id="howto" title={t('howto.title')}>
              <HowTo />
            </Section>

            <Section id="tool" title={t('tool.title')}>
              <BrainTool />
            </Section>

            <Section id="outro" title={t('about.title')}>
              <Outro />
            </Section>
          </div>
        </BrainContextProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
