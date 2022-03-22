import { Proposal } from '..';
import { PROPOSAL_STATUSES } from '../constants/proposals';

const getProposalStatus = (proposal: Proposal): string => {
  if (!proposal.sponsored) {
    return PROPOSAL_STATUSES.unsponsored;
  }
  if (proposal.cancelled) {
    return PROPOSAL_STATUSES.cancelled;
  }
  if (proposal.passed) {
    return PROPOSAL_STATUSES.passed;
  }
  if (proposal.actionFailed) {
    return PROPOSAL_STATUSES.actionFailed;
  }

  const now = new Date().getTime() / 1000;
  if (
    Number(proposal.votingPeriodStarts) < now &&
    Number(proposal.votingPeriodEnds) < now
  ) {
    return PROPOSAL_STATUSES.voting;
  }
  if (
    Number(proposal.votingPeriodEnds) < now &&
    Number(proposal.gracePeriodEnds) < now
  ) {
    return PROPOSAL_STATUSES.grace;
  }

  if (
    Number(proposal.expiration) > 0 &&
    Number(proposal.expiration) >
      Number(proposal.votingPeriodEnds) + Number(proposal.gracePeriodEnds) + now
  ) {
    return PROPOSAL_STATUSES.expired;
  }

  if (
    now > Number(proposal.gracePeriodEnds) &&
    Number(proposal.yesBalance) > Number(proposal.noBalance) &&
    !proposal.processed
  ) {
    return PROPOSAL_STATUSES.needsProcessing;
  }

  if (
    now > Number(proposal.gracePeriodEnds) &&
    Number(proposal.yesBalance) < Number(proposal.noBalance)
  ) {
    return PROPOSAL_STATUSES.failed;
  }

  return PROPOSAL_STATUSES.unknown;
};

export const hydrateProposal = (proposal: Proposal): Proposal => {
  return {
    ...proposal,
    status: getProposalStatus(proposal),
  };
};
