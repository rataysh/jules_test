import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SourceForm from './SourceForm';

describe('SourceForm', () => {
  it('renders the form elements', () => {
    const handleAdd = jest.fn();
    render(<SourceForm onAdd={handleAdd} />);

    expect(screen.getByLabelText(/new source url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('allows the user to type in the input', () => {
    const handleAdd = jest.fn();
    render(<SourceForm onAdd={handleAdd} />);

    const input = screen.getByLabelText(/new source url/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'https://example.com' } });

    expect(input.value).toBe('https://example.com');
  });

  it('calls the onAdd handler with the input value when the form is submitted', () => {
    const handleAdd = jest.fn();
    render(<SourceForm onAdd={handleAdd} />);

    const input = screen.getByLabelText(/new source url/i);
    const button = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(button);

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith('https://example.com');
  });

  it('does not call onAdd if the input is empty', () => {
    const handleAdd = jest.fn();
    render(<SourceForm onAdd={handleAdd} />);

    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button);

    expect(handleAdd).not.toHaveBeenCalled();
  });

  it('clears the input field after submission', () => {
    const handleAdd = jest.fn();
    render(<SourceForm onAdd={handleAdd} />);

    const input = screen.getByLabelText(/new source url/i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(button);

    expect(input.value).toBe('');
  });
});
