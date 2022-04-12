import { pipe, subscribe } from 'wonka';
import { ENDPOINTS } from '@daohaus/utilities';
import { Dispatch, SetStateAction } from 'react';
import { createClient, OperationResult } from 'urql';

const url = ENDPOINTS.V3_SUBGRAPH['0x4'];

const client = createClient({
  url: url as string,
});

export const DAO_PROPOSALS = `
{
  proposals(
    where: {dao:  "0xfe53688bf0a5b5be52cc6d2c6c715b3d8b312364"}
      ) 
  {
    id
    createdAt
    createdBy
    details
  }
}
`;

export const APP_CLOCK = `
{
  eventTransactions(first: 1, 
    orderBy: createdAt, orderDirection: desc) {
    id
    createdAt
  }
}
`;

type ReactSetter<T> = Dispatch<SetStateAction<T>>;

type ReactThunk<T> = {
  setter: ReactSetter<T>;
  shouldUpdate: boolean;
  query: string;
  resolver: (result: OperationResult) => T;
};

export const proposalResolver = (result: OperationResult) => {
  return result?.data?.proposals;
};

export const simpleFetch = async <T>({
  setter,
  shouldUpdate,
  query,
  resolver,
}: ReactThunk<T>) => {
  try {
    const client = createClient({
      url: url as string,
    });
    const result = await client.query(query).toPromise();
    const resolved = resolver(result);
    if (resolved && shouldUpdate) {
      console.log('resolved', resolved);
      setter(resolved);
    }
  } catch (error) {
    console.error(error);
  }
};
export const { unsubscribe } = pipe(
  client.query(DAO_PROPOSALS),
  subscribe((result) => console.log(result))
);
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
      query: APP_CLOCK,
      resolver: (result: OperationResult) =>
        result?.data?.eventTransactions[0]?.id,
    });
  }, 10000);

  return { unsub: () => clearInterval(pollID) };
};
