import React from "react";
import Sidebar from "../../../../components/sidebar";
import Navbar from "../../../../components/navbar";
import { GraduationCap, Users, ClipboardCheck } from "lucide-react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

import {
  Home,
  ClipboardList,
  BookOpen,
  FileText,
  Download,
  Calendar,
  Bell,
} from "lucide-react";

// const menuItems = [
//   { name: "Dashboard", path: "/admin", icon: Home },
//   { name: "Students", path: "/admin/students", icon: Users },
//   { name: "Teachers", path: "/admin/teachers", icon: BookOpen },
//   { name: "Assignments", path: "/admin/assignments", icon: ClipboardList },
//   { name: "Results", path: "/admin/results", icon: FileText },
//   { name: "Notes", path: "/admin/notes", icon: Download },
//   { name: "Events", path: "/admin/events", icon: Calendar },
//   { name: "Notifications", path: "/admin/notifications", icon: Bell },
// ];

const Dashboard = () => {
  // Pie chart data
  const assignmentData = [
    { name: "I Year", value: 75, color: "#1E3A8A" },
    { name: "II Year", value: 15, color: "#16A34A" },
    { name: "III Year", value: 75, color: "#F59E0B" },
    { name: "IV Year", value: 45, color: "#8B5CF6" },
  ];

  // Batch overview data
  const batchOverview = [
    { year: "I", batch: "2022-2026", pass: "95%" },
    { year: "II", batch: "2021-2025", pass: "90%" },
    { year: "III", batch: "2020-2024", pass: "90%" },
    { year: "IV", batch: "2019-2023", pass: "85%" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white w-full max-w-6xl rounded-lg shadow p-6 space-y-6">
        {/* Welcome Section */}
        <h2 className="text-lg font-semibold">
          Welcome Admin <span className="text-gray-500">(admin@met.com)</span>
        </h2>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition border-sky-300">
            <GraduationCap className="text-sky-600 mb-2" size={32} />
            <p className="font-semibold">Total Students</p>
            <span className="text-xl font-bold text-gray-700">240</span>
          </div>

          <div className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition border-sky-300">
            <Users className="text-sky-600 mb-2" size={32} />
            <p className="font-semibold">Total Staff</p>
            <span className="text-xl font-bold text-gray-700">15</span>
          </div>

          <div className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition border-sky-300">
            <ClipboardCheck className="text-sky-600 mb-2" size={32} />
            <p className="font-semibold">Pass Percentage</p>
            <span className="text-xl font-bold text-gray-700">90%</span>
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
              Assignment Submission Status
            </h3>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
