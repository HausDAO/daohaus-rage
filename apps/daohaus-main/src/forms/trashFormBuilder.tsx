import { FunctionComponent } from 'react';
import styled from 'styled-components';

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
  const handleSubmit = () => {
    console.log('shit');
  };
  return (
    <FormContainer>
      <form>
        {form.items.map((field: Field) => (
          <FieldFactory {...field} key={field.id} />
        ))}
        <button onClick={handleSubmit}>
          {form.submitText || 'Submit Form'}
        </button>
      </form>
    </FormContainer>
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
  return (
    <InputWrapper {...props}>
      <input id={id} />
    </InputWrapper>
  );
};
const GenericTextArea: FunctionComponent<Field> = (props) => {
  const { id } = props;
  return (
    <InputWrapper {...props}>
      <textarea id={id} rows={5} />
    </InputWrapper>
  );
};
const GenericCheckBox: FunctionComponent<Field> = (props) => {
  const { id } = props;
  return (
    <InputWrapper {...props}>
      <input id={id} type="checkbox" checked />
    </InputWrapper>
  );
};
