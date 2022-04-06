import { Dispatch, SetStateAction } from 'react';
import { OperationResult } from 'urql';
import Haus from '@daohaus/haus-sdk';
import { LATEST_TX_BY_DAO } from '@daohaus/haus-sdk';

type ReactSetter<T> = Dispatch<SetStateAction<T>>;

type QueryPair = {
  [field: string]: string;
};

type ReactThunk<T> = {
  setter: ReactSetter<T>;
  shouldUpdate: boolean;
  query: string;
  variables: QueryPair;
  resolver: (result: OperationResult) => T;
};

const haus = Haus.create({
  '0x4': 'temp',
});

export const proposalResolver = (result: OperationResult) => {
  return result?.data?.proposals;
};

export const simpleFetch = async <T>({
  setter,
  shouldUpdate,
  query,
  variables,
  resolver,
}: ReactThunk<T>) => {
  try {
    const result = await haus.graphFetch({
      networkId: '0x4',
      query,
      variables,
    });
    const resolved = resolver(result);
    if (resolved && shouldUpdate) {
      console.log('resolved', resolved);
      setter(resolved);
    }
  } catch (error) {
    console.error(error);
  }
};

export const startAppClock = <T>({
  setter,
  shouldUpdate,
}: {
  setter: ReactSetter<T>;
  shouldUpdate: boolean;
}) => {
  const pollID = setInterval(() => {
    console.log('tick');

    simpleFetch({
      setter,
      shouldUpdate,
      query: LATEST_TX_BY_DAO,
      variables: { dao: '0xfe53688bf0a5b5be52cc6d2c6c715b3d8b312364' },
      resolver: (result: OperationResult) =>
        result?.data?.eventTransactions[0]?.id,
    });
  }, 10000);

  return { unsub: () => clearInterval(pollID) };
};
