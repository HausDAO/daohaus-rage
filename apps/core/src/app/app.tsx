import { FunctionComponent } from 'react';
import { useWallet } from '@raidguild/quiver';

import { sendProposal } from '../utils/proposal';

const App: FunctionComponent = () => {
  const { address, connectWallet, provider } = useWallet();

  const handleTest = () => {
    if (!provider) return;

    sendProposal(provider);
  };
  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet </button>
      {address && <div>Connected: {address}</div>}
      <button onClick={handleTest}>Dummy Proposal</button>

      {/* <Switch>
        <Route exact path={`/baal/:chainID/:daoID`}>
          <Dao />
        </Route>
        <Route path="*">
          <div>Wrong Path</div>
        </Route>
      </Switch> */}
    </div>
  );
};

export default App;
