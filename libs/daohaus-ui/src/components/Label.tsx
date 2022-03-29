import { FunctionComponent } from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';

import { styled } from '../stitches.config';

const StyledLabel = styled(LabelPrimitive.Root, {
  fontFamily: '$body',
  fontWeight: '$regular',
  color: '$gray1',
  fontSize: '$normal',
});

const Label: FunctionComponent<{ htmlFor: string }> = ({
  htmlFor,
  children,
}) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

export default Label;
