import { styled } from '../../stitches.config';

export const Button = styled('button', {
  variants: {
    size: {
      sm: {
        height: '36px',
        fontSize: '12px',
      },
      md: {
        height: '48px',
        fontSize: '16px',
      },
      lg: {
        height: '60px',
        fontSize: '20px',
      },
    },
    color: {
      yellow: {
        backgroundColor: '$yellow7',
        color: '$gray12',
      },
      white: {
        backgroundColor: '$gray1',
        color: '$gray12',
      },
      red: {
        backgroundColor: '$red7',
        color: '$gray12',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'yellow',
  },
});
