import React, { useState } from "react";

const SemesterGrades = () => {
  const [selectedYear] = useState("2024");

  const studentInfo = {
    name: "John Doe",
    rollNo: "CS21001",
    class: "B.Tech CSE",
    section: "A",
  };

  const firstSemester = [
    { subject: "(CS3452) Theory of Computation", grade: "A+", credits: 4 },
    { subject: "(CS3751) Data Structures", grade: "A", credits: 4 },
    { subject: "(CS3453) Cryptography and Cyber Security", grade: "B+", credits: 3 },
    { subject: "(CS3852) Database Management System", grade: "O", credits: 4 },
    { subject: "(MA3151) Discrete Mathematics", grade: "A", credits: 3 },
  ];

  const secondSemester = [
    { subject: "(CS3452) Theory of Computation", grade: "A+", credits: 4 },
    { subject: "(CS3751) Data Structures", grade: "A", credits: 4 },
    { subject: "(CS3453) Cryptography and Cyber Security", grade: "B+", credits: 3 },
    { subject: "(CS3852) Database Management System", grade: "O", credits: 4 },
    { subject: "(CS3551) Computer Networks", grade: "A+", credits: 3 },
  ];

  const calculateGPA = (subjects) => {
    const gradePoints = { "O": 10, "A+": 9, "A": 8, "B+": 7, "B": 6, "C": 5 };
    const totalCredits = subjects.reduce((sum, sub) => sum + sub.credits, 0);
    const totalPoints = subjects.reduce((sum, sub) => sum + (gradePoints[sub.grade] * sub.credits), 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  const getGradeColor = (grade) => {
    const colors = {
      "O": "bg-green-100 text-green-700 border-green-300",
      "A+": "bg-blue-100 text-blue-700 border-blue-300",
      "A": "bg-cyan-100 text-cyan-700 border-cyan-300",
      "B+": "bg-yellow-100 text-yellow-700 border-yellow-300",
      "B": "bg-orange-100 text-orange-700 border-orange-300",
      "C": "bg-red-100 text-red-700 border-red-300",
    };
    return colors[grade] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  const Table = ({ data, semester }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-cyan-50 to-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Subject Name
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Credits
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Grade
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((row, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{row.subject}</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="text-sm text-gray-700 font-medium">{row.credits}</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getGradeColor(row.grade)}`}>
                    {row.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan="3" className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">Semester GPA:</span>
                  <span className="text-lg font-bold text-cyan-600">{calculateGPA(data)}</span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
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
          <li className="font-medium text-cyan-600">Semester Results</li>
        </ol>
      </nav>
    </div>
  );

  const cgpa = ((parseFloat(calculateGPA(firstSemester)) + parseFloat(calculateGPA(secondSemester))) / 2).toFixed(2);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb */}
      {renderBreadCrumb()}

      {/* Header Section with Student Info */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {studentInfo.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">Academic Results</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                  <span className="font-medium">{studentInfo.name}</span>
                  <span>•</span>
                  <span>Roll No: {studentInfo.rollNo}</span>
                  <span>•</span>
                  <span>{studentInfo.class} - {studentInfo.section}</span>
                </div>
              </div>
            </div>
            
            {/* Overall CGPA Card */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg p-4 shadow-lg text-white">
              <div className="text-xs uppercase tracking-wide font-semibold mb-1">Overall CGPA</div>
              <div className="text-3xl font-bold">{cgpa}</div>
              <div className="text-xs mt-1 opacity-90">Academic Year {selectedYear}</div>
            </div>
          </div>
        </div>
      </div>

      {/* First Semester */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-md">
            1
          </div>
          <h2 className="ml-3 text-2xl font-bold text-gray-800">First Semester</h2>
        </div>
        <Table data={firstSemester} semester="1" />
      </div>

      {/* Second Semester */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-md">
            2
          </div>
          <h2 className="ml-3 text-2xl font-bold text-gray-800">Second Semester</h2>
        </div>
        <Table data={secondSemester} semester="2" />
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
            <div className="text-sm text-gray-600 mb-1">Semester 1 GPA</div>
            <div className="text-2xl font-bold text-cyan-600">{calculateGPA(firstSemester)}</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
            <div className="text-sm text-gray-600 mb-1">Semester 2 GPA</div>
            <div className="text-2xl font-bold text-cyan-600">{calculateGPA(secondSemester)}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <div className="text-sm text-gray-600 mb-1">Overall CGPA</div>
            <div className="text-2xl font-bold text-green-600">{cgpa}</div>
          </div>
        </div>
      </div>

      {/* Grade Legend */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Grade Legend</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { grade: "O", label: "Outstanding (10)", color: "bg-green-100 text-green-700 border-green-300" },
            { grade: "A+", label: "Excellent (9)", color: "bg-blue-100 text-blue-700 border-blue-300" },
            { grade: "A", label: "Very Good (8)", color: "bg-cyan-100 text-cyan-700 border-cyan-300" },
            { grade: "B+", label: "Good (7)", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
            { grade: "B", label: "Above Average (6)", color: "bg-orange-100 text-orange-700 border-orange-300" },
            { grade: "C", label: "Average (5)", color: "bg-red-100 text-red-700 border-red-300" },
          ].map((item) => (
            <span key={item.grade} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${item.color}`}>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SemesterGrades;