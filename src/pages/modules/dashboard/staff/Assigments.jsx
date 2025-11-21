import React, { useState, useEffect, useMemo } from "react";
import { Search, Eye, Edit, X, ChevronLeft, ChevronRight, CheckCircle, Plus } from "lucide-react";

const StaffAssignments = () => {
  const [year, setYear] = useState("III Year");
  const [status, setStatus] = useState("All");
  const [assignment, setAssignment] = useState("Assignment 1");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [assignments, setAssignments] = useState([]);
  const [verifyModal, setVerifyModal] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [marks, setMarks] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    subject: "",
    maxMarks: 20,
    teacherId: "",
    dueDate: ""
  });

  const API_BASE_URL = "https://student-result-management-system-vikh.onrender.com";

  const mockAssignments = [
    { 
      _id: "6733a5a5a124b9b82c4fd2b1",
      studentId: "S102", 
      studentName: "John Doe",
      subject: "Theory of Computation", 
      code: "CS3452", 
      status: "submitted",
      submittedAt: "2024-11-20T10:30:00Z",
      mark: null 
    },
    { 
      _id: "6733a5a5a124b9b82c4fd2b2",
      studentId: "S101", 
      studentName: "Arjun Kumar",
      subject: "Theory of Computation", 
      code: "CS3452", 
      status: "verified",
      submittedAt: "2024-11-19T14:20:00Z",
      mark: 18 
    },
    { 
      _id: "6733a5a5a124b9b82c4fd2b3",
      studentId: "S103", 
      studentName: "Rahul Verma",
      subject: "Theory of Computation", 
      code: "CS3452", 
      status: "not_submitted",
      submittedAt: null,
      mark: null 
    },
    { 
      _id: "6733a5a5a124b9b82c4fd2b4",
      studentId: "S104", 
      studentName: "Sneha Patel",
      subject: "Theory of Computation", 
      code: "CS3452", 
      status: "submitted",
      submittedAt: "2024-11-21T09:15:00Z",
      mark: null 
    },
  ];

  useEffect(() => {
    setAssignments(mockAssignments);
  }, [year, assignment]);

  const fetchStudentList = async () => {
    try {
      setLoadingStudents(true);
      const response = await fetch(`${API_BASE_URL}/users/students`);
      const data = await response.json();
      if (response.ok && data.students) {
        setStudentList(data.students);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      alert("Failed to load student list");
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleCreateAssignment = async () => {
    if (!newAssignment.title || !newAssignment.description || !newAssignment.subject || !newAssignment.teacherId || !newAssignment.dueDate) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/assignments/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAssignment)
      });
      const data = await response.json();
      if (response.ok) {
        alert("Assignment created successfully!");
        setCreateModal(false);
        setNewAssignment({ title: "", description: "", subject: "", maxMarks: 20, teacherId: "", dueDate: "" });
      }
    } catch (err) {
      alert("Failed to create assignment");
    } finally {
      setSubmitting(false);
    }
  };

  const openCreateModal = () => {
    setCreateModal(true);
    fetchStudentList();
  };

  const handleVerifyAssignment = async (assignmentData) => {
    if (!marks || isNaN(marks) || marks < 0 || marks > 20) {
      alert("Please enter valid marks between 0 and 20");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/assignments/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignmentId: assignmentData._id,
          studentId: assignmentData.studentId,
          obtainedMarks: parseInt(marks)
        })
      });
      const data = await response.json();
      if (response.ok) {
        setAssignments(prev => prev.map(a => 
          a._id === assignmentData._id ? { ...a, status: "verified", mark: parseInt(marks) } : a
        ));
        alert("Assignment verified successfully!");
        setVerifyModal(null);
        setMarks("");
      }
    } catch (err) {
      alert("Failed to verify assignment");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredData = useMemo(() => {
    return assignments.filter(item => {
      const matchesSearch = 
        item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = 
        status === "All" || 
        (status === "Submitted" && item.status === "submitted") ||
        (status === "Not Submitted" && item.status === "not_submitted") ||
        (status === "Verified" && item.status === "verified");
      return matchesSearch && matchesStatus;
    });
  }, [assignments, searchTerm, status]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const getStatusBadge = (status) => {
    switch(status) {
      case "verified":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Verified</span>;
      case "submitted":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Submitted</span>;
      case "not_submitted":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Not Submitted</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Unknown</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-2 text-sm">
           
            <li><svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg></li>
            <li className="font-medium text-cyan-600">Assignment Management</li>
          </ol>
        </nav>
      </div>

      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Assignment Management</h1>
              <p className="text-sm text-gray-500">Review and verify student assignment submissions</p>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap w-full lg:w-auto">
              <select value={year} onChange={(e) => setYear(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white shadow-sm">
                <option>I Year</option>
                <option>II Year</option>
                <option>III Year</option>
                <option>IV Year</option>
              </select>

              <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white shadow-sm">
                <option>All</option>
                <option>Not Submitted</option>
                <option>Submitted</option>
                <option>Verified</option>
              </select>

              <select value={assignment} onChange={(e) => setAssignment(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white shadow-sm">
                <option>Assignment 1</option>
                <option>Assignment 2</option>
                <option>Assignment 3</option>
                <option>Assignment 4</option>
              </select>

              <div className="relative">
                <input type="text" placeholder="Search student, ID, code..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm w-64" />
                <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              </div>

              <button onClick={openCreateModal} className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Assignment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-cyan-50 to-blue-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Student Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject & Code</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Submitted At</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Marks</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      <p className="text-lg font-medium">No assignments found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                            {item.studentName.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{item.studentName}</div>
                          <div className="text-xs text-gray-500">ID: {item.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{item.subject}</div>
                      <div className="text-xs text-gray-500">{item.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{formatDate(item.submittedAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">{getStatusBadge(item.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm font-semibold text-gray-900">{item.mark !== null ? `${item.mark}/20` : "-"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button className="text-gray-500 hover:text-cyan-600 transition-colors p-1.5 hover:bg-cyan-50 rounded-lg disabled:opacity-30" title="View submission" disabled={item.status === "not_submitted"}>
                          <Eye className="w-4 h-4" />
                        </button>
                        {item.status === "submitted" && (
                          <button onClick={() => setVerifyModal(item)} className="text-gray-500 hover:text-green-600 transition-colors p-1.5 hover:bg-green-50 rounded-lg" title="Verify and add marks">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {item.status === "verified" && (
                          <button onClick={() => { setVerifyModal(item); setMarks(item.mark.toString()); }} className="text-gray-500 hover:text-blue-600 transition-colors p-1.5 hover:bg-blue-50 rounded-lg" title="Edit marks">
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-white rounded-xl shadow-md">
        <div className="text-sm text-gray-700 mb-3 sm:mb-0">
          Showing <span className="font-semibold text-cyan-600">{totalItems === 0 ? 0 : startIndex + 1}</span> to <span className="font-semibold text-cyan-600">{Math.min(endIndex, totalItems)}</span> of <span className="font-semibold text-cyan-600">{totalItems}</span> results
        </div>
        <div className="flex items-center space-x-4">
          <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white">
            <option value="5">5 / page</option>
            <option value="10">10 / page</option>
            <option value="20">20 / page</option>
          </select>
          <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
            <button className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                return (
                  <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)} className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNumber ? "z-10 bg-cyan-500 border-cyan-500 text-white" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                    {pageNumber}
                  </button>
                );
              } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                return <span key={pageNumber} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm">...</span>;
              }
              return null;
            })}
            <button className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>

      {verifyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">{verifyModal.status === "verified" ? "Edit Marks" : "Verify Assignment"}</h3>
              <button onClick={() => { setVerifyModal(null); setMarks(""); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Student: <span className="font-semibold text-gray-900">{verifyModal.studentName}</span></p>
              <p className="text-sm text-gray-600 mb-2">ID: <span className="font-semibold text-gray-900">{verifyModal.studentId}</span></p>
              <p className="text-sm text-gray-600">Subject: <span className="font-semibold text-gray-900">{verifyModal.subject}</span></p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter Marks (out of 20)</label>
              <input type="number" min="0" max="20" value={marks} onChange={(e) => setMarks(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" placeholder="Enter marks" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setVerifyModal(null); setMarks(""); }} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={() => handleVerifyAssignment(verifyModal)} disabled={submitting} className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{submitting ? "Submitting..." : "Submit"}</button>
            </div>
          </div>
        </div>
      )}

      {createModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Create New Assignment</h3>
              <button onClick={() => { setCreateModal(false); setNewAssignment({ title: "", description: "", subject: "", maxMarks: 20, teacherId: "", dueDate: "" }); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title <span className="text-red-500">*</span></label>
                <input type="text" value={newAssignment.title} onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" placeholder="e.g., Science Project" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description <span className="text-red-500">*</span></label>
                <textarea value={newAssignment.description} onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})} rows="3" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" placeholder="Describe the assignment..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject <span className="text-red-500">*</span></label>
                  <input type="text" value={newAssignment.subject} onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" placeholder="e.g., Science" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Marks</label>
                  <input type="number" value={newAssignment.maxMarks} onChange={(e) => setNewAssignment({...newAssignment, maxMarks: parseInt(e.target.value) || 20})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" min="1" max="100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teacher ID <span className="text-red-500">*</span></label>
                  <input type="text" value={newAssignment.teacherId} onChange={(e) => setNewAssignment({...newAssignment, teacherId: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" placeholder="e.g., T101" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date <span className="text-red-500">*</span></label>
                  <input type="date" value={newAssignment.dueDate} onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
              </div>
              {loadingStudents ? (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500 mb-2"></div>
                  <p className="text-sm text-gray-600">Loading students...</p>
                </div>
              ) : studentList.length > 0 ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Students ({studentList.length})</h4>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {studentList.slice(0, 5).map((student) => (
                      <div key={student._id} className="flex items-center gap-3 text-sm">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold text-xs">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    ))}
                    {studentList.length > 5 && (
                      <p className="text-xs text-gray-500 text-center pt-2">+{studentList.length - 5} more students</p>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex gap-3 mt-6 pt-4 border-t">
              <button onClick={() => { setCreateModal(false); setNewAssignment({ title: "", description: "", subject: "", maxMarks: 20, teacherId: "", dueDate: "" }); }} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
              <button onClick={handleCreateAssignment} disabled={submitting} className="flex-1 px-4 py-2.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium">{submitting ? "Creating..." : "Create Assignment"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffAssignments;