import React, { useState, useMemo } from "react";
import { Download, FileText } from "lucide-react";

const NotesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedRegulation, setSelectedRegulation] = useState("all");

  const notes = [
    {
      id: 1,
      name: "Theory of Computation",
      code: "CS3452",
      regulation: "2021-2025",
      semester: "03",
      fileSize: "2.5 MB",
      uploadDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Data Structures",
      code: "CS3751",
      regulation: "2017-2021",
      semester: "03",
      fileSize: "3.8 MB",
      uploadDate: "2024-01-20",
    },
    {
      id: 3,
      name: "Cryptography and Cyber Security",
      code: "CS3453",
      regulation: "2021-2025",
      semester: "04",
      fileSize: "1.9 MB",
      uploadDate: "2024-02-05",
    },
    {
      id: 4,
      name: "Database Management System",
      code: "CS3852",
      regulation: "2021-2025",
      semester: "04",
      fileSize: "4.2 MB",
      uploadDate: "2024-02-10",
    },
    {
      id: 5,
      name: "Operating Systems",
      code: "CS3401",
      regulation: "2021-2025",
      semester: "05",
      fileSize: "3.1 MB",
      uploadDate: "2024-02-15",
    },
    {
      id: 6,
      name: "Computer Networks",
      code: "CS3551",
      regulation: "2021-2025",
      semester: "05",
      fileSize: "2.7 MB",
      uploadDate: "2024-02-20",
    },
    {
      id: 7,
      name: "Software Engineering",
      code: "CS3601",
      regulation: "2017-2021",
      semester: "06",
      fileSize: "3.5 MB",
      uploadDate: "2024-03-01",
    },
    {
      id: 8,
      name: "Artificial Intelligence",
      code: "CS3701",
      regulation: "2021-2025",
      semester: "07",
      fileSize: "4.8 MB",
      uploadDate: "2024-03-10",
    },
  ];

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        note.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSemester =
        selectedSemester === "all" || note.semester === selectedSemester;
      const matchesRegulation =
        selectedRegulation === "all" || note.regulation === selectedRegulation;
      return matchesSearch && matchesSemester && matchesRegulation;
    });
  }, [notes, searchTerm, selectedSemester, selectedRegulation]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const renderBreadCrumb = () => (
    <div className="mb-6">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-2 text-sm">
          
          <li>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li className="font-medium text-cyan-600">Study Materials</li>
        </ol>
      </nav>
    </div>
  );

  const renderDataTable = (data) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-cyan-50 to-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Subject Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Regulation
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Semester
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                File Info
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <FileText className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-lg font-medium">No notes found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr 
                  key={row.id} 
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* Subject Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-md">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">{row.name}</div>
                        <div className="text-xs text-gray-500">{row.code}</div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Regulation */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      {row.regulation}
                    </span>
                  </td>
                  
                  {/* Semester */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-700">
                      Sem {row.semester}
                    </span>
                  </td>
                  
                  {/* File Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{row.fileSize}</div>
                    <div className="text-xs text-gray-500">{row.uploadDate}</div>
                  </td>
                  
                  {/* Action */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button 
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                      onClick={() => alert(`Downloading ${row.name}`)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPagination = () => (
    <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-white rounded-xl shadow-md">
      <div className="text-sm text-gray-700 mb-3 sm:mb-0">
        Showing <span className="font-semibold text-cyan-600">{totalItems === 0 ? 0 : startIndex + 1}</span> to{" "}
        <span className="font-semibold text-cyan-600">
          {endIndex > totalItems ? totalItems : endIndex}
        </span>{" "}
        of <span className="font-semibold text-cyan-600">{totalItems}</span> notes
      </div>
      
      <div className="flex items-center space-x-4">
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
        >
          <option value="5">5 / page</option>
          <option value="10">10 / page</option>
          <option value="20">20 / page</option>
        </select>
        
        <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
          <button
            className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="ml-1">Previous</span>
          </button>
          
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                    currentPage === pageNumber
                      ? "z-10 bg-cyan-500 border-cyan-500 text-white"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            } else if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return (
                <span
                  key={pageNumber}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  ...
                </span>
              );
            }
            return null;
          })}

          <button
            className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <span className="mr-1">Next</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb */}
      {renderBreadCrumb()}

      {/* Header Section */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">Study Materials</h1>
                <p className="text-sm text-gray-500">Access and download course notes and materials</p>
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search by subject name or code..."
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm shadow-sm"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedSemester}
                onChange={(e) => {
                  setSelectedSemester(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-lg py-2 px-4 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
              >
                <option value="all">All Semesters</option>
                <option value="03">Semester 3</option>
                <option value="04">Semester 4</option>
                <option value="05">Semester 5</option>
                <option value="06">Semester 6</option>
                <option value="07">Semester 7</option>
              </select>

              <select
                value={selectedRegulation}
                onChange={(e) => {
                  setSelectedRegulation(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-lg py-2 px-4 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
              >
                <option value="all">All Regulations</option>
                <option value="2021-2025">2021-2025</option>
                <option value="2017-2021">2017-2021</option>
              </select>

              {(selectedSemester !== "all" || selectedRegulation !== "all" || searchTerm) && (
                <button
                  onClick={() => {
                    setSelectedSemester("all");
                    setSelectedRegulation("all");
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-cyan-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Materials</p>
              <p className="text-2xl font-bold text-gray-800">{notes.length}</p>
            </div>
            <FileText className="w-8 h-8 text-cyan-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Filtered Results</p>
              <p className="text-2xl font-bold text-gray-800">{filteredData.length}</p>
            </div>
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Semesters</p>
              <p className="text-2xl font-bold text-gray-800">5</p>
            </div>
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
      </div>

      {/* Data Table */}
      {renderDataTable(currentItems)}

      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default NotesTable;