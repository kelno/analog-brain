import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { HashRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Hash-based routes keep deep links client-side so static hosts only need to serve index.html. */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
