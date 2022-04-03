import { FunctionComponent } from 'react';
import { IconType } from 'react-icons';
export type Field = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  warningText?: string;
  icon?: IconType;
  error?: string;
  warning?: string;
  long: boolean;
};

export type TrashForm = {
  items: Field[];
  submitText?: string;
  log?: boolean;
};
export type FormValues = {
  [index: string]: unknown;
};
export type SubmitFormCallback = (formValues: FormValues) => void;
export type FieldFactory = { [index: string]: FunctionComponent<Field> };
