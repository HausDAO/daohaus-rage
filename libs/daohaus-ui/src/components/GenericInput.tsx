import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons';
import styled from 'styled-components';
import { Field } from '../styles/form';
import { Font } from '../styles/global';

import { Field as FieldType } from '../types/formTypes';

import InputWrapper from './InputWrapper';

type InputComponent = FieldType & {
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
  const { id } = props;
  const { register } = useFormContext();
  return (
    <InputWrapper {...props}>
      <Input {...register(id)} {...props} />
    </InputWrapper>
  );
};

const StyledInput = styled.input`
  background-color: ${Field.BgColor};
  color: ${Field.TextColor};
  font-size: ${Field.FontSize};
  line-height: 2.4rem;
  font-weight: ${Font.Weight.Medium};
  font-family: ${Field.Font};
  height: 4.8rem;
  max-width: ${Field.Size.Md};
  width: 100%;
  border: none;
  border-radius: ${Field.BorderRadius};
  letter-spacing: 1.2px;
  padding: 12px 18px;
  transition: ${Field.Transition};
  ::placeholder {
    color: ${Field.PlaceHolderColor};
  }
  :focus {
    background-color: ${Field.BgColor_Focus};
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
    color: ${Field.IconColor};
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
