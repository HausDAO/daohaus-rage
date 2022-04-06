import { encodeMultiSend, MetaTransaction } from '@gnosis.pm/safe-contracts';

import { ethers } from 'ethers';
import { isArray, isBoolean, isNumber, isString } from './index';
import { ABI, ArgType, ErrorType, SubAction } from '../types';

export const isArgType = (item: unknown) =>
  isString(item) || isNumber(item) || isBoolean(item) || isArray(item);

export const defaultEncode = (
  typesArray: string[],
  argArray: (string | number)[]
): string => {
  return ethers.utils.defaultAbiCoder.encode(typesArray, argArray);
};

export const safeEncodeHexFunction = (
  abi: ABI,
  fnName: string,
  functionArgs: ArgType[]
): string | ErrorType => {
  try {
    if (!abi || !Array.isArray(functionArgs))
      throw new Error(
        'Incorrect params passed to safeEncodeHexFunction in abi.js'
      );
    const abiString = JSON.stringify(abi);
    const ethersInterface = new ethers.utils.Interface(abiString);
    return ethersInterface.encodeFunctionData(fnName, functionArgs);
  } catch (error) {
    console.log('error', error);
    return {
      error: true,
      message:
        'Could not encode transaction data with the values entered into this form',
    };
  }
};

export const encodeMultiAction = (
  abi: ABI,
  fnName: string,
  actions: SubAction[]
) =>
  safeEncodeHexFunction(abi, fnName, [
    encodeMultiSend(actions as MetaTransaction[]),
  ]);
