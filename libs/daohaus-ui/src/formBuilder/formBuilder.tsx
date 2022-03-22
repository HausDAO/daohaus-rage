import { FunctionComponent, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, FormContainer } from '..';
import {
  Field,
  FieldFactory,
  FormValues,
  SubmitFormCallback,
  TrashForm,
} from '../types/formTypes';
import { FormFactory } from './formFactory';

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
          <FormFactory {...field} key={field.id} customFields={customFields} />
        ))}
        <Button onClick={handleSubmit(formSubmit)} type="submit">
          {form.submitText || 'Submit Form'}
        </Button>
      </FormContainer>
    </FormProvider>
  );
};

export default FormBuilder;
