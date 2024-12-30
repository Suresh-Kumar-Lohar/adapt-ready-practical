import React, { useState, useEffect, useRef } from 'react';

const MultiSelectFilter = ({ label, options, selectedValue, onChange }) => {
  const [localSelection, setLocalSelection] = useState(selectedValue || []);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleCheckboxChange = (id) => {
    setLocalSelection((prevSelection) => {
      if (prevSelection.includes(id)) {
        return prevSelection.filter((selectedId) => selectedId !== id);
      }
      return [...prevSelection, id];
    });
  };

  const handleApplyFilter = () => {
    onChange(localSelection);
    setIsOpen(false);
  };

  const handleClearFilter = () => {
    setLocalSelection([]);
    onChange([]);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="border px-4 py-2 rounded w-60 cursor-pointer bg-white text-sm flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute border px-4 py-2 rounded w-60 bg-white shadow-lg z-10 mt-1 h-40 overflow-y-auto"
        >
          {options.map((option) => (
            <div key={option.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`checkbox-${option.id}`}
                checked={localSelection.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
                className="mr-2"
              />
              <label htmlFor={`checkbox-${option.id}`} className="text-sm">
                {option.name}
              </label>
            </div>
          ))}
        </div>
      )}
      <div className="mt-3 flex gap-2">
        <button
          onClick={handleApplyFilter}
          className="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600"
        >
          Apply
        </button>
        <button
          onClick={handleClearFilter}
          className="bg-gray-300 text-black px-4 py-1 rounded text-sm hover:bg-gray-400"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default MultiSelectFilter;
