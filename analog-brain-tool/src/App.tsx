//import { useState } from 'react';

import './App.css';
import BrainTool from './components/BrainTool/BrainTool';
import HowTo from './components/HowTo';
import Intro from './components/Intro';
import Outro from './components/Outro';
import Section from './components/Section';
import { Toaster } from 'sonner';
import BrainContextProvider from './store/BrainContextProvider';

function App() {
  return (
    <BrainContextProvider>
      <div className="bg-white text-slate-900 dark:text-white dark:bg-slate-900 min-h-screen leading-relaxed">
        <div className="px-2 max-w-200 mx-auto">
          <Toaster position="bottom-right" />
          <h1 className="text-4xl text-center">The Analog Brain</h1>

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
        </div>
      </div>
    </BrainContextProvider>
  );
}

export default App;
