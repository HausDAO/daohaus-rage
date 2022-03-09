import { AbiItem } from 'web3-utils';

type Arg = {
  internalType?: string;
  name: string;
  type: string;
};

export type ArgType = string | number | boolean;
type LooseABIAction = {
  [index: string]: any;
};
type KeyChain = {
  '0x4': string;
};
export type ABIfunction = {
  name: string;
  function: string;
  type: string;
  stateMutability: string;
  inputs: Arg[];
  outputs: Arg[];
};

export type CONTRACT = {
  abi: LooseABIAction[];
  address: KeyChain;
};
export type ContractAction = {
  CONTRACT: AbiItem[];
  ACTION: string;
  ARGS: {
    [index: string]: ArgType | Array<ArgType>;
  };
};
