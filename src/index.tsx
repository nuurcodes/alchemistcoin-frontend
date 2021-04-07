import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import onboardConfig from './config/onboard';

import { Web3Provider } from './context/web3';
import { config } from './utils/config';
import { NotifyProvider } from './context/web3/notify';

const { mistTokenAddress, lpTokenAddress, networkId } = config;

ReactDOM.render(
  <React.StrictMode>
    <Web3Provider
      networkIds={[networkId]}
      onboardConfig={onboardConfig}
      cacheWalletSelection
      tokensToWatch={{
        [networkId]: [
          {
            address: mistTokenAddress,
            name: 'Mist',
            symbol: '⚗️',
          },
          {
            address: lpTokenAddress,
            name: 'LP',
            symbol: '🧙',
          },
        ],
      }}
    >
      <NotifyProvider>
        <App />
      </NotifyProvider>
    </Web3Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();