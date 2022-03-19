//  function submitProposal(
//      bytes calldata proposalData,
//      uint32 expiration,
//      string calldata details
//  )
// const selfTransferAction = encodeMultiAction(
//   abi. multisend,
//   data: hexCode,
//   to: address,
//   value: 0,
//   operation: 0,
// );
// proposal = {
//   flag: 0,
//   account: summoner.address,
//   data: selfTransferAction,
//   details: 'all hail baal',
//   expiration: 0,
// };

import { LOCAL_ABI } from '@daohaus-monorepo/local-abis';
import {
  encodeMultiAction,
  safeEncodeHexFunction,
  SubAction,
} from '@daohaus/haus-sdk';
import { ethers } from 'ethers';
import { providers } from 'ethers';

const TEST = {
  SOME_GUY: '0xDE6bcde54CF040088607199FC541f013bA53C21E',
  AMT: 100,
  DAO: '0xfe53688bf0a5b5be52cc6d2c6c715b3d8b312364',
  PROPOSAL_TYPE: 'Test Proposal',
};

const MINT_SHARES = {
  ABI: LOCAL_ABI.BAAL,
  NAME: 'mintShares',
  ARGS: [[TEST.SOME_GUY], [TEST.AMT]],
};
// const SECONDS = {
//   WEEK: 604800,
// };

// const SEND_FUNDS = Object.values({
//   ABI: LOCAL_ABI.BAAL,
//   NAME: 'mintShares',
//   ARGS: [['to'], ['amount']],
// });

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

const proposaDetails = JSON.stringify({
  title: '20 Share Giveaway',
  description: 'Give 20 share to some random address',
  link: 'https://www.twistedchickentenders.com/',
  proposalType: TEST.PROPOSAL_TYPE,
});
export const sendProposal = async (provider: providers.Web3Provider) => {
  const proposalData = encodeMultiAction(
    LOCAL_ABI.GNOSIS_MULTISEND,
    'multiSend',
    PROPOSAL_MULTICALL_DATA
  );

  const args = [proposalData, 0, proposaDetails];
  try {
    const contract = new ethers.Contract(
      TEST.DAO,
      LOCAL_ABI.BAAL,
      provider.getSigner()
    );
    console.log('contract', contract);
    await contract.functions.submitProposal(...args);
  } catch (error) {
    console.error(error);
  }
};
