import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Label from './Label';
import { HelperText, SuccessText } from './typography';

type WrapperProps = {
  id: string;
  label: string;
  helperText?: string;
  successText?: string;
  errorText?: string;
};

const InputContainer = styled.div`
  .guide-text {
    margin-top: 1.1rem;
  }
`;

const InputWrapper: FunctionComponent<WrapperProps> = ({
  children,
  id,
  label,
  helperText,
  successText,
  errorText,
}) => {
  return (
    <InputContainer>
      <Label htmlFor={id}>{label}</Label>
      <div>{children}</div>
      {helperText && (
        <HelperText className="guide-text">{helperText}</HelperText>
      )}
      {successText && <SuccessText>{successText}</SuccessText>}
      {errorText && <SuccessText>{errorText}</SuccessText>}
    </InputContainer>
  );
};

export default InputWrapper;
