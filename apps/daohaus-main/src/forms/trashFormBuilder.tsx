import { FunctionComponent } from 'react';

import { Field } from '../types/trashFormTypes';
import { TrashForm } from '../types/trashFormTypes';

const TrashFormBuilder: FunctionComponent<{ form: TrashForm }> = (props) => {
  const { form } = props;
  const handleSubmit = () => {
    console.log('shit');
  };
  return (
    <form>
      {form.items.map((field: Field) => (
        <FieldFactory {...field} key={field.id} />
      ))}
      <button onClick={handleSubmit} />
    </form>
  );
};

export default TrashFormBuilder;

const FieldFactory: FunctionComponent<Field> = (props) => {
  const { type } = props;
  if (type === 'input') {
    return <GenericInput {...props} />;
  }
  return null;
};

const InputWrapper: FunctionComponent<Field> = ({ children, id, label }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {children}
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
