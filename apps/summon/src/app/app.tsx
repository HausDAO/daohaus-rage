import React from 'react';
import { useWallet } from '@raidguild/quiver';
import { summon } from '../utils/summon';
import { initializationActions, initializationParams } from '../utils/summon';
import TrashFormBuilder from '../forms/trashFormBuilder';
import { TRASH_SUMMON } from '../forms/trashSummon';
import { ArgType, isArgType, getNonce } from '@daohaus/haus-sdk';
import { Button } from '@daohaus-monorepo/daohaus-ui';

const args = [initializationParams, initializationActions, getNonce()];

const App: React.FunctionComponent = () => {
  const { address, connectWallet, provider } = useWallet();

  const handleSummon = async () => {
    const errors = args.filter((arg) => !isArgType(arg));

    if (!provider) return;
    if (errors?.length) {
      errors.forEach((error) => console.error(error));
      return;
    }
    //  TYPESCRIPT QUESTION
    // Is there a way I can get Typescript to recognize implicitly
    //  that I am returning early if there are errors, and therefore
    //  am using ArgType[]?
    //  How do I do this without typecasting?

    summon(provider, args as ArgType[]);
  };
  return (
    <div>
      <Button onClick={connectWallet}>Connect Wallet </Button>
      <Button onClick={handleSummon}>Summon With Hardcoded Values</Button>
      {address && <div>Connected: {address}</div>}
      <TrashFormBuilder form={TRASH_SUMMON} />
    </div>
  );
};

export default App;
