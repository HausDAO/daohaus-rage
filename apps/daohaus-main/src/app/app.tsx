import React from 'react';
import { useWallet } from '@raidguild/quiver';
import { summon } from '../utils/summon';
import { initializationActions, initializationParams } from '../utils/summon';
import { getNonce } from '../utils/general';
import { providers } from 'ethers';
import { ArgType } from '../types/contract';
import { isArgType } from '../utils/abi';
import TrashFormBuilder from '../forms/trashFormBuilder';
import { TRASH_SUMMON } from '../forms/trashSummon';
import { Button } from '@daohaus-monorepo/daohaus-ui';

const args = [initializationParams, initializationActions, getNonce()];

const App: React.FunctionComponent = () => {
  const { address, connectWallet, provider } = useWallet();

  const handleClick = () => {
    connectWallet();
  };

  const handleSummon = async () => {
    console.log('fired');
    const errors = args.filter((arg) => !isArgType(arg));
    if (!provider) return;
    if (errors) {
      errors.forEach((error) => console.error(error));
      return;
    }
    summon(provider as providers.Web3Provider, args as ArgType[]);
  };
  return (
    <div>
      <Button
        css={{
          backgroundColor: 'blue',
        }}
        onClick={handleClick}
      >
        Connect Wallet{' '}
      </Button>
      <Button color="red" size="lg" onClick={handleSummon}>
        Summon With Hardcoded Values
      </Button>
      {address && <div>Connected: {address}</div>}
      <TrashFormBuilder form={TRASH_SUMMON} />
    </div>
  );
};

export default App;
