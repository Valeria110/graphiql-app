import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NestedItem } from './NestedItem';

describe('NestedItem', () => {
  const props = {
    name: 'Item Name',
    description: 'Item Description',
    level: 1,
    children: <div>Child Content</div>,
  };

  it('renders the item with the name and closed icon initially', () => {
    render(<NestedItem {...props} />);
    expect(screen.getByText('Item Name')).toBeInTheDocument();
    expect(screen.getByTestId('KeyboardArrowRightIcon')).toBeInTheDocument();
  });

  it('expands and shows description and child content when clicked', () => {
    render(<NestedItem {...props} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Item Description')).toBeVisible();
    expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeVisible();
  });

  it('does not render the description if it is not provided', () => {
    const props = {
      name: 'Item Name',
      level: 1,
      children: <div>Child Content</div>,
    };
    render(<NestedItem {...props} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.queryByText('Item Description')).not.toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
