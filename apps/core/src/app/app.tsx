import { FunctionComponent } from 'react';
import { useWallet } from '@raidguild/quiver';
import { Route, Switch } from 'react-router-dom';
import Dao from './pages/Dao';

const App: FunctionComponent = () => {
  const { address, connectWallet } = useWallet();

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet </button>
      {address && <div>Connected: {address}</div>}

      <Switch>
        <Route exact path={`/baal/:chainID/:daoID`}>
          <Dao />
        </Route>
        <Route path="*">
          <div>Wrong Path</div>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
