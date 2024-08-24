'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '##80cbc4',
      main: '#44B7B7',
      dark: '#26a69a',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16,
  },
});
