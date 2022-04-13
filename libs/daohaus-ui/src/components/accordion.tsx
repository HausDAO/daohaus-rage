import React from 'react';
// import { styled, keyframes } from '@stitches/react';

// import { ChevronDownIcon } from '@radix-ui/react-icons';
// import * as AccordionPrimitive from '@radix-ui/react-accordion';

// const slideDown = keyframes({
//   from: { height: 0 },
//   to: { height: 'var(--radix-accordion-content-height)' },
// });

// const slideUp = keyframes({
//   from: { height: 'var(--radix-accordion-content-height)' },
//   to: { height: 0 },
// });

// const StyledAccordion = styled(AccordionPrimitive.Root, {
//   borderRadius: '.4rem',
//   width: '100%',
// });

// const StyledItem = styled(AccordionPrimitive.Item, {
//   overflow: 'hidden',
//   marginTop: 1,

//   '&:first-child': {
//     marginTop: 0,
//     borderTopLeftRadius: 4,
//     borderTopRightRadius: 4,
//   },

//   '&:last-child': {
//     borderBottomLeftRadius: 4,
//     borderBottomRightRadius: 4,
//   },

//   '&:focus-within': {
//     position: 'relative',
//     zIndex: 1,
//   },
// });
// const StyledHeader = styled(AccordionPrimitive.Header, {
//   all: 'unset',
//   display: 'flex',
// });
// const StyledTrigger = styled(AccordionPrimitive.Trigger, {
//   all: 'unset',
//   fontFamily: 'inherit',
//   backgroundColor: 'transparent',
//   padding: '0 20px',
//   height: 45,
//   flex: 1,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   fontSize: 15,
//   lineHeight: 1,
//   // color: violet.violet11,
//   // boxShadow: `0 1px 0 ${mauve.mauve6}`,
//   // '&[data-state="closed"]': { backgroundColor: 'white' },
//   // '&[data-state="open"]': { backgroundColor: 'white' },
//   // '&:hover': { backgroundColor: mauve.mauve2 },
// });
// const StyledContent = styled(AccordionPrimitive.Content, {
//   overflow: 'hidden',
//   fontSize: 15,
//   color: 'white',
//   '&[data-state="open"]': {
//     animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
//   },
//   '&[data-state="closed"]': {
//     animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
//   },
// });
// const StyledContentText = styled('div', {
//   padding: '15px 20px',
//   color: 'white',
// });

// const StyledChevron = styled(ChevronDownIcon, {
//   transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
//   '[data-state=open] &': { transform: 'rotate(180deg)' },
// });
// export const Accordion = (props) => {
//   return <StyledAccordion {...props} />;
// };
// export const AccordionItem = StyledItem;
// export const AccordionTrigger = React.forwardRef(
//   ({ children, ...props }, forwardedRef) => (
//     <StyledHeader>
//       <StyledTrigger {...props} ref={forwardedRef}>
//         {children}
//         <StyledChevron aria-hidden />
//       </StyledTrigger>
//     </StyledHeader>
//   )
// );
// export const AccordionContent = React.forwardRef(
//   ({ children, ...props }, forwardedRef) => (
//     <StyledContent {...props} ref={forwardedRef}>
//       <StyledContentText>{children}</StyledContentText>
//     </StyledContent>
//   )
// );
