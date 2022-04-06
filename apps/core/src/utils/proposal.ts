import { ethers, providers } from 'ethers';
import { LOCAL_ABI } from '@daohaus/local-abis';
import {
  encodeMultiAction,
  safeEncodeHexFunction,
  SubAction,
  toBaseUnits,
} from '@daohaus/haus-sdk';

export const TEST = {
  SOME_GUY: '0xDE6bcde54CF040088607199FC541f013bA53C21E',
  AMT: 100,
  DAO: '0xfe53688bf0a5b5be52cc6d2c6c715b3d8b312364',
};

export const PROPOSAL_TYPES = {
  FREE: 'Free Shit Proposal',
} as const;
export const CONTENT_TYPES = {
  LINK: 'link',
  LINKS: 'arrayOfLinks',
  MD: 'markdown',
  PINATA_MD: 'pinataMarkdown',
} as const;

const MINT_SHARES = {
  ABI: LOCAL_ABI.BAAL,
  NAME: 'mintShares',
  ARGS: [[TEST.SOME_GUY], [TEST.AMT]],
};

const PROPOSAL_MULTICALL_DATA: SubAction[] = [
  {
    to: TEST.DAO,
    data: safeEncodeHexFunction(
      MINT_SHARES.ABI,
      MINT_SHARES.NAME,
      MINT_SHARES.ARGS
    ),
    value: 0,
    operation: 0,
  },
];

// type ValueOf<T> = T[keyof T];

// type ContentURI = {
//   type: ValueOf<typeof CONTENT_TYPES>;
//   content: string | ContentURI[];
//   [index: string]: unknown;
// };

// type ProposalDetails = {
//   title: string;
//   proposalType: ValueOf<typeof PROPOSAL_TYPES>;
//   description?: string;
//   contentURI?: ContentURI;
// };

// const createProposalDetails = (detailsObject: ProposalDetails) =>
//   JSON.stringify({
//     ...detailsObject,
//     contentURI: JSON.stringify(detailsObject.contentURI),
//   });

const proposaDetails = JSON.stringify({
  title: '20 Share Giveaway w/ schema!',
  description: 'Give 20 share to some random address w/ schema',
  contentURI: 'https://www.twistedchickentenders.com/',
  contentURIType: 'link',
  proposalType: PROPOSAL_TYPES.FREE,
});
const proposalData = encodeMultiAction(
  LOCAL_ABI.GNOSIS_MULTISEND,
  'multiSend',
  PROPOSAL_MULTICALL_DATA
);
const args = [proposalData, 0, proposaDetails];

export const sendProposal = async (
  provider: providers.Web3Provider,
  contractArgs = args
) => {
  try {
    const contract = new ethers.Contract(
      TEST.DAO,
      LOCAL_ABI.BAAL,
      provider.getSigner()
    );

    console.log('contractArgs', contractArgs);
    await contract.functions.submitProposal(...contractArgs);
  } catch (error) {
    console.error(error);
  }
};

export const handleProposalArgs = (formValues: {
  [index: string]: unknown;
}) => {
  console.log('formValues', formValues);
  const { title, description, sharesRequested, lootRequested, address } =
    formValues;

  const formattedShares = sharesRequested
    ? toBaseUnits(sharesRequested as string)
    : '0';
  const formattedLoot = lootRequested
    ? toBaseUnits(lootRequested as string)
    : '0';

  return [
    encodeMultiAction(LOCAL_ABI.GNOSIS_MULTISEND, 'multiSend', [
      {
        to: TEST.DAO,
        data: safeEncodeHexFunction(LOCAL_ABI.BAAL, 'mintShares', [
          [address as string],
          [formattedShares],
        ]),
        value: 0,
        operation: 0,
      },
      {
        to: TEST.DAO,
        data: safeEncodeHexFunction(LOCAL_ABI.BAAL, 'mintLoot', [
          [address as string],
          [formattedLoot],
        ]),
        value: 0,
        operation: 0,
      },
    ]),
    0,
    JSON.stringify({
      title,
      description,
      proposalType: PROPOSAL_TYPES.FREE,
    }),
  ];
};
