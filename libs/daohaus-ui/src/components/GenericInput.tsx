import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

import { styled } from '../../stitches.config';

import { Field } from '../types/trashFormTypes';

import InputWrapper from './InputWrapper';

const StyledInput = styled('input', {
  fontFamily: '$bodyRegular',
  fontSize: '$normal',
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
