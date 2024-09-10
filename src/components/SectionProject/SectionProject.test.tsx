import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SectionProject from './SectionProject';

const mockT = (key: string) => {
  const translations: Record<string, string> = {
    sectionProjectTitle: 'Project Title',
    sectionProjectSubtitle: 'Project Subtitle',
    sectionProjectList: 'Item 1; Item 2; Item 3',
    sectionProjecDescriptionText: 'This is a project description.',
  };
  return translations[key] || key;
};

describe('SectionProject', () => {
  it('renders the component correctly', () => {
    render(<SectionProject t={mockT} />);

    expect(screen.getByText('Project Title')).toBeInTheDocument();
    expect(screen.getByText('Project Subtitle')).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(3);
    expect(listItems[0]).toHaveTextContent('Item 1');
    expect(listItems[1]).toHaveTextContent('Item 2');
    expect(listItems[2]).toHaveTextContent('Item 3');

    expect(screen.getByText('This is a project description.')).toBeInTheDocument();
  });
});
