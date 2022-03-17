import { ethers } from 'ethers';

export const defaultEncode = (
  typesArray: string[],
  argArray: (string | number)[]
): string => {
  return ethers.utils.defaultAbiCoder.encode(typesArray, argArray);
};
