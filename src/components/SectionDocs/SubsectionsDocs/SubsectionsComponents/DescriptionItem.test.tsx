import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DescriptionItem } from './DescriptionItem';

const mockedTranslations = {
  Docs: {
    descriptionTitle: 'Description',
  },
};

type ElementType = keyof typeof mockedTranslations.Docs;

vi.mock('next-intl', () => {
  return {
    useTranslations: (componentName: keyof typeof mockedTranslations) => (element: ElementType) =>
      mockedTranslations[componentName][element],
  };
});

const description = 'This is a sample description';

describe('DescriptionItem', () => {
  it('renders with the correct title', () => {
    render(<DescriptionItem description={description} />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('shows the description content when expanded', () => {
    render(<DescriptionItem description={description} />);
    const button = screen.getByRole('button', { name: /Description/i });
    expect(screen.queryByText(description)).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText(description)).toBeVisible();
  });
});
