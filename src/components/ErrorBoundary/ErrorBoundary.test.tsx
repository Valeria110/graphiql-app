import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('should display an error if it occurs', () => {
    const TestComponent = () => {
      throw new Error('Test Error');
    };

    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong :(')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });

  it('should call componentDidCatch if an error occurs', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    const TestComponent = () => {
      throw new Error('Test Error');
    };

    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>,
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith('Oops... React caught an error');
  });

  it('should render a child component if there are no errors', () => {
    const TestComponent = () => <div>Test Component</div>;

    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
