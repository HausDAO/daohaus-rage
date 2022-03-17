import { createStitches } from '@stitches/react';
import { red, yellow, gray } from '@radix-ui/colors';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      ...gray,
      ...red,
      ...yellow,
    },
    fonts: {
      body: 'Mulish, sans-serif',
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      bold: '700',
      extraBold: '900',
    },

    fontSizes: {
      massive: '4.8rem',
      huge: '4.2rem',
      extraExtraLarge: '3.6rem',
      extraLarge: '3.2rem',
      larger: '2.8rem',
      large: '2.4rem',
      normal: '2.0rem',
      small: '1.6rem',
      extraSmall: '1.2rem',
    },
  },
});
