import React from 'react';

const Pagination = ({ page, totalPages, handlePrev, handleNext }) => {
  return (
    <div className="mt-4 flex justify-center space-x-2">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="px-4 py-2 border rounded bg-white text-gray-700 disabled:bg-gray-200"
      >
        Prev
      </button>
      <span className="px-4 py-2">
        {page} / {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="px-4 py-2 border rounded bg-white text-gray-700 disabled:bg-gray-200"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
