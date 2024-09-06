import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemberAccordion, TeamList } from './TeamList';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('MemberAccordion', () => {
  const title = 'Test Accordion';
  const items = ['Item 1', 'Item 2', 'Item 3'];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with the correct title and items', () => {
    render(<MemberAccordion title={title} items={items} />);

    expect(screen.getByText(title)).toBeInTheDocument();

    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('expands and collapses when clicked', () => {
    render(<MemberAccordion title={title} items={items} />);

    items.forEach((item) => {
      expect(screen.queryByText(item)).not.toBeVisible();
    });

    fireEvent.click(screen.getByText(title));
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeVisible();
    });

    fireEvent.click(screen.getByText(title));
    items.forEach((item) => {
      const listItem = screen.queryByText(item)?.closest('li');
      expect(listItem).toBeInTheDocument();
    });
  });
});

describe('TeamList', () => {
  it('renders all team members with their details', () => {
    render(<TeamList />);

    expect(screen.getByText('memberNameMikhail')).toBeInTheDocument();
    expect(screen.getByText('memberNameValerie')).toBeInTheDocument();
    expect(screen.getByText('memberNameViktoriya')).toBeInTheDocument();

    expect(screen.getByText('memberRoleMikhail')).toBeInTheDocument();
    expect(screen.getByText('memberRoleValerie')).toBeInTheDocument();
    expect(screen.getByText('memberRoleViktoriya')).toBeInTheDocument();

    expect(screen.getByText('mikhailsemenuk')).toBeInTheDocument();
    expect(screen.getByText('valeria110')).toBeInTheDocument();
    expect(screen.getByText('qwgfsehte')).toBeInTheDocument();

    expect(screen.getByText('mikhailsemenuk').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/MikhailSemenuk',
    );
    expect(screen.getByText('valeria110').closest('a')).toHaveAttribute('href', 'https://github.com/Valeria110');
    expect(screen.getByText('qwgfsehte').closest('a')).toHaveAttribute('href', 'https://github.com/qwgfsehte');
  });

  it('renders images for team members', () => {
    render(<TeamList />);

    const images = screen.getAllByAltText('member');
    expect(images).toHaveLength(3);

    images.forEach((image) => {
      expect(image).toHaveAttribute('src');
    });
  });

  it('renders accordion sections for each member', () => {
    render(<TeamList />);

    const accordionTitles = ['contributionsTitle', 'educationTitle', 'workTitle', 'languagesTitle'];

    accordionTitles.forEach((title) => {
      expect(screen.getAllByText(title)).toHaveLength(3);
    });
  });
});
