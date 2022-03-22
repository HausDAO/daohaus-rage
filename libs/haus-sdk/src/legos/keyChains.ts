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

export const KEYCHAIN: KeychainList = {
  POSTER: {
    '0x2a': '0x000000000000cd17345801aa8147b8D3950260FF',
  },
  GNOSIS_SINGLETON: {
    '0x2a': '0xd9db270c1b5e3bd161e8c8503c55ceabee709552',
  },
  GNOSIS_FALLBACK: {
    '0x2a': '0xf48f2b2d2a534e402487b3ee7c18c33aec0fe5e4',
  },
  GNOSIS_MULTISEND: {
    '0x2a': '0xa238cbeb142c10ef7ad8442c6d1f9e89e07e7761',
  },
  BAAL_LOOT_SINGLETON: {
    '0x2a': '0xE4B40ea347Dffe40b5d0d562bF873d830C124643',
  },
  BAAL_FACTORY: {
    '0x2a': '0x31C948A5Ad149853B211de025082b61573ef3979',
  },
  V3_SUBGRAPH: {
    '0x2a': '',
  },
};
