import React, { useState, useEffect } from "react";
import { Check, X, Upload, Clock, CheckCircle, FileText } from "lucide-react";

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const API_BASE_URL = "https://student-result-management-system-vikh.onrender.com";
  
  // Replace with actual student ID from your auth/context
  const STUDENT_ID = "S101";

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/assignments/student/${STUDENT_ID}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAssignments(data);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setError(err.message || "Failed to fetch assignments");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setSubmitMessage("");
  };

  const handleSubmitAssignment = async (assignmentId) => {
    if (!selectedFile) {
      setSubmitMessage("Please select a file first");
      return;
    }

    try {
      setSubmitting(true);
      setSubmitMessage("");

      const formData = new FormData();
      formData.append("assignmentId", assignmentId);
      formData.append("studentId", STUDENT_ID);
      formData.append("file", selectedFile);

      const response = await fetch(
        `${API_BASE_URL}/assignments/submit`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Assignment submitted successfully");
      }

      setSubmitMessage(data.message || "Assignment submitted successfully!");
      setSelectedFile(null);
      
      // Refresh assignments after submission
      setTimeout(() => {
        fetchAssignments();
        setSubmitMessage("");
      }, 2000);
    } catch (err) {
      console.error("Error submitting assignment:", err);
      setSubmitMessage(err.message || "Failed to submit assignment");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase() || "";
    
    if (statusLower === "completed" || statusLower === "submitted") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <CheckCircle className="w-3 h-3 mr-1" />
          Submitted
        </span>
      );
    } else if (statusLower === "pending") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          <X className="w-3 h-3 mr-1" />
          Not Submitted
        </span>
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Breadcrumb
  const renderBreadCrumb = () => (
    <div className="mb-6">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-2 text-sm">
          
          <li>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li className="font-medium text-cyan-600">Assignments</li>
        </ol>
      </nav>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
        {renderBreadCrumb()}
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
            <div className="text-xl text-gray-600">Loading assignments...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
        {renderBreadCrumb()}
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-xl text-red-600 mb-4">Error: {error}</div>
          <button
            onClick={fetchAssignments}
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

      {/* Header Section */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">My Assignments</h1>
              <p className="text-sm text-gray-500">View and submit your assignments</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FileText className="w-5 h-5 text-cyan-500" />
              <span className="font-medium">{assignments.length} Total Assignments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Message */}
      {submitMessage && (
        <div className={`mb-6 p-4 rounded-lg ${
          submitMessage.includes("success") 
            ? "bg-green-50 text-green-700 border border-green-200" 
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {submitMessage}
        </div>
      )}

      {/* Assignments List */}
      <div className="space-y-6">
        {assignments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-600">No assignments found</p>
            <p className="text-sm text-gray-400 mt-1">Check back later for new assignments</p>
          </div>
        ) : (
          assignments.map((assignment, index) => (
            <div
              key={assignment._id || index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Assignment Header */}
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{assignment.title}</h2>
                    <p className="text-cyan-50 text-sm">{assignment.description}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end space-y-2">
                    {getStatusBadge(assignment.status)}
                    <div className="text-xs text-cyan-50">
                      Due: {formatDate(assignment.dueDate)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignment Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Subject</p>
                      <p className="font-semibold text-gray-800">{assignment.subject}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Max Marks</p>
                      <p className="font-semibold text-gray-800">{assignment.maxMarks}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Obtained Marks</p>
                      <p className="font-semibold text-gray-800">
                        {assignment.obtainedMarks !== null && assignment.obtainedMarks !== undefined
                          ? assignment.obtainedMarks
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Section - Only show if not completed */}
                {assignment.status?.toLowerCase() !== "completed" && 
                 assignment.status?.toLowerCase() !== "submitted" && (
                  <div className="border-t pt-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Submit Assignment</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="flex-1 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 cursor-pointer"
                        disabled={submitting}
                      />
                      <button
                        onClick={() => handleSubmitAssignment(assignment._id)}
                        disabled={submitting || !selectedFile}
                        className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{submitting ? "Submitting..." : "Submit"}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Submitted Status */}
                {(assignment.status?.toLowerCase() === "completed" || 
                  assignment.status?.toLowerCase() === "submitted") && (
                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Assignment Submitted Successfully</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Submitted on: {formatDate(assignment.createdAt)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AssignmentsPage;