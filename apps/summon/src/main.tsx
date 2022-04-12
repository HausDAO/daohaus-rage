import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { WalletProvider, NetworkConfig } from '@raidguild/quiver';
import App from './app/app';
import './index.css';

export const SUPPORTED_NETWORKS: NetworkConfig = {
  '0x1': {
    chainId: '0x1',
    name: 'Mainnet',
    symbol: 'ETH',
    explorer: 'https://etherscan.io',
    rpc: 'https://mainnet.infura.io/v3/<your infura project id>',
  },
  '0x4': {
    chainId: '0x4',
    name: 'Rinkeby',
    symbol: 'ETH',
    explorer: 'https://rinkeby.etherscan.io',
    rpc: 'https://rinkeby.infura.io/v3/<your infura project id>',
  },
};

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
