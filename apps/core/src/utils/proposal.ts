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
  ABI,
  encodeMultiAction,
  ErrorType,
  safeEncodeHexFunction,
  SubAction,
} from '@daohaus/haus-sdk';
import { MetaTransaction } from '@gnosis.pm/safe-contracts';

const MINT_SHARES = {
  ABI: LOCAL_ABI.BAAL,
  NAME: 'mintShares',
  ARGS: [['to'], ['amount']],
};
const SECONDS = {
  WEEK: 604800,
};

// const SEND_FUNDS = Object.values({
//   ABI: LOCAL_ABI.BAAL,
//   NAME: 'mintShares',
//   ARGS: [['to'], ['amount']],
// });

const PROPOSAL_MULTICALL_DATA: SubAction[] = [
  {
    to: 'SAMPLE_DAO',
    data: safeEncodeHexFunction(
      MINT_SHARES.ABI,
      MINT_SHARES.NAME,
      MINT_SHARES.ARGS
    ),
    value: 0,
    operation: 0,
  },
];
const sendProposal = () => {
  const proposalData = encodeMultiAction(
    LOCAL_ABI.GNOSIS_MULTISEND,
    'multiSend',
    PROPOSAL_MULTICALL_DATA
  );
  console.log('proposalData', proposalData);
};
sendProposal();
