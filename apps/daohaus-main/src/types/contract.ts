import { AbiItem } from 'web3-utils';

export type ArgType = string | number | boolean | ArgType[];

type KeyChain = {
  '0x4': string;
};
export type JsonFragmentType = {
  readonly name?: string;
  readonly indexed?: boolean;
  readonly type?: string;
  readonly internalType?: string; // @TODO: in v6 reduce type
  readonly components?: ReadonlyArray<JsonFragmentType>;
};

export type JsonFragment = {
  readonly name?: string;
  readonly type?: string;

  readonly anonymous?: boolean;

  readonly payable?: boolean;
  readonly constant?: boolean;
  readonly stateMutability?: string;

  readonly inputs?: ReadonlyArray<JsonFragmentType>;
  readonly outputs?: ReadonlyArray<JsonFragmentType>;

  readonly gas?: string;
};

export type ABI = (JsonFragment | JsonFragmentType)[];

export type CONTRACT = {
  abi: ABI;
  address: KeyChain;
};
export type ContractAction = {
  CONTRACT: AbiItem[];
  ACTION: string;
  ARGS: {
    [index: string]: ArgType | Array<ArgType>;
  };
};
