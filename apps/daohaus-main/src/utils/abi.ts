import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

export const safeEncodeHexFunction = (
  abiItem: AbiItem,
  functionArgs: string[]
): string | { error: boolean; message: string } => {
  if (!abiItem || !Array.isArray(functionArgs))
    throw new Error(
      'Incorrect params passed to safeEncodeHexFunction in abi.js'
    );
  try {
    const web3 = new Web3();
    return '';
    // return web3.eth.abi.encodeFunctionCall(abiItem, functionArgs);
  } catch (error) {
    return {
      error: true,
      message:
        'Could not encode transaction data with the values entered into this form',
    };
  }
};
