import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import StoreProvider from '@/components/StoreProvider/StoreProvider';
import GraphiqlToolsBar from './GraphiqlToolsBar';
import { userEvent } from '@testing-library/user-event';

const mockedTranslations = {
  GraphiqlToolsBar: {
    varsBtn: 'Variables',
    headersBtn: 'Headers',
  },
};

vi.mock('next-intl', () => {
  return {
    useLocale: () => 'en',
    useTranslations:
      (componentName: keyof typeof mockedTranslations) => (element: keyof typeof mockedTranslations.GraphiqlToolsBar) =>
        mockedTranslations[componentName][element],
  };
});

describe('GraphiqlToolsBar', () => {
  it('should render the component correctly', async () => {
    const user = userEvent.setup();

    render(
      <StoreProvider>
        <GraphiqlToolsBar />
      </StoreProvider>,
    );

    expect(screen.getByText(mockedTranslations.GraphiqlToolsBar.varsBtn)).toBeInTheDocument();
    expect(screen.getByText(mockedTranslations.GraphiqlToolsBar.headersBtn)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument();

    await user.click(screen.getByText(mockedTranslations.GraphiqlToolsBar.varsBtn));
    expect(screen.getByTestId('tools-editor-container')).toBeInTheDocument();
  });
});
