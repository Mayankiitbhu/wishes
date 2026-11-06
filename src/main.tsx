import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Always begin on the curtain: stop the browser restoring a previous scroll position / #hash.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search);
window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
