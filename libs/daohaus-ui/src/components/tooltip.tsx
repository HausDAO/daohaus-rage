import React from 'react';
import styled from 'styled-components';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { BORDER, COLOR, FONT } from '../styles/global';
import { BiErrorCircle } from 'react-icons/bi';
import { fadeIn } from '../utils/animations';

const StyledContent = styled(TooltipPrimitive.Content)`
  background-color: ${COLOR.BG[100]};
  border-radius: ${BORDER.RADIUS};
  padding: 1.2rem 1.5rem;
  font-size: ${FONT.SIZE.SM};
  line-height: 2.4rem;
  color: ${FONT.COLOR};
  &[data-state='delayed-open'] {
    animation: ${fadeIn} 0.2s ease-in forwards;
  }
`;

const StyledArrow = styled(TooltipPrimitive.Arrow)`
  fill: ${COLOR.BG[100]};
`;

export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = styled(TooltipPrimitive.Trigger)`
  background-color: ${COLOR.BASE_BG};
  border: none;
`;
export const TooltipContent = StyledContent;

const Tooltip = ({
  content = 'Your content here',
  side = 'right',
  triggerEl = <BiErrorCircle size="1.4rem" color={COLOR.WARNING} />,
}: {
  content: string | React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  triggerEl: string | React.ReactNode;
}) => {
  return (
    <TooltipPrimitive.Provider delayDuration={400}>
      <TooltipRoot>
        <TooltipTrigger>{triggerEl}</TooltipTrigger>
        <StyledContent side={side} sideOffset={18}>
          {content}
          <StyledArrow />
        </StyledContent>
      </TooltipRoot>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
