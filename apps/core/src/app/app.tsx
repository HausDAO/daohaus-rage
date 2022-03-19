import { FunctionComponent } from 'react';
import { useWallet } from '@raidguild/quiver';

import { sendProposal } from '../utils/proposal';
import { Button, FormBuilder } from '@daohaus-monorepo/daohaus-ui';
import { TRASH_PROPOSAL_FORMS } from '@daohaus/haus-sdk';

const App: FunctionComponent = () => {
  const { address, connectWallet, provider } = useWallet();

  const handleTest = () => {
    if (!provider) return;

    sendProposal(provider);
  };
  return (
    <div>
      <Button onClick={connectWallet}>Connect Wallet </Button>
      {address && <div>Connected: {address}</div>}
      <Button onClick={handleTest}>Dummy Proposal</Button>
      <FormBuilder
        onSubmit={() => {
          console.log('fired');
        }}
        form={TRASH_PROPOSAL_FORMS.FREE_LOAD}
      />
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
