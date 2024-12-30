import React from 'react'

const Filter = ({ label, options, selectedValue, onChange }) => {
  return (
    <div>
      <select
        onChange={(e) => onChange(e.target.value)}
        value={selectedValue || ''}
        className="px-2 py-2 w-40 border rounded text-sm"
      >
        <option value="">Filter by {label}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter