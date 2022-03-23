export type Keychain = {
  '0x4'?: string;
  '0x64'?: string;
};
type KeychainList = { [index: string]: Keychain };

export const ENDPOINTS: KeychainList = {
  V3_SUBGRAPH: {
    '0x4': 'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-rinkeby',
    '0x64': '',
  },
};

export const PROPOSAL_FIELDS =
  'id createdAt sponsored votingStarts votingEnds graceEnds expiration cancelled yesBalance noBalance processed actionFailed passed';

export const DAO_FIELDS =
  'id createdAt transactionHashSummon lootAddress safeAddress lootPaused sharesPaused gracePeriod votingPeriod proposalOffering quorumPercent sponsorThreshold minRetentionPercent shareTokenName shareTokenSymbol totalShares totalLoot latestSponsoredProposalId proposals members metaData { name }';
