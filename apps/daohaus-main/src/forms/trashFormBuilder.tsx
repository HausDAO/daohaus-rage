import { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';

import { Field } from '../types/trashFormTypes';
import { TrashForm } from '../types/trashFormTypes';

const FormContainer = styled.div`
  margin-top: 4rem;
  max-width: 30rem;
  form {
    width: 100%;
  }
  .input-wrapper {
    margin-bottom: 2rem;
    width: 100%;
    input,
    textarea,
    label {
      width: 100%;
    }
  }
`;

const TrashFormBuilder: FunctionComponent<{ form: TrashForm }> = (props) => {
  const { form } = props;
  const { log, items } = form;
  const formMethods = useForm();
  const { watch } = formMethods;
  const formValues = watch();
  const handleSubmit = () => {
    console.log('shit');
  };

  useEffect(() => {
    formValues && log && console.log(formValues);
  }, [log, formValues]);

  return (
    <FormProvider {...formMethods}>
      <FormContainer>
        <form>
          {items.map((field: Field) => (
            <FieldFactory {...field} key={field.id} />
          ))}
          <button onClick={handleSubmit}>
            {form.submitText || 'Submit Form'}
          </button>
        </form>
      </FormContainer>
    </FormProvider>
  );
};

export default TrashFormBuilder;

const FieldFactory: FunctionComponent<Field> = (props) => {
  const { type } = props;
  if (type === 'input') {
    return <GenericInput {...props} />;
  }
  if (type === 'textarea') {
    return <GenericTextArea {...props} />;
  }
  if (type === 'checkBox') {
    return <GenericCheckBox {...props} />;
  }
  return null;
};

const InputWrapper: FunctionComponent<Field> = ({ children, id, label }) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <div>{children}</div>
    </div>
  );
};

const GenericInput: FunctionComponent<Field> = (props) => {
  const { id } = props;
  const { register } = useFormContext();
  return (
    <InputWrapper {...props}>
      <input id={id} {...register(id)} />
    </InputWrapper>
  );
};
const GenericTextArea: FunctionComponent<Field> = (props) => {
  const { id } = props;
  const { register } = useFormContext();
  return (
    <InputWrapper {...props}>
      <textarea id={id} rows={5} {...register(id)} />
    </InputWrapper>
  );
};
const GenericCheckBox: FunctionComponent<Field> = (props) => {
  const { id } = props;
  const { register } = useFormContext();
  return (
    <InputWrapper {...props}>
      <input id={id} type="checkbox" {...register(id)} defaultChecked={true} />
    </InputWrapper>
  );
};
