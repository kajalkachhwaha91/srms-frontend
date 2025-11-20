import React, { useState, useMemo } from "react";
import { IoIosSearch } from "react-icons/io";
import { LuEye, LuPencil } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

// --- Utility Functions/Components from StaffManagement for consistency ---

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
        <li className="font-medium text-cyan-600">Assignments Management</li>
      </ol>
    </nav>
  </div>
);

const renderStatusPill = (isSubmitted) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium ${
      isSubmitted
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {isSubmitted ? "Submitted" : "Not Submitted"}
  </span>
);

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
        
        {/* Simplified Page Numbers for this example */}
        <button
          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
            currentPage === 1
              ? "z-10 bg-cyan-500 border-cyan-500 text-white"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
        {totalPages > 1 && (
          <button
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
              currentPage === 2
                ? "z-10 bg-cyan-500 border-cyan-500 text-white"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => onPageChange(2)}
          >
            2
          </button>
        )}
        {/* ... More sophisticated page number rendering is available in the original Staff component, 
            but simplified here for demonstration using the mock data. */}

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

const AdminAssignments = () => {
  const [year, setYear] = useState("III Year");
  const [status, setStatus] = useState("Not Submitted");
  const [assignment, setAssignment] = useState("Assignment 1");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Set to 4 to match initial mock data count

  const mockAssignments = [
    { id: 1, name: "John", studentId: "S1001", subject: "Theory of Computation", code: "CS3452", isSubmitted: false, mark: "-" },
    { id: 2, name: "Arjun Kumar", studentId: "S1002", subject: "Theory of Computation", code: "CS3452", isSubmitted: false, mark: "-" },
    { id: 3, name: "Rahul Verma", studentId: "S1003", subject: "Theory of Computation", code: "CS3452", isSubmitted: true, mark: "18/20" },
    { id: 4, name: "Sneha", studentId: "S1004", subject: "Theory of Computation", code: "CS3452", isSubmitted: true, mark: "20/20" },
    { id: 5, name: "Priya Sharma", studentId: "S1005", subject: "Digital Logic", code: "CS3451", isSubmitted: false, mark: "-" },
    { id: 6, name: "Vijay Singh", studentId: "S1006", subject: "Digital Logic", code: "CS3451", isSubmitted: true, mark: "15/20" },
    { id: 7, name: "Anjali Menon", studentId: "S1007", subject: "Computer Graphics", code: "CS3453", isSubmitted: false, mark: "-" },
    { id: 8, name: "Suresh Mani", studentId: "S1008", subject: "Computer Graphics", code: "CS3453", isSubmitted: true, mark: "19/20" },
  ];

  const filteredData = useMemo(() =>
    mockAssignments
      .filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(item => {
        if (status === "Submitted") return item.isSubmitted;
        if (status === "Not Submitted") return !item.isSubmitted;
        return true; // Should not happen with the current dropdown options
      }),
    [mockAssignments, searchTerm, status]
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
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Assignments</h1>
              <p className="text-sm text-gray-500">Manage and grade student assignments</p>
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

            {/* Assignment Dropdown */}
            <select
              value={assignment}
              onChange={(e) => setAssignment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-colors"
            >
              <option>Assignment 1</option>
              <option>Assignment 2</option>
              <option>Assignment 3</option>
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
              <option>Not Submitted</option>
              <option>Submitted</option>
            </select>
          </div>

          {/* Add Button */}
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-colors">
            + Create New Assignment
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
                  Mark
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
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
                      <RxCross2 className="w-10 h-10 text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No assignments found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((a, i) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors duration-150">
                    {/* Student Name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                            {a.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{a.name}</div>
                          <div className="text-xs text-gray-500">ID: {a.studentId}</div>
                        </div>
                      </div>
                    </td>

                    {/* Subject & Code */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{a.subject}</div>
                      <div className="text-xs text-gray-500">{a.code}</div>
                    </td>

                    {/* Mark */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 font-medium">{a.mark}</div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {renderStatusPill(a.isSubmitted)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          title="View Submission"
                          className="text-gray-500 hover:text-cyan-600 p-2 rounded-full hover:bg-cyan-50 transition-colors"
                        >
                          <LuEye className="w-5 h-5" />
                        </button>
                        <button
                          title="Grade/Edit Mark"
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

export default AdminAssignments;