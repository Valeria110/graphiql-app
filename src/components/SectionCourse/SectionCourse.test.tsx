import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SectionCourse from './SectionCourse';
import rssLogo from '../../assets/svg/rs-school.svg';

const mockT = (key: string) => {
  const translations: Record<string, string> = {
    sectionCourseTitle: 'Course Title',
    sectionCourseSubtitle: 'Course Subtitle',
    sectionCourseDescriptionTitle: 'Course Description Title',
    sectionCourseFeature: 'Feature 1; Feature 2; Feature 3',
    sectionCourseDescriptionText: 'This is a course description text.',
  };
  return translations[key] || key;
};

describe('SectionCourse', () => {
  it('renders the component correctly', () => {
    render(<SectionCourse t={mockT} />);

    expect(screen.getByText('Course Title')).toBeInTheDocument();
    expect(screen.getByText('Course Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Course Description Title')).toBeInTheDocument();

    const featureItems = screen.getAllByText(/Feature/);
    expect(featureItems.length).toBe(3);
    expect(featureItems[0]).toHaveTextContent('Feature 1');
    expect(featureItems[1]).toHaveTextContent('Feature 2');
    expect(featureItems[2]).toHaveTextContent('Feature 3');

    expect(screen.getByText('This is a course description text.')).toBeInTheDocument();

    const linkElement = screen.getByRole('link', { name: /rss-logo/ });
    expect(linkElement).toHaveAttribute('href', 'https://rs.school/courses/reactjs');

    const logoElement = screen.getByAltText('rss-logo');
    expect(logoElement).toHaveAttribute('src', rssLogo);
  });
});
