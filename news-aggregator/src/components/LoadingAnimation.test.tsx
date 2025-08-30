import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoadingAnimation } from './LoadingAnimation';

describe('LoadingAnimation', () => {
  it('renders the loading spinner', () => {
    render(<LoadingAnimation />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders the loading text', () => {
    render(<LoadingAnimation />);

    expect(screen.getByText(/generating news.../i)).toBeInTheDocument();
  });
});
