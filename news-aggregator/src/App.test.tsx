import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './App';
import * as api from './api';

// Mock the api module
jest.mock('./api');
const mockedFetchNews = api.fetchNews as jest.Mock;

describe('App Integration Tests', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockedFetchNews.mockClear();
  });

  it('renders the initial UI correctly', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /news aggregator/i })).toBeInTheDocument();
    expect(screen.getByText('https://twitter.com/reactjs')).toBeInTheDocument();
    expect(screen.getByText('https://news.ycombinator.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate news/i })).toBeInTheDocument();
  });

  it('allows adding a new source', () => {
    render(<App />);
    const input = screen.getByLabelText(/new source url/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: 'https://dev.to' } });
    fireEvent.click(addButton);

    expect(screen.getByText('https://dev.to')).toBeInTheDocument();
  });

  it('allows deleting a source', () => {
    render(<App />);
    expect(screen.getByText('https://twitter.com/reactjs')).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText('https://twitter.com/reactjs')).not.toBeInTheDocument();
  });

  it('shows loading animation and displays results on generate', async () => {
    const mockResult = "### New Mock News\n\n**Source:** mock.com\n\nThis is a test.";
    mockedFetchNews.mockResolvedValue(mockResult);

    render(<App />);
    const generateButton = screen.getByRole('button', { name: /generate news/i });
    fireEvent.click(generateButton);

    // Check for loading state
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText(/generating news.../i)).toBeInTheDocument();

    // Wait for the result to be displayed
    await waitFor(() => {
      expect(screen.getByText(/new mock news/i)).toBeInTheDocument();
    });

    // Check that loading state is gone
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(mockedFetchNews).toHaveBeenCalledTimes(1);
  });
});
