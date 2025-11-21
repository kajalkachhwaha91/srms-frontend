import React, { useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx"; // For error icon
// bg-gradient-to-br from-cyan-500 to-blue-600
// --- Constants ---
const API_BASE_URL = "https://student-result-management-system-vikh.onrender.com";
// **IMPORTANT:** Replace 'S101' with the actual logged-in student's ID
const STUDENT_ID = "S101"; 

// --- Breadcrumb Component ---
const InternalMarksBreadcrumb = () => (
  <div className="mb-6">
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2 text-sm">
        
        <li>
          <HiChevronRight className="w-4 h-4 text-gray-400" />
        </li>
        <li className="font-medium text-cyan-600">Internal Marks</li>
      </ol>
    </nav>
  </div>
);

// --- Table Component (Styling Updated) ---
const MarksTable = ({ title, data }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
    <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
    
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
              Subject Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">
              Mark
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((row, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gradient-to-br from-cyan-500 to-blue-600 transition-colors duration-150`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.subject}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-cyan-600">
                {row.mark}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- Main Component ---
const InternalMarks = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  // Mock data as provided in the previous step
  const firstInternal = [
    { subject: "(CS3452) Theory of Computation", mark: "75/100" },
    { subject: "(CS3751) Data Structures", mark: "97/100" },
    { subject: "(CS3453) Cryptography and Cyber Security", mark: "80/100" },
    { subject: "(CS3852) Database Management System", mark: "98/100" },
  ];

  const semesterInternal = [
    { subject: "(CS3452) Theory of Computation", mark: "25/40" },
    { subject: "(CS3751) Data Structures", mark: "35/40" },
    { subject: "(CS3453) Cryptography and Cyber Security", mark: "30/40" },
    { subject: "(CS3852) Database Management System", mark: "39/40" },
  ];
  
  /**
   * Handles the download of the marksheet by calling the API.
   * The response is expected to be a file (e.g., HTML/PDF) which is treated as a Blob.
   */
  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    
    try {
      const downloadUrl = `${API_BASE_URL}/marks/download/${STUDENT_ID}`;
      
      const response = await axios.get(downloadUrl, {
        responseType: 'blob', // Crucial for downloading files
      });

      // 1. Create a Blob object from the response data
      const contentType = response.headers['content-type'] || 'application/octet-stream';
      const blob = new Blob([response.data], { type: contentType });
      
      // 2. Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);
      
      // 3. Create a temporary anchor element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      // Get filename from headers, or use a default name
      const filename = response.headers['content-disposition'] 
        ? response.headers['content-disposition'].split('filename=')[1] 
        : `Marksheet_${STUDENT_ID}.pdf`; 
        
      link.setAttribute('download', filename.replace(/"/g, '')); // Remove quotes if present
      document.body.appendChild(link);
      link.click();
      
      // 4. Clean up the temporary URL and link
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error("Error downloading marksheet:", err);
      // For API errors returning JSON/Text, handle the error message
      if (err.response && err.response.data instanceof Blob) {
        // Read the error message from the Blob (if the server sends error info as a Blob)
        const text = await err.response.data.text();
        setDownloadError(`Download failed: ${text.substring(0, 100)}...`);
      } else if (err.response) {
        setDownloadError(err.response.data.message || `Download failed: Status ${err.response.status}`);
      } else {
        setDownloadError(`Network Error: ${err.message}`);
      }
    } finally {
      setIsDownloading(false);
    }
  };


  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      
      {/* Breadcrumb */}
      <InternalMarksBreadcrumb />

      {/* Header and Download Button */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">
                Student Internal Marks
              </h1>
              <p className="text-sm text-gray-500">
                View detailed marks for internal examinations and semester internals.
              </p>
            </div>
            
            {/* Download Button */}
            <button 
              onClick={handleDownload}
              className={`flex items-center text-white px-5 py-3 rounded-lg text-sm font-medium shadow-md transition-colors whitespace-nowrap ${
                isDownloading 
                ? 'bg-gradient-to-br from-cyan-500 to-blue-600 cursor-not-allowed' 
                : 'bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
              }`}
              disabled={isDownloading}
              title="Download Marksheet"
            >
              {isDownloading ? (
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
              ) : (
                <FaDownload className="w-4 h-4 mr-2" />
              )}
              {isDownloading ? "Downloading..." : "Download Marksheet"}
            </button>
          </div>

          {/* Download Error Display (Similar to StaffManagement error block) */}
          {downloadError && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                <RxCross2 className="w-5 h-5 mr-3 flex-shrink-0" />
                <p className="text-sm font-medium">{downloadError}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Marks Tables Container */}
      <div className="max-w-4xl mx-auto">
        <MarksTable title="First Internal Examination" data={firstInternal} />
        
        <MarksTable title="Semester Internal Marks" data={semesterInternal} />
      </div>

    </div>
  );
};

export default InternalMarks;