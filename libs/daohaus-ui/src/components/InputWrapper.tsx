import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Label from './Label';
import { ErrorText, HelperText, SuccessText, WarningText } from './typography';

type WrapperProps = {
  id: string;
  label: string;
  helperText?: string;
  successText?: string;
  errorText?: string;
  warningText?: string;
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
  warningText,
}) => {
  return (
    <InputContainer>
      <Label htmlFor={id}>{label}</Label>
      <div>{children}</div>
      {helperText && (
        <HelperText className="guide-text">{helperText}</HelperText>
      )}
      {successText && <SuccessText>{successText}</SuccessText>}
      {errorText && <ErrorText>{errorText}</ErrorText>}
      {warningText && <WarningText>{warningText}</WarningText>}
    </InputContainer>
  );
};

export default InputWrapper;
