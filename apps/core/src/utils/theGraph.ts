import { KEYCHAIN } from '@daohaus/haus-sdk';
import { Dispatch, SetStateAction } from 'react';
import { createClient } from 'urql';

const url = KEYCHAIN.V3_SUBGRAPH['0x4'];

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

type ReactThunk<T> = {
  setter: Dispatch<SetStateAction<T>>;
  unsub: boolean;
  query: string;
};

export const simpleFetch = async <T>({
  setter,
  unsub,
  query,
}: ReactThunk<T>) => {
  try {
    const res = await client.query(query).toPromise();
    const proposals = res?.data?.proposals;

    if (proposals && unsub) {
      setter(proposals);
    }
  } catch (error) {
    console.error(error);
  }
};
