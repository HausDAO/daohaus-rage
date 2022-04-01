import { FunctionComponent } from 'react';

import { styled } from '../stitches.config';

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
