type ArgType = string | number | boolean;
type LooseABIAction = {
  [index: string]: any;
};
type KeyChain = {
  '0x4': string;
};

export type CONTRACT = {
  abi: LooseABIAction[];
  address: KeyChain;
};
export type ContractAction = {
  CONTRACT: string;
  ACTION: string;
  ARGS: {
    [index: string]: ArgType | Array<ArgType>;
  };
};
