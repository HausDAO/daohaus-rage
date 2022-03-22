import axios, { AxiosResponse } from 'axios';

import { ENDPOINTS } from '../constants';

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

export const getDaoReq = async (
  daoAddress: string,
  networkId: string
): Promise<AxiosResponse> => {
  return await axios.post(ENDPOINTS.V3_SUBGRAPH[networkId], {
    query: `{dao(id: "${daoAddress}") {id}}`,
  });
};

export const getProposalReq = async (
  proposalId: string,
  networkId: string
): Promise<AxiosResponse> => {
  return await axios.post(ENDPOINTS.V3_SUBGRAPH[networkId], {
    query: `{proposal(id: "${proposalId}") {id createdAt sponsored votingStarts votingEnds graceEnds expiration cancelled yesBalance noBalance processed actionFailed passed}}`,
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
