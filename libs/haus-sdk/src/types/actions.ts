import { ErrorType } from './general';

export type SubAction = {
  to: string;
  data: string | ErrorType;
  value: number;
  operation: number;
};
