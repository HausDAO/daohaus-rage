import { QueryPair } from './index';
import { OueryResult } from './types';
import { DAO_OVERVIEW, DAO_PROPOSALS } from './utils';
import { urqlFetch } from './utils/requests';

export default class Query {
  //   constructor() {}

  // generic
  public async graphFetch(args: {
    networkId: string;
    query: string;
    variables?: QueryPair;
  }): Promise<OueryResult> {
    const res = await urqlFetch(args);

    return res;
  }

  // scoped
  public async dao(args: {
    networkId: string;
    dao: string;
  }): Promise<OueryResult> {
    const res = await urqlFetch({
      networkId: args.networkId,
      query: DAO_OVERVIEW,
      variables: { dao: args.dao },
    });

    return res;
  }

  public async proposals(args: {
    networkId: string;
    dao: string;
  }): Promise<OueryResult> {
    const res = await urqlFetch({
      networkId: args.networkId,
      query: DAO_PROPOSALS,
      variables: { dao: args.dao },
    });

    return res;
  }

  // next: user cross chain + ceramic
}
