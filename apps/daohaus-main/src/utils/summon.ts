import { LOCAL_CONTRACT } from '../data/contracts';
import { defaultEncode, safeEncodeHexFunction } from './abi';
import { ethers } from 'ethers';
import { ArgType } from '../types/contract';

import { providers } from 'ethers';
import { isArrayString } from '../forms/formBuilderUtils';
import { getNonce } from './general';
import { KEYCHAIN } from '@daohaus/haus-sdk';

const TEST = {
  NETWORK: '0x4',
  JORD: '0x756ee8B8E898D497043c2320d9909f1DD5a7077F',
};

const INITIALIZATION_PARAMS = {
  SHARE_TOKEN_NAME: 'Rage Token',
  SHARE_TOKEN_SYMBOL: 'RAGE',
  LOOT_SINGLETON: KEYCHAIN.BAAL_LOOT_SINGLETON['0x2a'] as string,
  MULTISEND_ADDRESS: KEYCHAIN.GNOSIS_MULTISEND['0x2a'] as string,
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
      Object.values({
        VOTING_IN_SECONDS: 120,
        GRACE_IN_SECONDS: 60,
        PROPOSAL_OFFERING: 0,
        QUORUM_PERCENT: 0,
        SPONSOR_THRESHOLD: 2,
        MINIMUM_RETENTION_PERCENT: 66,
      })
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
    TO: KEYCHAIN.POSTER['0x2a'],
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
console.log('INITIALIATION_PARAMS', INITIALIZATION_PARAMS);
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
  console.log('args', args);
  try {
    const contract = new ethers.Contract(
      KEYCHAIN.BAAL_FACTORY['0x2a'] as string,
      LOCAL_CONTRACT.BAAL_FACTORY,
      provider.getSigner()
    );
    await contract.functions.summonBaalAndSafe(...args);
  } catch (error) {
    // errors.forEach(console.error);
    console.error(error);
  }
};
export type SummonFormData = {
  daoName: string;
  tokenName: string;
  tokenSymbol: string;
  votingPeriod: string;
  gracePeriod: string;
  newOffering: string;
  quorum: string;
  sponsorThreshold: string;
  minRetention: string;
  shamanAddresses: string;
  shamanPermissions: string;
  shareAddresses: string;
  shareAmounts: string;
  lootAddresses: string;
  lootAmounts: string;
  pauseLoot: string;
  pauseShares: string;
};

export const expectArrayString = (str: string) =>
  isArrayString(str) ? JSON.parse(str) : false;

export const handleSummonArgs = (formValues: SummonFormData) => {
  const initializationParams = defaultEncode(
    ['string', 'string', 'address', 'address'],
    [
      formValues.tokenName,
      formValues.tokenSymbol,
      KEYCHAIN.BAAL_LOOT_SINGLETON['0x2a'] as string,
      KEYCHAIN.GNOSIS_MULTISEND['0x2a'] as string,
    ]
  );
  const initializationActions = [
    { ...ADMIN_CONFIG, ARGS: [formValues.pauseShares, formValues.pauseLoot] },
    {
      ...GOVERNANCE_CONFIG,
      ARGS: [
        defaultEncode(
          ['uint32', 'uint32', 'uint256', 'uint256', 'uint256', 'uint256'],
          [
            formValues.votingPeriod,
            formValues.gracePeriod,
            formValues.newOffering,
            formValues.quorum,
            formValues.sponsorThreshold,
            formValues.minRetention,
          ]
        ),
      ],
    },
    {
      ...SHAMAN_CONFIG,
      ARGS: [
        expectArrayString(formValues.shamanAddresses) || [],
        expectArrayString(formValues.shamanPermissions) || [],
      ],
    },
    {
      ...SHARES_CONFIG,
      ARGS: [
        expectArrayString(formValues.shareAddresses) || [],
        expectArrayString(formValues.shareAmounts) || [],
      ],
    },
    {
      ...LOOT_CONFIG,
      ARGS: [
        expectArrayString(formValues.lootAddresses) || [],
        expectArrayString(formValues.lootAmounts) || [],
      ],
    },
    {
      ...METADATA_CONFIG,
      ARGS: [
        KEYCHAIN.POSTER['0x2a'],
        0, // value
        safeEncodeHexFunction(LOCAL_CONTRACT.POSTER, 'post', [
          JSON.stringify({ name: formValues.daoName }),
          'daohaus.metadata.summoner',
        ]),
      ],
    },
  ].map((action) => {
    return safeEncodeHexFunction(
      action.CONTRACT,
      action.ACTION,
      Object.values(action.ARGS)
    );
  });

  return [initializationParams, initializationActions, getNonce()];
};
