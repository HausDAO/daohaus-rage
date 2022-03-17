import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { WalletProvider } from '@raidguild/quiver';
import App from './app/app';
import { SUPPORTED_NETWORKS } from './utils/wallet';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <WalletProvider
        web3modalOptions={{}}
        networks={SUPPORTED_NETWORKS}
        handleModalEvents={(eventName, error) => {
          if (error) {
            console.error(error);
          }
          console.log(eventName);
        }}
      >
        <App />
      </WalletProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
