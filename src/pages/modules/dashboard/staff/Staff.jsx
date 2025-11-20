import React, { useState, useEffect } from "react";
import { BookOpen, Users, CheckCircle, Clock, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const StaffPage = () => {
  const [marksData, setMarksData] = useState(null);
  const [assignmentsData, setAssignmentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch marks analytics
        const marksResponse = await fetch(
          "https://student-result-management-system-vikh.onrender.com/marks/analytics"
        );
        const marksJson = await marksResponse.json();
        setMarksData(marksJson);

        // Fetch assignments analytics
        const assignmentsResponse = await fetch(
          "https://student-result-management-system-vikh.onrender.com/assignments/analytics"
        );
        const assignmentsJson = await assignmentsResponse.json();
        setAssignmentsData(assignmentsJson);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare subject-wise performance data from marks
  const subjectPerformanceData = marksData?.subject_averages 
    ? Object.keys(marksData.subject_averages).map(subject => ({
        subject: subject,
        average: Math.round(marksData.subject_averages[subject])
      }))
    : [
        { subject: "Math", average: 75 },
        { subject: "Science", average: 82 },
        { subject: "English", average: 78 },
        { subject: "History", average: 80 },
      ];

  // Calculate stats
  const totalStudents = marksData?.total_students || 240;
  const avgMarks = marksData?.average_percentage 
    ? Math.round(marksData.average_percentage) 
    : 78;
  const totalAssignments = assignmentsData?.total_assignments || 0;
  const completionRate = assignmentsData?.completed_rate || 0;

  // Recent submissions (mock data - you can modify based on API)
  const recentSubmissions = [
    { student: "Student #6910b75", assignment: "Physics Lab Report", date: "Nov 19, 2025", status: "Completed" },
    { student: "Student #6910b76", assignment: "Math Assignment 5", date: "Nov 19, 2025", status: "Completed" },
    { student: "Student #6910b77", assignment: "English Essay", date: "Nov 18, 2025", status: "Pending" },
    { student: "Student #6910b78", assignment: "Chemistry Quiz", date: "Nov 18, 2025", status: "Completed" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <div className="text-xl text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <div className="text-center">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-cyan-500">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Welcome, Staff 👩‍🏫
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                staff@met.com • Staff Dashboard
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full p-4">
                <BookOpen className="text-cyan-600" size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Students */}
          <div className="bg-white border-2 border-cyan-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-cyan-100 rounded-lg p-3">
                <Users className="text-cyan-600" size={24} />
              </div>
              <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Total Students</p>
            <span className="text-3xl font-bold text-gray-800 block mt-1">
              {totalStudents}
            </span>
          </div>

          {/* Average Marks */}
          <div className="bg-white border-2 border-green-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-100 rounded-lg p-3">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                Class Avg
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Average Marks</p>
            <span className="text-3xl font-bold text-gray-800 block mt-1">
              {avgMarks}%
            </span>
          </div>

          {/* Total Assignments */}
          <div className="bg-white border-2 border-blue-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-100 rounded-lg p-3">
                <FileText className="text-blue-600" size={24} />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Total
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Assignments</p>
            <span className="text-3xl font-bold text-gray-800 block mt-1">
              {totalAssignments}
            </span>
          </div>

          {/* Completion Rate */}
          <div className="bg-white border-2 border-purple-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-purple-100 rounded-lg p-3">
                <Clock className="text-purple-600" size={24} />
              </div>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                Rate
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Completion Rate</p>
            <span className="text-3xl font-bold text-gray-800 block mt-1">
              {completionRate}%
            </span>
          </div>
        </div>

        {/* Charts and Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subject Performance Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Subject Performance Overview</h3>
              <p className="text-sm text-gray-500 mt-1">Average marks across subjects</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="subject" 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="average" 
                  fill="#06b6d4" 
                  radius={[8, 8, 0, 0]}
                  name="Average Marks"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Submissions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Submissions</h3>
              <p className="text-sm text-gray-500 mt-1">Latest student assignment submissions</p>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {recentSubmissions.map((submission, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">
                      {submission.student}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {submission.assignment}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {submission.date}
                    </p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      submission.status === "Completed" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {submission.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers Section */}
        {marksData?.top_students && marksData.top_students.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">🏆 Top Performers</h3>
              <p className="text-sm text-gray-500 mt-1">Students with highest performance</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {marksData.top_students.slice(0, 3).map((student, i) => (
                <div
                  key={student._id}
                  className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl font-bold text-cyan-600">
                      #{i + 1}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                      Grade {student.Grade}
                    </span>
                  </div>
                  <div className="mb-3">
                    <p className="font-semibold text-gray-800 text-sm">
                      Student ID
                    </p>
                    <p className="text-xs text-gray-600 font-mono bg-white px-2 py-1 rounded mt-1 border border-gray-200">
                      {student.StudentID}
                    </p>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Math:</span>
                      <span className="font-semibold text-gray-800">{student.Math}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Science:</span>
                      <span className="font-semibold text-gray-800">{student.Science}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">English:</span>
                      <span className="font-semibold text-gray-800">{student.English}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-cyan-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">Total Score:</span>
                      <span className="text-xl font-bold text-cyan-600">
                        {student.Total} ({student.Percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assignment Analytics Summary */}
        {assignmentsData && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">📊 Assignment Analytics</h3>
              <p className="text-sm text-gray-500 mt-1">Comprehensive assignment statistics</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Total Assignments</p>
                <p className="text-2xl font-bold text-blue-600">{assignmentsData.total_assignments}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Total Submissions</p>
                <p className="text-2xl font-bold text-green-600">{assignmentsData.total_submissions}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Completion Rate</p>
                <p className="text-2xl font-bold text-purple-600">{assignmentsData.completed_rate}%</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200">
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Avg Internal Marks</p>
                <p className="text-2xl font-bold text-orange-600">{assignmentsData.average_internal_marks}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffPage;