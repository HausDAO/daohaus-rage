import { FunctionComponent } from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

import { useFormContext } from 'react-hook-form';

import { styled } from '../../stitches.config';

import { Field } from '../types/trashFormTypes';

import InputWrapper from './InputWrapper';

const StyledCheckBox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  backgroundColor: 'white',
  width: 25,
  height: 25,
  borderColor: '$gray11',
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 2px 10px $red5`,
  '&:hover': { backgroundColor: '$red5' },
  '&:focus': { boxShadow: `0 0 0 2px $red5` },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: '$gray11',
});

const GenericCheckBox: FunctionComponent<Field> = (props) => {
  const { id } = props;
  const { register } = useFormContext();

  return (
    <InputWrapper {...props}>
      <StyledCheckBox id={id} {...register(id)} name={id} defaultChecked={true}>
        <StyledIndicator>
          <CheckIcon />
        </StyledIndicator>
      </StyledCheckBox>
    </InputWrapper>
  );
};

export default GenericCheckBox;
