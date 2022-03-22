import { Proposal } from '..';
import { hydrateProposal } from './hydrators';
import { getDaoReq, getProposalReq, getWithQuery } from './requests';

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

type GetErrors = {
  id?: string;
  errors: string[];
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

  async getDao(args: {
    daoAddress: string;
    networkId: string;
  }): Promise<Dao | GetErrors> {
    const res = await getDaoReq(args.daoAddress, args.networkId);

    if (res.data.errors) {
      return res.data.errors.map((e) => e.message);
    } else {
      return res.data.data.dao;
    }
  }

  async getByQuery(args: {
    entity: string;
    whereQuery: QueryPair;
    fields: string;
    networkId: string;
  }): Promise<Dao[] | GetErrors> {
    const res = await getWithQuery(
      args.entity,
      args.whereQuery,
      args.fields,
      args.networkId
    );

    if (res.data.errors) {
      return res.data.errors.map((e) => e.message);
    } else {
      return res.data.data.daos;
    }
  }

  async getProposal(args: {
    proposalId: string;
    networkId: string;
  }): Promise<Proposal> {
    const res = await getProposalReq(args.proposalId, args.networkId);

    console.log('res', res.data);

    // how to handle errors
    // if (res.data.errors) {
    //   return res.data.errors.map((e) => e.message);
    // } else {
    // }
    return hydrateProposal(res.data.data.proposal);
  }
}

export default Haus;
