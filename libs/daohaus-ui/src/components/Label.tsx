import { FunctionComponent } from 'react';
import { Font } from '../styles/global';
import styled from 'styled-components';

const StyledLabel = styled.label`
  font-size: ${Font.Size.Md};
  line-height: 2.4rem;
  letter-spacing: 1.2px;
  color: ${Font.Color};
  display: block;
  font-weight: 400;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Label: FunctionComponent<{ htmlFor: string }> = ({
  htmlFor,
  children,
}) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

export default Label;
