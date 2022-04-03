import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons';
import styled from 'styled-components';
import { FIELD } from '../styles/form';
import { FONT } from '../styles/global';

import { Field } from '../types/formTypes';

import InputWrapper from './InputWrapper';

type InputComponent = Field & {
  icon?: IconType;
  button?: FunctionComponent;
};

export const Input: FunctionComponent<typeof StyledInput | InputComponent> = (
  props
) => {
  const { icon, long, button } = props;
  const classes = classNames({ long });
  if (icon) {
    const Icon = icon;
    return (
      <WithIcon className={classes}>
        <StyledInput {...props} className={classes} />
        <Icon size="20px" className="appendIcon" />
      </WithIcon>
    );
  }
  if (button) {
    const Button = button;
    return (
      <WithButton className={classes}>
        <StyledInput {...props} className={classes} />
        <Button />
      </WithButton>
    );
  }

  return <StyledInput {...props} className={classes} />;
};

export const GenericInput: FunctionComponent<InputComponent> = (props) => {
  const { id, label, helperText, successText, errorText, warningText } = props;
  const { register } = useFormContext();
  return (
    <InputWrapper
      id={id}
      label={label}
      helperText={helperText}
      successText={successText}
      errorText={errorText}
      warningText={warningText}
    >
      <Input {...register(id)} {...props} />
    </InputWrapper>
  );
};

const StyledInput = styled.input`
  background-color: ${FIELD.BG_COLOR};
  color: ${FIELD.TEXT_COLOR};
  font-size: ${FIELD.FONT_SIZE};
  line-height: 2.4rem;
  font-weight: 400;
  font-family: ${FONT.FAMILY.BODY};
  height: 4.8rem;
  max-width: ${FIELD.SIZE.MD};
  width: 100%;
  border: none;
  border-radius: ${FIELD.BORDER_RADIUS};
  letter-spacing: 1.2px;
  padding: 12px 18px;
  transition: ${FIELD.TRANSITION};

  ::placeholder {
    color: ${FONT.COLOR_PLACE_HOLDER};
  }
  :focus {
    background-color: ${FIELD.BG_COLOR_FOCUS};
    outline: none;
  }
  &.long {
    max-width: 52rem;
  }
`;

const WithIcon = styled.div`
  position: relative;
  width: 28rem;
  svg {
    position: absolute;
    color: ${FIELD.ICON_COLOR};
    top: 1.4rem;
    right: 2rem;
  }
  &.long {
    max-width: 52rem;
  }
`;

const WithButton = styled.div`
  position: relative;
`;
export default GenericInput;
