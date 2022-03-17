import React from 'react';
import { useWallet } from '@raidguild/quiver';
import { summon } from '../utils/summon';
import { initializationActions, initializationParams } from '../utils/summon';
import { getNonce } from '../utils/general';
import TrashFormBuilder from '../forms/trashFormBuilder';
import { TRASH_SUMMON } from '../forms/trashSummon';
import { ArgType, isArgType } from '@daohaus/haus-sdk';

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
      <button onClick={connectWallet}>Connect Wallet </button>
      <button onClick={handleSummon}>Summon With Hardcoded Values</button>
      {address && <div>Connected: {address}</div>}
      <TrashFormBuilder form={TRASH_SUMMON} />
    </div>
  );
};

export default App;
