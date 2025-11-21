import React, { useState, useEffect } from "react";
import { GraduationCap, Users, ClipboardCheck } from "lucide-react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const Dashboard = () => {
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

  // Prepare pie chart data from assignments API
  const assignmentData = assignmentsData
    ? [
        {
          name: "Total Assignments",
          value: assignmentsData.total_assignments || 0,
          color: "#1E3A8A",
        },
        {
          name: "Total Submissions",
          value: assignmentsData.total_submissions || 0,
          color: "#16A34A",
        },
      ]
    : [];

  // Calculate stats from marks data
  const totalStudents = marksData?.total_students || 240;
  const avgPercentage = marksData?.average_percentage 
    ? Math.round(marksData.average_percentage / 100) + "%" 
    : "90%";

  // Batch overview data - keeping structure but you can modify based on API
  const batchOverview = [
    { year: "I", batch: "2022-2026", pass: "95%" },
    { year: "II", batch: "2021-2025", pass: "90%" },
    { year: "III", batch: "2020-2024", pass: "90%" },
    { year: "IV", batch: "2019-2023", pass: "85%" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-lg font-semibold text-red-600">
          Error loading data: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white w-full max-w-6xl rounded-lg shadow p-6 space-y-6">
        {/* Welcome Section */}
        <h2 className="text-lg font-semibold">
          Welcome  <span className="text-gray-500">(pranay@gmail.com)</span>
        </h2>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition border-sky-300">
            <GraduationCap className="text-sky-600 mb-2" size={32} />
            <p className="font-semibold">Total Students</p>
            <span className="text-xl font-bold text-gray-700">
              {totalStudents}
            </span>
          </div>

          <div className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition border-sky-300">
            <Users className="text-sky-600 mb-2" size={32} />
            <p className="font-semibold">Total Staff</p>
            <span className="text-xl font-bold text-gray-700">15</span>
          </div>

          <div className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition border-sky-300">
            <ClipboardCheck className="text-sky-600 mb-2" size={32} />
            <p className="font-semibold">Pass Percentage</p>
            <span className="text-xl font-bold text-gray-700">
              {avgPercentage}
            </span>
          </div>
        </div>

        {/* Batch Overview & Pie Chart Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Batch Overview Table */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-base font-semibold mb-3">Batch Overview</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="text-left pb-2">Year</th>
                  <th className="text-left pb-2">Batch</th>
                  <th className="text-left pb-2">Pass Percentage</th>
                </tr>
              </thead>
              <tbody>
                {batchOverview.map((batch, i) => (
                  <tr key={i} className="border-b text-gray-700">
                    <td className="py-2">{batch.year}</td>
                    <td>{batch.batch}</td>
                    <td>{batch.pass}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pie Chart Section */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-base font-semibold mb-3">
              Assignment Analytics
            </h3>
            {assignmentsData && (
              <div className="space-y-2">
                <PieChart width={350} height={250}>
                  <Pie
                    data={assignmentData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {assignmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
                <div className="text-sm text-gray-600 mt-2">
                  <p>
                    <strong>Completion Rate:</strong>{" "}
                    {assignmentsData.completed_rate}%
                  </p>
                  <p>
                    <strong>Average Internal Marks:</strong>{" "}
                    {assignmentsData.average_internal_marks}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Top Students Section */}
        {marksData?.top_students && marksData.top_students.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4 mt-4">
            <h3 className="text-base font-semibold mb-3">Top Performers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {marksData.top_students.slice(0, 3).map((student, i) => (
                <div
                  key={student._id}
                  className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-sky-600">
                      #{i + 1}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                      Grade {student.Grade}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    ID: {student.StudentID}
                  </p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Math: {student.Math}</p>
                    <p>Science: {student.Science}</p>
                    <p>English: {student.English}</p>
                  </div>
                  <p className="mt-2 text-lg font-bold text-gray-800">
                    Total: {student.Total} ({student.Percentage.toFixed(1)}%)
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;