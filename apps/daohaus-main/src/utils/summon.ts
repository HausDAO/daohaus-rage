import { LOCAL_CONTRACT } from '../data/contracts';
import { safeEncodeHexFunction } from './abi';
import { getNonce } from './general';
import { AbiItem } from 'web3-utils';

const LOOT_SINGLETON_ADDRESS = '0xE4B40ea347Dffe40b5d0d562bF873d830C124643';
const GNOSIS = {
  SINGLETON: '0xd9db270c1b5e3bd161e8c8503c55ceabee709552',
  FALLBACK: '0xf48f2b2d2a534e402487b3ee7c18c33aec0fe5e4',
  MULTISEND: '0xa238cbeb142c10ef7ad8442c6d1f9e89e07e7761',
};
const POSTER = '0x000000000000cd17345801aa8147b8D3950260FF';

const TEST = {
  NETWORK: '0x4',
  JORD: '0x756ee8B8E898D497043c2320d9909f1DD5a7077F',
};

const INITIALIZATION_PARAMS = {
  CONTRACT: LOCAL_CONTRACT.BAAL,
  ACTION: 'setUp',
  ARGS: {
    SHARE_TOKEN_NAME: 'RAGE',
    SHARE_TOKEN_ADDRESS: 'Rage Token',
    LOOT_SINGLETON: LOOT_SINGLETON_ADDRESS,
    MULTISEND_ADDRESS: GNOSIS.MULTISEND,
  },
};
const ADMIN_CONFIG = {
  CONTRACT: LOCAL_CONTRACT.BAAL,
  ACTION: 'setAdminConfig',
  ARGS: {
    PAUSE_SHARES: 'true',
    PAUSE_LOOT: 'true',
  },
};
const GOVERNANCE_CONFIG = {
  CONTRACT: LOCAL_CONTRACT.BAAL,
  ACTION: 'setGovernanceConfig',
  ARGS: {
    VOTING: '6000', //seconds
    GRACE: '2000', //seconds
    NEW_OFFERING: '0',
    QUORUM: '0',
    SPONSOR: '20', //amount of shares to self sponsor
    MIN_RETENTION: '66.66',
  },
};
const SHAMAN_CONFIG = {
  CONTRACT: LOCAL_CONTRACT.BAAL,
  ACTION: 'setShamans',
  ARGS: {
    SHAMANS: [], //array of addresses
    PERMISSIONS: [], //array of numbers
  },
};
const SHARES_CONFIG = {
  CONTRACT: LOCAL_CONTRACT.BAAL,
  ACTION: 'MintShares',
  ARGS: {
    TO: [TEST.JORD], //address array
    AMOUNT: ['40'], //number array
  },
};
const LOOT_CONFIG = {
  CONTRACT: LOCAL_CONTRACT.BAAL,
  ACTION: 'MintLoot',
  ARGS: {
    TO: [TEST.JORD], //address array
    AMOUNT: ['100'], //number array
  },
};

const METADATA = {
  CONTRACT: 'POSTER',
  ACTION: 'post',
  ARGS: {
    JSON: JSON.stringify({ name: 'Salty Nonce DAO' }),
    TAG: 'baal.metadata',
  },
};
export const SALT_NONCE = getNonce();

const rawActions = [
  ADMIN_CONFIG,
  GOVERNANCE_CONFIG,
  SHAMAN_CONFIG,
  SHARES_CONFIG,
  LOOT_CONFIG,
];

export const initializationActions = rawActions.map((action) => {
  const selectedFn = action.CONTRACT.find(
    (item) => item.name === action.ACTION
  );
  return safeEncodeHexFunction(
    selectedFn as AbiItem,
    Object.values(action.ARGS)
  );
});
