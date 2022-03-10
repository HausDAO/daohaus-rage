import { LOCAL_CONTRACT } from '../data/contracts';
import { defaultEncode, safeEncodeHexFunction } from './abi';
import { ethers } from 'ethers';
import { ArgType } from '../types/contract';

import { providers } from 'ethers';

const LOOT_SINGLETON_ADDRESS = '0xE4B40ea347Dffe40b5d0d562bF873d830C124643';
const GNOSIS = {
  SINGLETON: '0xd9db270c1b5e3bd161e8c8503c55ceabee709552',
  FALLBACK: '0xf48f2b2d2a534e402487b3ee7c18c33aec0fe5e4',
  MULTISEND: '0xa238cbeb142c10ef7ad8442c6d1f9e89e07e7761',
};
const POSTER_ADDRESS = '0x000000000000cd17345801aa8147b8D3950260FF';

const TEST = {
  NETWORK: '0x4',
  JORD: '0x756ee8B8E898D497043c2320d9909f1DD5a7077F',
};

const FACTORY_ADDRESS = '0x31C948A5Ad149853B211de025082b61573ef3979';

const INITIALIZATION_PARAMS = {
  SHARE_TOKEN_NAME: 'RAGE',
  SHARE_TOKEN_ADDRESS: 'Rage Token',
  LOOT_SINGLETON: LOOT_SINGLETON_ADDRESS,
  MULTISEND_ADDRESS: GNOSIS.MULTISEND,
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
  ARGS: [
    defaultEncode(
      ['uint32', 'uint32', 'uint256', 'uint256', 'uint256', 'uint256'],
      [10, 20, 50, 1, 2, 3]
    ),
  ],
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
  ACTION: 'mintShares',
  ARGS: {
    TO: [TEST.JORD], //address array
    AMOUNT: ['40'], //number array
  },
};
const LOOT_CONFIG = {
  CONTRACT: LOCAL_CONTRACT.BAAL,
  ACTION: 'mintLoot',
  ARGS: {
    TO: [TEST.JORD], //address array
    AMOUNT: ['100'], //number array
  },
};

const METADATA = safeEncodeHexFunction(
  LOCAL_CONTRACT.POSTER,
  'post',
  Object.values({
    JSON: JSON.stringify({ name: 'Salty Nonce DAO' }),
    TAG: 'daohaus.metadata.summoner',
  })
);
const METADATA_CONFIG = {
  CONTRACT: LOCAL_CONTRACT.BAAL,
  ACTION: 'executeAsBaal',
  ARGS: {
    TO: POSTER_ADDRESS,
    VALUE: 0,
    DATA: METADATA,
  },
};

const rawActions = [
  ADMIN_CONFIG,
  GOVERNANCE_CONFIG,
  SHAMAN_CONFIG,
  SHARES_CONFIG,
  LOOT_CONFIG,
  METADATA_CONFIG,
];

export const initializationActions = rawActions.map((action) => {
  return safeEncodeHexFunction(
    action.CONTRACT,
    action.ACTION,
    Object.values(action.ARGS)
  );
});

export const initializationParams = defaultEncode(
  ['string', 'string', 'address', 'address'],
  Object.values(INITIALIZATION_PARAMS)
);

export const summon = async (
  provider: providers.Web3Provider,
  args: ArgType[]
) => {
  try {
    const contract = new ethers.Contract(
      FACTORY_ADDRESS,
      LOCAL_CONTRACT.BAAL_FACTORY,
      provider.getSigner()
    );
    await contract.functions.summonBaalAndSafe(...args);
  } catch (error) {
    // errors.forEach(console.error);
    console.error(error);
  }
};
