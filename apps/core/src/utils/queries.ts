export const LATEST_TX_BY_DAO = `
  query eventTransactions($dao: String!) {
    eventTransactions(
        first: 1, 
        orderBy: createdAt, 
        orderDirection: desc
        where: { dao: $dao }
    ) {
        id
        createdAt
    }
}
` as const;

export const PROPOSAL_FIELDS = `
  id 
  createdAt
  details
  sponsored
  votingStarts
  votingEnds
  graceEnds 
  expiration
  cancelled
  yesBalance
  noBalance
  processed
  actionFailed
  passed
  title
  description
` as const;

export const DAO_PROPOSALS = `
  query proposals($dao: String!) {
    proposals(
      where: {dao: $dao}
      orderBy: createdAt
      orderDirection: desc 
    ) {
      ${PROPOSAL_FIELDS}
    }
  }
` as const;
