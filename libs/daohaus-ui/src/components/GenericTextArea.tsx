import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

import { styled } from '../../stitches.config';

import { Field } from '../types/trashFormTypes';

import InputWrapper from './InputWrapper';

const StyledTextArea = styled('textarea', {
  fontSize: '$normal',
});

const GenericTextArea: FunctionComponent<Field> = (props) => {
  const { id } = props;
  const { register } = useFormContext();
  return (
    <InputWrapper {...props}>
      <StyledTextArea id={id} rows={5} {...register(id)} />
    </InputWrapper>
  );
};

export default GenericTextArea;
