import { blue } from '@radix-ui/colors/types/dark/blue';
import { Label } from '@radix-ui/react-label';
import { FunctionComponent } from 'react';

import { styled } from '../../stitches.config';
import GenericInput from './GenericInput';
import GenericTextArea from './GenericTextArea';

const StyledFormContainer = styled('div', {
  marginTop: '4rem',
  maxWidth: '30rem',
  '& form': {
    width: '100%',
  },
  '& .input-wrapper': {
    marginBottom: '2rem',
    width: '100%',
    '& input, textarea, label': {
      width: '100%',
    },
  },
});

const FormContainer: FunctionComponent = ({ children }) => {
  return (
    <StyledFormContainer>
      <form>{children}</form>
    </StyledFormContainer>
  );
};

export default FormContainer;
