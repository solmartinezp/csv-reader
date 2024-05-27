import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { searchUsers } from './services/usersService';
import uploadCSV from './services/csvService';

// Mock the services
jest.mock('./services/usersService');
jest.mock('./services/csvService');

describe('App Component', () => {
  it('renders the CSV Reader and Search Bar components', () => {
    render(<App />);
    expect(screen.getByText(/CSV Reader App/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
  });

  it('searches for users when input is provided', async () => {
    const mockSearchResults = { data: [{ name: 'John Doe', email: 'johndoe@example.com' }] };
    (searchUsers as jest.Mock).mockResolvedValue(mockSearchResults);

    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(searchInput, { target: { value: 'John' } });

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
  });

  it('handles CSV file upload', async () => {
    const mockCSVResults = { data: [{ name: 'Jane Doe', email: 'janedoe@example.com' }] };
    (uploadCSV as jest.Mock).mockResolvedValue(mockCSVResults);

    render(<App />);
    const fileInput = screen.getByLabelText(/upload csv file/i);
    const file = new File(['name,email\nJane Doe,janedoe@example.com'], 'test.csv', { type: 'text/csv' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    });
  });
});
