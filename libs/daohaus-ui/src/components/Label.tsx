import { styled } from '@stitches/react';
import { redA } from '@radix-ui/colors';
import * as LabelPrimitive from '@radix-ui/react-label';
import { FunctionComponent } from 'react';

const StyledLabel = styled(LabelPrimitive.Root, {
  color: redA.redA10,
});

const Label: FunctionComponent<{ htmlFor: string }> = ({
  htmlFor,
  children,
}) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

export default Label;
