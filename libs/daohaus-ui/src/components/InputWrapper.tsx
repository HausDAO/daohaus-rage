import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Color, Font } from '../styles/global';
import { Field } from '../types/formTypes';
import Label from './Label';
import Tooltip from './tooltip';
import { ErrorText, HelperText, SuccessText, WarningText } from './typography';

const InputContainer = styled.div`
  .guide-text {
    margin-top: 12px;
  }
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  label {
    margin-right: 10px;
  }
  svg {
    transform: translateY(0.1rem);
  }
  .required-asterisk {
    margin-right: 8px;
    font-weight: ${Font.Weight.Bold};
    color: ${Color};
    transform: translateY(-0.25rem);
  }
`;

const InputWrapper: FunctionComponent<Field> = ({
  children,
  id,
  label,
  helperText,
  successText,
  errorText,
  warningText,
  info,
  required,
}) => {
  return (
    <InputContainer>
      <TopSection>
        {required && <span className="required-asterisk">*</span>}
        <Label htmlFor={id}>{label}</Label>
        {info && <Tooltip content={info} />}
      </TopSection>
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
