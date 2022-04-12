import { FunctionComponent } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import styled from 'styled-components';
import { Color } from '../styles/global';
import { Field } from '../types/formTypes';
import Label from './Label';
import Tooltip from './tooltip';
import { ErrorText, HelperText, SuccessText, WarningText } from './typography';

type WrapperProps = {
  id: string;
  label: string;
  info: string;
  helperText?: string;
  successText?: string;
  errorText?: string;
  warningText?: string;
};

const InputContainer = styled.div`
  .guide-text {
    margin-top: 11px;
  }
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 11px;
  label {
    margin-right: 8px;
  }
  svg {
    transform: translateY(1px);
  }
  .required-asterisk {
    color: ${Color};
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
}) => {
  return (
    <InputContainer>
      <TopSection>
        {<span className="required-asterisk">*</span>}
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
