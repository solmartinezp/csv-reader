import React, { useState } from 'react';
import './style.css';

interface SearchBarProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (searchValue: string) => void;
  disable: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm, onSearch, disable }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        disabled={disable}
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleChange}
        title={disable ? "No CSV file has been uploaded" : "Search"}
      />
    </div>
  );
};

export default SearchBar;