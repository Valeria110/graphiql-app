import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import EditorButtons from './EditorButtons';
import StoreProvider from '@/components/StoreProvider/StoreProvider';
import styles from './EditorButtons.module.scss';
import { userEvent } from '@testing-library/user-event';
import * as fetchGraphQLData from '@/api/graphqlRequests';
import * as prettifyGraphQL from '@/utils/utils';

const mockProps = {
  query: `query {
  character(id: 1) {
    id
    name
    status
  }
}`,
  setQuery: vi.fn(),
};
describe('EditorButtons', () => {
  it('should render the component correctly', () => {
    render(
      <StoreProvider>
        <EditorButtons query={mockProps.query} setQuery={mockProps.setQuery} />
      </StoreProvider>,
    );
    expect(screen.getByTestId('editor-btns-wrapper')).toBeInTheDocument();
    screen.getAllByRole('button').forEach((btn) => expect(btn).toHaveClass(styles.btn));
  });

  it('should make a call api when clicking on the run code button', async () => {
    const user = userEvent.setup();
    const mockedFunc = vi.spyOn(fetchGraphQLData, 'fetchGraphQLData').mockImplementation(vi.fn());

    render(
      <StoreProvider>
        <EditorButtons query={mockProps.query} setQuery={mockProps.setQuery} />
      </StoreProvider>,
    );

    await user.click(screen.getByTestId('run-code-btn'));
    expect(mockedFunc).toHaveBeenCalledOnce();
  });

  it('should make a call api when clicking on the run code button', async () => {
    const user = userEvent.setup();
    const mockedFunc = vi.spyOn(prettifyGraphQL, 'prettifyGraphQL').mockImplementation(vi.fn());

    render(
      <StoreProvider>
        <EditorButtons query={mockProps.query} setQuery={mockProps.setQuery} />
      </StoreProvider>,
    );

    await user.click(screen.getByTestId('prettify-btn'));
    expect(mockedFunc).toHaveBeenCalledOnce();
  });
});
