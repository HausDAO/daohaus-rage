import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

import styled from 'styled-components';

import { Field } from '../types/formTypes';

import InputWrapper from './InputWrapper';

// common styles across all borders

const BORDER = {
  RADIUS: '0.4rem',
};

//  common styles across all fonts
const FONT = {
  SIZE: {
    SM: '1.6rem',
  },
  FAMILY: {
    BODY: 'Mulish',
  },
};

//  common styles across all colors
const COLOR = {
  BG: {
    100: 'rgba(255, 255, 255, 0.1)',
    200: 'rgba(255, 255, 255, 0.2)',
  },
  TEXT: {
    STANDARD: '#FFFFFF',
    PLACE_HOLDER: 'rgba(255, 255, 255, 0.9)',
  },
};

//  Common styles across all fields
const FIELD = {
  TEXT_COLOR: COLOR.TEXT.STANDARD,
  BG_COLOR: COLOR.BG[100],
  BG_COLOR_FOCUS: COLOR.BG[200],
  BORDER_RADIUS: BORDER.RADIUS,
  FONT_SIZE: FONT.SIZE.SM,
  FONT_WEIGHT: '400',
  LINE_HEIGHT: '2.4rem',
  FONT: FONT.FAMILY.BODY,
  TRANSITION: '0.2s all',
};

export const StyledInput = styled.input`
  background-color: ${FIELD.BG_COLOR};
  color: ${FIELD.TEXT_COLOR};
  font-size: ${FIELD.FONT_SIZE};
  line-height: ${FIELD.LINE_HEIGHT};
  font-weight: ${FIELD.FONT_WEIGHT};
  font-family: ${FIELD.FONT};
  height: 4.8rem;
  max-width: 28rem;
  width: 100%;
  border: none;
  border-radius: ${FIELD.BORDER_RADIUS};
  letter-spacing: 1.2px;
  padding: 12px 18px;
  transition: ${FIELD.TRANSITION};
  ::placeholder {
    color: ${COLOR.TEXT.PLACE_HOLDER};
  }
  :focus {
    background-color: ${FIELD.BG_COLOR_FOCUS};
    outline: none;
  }
`;

export const Input: FunctionComponent<typeof StyledInput | Field> = (props) => (
  <StyledInput {...props} />
);

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
