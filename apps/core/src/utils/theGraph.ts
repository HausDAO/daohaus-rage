import React, { Dispatch, SetStateAction } from 'react';
import { createClient } from 'urql';

const client = createClient({
  url: 'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-rinkeby',
});

export const DAO_PROPOSALS = `
{
  daos (where: {id: "0xfe53688bf0a5b5be52cc6d2c6c715b3d8b312364"}){
    metaData{
      name
    }
    proposals{
      details
    }
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
    const proposals = res?.data?.daos?.[0]?.proposals;
    if (proposals && unsub) {
      console.log('proposals', proposals);
      setter(proposals);
    }
  } catch (error) {
    console.error(error);
  }
};
