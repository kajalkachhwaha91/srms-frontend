import React, { useState, useMemo } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { IoIosSearch } from "react-icons/io";
import { Button } from "./ui/Button";

const DataTable = ({
  title = "Students",
  columns = [],
  data = [],
  itemsPerPage = 4,
  onView,
  onEdit,
  onDelete,
  onAdd,
  yearFilter = [],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const filteredData = useMemo(() => {
    let result = data;
    if (selectedYear) {
      result = result.filter((item) => item.year === selectedYear);
    }
    if (searchQuery) {
      result = result.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [data, searchQuery, selectedYear]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1)
      setCurrentPage(currentPage - 1);
    if (direction === "next" && currentPage < totalPages)
      setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-700 text-lg">{title}</h2>
        <div className="flex gap-2">
          {yearFilter.length > 0 && (
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none"
            >
              <option value="">All Years</option>
              {yearFilter.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          )}

          <div className="relative">
            <IoIosSearch className="absolute left-2 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border pl-8 pr-3 py-1.5 rounded-md text-sm focus:outline-none"
            />
          </div>

          {onAdd && (
            <Button onClick={onAdd} className="bg-sky-500 text-white px-4">
              Add
            </Button>
          )}
        </div>
      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="text-gray-600 border-b">
            {columns.map((col) => (
              <th key={col.accessor} className="text-left py-2 px-2">
                {col.Header}
              </th>
            ))}
            <th className="py-2 px-2 text-left">View</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, i) => (
            <tr key={i} className="border-b text-gray-700 hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.accessor} className="py-2 px-2">
                  {row[col.accessor]}
                </td>
              ))}
              <td className="flex gap-3 items-center py-2 px-2">
                <Eye
                  className="cursor-pointer text-gray-500 hover:text-sky-500"
                  onClick={() => onView && onView(row)}
                  size={18}
                />
                <Pencil
                  className="cursor-pointer text-gray-500 hover:text-green-600"
                  onClick={() => onEdit && onEdit(row)}
                  size={18}
                />
                <Trash2
                  className="cursor-pointer text-gray-500 hover:text-red-600"
                  onClick={() => onDelete && onDelete(row)}
                  size={18}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className="border rounded-md px-2 py-1 disabled:opacity-50"
          >
            &lt;
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
            className="border rounded-md px-2 py-1 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
        <p>Total Students: {filteredData.length}</p>
      </div>
    </div>
  );
};

export default DataTable;
