import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import StoreProvider from '@/components/StoreProvider/StoreProvider';
import PlaygroundInputs from './PlaygroundInputs';
import { userEvent } from '@testing-library/user-event';

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

    expect(screen.getByPlaceholderText(mockedTranslations.PlaygroundInputs.sdlUrlUnput)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(mockedTranslations.PlaygroundInputs.urlUnput)).toBeInTheDocument();
  });

  it('inputs should render with the initial value', () => {
    render(
      <StoreProvider>
        <PlaygroundInputs />
      </StoreProvider>,
    );

    const endpointUrlInput = screen.getByPlaceholderText(mockedTranslations.PlaygroundInputs.urlUnput);
    const sdlUrlInput = screen.getByPlaceholderText(mockedTranslations.PlaygroundInputs.sdlUrlUnput);
    expect(endpointUrlInput).toHaveValue('https://rickandmortyapi.com/graphql');
    expect(sdlUrlInput).toHaveValue('https://rickandmortyapi.com/graphql?sdl');
  });

  it('inputs should render with the initial value', async () => {
    const user = userEvent.setup();

    render(
      <StoreProvider>
        <PlaygroundInputs />
      </StoreProvider>,
    );

    const endpointUrlInput = screen.getByPlaceholderText(mockedTranslations.PlaygroundInputs.urlUnput);
    const sdlUrlInput = screen.getByPlaceholderText(mockedTranslations.PlaygroundInputs.sdlUrlUnput);

    await user.clear(endpointUrlInput);
    await user.type(endpointUrlInput, 'some endpoint url');
    await user.clear(sdlUrlInput);
    await user.type(sdlUrlInput, 'some sdl url');

    expect(endpointUrlInput).toHaveValue('some endpoint url');
    expect(sdlUrlInput).toHaveValue('some sdl url');
  });
});
