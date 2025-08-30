import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SourceList } from './SourceList';

const mockSources = [
  { id: 1, url: 'https://reactjs.org' },
  { id: 2, url: 'https://mui.com' },
];

describe('SourceList', () => {
  it('renders a list of sources', () => {
    const handleDelete = jest.fn();
    render(<SourceList sources={mockSources} onDelete={handleDelete} />);

    expect(screen.getByText('https://reactjs.org')).toBeInTheDocument();
    expect(screen.getByText('https://mui.com')).toBeInTheDocument();
  });

  it('renders no sources when the list is empty', () => {
    const handleDelete = jest.fn();
    render(<SourceList sources={[]} onDelete={handleDelete} />);

    expect(screen.queryByText('https://reactjs.org')).not.toBeInTheDocument();
    expect(screen.queryByText('https://mui.com')).not.toBeInTheDocument();
  });

  it('calls the onDelete handler with the correct id when the delete button is clicked', () => {
    const handleDelete = jest.fn();
    render(<SourceList sources={mockSources} onDelete={handleDelete} />);

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(1);

    fireEvent.click(deleteButtons[1]);
    expect(handleDelete).toHaveBeenCalledTimes(2);
    expect(handleDelete).toHaveBeenCalledWith(2);
  });
});
