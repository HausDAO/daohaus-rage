import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { DaohausUi } from '@daohaus-monorepo/daohaus-ui';
import App from './app/app';

console.log('DaohausUi', DaohausUi);
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App title="" />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
