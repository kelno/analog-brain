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

function App() {
  const { t, i18n } = useTranslation();
  console.debug('Current language: ' + i18n.language);

  return (
    <div className="bg-white text-slate-900 dark:text-white dark:bg-slate-900 min-h-screen leading-relaxed">
      <div className="px-2 max-w-200 mx-auto">
        <Toaster position="bottom-right" />
        <BrainContextProvider>
          <LanguageSwitcher />
          <h1 className="text-4xl text-center">{t('title')}</h1>

          <Section id="intro" title="Introduction to the Analog Brain">
            <Intro />
          </Section>

          <Section id="howto" title="How to use the Analog Brain">
            <HowTo />
          </Section>

          <Section id="tool" title="The Tool - Start here">
            <BrainTool />
          </Section>

          <Section id="outro" title="About">
            <Outro />
          </Section>
        </BrainContextProvider>
      </div>
    </div>
  );
}

export default App;
