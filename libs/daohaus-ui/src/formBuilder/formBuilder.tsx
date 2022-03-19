import { FunctionComponent, useEffect } from 'react';
// import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Button,
  FormContainer,
  GenericCheckBox,
  GenericInput,
  GenericTextArea,
  ListBox,
} from '..';
import { Field, TrashForm } from '../types/trashFormTypes';

// SAGE, stricter typechecking

type FormValues = {
  [index: string]: unknown;
};
type SubmitFormCallback = (formValues: FormValues) => void;
type FieldFactory = { [index: string]: FunctionComponent<Field> };

const FormBuilder: FunctionComponent<{
  form: TrashForm;
  onSubmit: SubmitFormCallback;
  customFields?: FieldFactory;
}> = (props) => {
  const { form, onSubmit, customFields } = props;
  const { log, items } = form;
  const formMethods = useForm();
  const { watch, handleSubmit } = formMethods;
  const formValues = watch();

  const formSubmit = async (formValues: FormValues) => {
    onSubmit?.(formValues);
  };

  useEffect(() => {
    formValues && log && console.log(formValues);
  }, [log, formValues]);

  return (
    <FormProvider {...formMethods}>
      <FormContainer>
        {items.map((field: Field) => (
          <FieldFactory {...field} key={field.id} customFields={customFields} />
        ))}
        <Button onClick={handleSubmit(formSubmit)} type="submit">
          {form.submitText || 'Submit Form'}
        </Button>
      </FormContainer>
    </FormProvider>
  );
};

export default FormBuilder;

const coreFields: FieldFactory = {
  input: GenericInput,
  textarea: GenericTextArea,
  checkBox: GenericCheckBox,
  ListBox: ListBox,
};

const FieldFactory: FunctionComponent<
  Field & { customFields?: FieldFactory }
> = (props) => {
  const type: keyof FieldFactory = props.type;
  const { customFields } = props;
  const SelectedField = customFields
    ? { ...coreFields, ...customFields }[type]
    : coreFields[type];

  return SelectedField ? <SelectedField {...props} /> : null;
};
