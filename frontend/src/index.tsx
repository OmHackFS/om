import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { createRoot } from 'react-dom/client'
import { App } from './App';
import './index.css';
import 'tw-elements';
import { getProvider } from './utils/provider';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getProvider}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>
);
