import axios, { AxiosResponse } from 'axios';

import { DAO_FIELDS, ENDPOINTS, PROPOSAL_FIELDS } from '../constants';

type QueryPairs = {
  [field: string]: string;
};

const buildWhereString = (queryPairs: QueryPairs): string => {
  return Object.keys(queryPairs).reduce((query, key, i) => {
    const queryString = `${key}: "${queryPairs[key]}"`;
    if (i > 0) {
      return `${query}, ${queryString}`;
    } else {
      return queryString;
    }
  }, '');
};

export const getDao = async (
  daoAddress: string,
  networkId: string
): Promise<AxiosResponse> => {
  return await axios.post(ENDPOINTS.V3_SUBGRAPH[networkId], {
    query: `{dao(id: "${daoAddress}") {${DAO_FIELDS}}}`,
  });
};

export const getProposal = async (
  proposalId: string,
  networkId: string
): Promise<AxiosResponse> => {
  return await axios.post(ENDPOINTS.V3_SUBGRAPH[networkId], {
    query: `{proposal(id: "${proposalId}") {${PROPOSAL_FIELDS}}}`,
  });
};

export const getProposals = async (
  daoAddress: string,
  networkId: string
): Promise<AxiosResponse> => {
  return await axios.post(ENDPOINTS.V3_SUBGRAPH[networkId], {
    query: `{proposals(where: {dao: "${daoAddress}"}) {${PROPOSAL_FIELDS}}}`,
  });
};

export const getDaoBySummonTx = async (
  txHash: string,
  networkId: string
): Promise<AxiosResponse> => {
  return await axios.post(ENDPOINTS.V3_SUBGRAPH[networkId], {
    query: `{daos(where: {transactionHashSummon: "${txHash}"}) {${DAO_FIELDS}}}`,
  });
};

export const getLatestTx = async (
  networkId: string
): Promise<AxiosResponse> => {
  return await axios.post(ENDPOINTS.V3_SUBGRAPH[networkId], {
    query: `{eventTransactions(first: 1, orderBy: createdAt, orderDirection: desc) { id }}`,
  });
};

export const getWithQuery = async (
  entity: string,
  whereQuery: QueryPairs,
  fields: string,
  networkId: string
): Promise<AxiosResponse> => {
  const query = `{${entity}(where: {${buildWhereString(
    whereQuery
  )}}) ${fields}}`;
  return await axios.post(ENDPOINTS.V3_SUBGRAPH[networkId], {
    query,
  });
};
