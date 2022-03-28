import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

import { styled } from '../stitches.config';

import { Field } from '../types/formTypes';

import InputWrapper from './InputWrapper';

const StyledInput = styled('input', {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '$gray1',
  fontFamily: '$body',
  fontWeight: '$regular',
  fontSize: '$small',
  width: '28rem',
  height: '4.8rem',
  borderRadius: '.4rem',
  border: 'none',
});

const GenericInput: FunctionComponent<Field> = (props) => {
  const { id } = props;
  const { register } = useFormContext();
  return (
    <InputWrapper {...props}>
      <StyledInput id={id} {...register(id)} />
    </InputWrapper>
  );
};

export default GenericInput;
