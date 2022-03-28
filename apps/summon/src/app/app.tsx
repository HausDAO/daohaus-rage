import React from 'react';
import { useWallet } from '@raidguild/quiver';

import { initializationActions, initializationParams } from '../utils/summon';
import { TRASH_SUMMON } from '@daohaus/haus-sdk';
import { ArgType, isArgType, getNonce } from '@daohaus/haus-sdk';
import { Button, FormBuilder } from '@daohaus/ui';
import { providers } from 'ethers';

import { handleSummonArgs, summon, SummonFormData } from '../utils/summon';

const args = [initializationParams, initializationActions, getNonce()];

const App: React.FunctionComponent = () => {
  const { address, connectWallet, provider } = useWallet();

  const staticSummon = async () => {
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

  const formSummon = async (formValues: { [indes: string]: unknown }) => {
    const summonArgs = handleSummonArgs(formValues as SummonFormData);
    const errors = summonArgs.filter((arg) => !isArgType(arg));
    if (!provider) return;
    if (errors) {
      errors.forEach((error) => console.error(error));
    }
    await summon(provider as providers.Web3Provider, summonArgs as ArgType[]);
  };
  return (
    <div>
      <Button onClick={connectWallet}>Connect Wallet </Button>
      <Button onClick={staticSummon}>Summon With Hardcoded Values</Button>
      {address && <div>Connected: {address}</div>}
      <FormBuilder form={TRASH_SUMMON} onSubmit={formSummon} />
    </div>
  );
};

export default App;
