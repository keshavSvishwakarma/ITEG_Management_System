// File: components/Pagination.jsx
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const CustomDropdownForPagination = ({ value, onChange, options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          h-8 border border-gray-300 rounded-md px-3 py-1 bg-white text-left
          focus:outline-none focus:border-black focus:ring-0 
          flex items-center justify-between min-w-[60px] text-sm
          ${isOpen ? "border-black" : ""}
          transition-all duration-200
        `}
      >
        <span className="text-gray-900">
          {selectedOption ? selectedOption.label : value}
        </span>
        <span className={`ml-1 transition-transform duration-200 text-xs ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute bottom-full left-0 mb-1 rounded-xl shadow-lg z-50 overflow-hidden border min-w-[60px]"
          style={{
            background: `
              linear-gradient(to bottom left, rgba(173, 216, 230, 0.4) 0%, transparent 20%),
              linear-gradient(to top right, rgba(255, 182, 193, 0.4) 0%, transparent 20%),
              white
            `
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-left transition-colors duration-150 text-sm"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const actualItemsPerPage = itemsPerPage === 'All' ? totalItems : itemsPerPage;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * actualItemsPerPage + 1;
  const endItem = itemsPerPage === 'All' ? totalItems : Math.min(currentPage * actualItemsPerPage, totalItems);

  const rowsPerPageOptions = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
    { value: 'All', label: "All" }
  ];

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white text-sm text-gray-700">
      {/* Left Section: Empty for spacing */}
      <div></div>

      {/* Right Section: All pagination controls */}
      <div className="flex items-center space-x-6">
        {/* Rows per page */}
        <div className="flex items-center space-x-2">
          <span className="font-medium">Rows Per Pages:</span>
          <CustomDropdownForPagination
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
            options={rowsPerPageOptions}
          />
        </div>

        {/* Showing info */}
        <div>
          {startItem} - {endItem} of {totalItems}
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
