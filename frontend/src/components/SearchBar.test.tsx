import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  it('updates search term and calls onSearch when input changes', () => {
    const setSearchTerm = jest.fn();
    const onSearch = jest.fn();
    const disable = false;

    render(<SearchBar setSearchTerm={setSearchTerm} onSearch={onSearch} disable={disable} />);
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(setSearchTerm).toHaveBeenCalledWith('John');
    expect(onSearch).toHaveBeenCalledWith('John');
  });
});
