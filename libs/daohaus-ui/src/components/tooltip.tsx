import React from 'react';
import styled, { keyframes } from 'styled-components';
import { PlusIcon } from '@radix-ui/react-icons';
import { violet, blackA } from '@radix-ui/colors';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { BORDER, COLOR, FONT } from '../styles/global';
import { BiErrorCircle } from 'react-icons/bi';
import { JsxElement } from 'typescript';
import { IconType } from 'react-icons/lib';

const fadeIn = keyframes`
  from{
    opacity: 0
  }
  to {
    opactity: 1
  }
`;
const fadeOut = keyframes`
from{
    opacity: 1
  }
  to {
    opactity: 0
  }
`;

// const slideUpAndFade = keyframes({
//   '0%': { opacity: 0, transform: 'translateY(2px)' },
//   '100%': { opacity: 1, transform: 'translateY(0)' },
// });

// const slideRightAndFade = keyframes({
//   '0%': { opacity: 0, transform: 'translateX(-2px)' },
//   '100%': { opacity: 1, transform: 'translateX(0)' },
// });

// const slideDownAndFade = keyframes({
//   '0%': { opacity: 0, transform: 'translateY(-2px)' },
//   '100%': { opacity: 1, transform: 'translateY(0)' },
// });

// const slideLeftAndFade = keyframes({
//   '0%': { opacity: 0, transform: 'translateX(2px)' },
//   '100%': { opacity: 1, transform: 'translateX(0)' },
// });

const StyledContent = styled(TooltipPrimitive.Content)`
  /* background-color: '${COLOR.BG[100]}'; */
  background-color: ${COLOR.BG[100]};
  border-radius: ${BORDER.RADIUS};
  padding: 1.2rem 1.5rem;
  font-size: ${FONT.SIZE.SM};
  line-height: 2.4rem;
  color: ${FONT.COLOR};
`;

// const StyledContent = styled(TooltipPrimitive.Content, {
//   borderRadius: 4,
//   padding: '10px 15px',
//   fontSize: 15,
//   lineHeight: 1,
//   color: violet.violet11,
//   backgroundColor: 'white',
//   boxShadow:
//     'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
//   '@media (prefers-reduced-motion: no-preference)': {
//     animationDuration: '400ms',
//     animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
//     animationFillMode: 'forwards',
//     willChange: 'transform, opacity',
//     '&[data-state="delayed-open"]': {
//       '&[data-side="top"]': { animationName: slideDownAndFade },
//       '&[data-side="right"]': { animationName: slideLeftAndFade },
//       '&[data-side="bottom"]': { animationName: slideUpAndFade },
//       '&[data-side="left"]': { animationName: slideRightAndFade },
//     },
//   },
// });

const StyledArrow = styled(TooltipPrimitive.Arrow)`
  fill: ${COLOR.BG[100]};
`;

// Exports

export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = styled(TooltipPrimitive.Trigger)`
  background-color: ${COLOR.BASE_BG};
  border: none;
`;
export const TooltipContent = StyledContent;

// Your app...
// const IconButton = styled('button', {
//   all: 'unset',
//   fontFamily: 'inherit',
//   borderRadius: '100%',
//   height: 35,
//   width: 35,
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   color: violet.violet11,
//   backgroundColor: 'white',
//   boxShadow: `0 2px 10px ${blackA.blackA7}`,
//   '&:hover': { backgroundColor: violet.violet3 },
//   '&:focus': { boxShadow: `0 0 0 2px black` },
// });

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
