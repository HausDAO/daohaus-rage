import React from 'react';
import styled from 'styled-components';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Border, Color, Font } from '../styles/global';
import { BiErrorCircle } from 'react-icons/bi';
import { fadeIn } from '../utils/animations';

const Tooltip = ({
  content = 'Your content here',
  side = 'right',
  triggerEl = <BiErrorCircle size="1.4rem" color={Color.Info} />,
}: {
  content?: string | React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  triggerEl?: string | React.ReactNode;
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

const StyledContent = styled(TooltipPrimitive.Content)`
  background-color: ${Color.Bg[100]};
  border-radius: ${Border.Radius};
  padding: 1.2rem 1.5rem;
  font-size: ${Font.Size.Md};
  line-height: 2.4rem;
  color: ${Font.Color};
  &[data-state='delayed-open'] {
    animation: ${fadeIn} 0.15s ease-in forwards;
  }
`;

const StyledArrow = styled(TooltipPrimitive.Arrow)`
  fill: ${Color.Bg[100]};
`;

export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = styled(TooltipPrimitive.Trigger)`
  background-color: ${Color.BaseBg};
  border: none;
`;
export const TooltipContent = StyledContent;
