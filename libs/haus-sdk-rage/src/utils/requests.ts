// required polyfill for browser/node fetch not included in urql
import 'isomorphic-unfetch';
import { createClient, OperationResult } from 'urql';
import { ENDPOINTS } from '.';
// import { ENDPOINTS } from '@daohaus/haus-parlor';

import { QueryPair } from '..';

export const urqlFetch = async (args: {
  networkId: string;
  query: string;
  variables?: QueryPair;
}): Promise<OperationResult> => {
  const client = createClient({
    url: ENDPOINTS.V3_SUBGRAPH[args.networkId],
  });

  return await client.query(args.query, args.variables).toPromise();
};
