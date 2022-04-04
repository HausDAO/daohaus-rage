export type ErrorType = {
  error: boolean;
  message: string;
};

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

// could be many types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FetchResult<Data = any> {
  // could be an array or object... and be any type
  data?: Data;
  // todo better error types
  error?: string;
}
