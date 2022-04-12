export type Proposal = {
  id: string;
  createdAt: string;
  status: string;
  sponsored: boolean;
  votingStarts?: string;
  votingEnds?: string;
  graceEnds?: string;
  expiration?: string;
  cancelled: boolean;
  yesBalance: string;
  noBalance: string;
  processed: string;
  actionFailed: boolean;
  passed: boolean;
};
