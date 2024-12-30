import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const mockSuggestions = ['Dosa', 'Masala Dosa', 'Aloo Tikki', 'Samosa', 'Butter Chicken', 'Pav Bhaji'];
    setSuggestions(value ? mockSuggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase())) : []);
  };

  const handleSelect = (suggestion) => {
    setQuery('');
    onSearch(suggestion);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="bg-gray-100 p-4 shadow-md flex items-center justify-between">
      <div>
        <Link to="/" className="text-blue-500 font-semibold mr-4">Dishes List</Link>
        <Link to="/suggester" className="text-blue-500 font-semibold">Dish Suggester</Link>
      </div>
      <div className="relative w-64">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search dishes..."
            className="p-2 border rounded w-full"
          />
        </form>
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border mt-2 rounded shadow w-full">
            {suggestions.map((s, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
