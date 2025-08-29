import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultDisplay from './ResultDisplay';

describe('ResultDisplay', () => {
  it('renders the placeholder text when no result is provided', () => {
    render(<ResultDisplay result="" />);

    expect(screen.getByText(/click "generate news" to see the result./i)).toBeInTheDocument();
  });

  it('renders the result when it is provided', () => {
    const mockResult = 'This is the generated news content.';
    render(<ResultDisplay result={mockResult} />);

    expect(screen.getByText(mockResult)).toBeInTheDocument();
  });

  it('renders the "Generated News" title', () => {
    render(<ResultDisplay result="" />);

    expect(screen.getByRole('heading', { name: /generated news/i })).toBeInTheDocument();
  });
});
