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
const args = [initializationParams, initializationActions, getNonce()];

const App: React.FunctionComponent = () => {
  const { address, connectWallet, provider } = useWallet();

  const handleClick = () => {
    connectWallet();
  };

  const handleSummon = async () => {
    const errors = args.filter((arg) => !isArgType(arg));
    console.log('errors', errors);
    if (!provider) return;
    if (errors?.length) {
      errors.forEach((error) => console.error(error));
      return;
    }
    summon(provider as providers.Web3Provider, args as ArgType[]);
  };
  return (
    <div>
      <button onClick={handleClick}>Connect Wallet </button>
      <button onClick={handleSummon}>Summon With Hardcoded Values</button>
      {address && <div>Connected: {address}</div>}
      <TrashFormBuilder form={TRASH_SUMMON} />
    </div>
  );
};

export default App;
