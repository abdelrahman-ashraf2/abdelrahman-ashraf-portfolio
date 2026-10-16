import React from 'react';
import { createRoot } from 'react-dom/client';
import Portfolio from '@/components/portfolio';
import '@/src/styles.css';
import '@/src/editorial.css';
import '@/src/operations.css';
import '@/src/trace.css';
import '@/src/journey.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>,
);
