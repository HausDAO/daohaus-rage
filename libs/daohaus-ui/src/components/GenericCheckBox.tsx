import { FunctionComponent } from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

import { useFormContext } from 'react-hook-form';

import { styled } from '../stitches.config';

import { Field } from '../types/formTypes';

import InputWrapper from './InputWrapper';

const StyledCheckBox = styled(CheckboxPrimitive.Root, {
  backgroundColor: 'transparent',
  border: '.1rem solid $gray1',
  width: '2.5rem',
  height: '2.5rem',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: '$yellow7',
});

const GenericCheckBox: FunctionComponent<Field> = (props) => {
  const { id } = props;
  const { register } = useFormContext();

  return (
    <InputWrapper {...props}>
      <StyledCheckBox id={id} {...register(id)} name={id}>
        <StyledIndicator>
          <CheckIcon />
        </StyledIndicator>
      </StyledCheckBox>
    </InputWrapper>
  );
};

export default GenericCheckBox;
