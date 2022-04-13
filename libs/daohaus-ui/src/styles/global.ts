export const Color = {
  BaseBg: '#050A1B',
  Bg: {
    100: 'rgba(255, 255, 255, 0.1)',
    200: 'rgba(255, 255, 255, 0.2)',
    500: 'rgba(255, 255, 255, 0.5)',
    600: 'rgba(255, 255, 255, 0.6)',
  },
  BrandYellow: '#F2CF63',
  Error: '#FE1D5B',
  Warning: '#ED963A',
  White: '#FFFFFF',
  Info: '#F2CF63',
};
// common styles across all borders

export const Border = {
  Radius: '0.4rem',
};

//  common styles across all fonts
export const Font = {
  Size: {
    Md: '1.6rem',
  },
  Family: {
    Body: 'Mulish',
  },
  Weight: {
    Medium: 400,
    Bold: 700,
  },
  Color: Color.White,
  ColorPlaceHolder: Color.Bg[500],
  ColorLowKey: Color.Bg[600],
};
