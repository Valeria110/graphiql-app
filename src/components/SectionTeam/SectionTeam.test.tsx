import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SectionTeam from './SectionTeam';

const mockT = (key: string) => {
  const translations: Record<string, string> = {
    sectionTeamTitle: 'Our Team',
  };
  return translations[key] || key;
};

vi.mock('../TeamList/TeamList', () => ({
  TeamList: () => <div>Mocked TeamList</div>,
}));

describe('SectionTeam', () => {
  it('renders the section with title and subtitle', () => {
    render(<SectionTeam t={mockT} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Our Team');
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Jumping Skunk');
  });

  it('renders the TeamList component', () => {
    render(<SectionTeam t={mockT} />);
    expect(screen.getByText('Mocked TeamList')).toBeInTheDocument();
  });
});
