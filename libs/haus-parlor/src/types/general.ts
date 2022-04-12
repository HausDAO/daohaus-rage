export type ErrorType = {
  error: boolean;
  message: string;
};

export type SubAction = {
  to: string;
  data: string | ErrorType;
  value: number;
  operation: number;
};

export type Keychain = {
  '0x1'?: string;
  '0x2a'?: string;
  '0x4'?: string;
  '0x64'?: string;
  '0x89'?: string;
  '0xa4b1'?: string;
  '0xa4ec'?: string;
};

export type KeychainList = { [index: string]: Keychain };
