import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

import styled from 'styled-components';
import { FIELD } from '../styles/form';
import { COLOR, FONT } from '../styles/global';

import { Field } from '../types/formTypes';

import InputWrapper from './InputWrapper';

export const StyledInput = styled.input`
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
`;

export const Input: FunctionComponent<typeof StyledInput | Field> = (props) => {
  const { icon, long } = props;

  const classes = classNames({ long });
  const Icon = icon;
  return Icon ? (
    <WithIcon>
      <StyledInput {...props} className={classes} />
      <Icon size="20px" className="appendIcon" />
    </WithIcon>
  ) : (
    <StyledInput {...props} className={classes} />
  );
};
// With all the trimmings

export const GenericInput: FunctionComponent<Field> = (props) => {
  const { id, label } = props;
  const { register } = useFormContext();
  return (
    <InputWrapper id={id} label={label}>
      <Input {...register(id)} {...props} />
    </InputWrapper>
  );
};

export default GenericInput;
