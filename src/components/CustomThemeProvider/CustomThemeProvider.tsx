'use client';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { teal, blue } from '@mui/material/colors';
import { ReactNode } from 'react';

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: teal[400],
    },
    secondary: {
      main: blue[500], // TODO: what the our secondary color?
    },
    background: {
      default: blue[900], // common background
      paper: blue[800], // card background
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
