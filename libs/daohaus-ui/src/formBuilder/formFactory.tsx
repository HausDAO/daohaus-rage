import { FunctionComponent } from 'react';
import { GenericCheckBox, GenericInput, GenericTextArea, ListBox } from '..';
import { Field, FieldFactory } from '../types/formTypes';

const coreFields: FieldFactory = {
  input: GenericInput,
  textarea: GenericTextArea,
  checkBox: GenericCheckBox,
  ListBox: ListBox,
};

export const FormFactory: FunctionComponent<
  Field & { customFields?: FieldFactory }
> = (props) => {
  const type: keyof FieldFactory = props.type;
  const { customFields } = props;
  const SelectedField = customFields
    ? { ...coreFields, ...customFields }[type]
    : coreFields[type];

  return SelectedField ? <SelectedField {...props} /> : null;
};
