import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/fonts.css';
import './styles/global.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element in index.html');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production pages arrive with their HTML already written. The dev server's don't.
if (root.firstElementChild) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
