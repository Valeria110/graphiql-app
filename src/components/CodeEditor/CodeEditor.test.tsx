import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CodeEditor from './CodeEditor';
import StoreProvider from '../StoreProvider/StoreProvider';

vi.mock('next-intl', () => {
  return {
    useLocale: () => 'en',
    useTranslations: () => vi.fn(),
  };
});

describe('CodeEditor', () => {
  it('should render the component correctly', () => {
    render(
      <StoreProvider>
        <CodeEditor language="graphql" />
      </StoreProvider>,
    );

    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });
});
