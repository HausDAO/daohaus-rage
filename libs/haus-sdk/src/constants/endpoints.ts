export type Keychain = {
  '0x1'?: string;
  '0x2a'?: string;
  '0x4'?: string;
  '0x64'?: string;
  '0x89'?: string;
  '0xa4b1'?: string;
  '0xa4ec'?: string;
};
type KeychainList = { [index: string]: Keychain };

export const ENDPOINTS: KeychainList = {
  V3_SUBGRAPH: {
    '0x4': 'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-rinkeby',
    '0x64': '',
  },
};
