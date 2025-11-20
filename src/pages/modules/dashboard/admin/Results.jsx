import React, { useState, useMemo } from "react";
import { IoIosSearch } from "react-icons/io";
import { LuEye, LuPencil } from "react-icons/lu";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

// --- Utility Functions/Components for consistency ---

const renderBreadCrumb = () => (
  <div className="mb-6">
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2 text-sm">
        <li>
          <a href="/dashboard" className="text-gray-500 hover:text-cyan-600 transition-colors">
            Dashboard
          </a>
        </li>
        <li>
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </li>
        <li className="font-medium text-cyan-600">Semester Results</li>
      </ol>
    </nav>
  </div>
);

const renderStatusPill = (isPass) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium ${
      isPass
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {isPass ? "Pass" : "Fail"}
  </span>
);

// Pagination component (Simplified for mock data, matching the style of StaffManagement)
const renderPagination = (currentPage, totalPages, totalItems, itemsPerPage, onPageChange, onItemsPerPageChange) => (
  <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-white rounded-xl shadow-md">
    <div className="text-sm text-gray-700 mb-3 sm:mb-0">
      Showing <span className="font-semibold text-cyan-600">{totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to{" "}
      <span className="font-semibold text-cyan-600">
        {currentPage * itemsPerPage > totalItems ? totalItems : currentPage * itemsPerPage}
      </span>{" "}
      of <span className="font-semibold text-cyan-600">{totalItems}</span> results
    </div>
    
    <div className="flex items-center space-x-4">
      {/* Items Per Page Selector */}
      <select
        value={itemsPerPage}
        onChange={(e) => {
          onItemsPerPageChange(Number(e.target.value));
          onPageChange(1);
        }}
        className="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
      >
        <option value="4">4 / page</option> {/* Adjusted options to fit mock data */}
        <option value="10">10 / page</option>
        <option value="20">20 / page</option>
      </select>
      
      {/* Page Navigation */}
      <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
        <button
          className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <HiChevronLeft className="w-5 h-5" />
          <span className="ml-1 hidden sm:inline">Previous</span>
        </button>
        
        {/* Page Numbers - simplified */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                currentPage === pageNumber
                  ? "z-10 bg-cyan-500 border-cyan-500 text-white"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <span className="mr-1 hidden sm:inline">Next</span>
          <HiChevronRight className="w-5 h-5" />
        </button>
      </nav>
    </div>
  </div>
);

// --- Main Component ---

const AdminSemesterResults = () => {
  const [year, setYear] = useState("III Year");
  const [semester, setSemester] = useState("Semester 06");
  const [status, setStatus] = useState("Pass");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Set to 4 to fit initial mock data count

  const mockResults = [
    { id: 1, name: "John", studentId: "S1001", subject: "Theory of Computation", code: "CS3452", isPass: true, mark: "A+" },
    { id: 2, name: "Arjun Kumar", studentId: "S1002", subject: "Theory of Computation", code: "CS3452", isPass: true, mark: "A" },
    { id: 3, name: "Rahul Verma", studentId: "S1003", subject: "Compiler Design", code: "CS3453", isPass: true, mark: "B" },
    { id: 4, name: "Sneha", studentId: "S1004", subject: "Compiler Design", code: "CS3453", isPass: false, mark: "F" },
    { id: 5, name: "Priya Sharma", studentId: "S1005", subject: "Digital Logic", code: "CS3451", isPass: true, mark: "A" },
    { id: 6, name: "Vijay Singh", studentId: "S1006", subject: "Digital Logic", code: "CS3451", isPass: false, mark: "F" },
    { id: 7, name: "Anjali Menon", studentId: "S1007", subject: "Computer Graphics", code: "CS3454", isPass: true, mark: "B+" },
    { id: 8, name: "Suresh Mani", studentId: "S1008", subject: "Computer Graphics", code: "CS3454", isPass: true, mark: "O" },
  ];

  const filteredData = useMemo(() =>
    mockResults
      .filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(item => {
        if (status === "Pass") return item.isPass;
        if (status === "Fail") return !item.isPass;
        return true;
      }),
    [mockResults, searchTerm, status]
  );
  
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      
      {/* Breadcrumb */}
      {renderBreadCrumb()}

      {/* Header Section */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Semester Results</h1>
              <p className="text-sm text-gray-500">Manage and upload student grades and results</p>
            </div>
            
            {/* Search Bar (Moved to header area) */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search by Name, Code, or Subject..."
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm shadow-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset page on search
                }}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoIosSearch className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters and Actions Section */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Year Dropdown */}
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-colors"
            >
              <option>I Year</option>
              <option>II Year</option>
              <option>III Year</option>
              <option>IV Year</option>
            </select>

            {/* Semester Dropdown */}
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-colors"
            >
              <option>Semester 01</option>
              <option>Semester 02</option>
              <option>Semester 03</option>
              <option>Semester 04</option>
              <option>Semester 05</option>
              <option>Semester 06</option>
              <option>Semester 07</option>
              <option>Semester 08</option>
            </select>
            
            {/* Status Dropdown */}
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1); // Reset page on filter change
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-colors"
            >
              <option>Pass</option>
              <option>Fail</option>
            </select>
          </div>

          {/* Add Button */}
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-colors">
            + Add New Result Entry
          </button>
        </div>
      </div>

      {/* Table (Re-styled to match StaffManagement's renderDataTable) */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-cyan-50 to-blue-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Subject & Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Grade/Mark
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Pass Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg className="w-10 h-10 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-9 0V3h4m-4 2a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                      <p className="text-lg font-medium">No results found for current filters</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((r, i) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors duration-150">
                    {/* Student Name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                            {r.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{r.name}</div>
                          <div className="text-xs text-gray-500">ID: {r.studentId}</div>
                        </div>
                      </div>
                    </td>

                    {/* Subject & Code */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{r.subject}</div>
                      <div className="text-xs text-gray-500">{r.code}</div>
                    </td>

                    {/* Mark */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 font-medium">{r.mark}</div>
                    </td>

                    {/* Pass Status */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {renderStatusPill(r.isPass)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          title="View Details"
                          className="text-gray-500 hover:text-cyan-600 p-2 rounded-full hover:bg-cyan-50 transition-colors"
                        >
                          <LuEye className="w-5 h-5" />
                        </button>
                        <button
                          title="Edit Result"
                          className="text-gray-500 hover:text-cyan-600 p-2 rounded-full hover:bg-cyan-50 transition-colors"
                        >
                          <LuPencil className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination (Re-styled to match StaffManagement) */}
      {renderPagination(
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        setCurrentPage,
        setItemsPerPage
      )}

    </div>
  );
};

export default AdminSemesterResults;