import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import StoreProvider from '@/components/StoreProvider/StoreProvider';
import PlaygroundInputs from './PlaygroundInputs';

const mockedTranslations = {
  PlaygroundInputs: {
    urlUnput: 'Enter an endpoint url...',
    sdlUrlUnput: 'Enter a SDL url...',
  },
};

vi.mock('next-intl', () => {
  return {
    useLocale: () => 'en',
    useTranslations:
      (componentName: keyof typeof mockedTranslations) => (element: keyof typeof mockedTranslations.PlaygroundInputs) =>
        mockedTranslations[componentName][element],
  };
});

describe('PlaygroundInputs', () => {
  it('should render the component correctly', () => {
    render(
      <StoreProvider>
        <PlaygroundInputs />
      </StoreProvider>,
    );

    expect(screen.getByPlaceholderText(mockedTranslations.PlaygroundInputs.sdlUrlUnput));
    expect(screen.getByPlaceholderText(mockedTranslations.PlaygroundInputs.urlUnput));
  });
});
