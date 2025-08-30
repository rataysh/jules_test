import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomePage } from './ui/pages/HomePage';
import { useNewsStore } from './app/stores/useNewsStore';

// Mock the useNewsStore hook
jest.mock('./app/stores/useNewsStore');
const mockedUseNewsStore = useNewsStore as jest.Mock;

describe('HomePage Integration Tests', () => {
  const mockAddSource = jest.fn();
  const mockDeleteSource = jest.fn();
  const mockFetchNews = jest.fn();

  beforeEach(() => {
    mockAddSource.mockClear();
    mockDeleteSource.mockClear();
    mockFetchNews.mockClear();
  });

  const renderHomePageWithStore = (storeState: any) => {
    mockedUseNewsStore.mockReturnValue({
      sources: [],
      language: 'en',
      isLoading: false,
      result: '',
      addSource: mockAddSource,
      deleteSource: mockDeleteSource,
      setLanguage: jest.fn(),
      fetchNews: mockFetchNews,
      ...storeState,
    });
    return render(<HomePage />);
  };

  it('renders the initial UI correctly', () => {
    renderHomePageWithStore({
      sources: [
        { id: 1, url: 'https://twitter.com/reactjs' },
        { id: 2, url: 'https://news.ycombinator.com' },
      ],
    });
    expect(screen.getByRole('heading', { name: /news aggregator/i })).toBeInTheDocument();
    expect(screen.getByText('https://twitter.com/reactjs')).toBeInTheDocument();
    expect(screen.getByText('https://news.ycombinator.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate news/i })).toBeInTheDocument();
  });

  it('allows adding a new source', () => {
    renderHomePageWithStore({});
    const input = screen.getByPlaceholderText(/new source url/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: 'https://dev.to' } });
    fireEvent.click(addButton);

    expect(mockAddSource).toHaveBeenCalledTimes(1);
    expect(mockAddSource).toHaveBeenCalledWith('https://dev.to');
  });

  it('allows deleting a source', () => {
    renderHomePageWithStore({
      sources: [{ id: 1, url: 'https://twitter.com/reactjs' }],
    });
    expect(screen.getByText('https://twitter.com/reactjs')).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockDeleteSource).toHaveBeenCalledTimes(1);
    expect(mockDeleteSource).toHaveBeenCalledWith(1);
  });

  it('shows loading animation and displays results on generate', async () => {
    const { rerender } = renderHomePageWithStore({ isLoading: true });

    // Check for loading state
    expect(screen.getByText(/generating news.../i)).toBeInTheDocument();

    // Update the store mock and rerender
    mockedUseNewsStore.mockReturnValue({
      sources: [],
      language: 'en',
      isLoading: false,
      result: '### New Mock News\n\n**Source:** mock.com\n\nThis is a test.',
      addSource: mockAddSource,
      deleteSource: mockDeleteSource,
      setLanguage: jest.fn(),
      fetchNews: mockFetchNews,
    });
    rerender(<HomePage />);

    // Wait for the result to be displayed
    await waitFor(() => {
      expect(screen.getByText(/new mock news/i)).toBeInTheDocument();
    });

    // Check that loading state is gone
    expect(screen.queryByText(/generating news.../i)).not.toBeInTheDocument();
  });
});
