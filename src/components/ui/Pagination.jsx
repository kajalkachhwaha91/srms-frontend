import { useState, useEffect, useMemo } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const [itemsPerPageState, setItemsPerPageState] = useState(
    itemsPerPage ?? 10
  );
  const itemsPerPageOptions = [1, 2, 5, 10, 20, 50, 100];

  useEffect(() => {
    if (itemsPerPage !== undefined && itemsPerPage !== itemsPerPageState) {
      setItemsPerPageState(itemsPerPage);
    }
  }, [itemsPerPage, itemsPerPageState]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setItemsPerPageState(value);
    if (onItemsPerPageChange) {
      onItemsPerPageChange(value);
    }
    onPageChange(1);
  };

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = 4;
      }

      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  if (!currentPage || !totalPages) {
    return null;
  }
  // console.log(renderPageNumbers)
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap px-4 py-2 w-full bottom-sticky bg-white border-t-4 border-[#cca547] shadow-lg rounded-b-2xl">
      {/* <div className="flex gap-2 items-center">
        <div>Rows per page</div>
        <select
          value={itemsPerPageState}
          onChange={handleItemsPerPageChange}
          className="border px-6 py-2 outline-none"
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div> */}

      <p>
        Showing {(currentPage - 1) * itemsPerPageState + 1} to{" "}
        {Math.min(currentPage * itemsPerPageState, totalItems)} of {totalItems}{" "}
        Entries
      </p>

      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          className={`text-base w-[30px] h-[30px] flex items-center justify-center rounded-md border border-yellow-700 bg-yellow-700 text-white ${currentPage === 1
              ? "cursor-not-allowed opacity-70"
              : "hover:bg-[#cca547]"
            }`}
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          <GrPrevious />
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-2 mx-4">
          {renderPageNumbers.map((page, index) => (
            <button
              key={index}
              className={`w-[30px] h-[30px] flex items-center justify-center rounded-md text-sm font-medium border 
                                ${page === currentPage
                  ? "bg-yellow-700 text-white"
                  : page === "..."
                    ? "text-gray-400 cursor-not-allowed opacity-60"
                    : "text-yellow-700 hover:bg-yellow-100"
                }`}
              onClick={() => typeof page === "number" && handlePageClick(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          className={`text-base w-[30px] h-[30px] flex items-center justify-center rounded-md border border-yellow-700 bg-yellow-700 text-white ${currentPage === totalPages || totalPages === 0
              ? "cursor-not-allowed opacity-70"
              : "hover:bg-[#cca547]"
            }`}
          onClick={handleNextClick}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
