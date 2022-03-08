import { ContractAction } from '../types/contract';
import { encodeAction, getNonce } from './general';

const TEST = {
  NETWORK: '0x4',
  GENERIC_ADDRESS: '0x511449dD36e5dB31980AA0452aAAB95b9a68ae99',
  JORD: '0x756ee8B8E898D497043c2320d9909f1DD5a7077F',
};

const INITALIZATION_PARAMS = {
  CONTRACT: 'BAAL',
  ACTION: 'setUp',
  ARGS: {
    SHARE_TOKEN_NAME: 'RAGE',
    SHARE_TOKEN_ADDRESS: 'Rage Token',
    LOOT_SINGLETON_ADDRESS: TEST.GENERIC_ADDRESS,
    MULTISEND_ADDRESS: TEST.GENERIC_ADDRESS,
  },
};
const ADMIN_CONFIG = {
  CONTRACT: 'BAAL',
  ACTION: 'setAdminConfig',
  ARGS: {
    PAUSE_SHARES: true,
    PAUSE_LOOT: true,
  },
};
const GOVERNANCE_CONFIG = {
  CONTRACT: 'BAAL',
  ACTION: 'setGovernanceConfig',
  ARGS: {
    VOTING: '6000', //seconds
    GRACE: '2000', //seconds
    NEW_OFFERING: '0',
    QUORUM: '0',
    SPONSOR: '20', //amount of shares to self sponsor
    MIN_RETENTION: 66.66,
  },
};
const SHAMAN_CONFIG = {
  CONTRACT: 'BAAL',
  ACTION: 'setShamans',
  ARGS: {
    SHAMANS: [], //array of addresses
    PERMISSIONS: [], //array of numbers
  },
};
const SHARES_CONFIG = {
  CONTRACT: 'BAAL',
  ACTION: 'MintShares',
  ARGS: {
    TO: [TEST.JORD], //address array
    AMOUNT: [40], //number array
  },
};
const LOOT_CONFIG = {
  CONTRACT: 'BAAL',
  ACTION: 'MintLoot',
  ARGS: {
    TO: [TEST.JORD], //address array
    AMOUNT: [100], //number array
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

const rawActions: ContractAction[] = [
  ADMIN_CONFIG,
  GOVERNANCE_CONFIG,
  SHAMAN_CONFIG,
  SHARES_CONFIG,
  LOOT_CONFIG,
];

export const initializationActions = rawActions.map((action) => encodeAction);
