import { votingPowerPercentage } from '@daohaus/common-utilities';
import { ListMembershipsQuery } from '../subgraph/queries/members.generated';
import { Proposal } from '../subgraph/schema.generated';
import {
  TransformedProposal,
  TransformedMembership,
  QueryResult,
  AccountProfile,
  BasicProfile,
  TokenBalance,
  DaoTokenBalances,
} from '../types';
import { getProposalStatus, ProposalForStatusCheck } from './proposalsStatus';

export const transformProposal = (
  proposal: Partial<Proposal> | undefined
): TransformedProposal => {
  if (!proposal) {
    return {};
  }
  return {
    ...proposal,
    status: getProposalStatus(proposal as ProposalForStatusCheck),
  };
};

export const transformProfile = (
  address: string,
  ens: string | null,
  profile: BasicProfile
): AccountProfile => {
  return {
    address,
    ens,
    ...profile,
    image:
      profile.image?.original?.src &&
      `https://daohaus.mypinata.cloud/ipfs/${profile.image.original.src.match(
        /Qm[a-zA-Z0-9/.]+/
      )}`,
  };
};

export const transformTokenBalances = (
  tokenBalanceRes: TokenBalance[],
  safeAddress: string
): DaoTokenBalances => {
  const fiatTotal = tokenBalanceRes.reduce(
    (sum: number, balance: TokenBalance): number => {
      sum += Number(balance.fiatBalance);
      return sum;
    },
    0
  );

  return { safeAddress, tokenBalances: tokenBalanceRes, fiatTotal };
};

export const transformMembershipList = (
  memberships: QueryResult<ListMembershipsQuery>[]
): TransformedMembership[] => {
  return memberships.reduce((list: TransformedMembership[], network) => {
    if (network?.data?.members) {
      const daos: TransformedMembership[] = network?.data?.members.map(
        (member) => {
          return {
            dao: member.dao.id,
            name: member.dao.metaData?.name,
            safeAddress: member.dao.safeAddress,
            activeProposalCount: member.dao.activeProposals?.length || 0,
            activeMemberCount: member.dao.activeMemberCount,
            votingPower: votingPowerPercentage(
              member.dao.totalShares,
              member.shares
            ),
            networkId: network.networkId,
            delegate:
              member.delegatingTo !== member.memberAddress
                ? member.delegatingTo
                : undefined,
            isDelegate: Number(member.delegateShares) > 0,
            memberAddress: member.memberAddress,
          };
        }
      );
      return [...list, ...daos];
    } else {
      return list;
    }
  }, []);
};
