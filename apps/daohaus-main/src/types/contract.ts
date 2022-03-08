type ArgType = string | number | boolean;

export type ContractAction = {
  CONTRACT: string;
  ACTION: string;
  ARGS: {
    [index: string]: ArgType | Array<ArgType>;
  };
};
