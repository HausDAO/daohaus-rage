import { Proposal } from '..';
import { hydrateProposal } from './hydrators';
import {
  getDao,
  getDaoBySummonTx,
  getLatestTx,
  getProposal,
  getProposals,
  getWithQuery,
} from './requests';

type KeyChain = {
  '0x4': string;
  '0x64': string;
};

type QueryPair = {
  [field: string]: string;
};

type Dao = {
  id: string;
};

class Haus {
  rpcEndpoints!: KeyChain;

  static async create(networkConfig: KeyChain): Promise<Haus> {
    const hausSdk = new Haus();
    await hausSdk.init(networkConfig);
    return hausSdk;
  }

  private async init(rpcEndpoints: KeyChain): Promise<void> {
    this.rpcEndpoints = rpcEndpoints;
  }

  // TODO - when and how to handle errors - new rage

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
  }): Promise<Proposal> {
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
    return res.data.data.eventTransaction;
  }

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
