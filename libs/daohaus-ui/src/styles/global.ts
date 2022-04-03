export const COLOR = {
  BG: {
    100: 'rgba(255, 255, 255, 0.1)',
    200: 'rgba(255, 255, 255, 0.2)',
    500: 'rgba(255, 255, 255, 0.5)',
    600: 'rgba(255, 255, 255, 0.6)',
  },
  ERROR: '#FE1D5B',
  WARNING: '#ED963A',
  STANDARD: '#FFFFFF',
  PLACE_HOLDER: 'rgba(255, 255, 255, 0.5)',
};
// common styles across all borders

export const BORDER = {
  RADIUS: '0.4rem',
};

//  common styles across all fonts
export const FONT = {
  SIZE: {
    SM: '1.6rem',
  },
  FAMILY: {
    BODY: 'Mulish',
  },
  COLOR: COLOR.STANDARD,
  COLOR_PLACE_HOLDER: COLOR.BG[500],
  COLOR_LOW_KEY: COLOR.BG[600],
};
