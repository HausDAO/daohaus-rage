import { ethers } from 'ethers';
import { ABI } from '../types/contract';
import { isArray, isBoolean, isNumber, isString } from './general';

export const isArgType = (item: unknown) =>
  isBoolean(item) || isString(item) || isNumber(item) || isArray(item);

export const defaultEncode = (
  typesArray: string[],
  argArray: (string | number)[]
): string => {
  return ethers.utils.defaultAbiCoder.encode(typesArray, argArray);
};

export const safeEncodeHexFunction = (
  abi: ABI,
  fnName: string,
  functionArgs: string[]
): string | { error: boolean; message: string } => {
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
