export const SUPPORTED_NETWORKS = {
  '0x1': 'Mainnet',
  '0x2a': 'Rinkeby',
  '0x4': 'Kovan',
  '0x64': 'Gnosis Chain',
  '0x89': 'Polygon',
  '0xa4b1': 'Arbitrum',
  '0xa4ec': 'Celo',
  all: 'All Networks',
};

type SupportedNetworks = typeof SUPPORTED_NETWORKS;

export type Keychain = Partial<SupportedNetworks>;
type KeychainList = { [index: string]: Keychain };

const GNOSIS_KEYS: KeychainList = {
  SINGLETON: {
    '0x2a': '0xd9db270c1b5e3bd161e8c8503c55ceabee709552',
  },
  FALLBACK: {
    '0x2a': '0xf48f2b2d2a534e402487b3ee7c18c33aec0fe5e4',
  },
  MULTISEND: {
    '0x2a': '0xa238cbeb142c10ef7ad8442c6d1f9e89e07e7761',
  },
};

const BAAL_KEYS: KeychainList = {
  BAAL_LOOT_SINGLETON: {
    '0x2a': '0xE4B40ea347Dffe40b5d0d562bF873d830C124643',
  },
  BAAL_FACTORY: {
    '0x2a': '0xE4B40ea347Dffe40b5d0d562bF873d830C124643',
  },
};

export const KEYCHAIN: KeychainList = {
  POSTER: {
    '0x2a': '0x000000000000cd17345801aa8147b8D3950260FF',
  },
  ...GNOSIS_KEYS,
  ...BAAL_KEYS,
};
