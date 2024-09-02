import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StoreProvider from '../StoreProvider/StoreProvider';
import JsonViewer from './JsonViewer';

describe('JsonViewer', () => {
  it('should render the component correctly', () => {
    render(
      <StoreProvider>
        <JsonViewer />
      </StoreProvider>,
    );

    expect(screen.getByTestId('json-viewer')).toBeInTheDocument();
  });
});
