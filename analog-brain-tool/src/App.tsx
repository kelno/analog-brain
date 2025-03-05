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
import LanguageSwitcher from './components/LanguageSwitcher';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <div className="bg-white text-slate-900 dark:text-white dark:bg-slate-900 min-h-screen leading-relaxed">
        <div className="px-2 max-w-200 mx-auto">
          <Toaster position="bottom-right" />
          <BrainContextProvider>
            <LanguageSwitcher />
            <h1 className="text-4xl text-center">{t('title')}</h1>

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
          </BrainContextProvider>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
