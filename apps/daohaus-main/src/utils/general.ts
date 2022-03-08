import { ContractAction } from '../types/contract';

export const getNonce = (length = 16) => {
  let text = '';
  const possible = '0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const encodeAction = (action: ContractAction): string => {
  return '';
};
