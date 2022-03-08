import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { initializationActions } from './utils/summon';

const txData = initializationActions;

console.log('txData', txData);

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App title="" />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
