import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageSelector from './LanguageSelector';

describe('LanguageSelector', () => {
  it('renders the language selector with the initial value', () => {
    const handleChange = jest.fn();
    render(<LanguageSelector language="en" onLanguageChange={handleChange} />);

    expect(screen.getByLabelText(/language/i)).toBeInTheDocument();
    // In MUI v5, the selected value is displayed in a hidden input for native selects,
    // or within the button for non-native. We'll check the role.
    expect(screen.getByRole('combobox')).toHaveTextContent(/english/i);
  });

  it('calls onLanguageChange when a new language is selected', () => {
    const handleChange = jest.fn();
    render(<LanguageSelector language="en" onLanguageChange={handleChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select); // Open the dropdown

    const option = screen.getByRole('option', { name: /russian/i });
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('ru');
  });
});
