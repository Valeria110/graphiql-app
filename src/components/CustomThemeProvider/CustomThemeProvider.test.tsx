import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomThemeProvider } from './CustomThemeProvider';
import { createTheme } from '@mui/material';

describe('CustomThemeProvider', () => {
  it('should render a ThemeProvider with the custom theme', () => {
    const mockChildren = <div>Test Children</div>;

    render(<CustomThemeProvider>{mockChildren}</CustomThemeProvider>);
    expect(screen.getByText(/Test Children/i)).toBeDefined();
  });

  it('should have the correct theme colors', () => {
    const mockChildren = <div style={{ backgroundColor: 'inherit' }}>Test Children</div>;

    render(<CustomThemeProvider>{mockChildren}</CustomThemeProvider>);

    const theme = createTheme();
    const defaultBackgroundColor = theme.palette.background.default;
    const customBackgroundColor = screen.getByText(/Test Children/i).style.backgroundColor;

    expect(customBackgroundColor).not.toEqual(defaultBackgroundColor);
  });
});
