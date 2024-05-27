import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CSVReader from './CSVReader';
import uploadCSV from '../../src/services/csvService';

// Mock the uploadCSV service
jest.mock('../../services/csvService');

describe('CSVReader Component', () => {
  it('uploads and processes a CSV file', async () => {
    const mockCSVResults = { data: [{ name: 'Jane Doe', email: 'janedoe@example.com' }] };
    (uploadCSV as jest.Mock).mockResolvedValue(mockCSVResults);

    const toggleShowCard = jest.fn();
    const setCardContent = jest.fn();

    render(<CSVReader toggleShowCard={toggleShowCard} setCardContent={setCardContent} />);
    const fileInput = screen.getByLabelText(/upload csv file/i);
    const file = new File(['name,email\nJane Doe,janedoe@example.com'], 'test.csv', { type: 'text/csv' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(setCardContent).toHaveBeenCalledWith(mockCSVResults);
      expect(toggleShowCard).toHaveBeenCalled();
    });
  });
});
