import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LanguageSelector } from './LanguageSelector';

describe('LanguageSelector', () => {
  it('renders the language selector with the initial value', () => {
    const handleChange = jest.fn();
    render(<LanguageSelector language="en" onLanguageChange={handleChange} />);

    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('en');
  });

  it('calls onLanguageChange when a new language is selected', () => {
    const handleChange = jest.fn();
    render(<LanguageSelector language="en" onLanguageChange={handleChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'ru' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('ru');
  });
});
