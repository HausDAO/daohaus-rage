import { OperationResult } from 'urql';
import { Proposal } from '..';
import { hydrateProposal } from './hydrators';
import {
  getDao,
  getDaoBySummonTx,
  getLatestTx,
  getProposal,
  getProposals,
  getWithQuery,
  urqlFetch,
} from './requests';

type KeyChain = {
  [chainId: string]: string;
};

type QueryPair = {
  [field: string]: string;
};

type Dao = {
  id: string;
};

class Haus {
  rpcEndpoints!: KeyChain;

  static create(networkConfig: KeyChain): Haus {
    const hausSdk = new Haus();
    hausSdk.init(networkConfig);
    return hausSdk;
  }

  private init(rpcEndpoints: KeyChain): void {
    this.rpcEndpoints = rpcEndpoints;
  }

  // urql simple query
  async graphFetch(args: {
    networkId: string;
    query: string;
    variables: QueryPair;
  }): Promise<OperationResult> {
    const res = await urqlFetch(args);

    return res;

    // how to deal with a resolver based on entity, pass from the client?
    // if (res.error) {
    //   return res;
    // } else {
    // return hydrateProposal(proposal)
    // }
  }

  // todo: 1) fetch all, 2) some more scoped dao, proposals, ect...

  // Prescribed/named queries

  async dao(args: { daoAddress: string; networkId: string }): Promise<Dao> {
    const res = await getDao(args.daoAddress, args.networkId);
    return res.data.data.dao;
  }

  async proposal(args: {
    proposalId: string;
    networkId: string;
  }): Promise<Proposal> {
    const res = await getProposal(args.proposalId, args.networkId);
    return hydrateProposal(res.data.data.proposal);
  }

  async proposals(args: {
    daoAddress: string;
    networkId: string;
  }): Promise<Proposal[]> {
    const res = await getProposals(args.daoAddress, args.networkId);
    return res.data.data.proposals.map((proposal) => hydrateProposal(proposal));
  }

  async daoBySummonTx(args: {
    txHash: string;
    networkId: string;
  }): Promise<Dao> {
    const res = await getDaoBySummonTx(args.txHash, args.networkId);
    return res.data.data.dao;
  }

  async latestTx(args: { networkId: string }): Promise<Dao> {
    const res = await getLatestTx(args.networkId);

    return res.data.data.eventTransactions[0];
  }

  // Query builder with axios

  async getByQuery(args: {
    entity: string;
    whereQuery: QueryPair;
    fields: string;
    networkId: string;
    // TODO - how to type this when it can be any entity?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }): Promise<any[]> {
    const res = await getWithQuery(
      args.entity,
      args.whereQuery,
      args.fields,
      args.networkId
    );
    return res.data.data[args.entity];
  }
}

export default Haus;
