export type Field = {
  id: string;
  label: string;
  type: string;
};
export type TrashForm = {
  title?: string;
  description?: string;
  items: Field[];
  submitText?: string;
  log?: boolean;
};
export type FormCollection = {
  [formRef: string]: TrashForm;
};
