import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="w-80">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search for dishes..."
        className="px-4 py-2 w-full border rounded text-sm placeholder-black-800"
      />
    </div>
  );
};

export default SearchBar;
