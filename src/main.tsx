import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';

import './index.css';

import 'primereact/resources/themes/viva-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

async function deferRender(): Promise<ServiceWorkerRegistration | undefined> {
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

deferRender().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});