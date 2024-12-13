import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPrevious, 
  onNext,
  pageSize,
  onPageSizeChange,
  position = 'bottom-0',
  className = ''
}) => {
  const pageSizeOptions = [10, 20, 50, 100];

  return (
    <div className={`
      flex items-center justify-between gap-4 p-4 
      bg-white border-t border-gray-200
      fixed left-0 right-0 ${position} ${className}
    `}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Show:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm"
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-600">items</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-300 text-sm"
          disabled={currentPage === 1}
          onClick={onPrevious}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-300 text-sm"
          disabled={currentPage === totalPages}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
