import { FunctionComponent } from 'react';
import { Field } from '../types/formTypes';
import Label from './Label';

const InputWrapper: FunctionComponent<Field> = ({ children, id, label }) => {
  return (
    <div className="input-wrapper">
      <Label htmlFor={id}>{label}</Label>
      <div>{children}</div>
    </div>
  );
};

export default InputWrapper;
