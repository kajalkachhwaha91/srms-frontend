import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showTemplateInfo, setShowTemplateInfo] = useState(false);

  const API_BASE_URL = "https://student-result-management-system-vikh.onrender.com";
  const UPLOAD_MARKS_URL = `${API_BASE_URL}/marks/upload`;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE_URL}/users/students`);

      const transformedData = response.data.students.map((student) => ({
        id: student._id,
        name: student.name,
        rollNo: student.rollNumber || "N/A",
        class: student.class || "N/A",
        section: student.section || "N/A",
        phone: student.phone || "N/A",
        email: student.email,
        year: student.year || "2024",
        status: student.status !== undefined ? student.status : true,
      }));

      setStudentData(transformedData);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkUploadMarks = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setUploadMessage(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post(UPLOAD_MARKS_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadMessage({ 
        type: 'success', 
        text: `✓ Marks uploaded successfully! ${response.data.count || 'Multiple'} student record(s) processed.` 
      });

      await fetchStudents();

    } catch (err) {
      console.error("Error uploading marks:", err);
      const apiDetail = err.response?.data?.detail?.[0]?.msg;
      const errorMessage = apiDetail || err.response?.data?.message || err.message || "Failed to upload marks.";
      
      setUploadMessage({ 
        type: 'error', 
        text: errorMessage.includes("StudentID") 
          ? `✗ Upload failed: The marks file MUST contain a column named 'StudentID' that matches student IDs in the system.` 
          : `✗ Upload failed: ${errorMessage}`
      });
    } finally {
      setIsUploading(false);
      event.target.value = null;
    }
  };

  const downloadTemplate = () => {
    // Create CSV template with current student IDs
    const csvContent = [
      ['StudentID', 'Math', 'Science', 'English', 'History', 'Geography'],
      ...studentData.slice(0, 5).map(student => [
        student.id,
        '', // Empty cells for teachers to fill
        '',
        '',
        '',
        ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `marks_upload_template_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = useMemo(
    () =>
      studentData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.class.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [studentData, searchTerm]
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const renderStatusPill = (status) => (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        status
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status ? "Active" : "Inactive"}
    </span>
  );

  const renderDataTable = (data) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-cyan-50 to-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Student ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Student Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Class & Section
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Phone No.
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                    <p className="text-lg font-medium">No students found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr 
                  key={row.id} 
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                        {row.id}
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(row.id);
                          setUploadMessage({ type: 'success', text: '✓ Student ID copied to clipboard!' });
                          setTimeout(() => setUploadMessage(null), 2000);
                        }}
                        className="text-gray-400 hover:text-cyan-600 transition-colors"
                        title="Copy ID"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                          {row.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">{row.name}</div>
                        <div className="text-xs text-gray-500">Roll No: {row.rollNo}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{row.class} - {row.section}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{row.phone}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{row.email}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {renderStatusPill(row.status)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
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
        <select
          value={itemsPerPage}
          onChange={(e) => {
            onItemsPerPageChange(Number(e.target.value));
            onPageChange(1);
          }}
          className="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
        >
          <option value="5">5 / page</option>
          <option value="10">10 / page</option>
          <option value="20">20 / page</option>
          <option value="50">50 / page</option>
        </select>
        
        <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
          <button
            className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            onClick={() => onPageChange(currentPage - 1)}
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
            onClick={() => onPageChange(currentPage + 1)}
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

  const renderBreadCrumb = () => (
    <div className="mb-6">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-2 text-sm">
          
          <li>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li className="font-medium text-cyan-600">Student Management</li>
        </ol>
      </nav>
    </div>
  );

  const renderFlashMessage = () => {
    if (!uploadMessage) return null;

    const isSuccess = uploadMessage.type === 'success';
    const bgColor = isSuccess ? 'bg-green-50 border-green-400 text-green-800' : 'bg-red-50 border-red-400 text-red-800';
    const icon = isSuccess ? (
      <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    );

    return (
      <div className={`p-4 mb-6 rounded-lg border-l-4 shadow-sm ${bgColor}`} role="alert">
        <div className="flex items-start">
          {icon}
          <div className="flex-1">
            <p className="font-medium text-sm">{uploadMessage.text}</p>
            {uploadMessage.type === 'error' && (
              <div className="mt-3 p-3 bg-white rounded-md border border-gray-300 shadow-sm">
                <p className="text-xs font-semibold text-gray-900 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  File Format Requirements:
                </p>
                <ul className="text-xs text-gray-700 space-y-1.5 ml-1">
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">•</span>
                    <span><strong>File Type:</strong> Excel (.xlsx, .xls) or CSV (.csv)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">•</span>
                    <span><strong>Required Column:</strong> StudentID (must match IDs in the table)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">•</span>
                    <span><strong>Subject Columns:</strong> Math, Science, English, History, etc.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">•</span>
                    <span><strong>Example:</strong> StudentID | Math | Science | English</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={() => setUploadMessage(null)}
            className={`ml-4 -mr-1.5 rounded-lg p-1.5 inline-flex transition-colors ${isSuccess ? 'hover:bg-green-100' : 'hover:bg-red-100'}`}
          >
            <span className="sr-only">Dismiss</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
        {renderBreadCrumb()}
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
            <div className="text-xl text-gray-600">Loading students...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
        {renderBreadCrumb()}
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-xl text-red-600 mb-4">Error: {error}</div>
          <button
            onClick={fetchStudents}
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors shadow-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      {renderBreadCrumb()}
      {renderFlashMessage()} 

      {/* Header Section */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Student Management</h1>
              <p className="text-sm text-gray-500">Manage and upload student marks</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search students..."
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

              {/* Download Template Button */}
              <button
                onClick={downloadTemplate}
                className="flex items-center justify-center px-4 py-3 border-2 border-cyan-500 text-cyan-600 rounded-lg font-medium text-sm hover:bg-cyan-50 transition-all duration-200 shadow-sm"
                title="Download CSV template with student IDs"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Template
              </button>

              {/* Upload Button */}
              <div className="relative">
                <input
                  type="file"
                  id="bulk-marks-upload"
                  accept=".xlsx, .xls, .csv"
                  className="hidden"
                  onChange={handleBulkUploadMarks}
                  disabled={isUploading}
                />
                <label
                  htmlFor="bulk-marks-upload"
                  className={`flex items-center justify-center px-5 py-3 rounded-lg shadow-md font-medium text-sm transition-all duration-200 cursor-pointer ${
                    isUploading
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 hover:shadow-lg active:scale-95"
                  }`}
                >
                  {isUploading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload Marks
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Instructions Card */}
          <div className="mt-5">
            <button
              onClick={() => setShowTemplateInfo(!showTemplateInfo)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-all"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">How to Upload Marks (Step-by-Step Guide)</p>
                  <p className="text-xs text-gray-600 mt-0.5">Click to view detailed instructions</p>
                </div>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${showTemplateInfo ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showTemplateInfo && (
              <div className="mt-3 p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Download the Template</h3>
                      <p className="text-sm text-gray-600">
                        Click the "Download Template" button above. This will generate a CSV file with the current student IDs already filled in.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Fill in the Marks</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Open the file in Excel or any spreadsheet application. Fill in the marks for each subject column.
                      </p>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3 text-xs font-mono overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="text-gray-700">
                              <th className="text-left pr-4 pb-2 border-b">StudentID</th>
                              <th className="text-left pr-4 pb-2 border-b">Math</th>
                              <th className="text-left pr-4 pb-2 border-b">Science</th>
                              <th className="text-left pr-4 pb-2 border-b">English</th>
                              <th className="text-left pr-4 pb-2 border-b">History</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600">
                            <tr>
                              <td className="pr-4 pt-2">6910b751a7c90018ae5...</td>
                              <td className="pr-4 pt-2 text-cyan-600 font-semibold">85</td>
                              <td className="pr-4 pt-2 text-cyan-600 font-semibold">92</td>
                              <td className="pr-4 pt-2 text-cyan-600 font-semibold">78</td>
                              <td className="pr-4 pt-2 text-cyan-600 font-semibold">88</td>
                            </tr>
                            <tr>
                              <td className="pr-4 pt-1">6910b751a7c90018ae6...</td>
                              <td className="pr-4 pt-1 text-cyan-600 font-semibold">90</td>
                              <td className="pr-4 pt-1 text-cyan-600 font-semibold">87</td>
                              <td className="pr-4 pt-1 text-cyan-600 font-semibold">95</td>
                              <td className="pr-4 pt-1 text-cyan-600 font-semibold">82</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Upload the File</h3>
                      <p className="text-sm text-gray-600">
                        Save the file and click "Upload Marks" button. Select your completed file (CSV or Excel format). The system will process all students at once.
                      </p>
                    </div>
                  </div>

                  {/* Important Notes */}
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-semibold text-amber-900 text-sm mb-1">Important Requirements:</p>
                        <ul className="text-xs text-amber-800 space-y-1 list-disc ml-4">
                          <li><strong>Do NOT modify or delete</strong> the StudentID column or values</li>
                          <li>StudentIDs must exactly match the IDs shown in the table below</li>
                          <li>You can add or modify subject column names as needed</li>
                          <li>Leave cells empty if marks are not available</li>
                          <li>Accepted formats: .xlsx, .xls, .csv</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Data Table */}
      {renderDataTable(currentItems)}

      {/* Pagination */}
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

export default StudentManagement;