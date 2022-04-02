import { FunctionComponent } from 'react';
import Label from './Label';

type WrapperProps = {
  id: string;
  label: string;
};
const InputWrapper: FunctionComponent<WrapperProps> = ({
  children,
  id,
  label,
}) => {
  return (
    <div className="input-wrapper">
      <Label htmlFor={id}>{label}</Label>
      <div>{children}</div>
    </div>
  );
};

export default InputWrapper;
