import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import StoreProvider from '@/components/StoreProvider/StoreProvider';
import ToolsBarCodeEditor from './ToolsBarCodeEditor';

vi.mock('next-intl', () => {
  return {
    useLocale: () => 'en',
    useTranslations: () => vi.fn(),
  };
});

describe('ToolsBarCodeEditor', () => {
  it('should render the component correctly', async () => {
    render(
      <StoreProvider>
        <ToolsBarCodeEditor isHeadersBtnActive={true} />
      </StoreProvider>,
    );

    expect(screen.getByTestId('editor-container')).toBeInTheDocument();
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
