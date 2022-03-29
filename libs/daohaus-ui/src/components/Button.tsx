import { styled } from '../stitches.config';

export const Button = styled('button', {
  border: 'none',
  borderRadius: '.4rem',
  fontFamily: '$body',
  padding: '1rem',
  '& + button': {
    marginLeft: '1rem',
  },
  variants: {
    small: {
      true: { height: '3.6rem', fontSize: '1.2rem' },
    },
    medium: {
      true: { height: '4.8rem', fontSize: '1.6rem' },
    },
    large: {
      true: { height: '6rem', fontSize: '2rem' },
    },

    primary: {
      true: {
        backgroundColor: '$yellow7',
        color: '$gray12',
        '&:hover': {
          // backgroundColor: '$yellow8',
          border: '.2rem solid $blue9',
        },
      },
    },
    secondary: {
      true: {
        backgroundColor: '$gray1',
        color: '$gray12',
        '&:hover': {
          // backgroundColor: '$gray2',
          border: '.2rem solid $blue9',
        },
      },
    },
  },

  defaultVariants: {
    primary: true,
    medium: true,
  },
});
