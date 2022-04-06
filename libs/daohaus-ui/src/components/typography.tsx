import styled from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';
import { COLOR, FONT } from '../styles/global';
import { FunctionComponent } from 'react';

export const ParMd = styled.p`
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.8px;
`;
export const ParSm = styled.p`
  font-size: 1.2rem;
  line-height: 1.8rem;
  letter-spacing: 1.2px;
`;

export const HelperText = styled(ParSm)`
  color: ${FONT.COLOR_LOW_KEY};
`;

export const WithIcon = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-left: 6.5px;
  }
`;

export const SuccessText: FunctionComponent = ({ children }) => (
  <WithIcon className="guide-text">
    <AiOutlineCheck size="1.2rem" />
    <HelperText>{children}</HelperText>
  </WithIcon>
);
export const ErrorText: FunctionComponent = ({ children }) => (
  <WithIcon className="guide-text">
    <BiErrorCircle size="1.2rem" color={COLOR.ERROR} />
    <ParSm style={{ color: COLOR.ERROR }}>{children}</ParSm>
  </WithIcon>
);
export const WarningText: FunctionComponent = ({ children }) => (
  <WithIcon className="guide-text">
    <BiErrorCircle size="1.2rem" color={COLOR.WARNING} />
    <ParSm style={{ color: COLOR.WARNING }}>{children}</ParSm>
  </WithIcon>
);
