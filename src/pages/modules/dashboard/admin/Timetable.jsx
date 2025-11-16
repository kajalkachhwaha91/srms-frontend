import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { LuPencil, LuEye } from "react-icons/lu";

const AdminTimeTable = () => {
  const [year, setYear] = useState("III Year");
  const [role, setRole] = useState("Students");
  const [search, setSearch] = useState("");

  const timetable = [
    { day: "Monday", periods: ["CS3452", "CS3751", "CS3453", "CS3751", "CS3852", "CS3453"] },
    { day: "Tuesday", periods: ["CS3852", "CS3852", "CS3453", "CS3751", "CS3453", "CS3452"] },
    { day: "Wednesday", periods: ["CS3453", "CS3852", "CS3452", "CS3852", "CS3751", "CS3453"] },
    { day: "Thursday", periods: ["CS3452", "CS3852", "CS3852", "CS3751", "CS3751", "CS3452"] },
    { day: "Friday", periods: ["CS3751", "CS3453", "CS3452", "CS3751", "CS3852", "CS3453"] },
  ];

  const details = [
    { id: 1, subject: "Theory of Computation", code: "CS3452", teacher: "Mr. Smith" },
    { id: 2, subject: "Data Structures", code: "CS3751", teacher: "Ms. Priya" },
    { id: 3, subject: "Cryptography and Cyber Security", code: "CS3453", teacher: "Mr. Rajesh" },
    { id: 4, subject: "Database Management System", code: "CS3852", teacher: "Ms. Jenifer" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-lg font-semibold text-gray-700">Time Table</h2>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Year Dropdown */}
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none"
            >
              <option>I Year</option>
              <option>II Year</option>
              <option>III Year</option>
              <option>IV Year</option>
            </select>

            {/* Role Dropdown */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none"
            >
              <option>Students</option>
              <option>Staff</option>
            </select>

            {/* Search Box */}
            <div className="relative">
              <IoIosSearch className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none"
              />
            </div>

            {/* Add Button */}
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              Add Details
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-gray-600 text-sm">
                <th className="text-left py-2">Day</th>
                <th className="py-2 text-center">I</th>
                <th className="py-2 text-center">II</th>
                <th className="py-2 text-center">III</th>
                <th className="py-2 text-center">IV</th>
                <th className="py-2 text-center">V</th>
                <th className="py-2 text-center">VI</th>
                <th className="py-2 text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((row, i) => (
                <tr key={i} className="border-b text-sm text-gray-700">
                  <td className="py-2">{row.day}</td>
                  {row.periods.map((p, j) => (
                    <td key={j} className="text-center py-2">
                      {p}
                    </td>
                  ))}
                  <td className="text-center py-2 flex justify-center gap-3">
                    <LuPencil className="text-gray-500 hover:text-sky-600 cursor-pointer" />
                    <LuEye className="text-gray-500 hover:text-sky-600 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Details Section */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">Details:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {details.map((d) => (
              <li key={d.id} className="flex items-center gap-2">
                {d.id}. {d.subject} ({d.code}) - {d.teacher}
                <LuPencil className="text-gray-500 hover:text-sky-600 cursor-pointer" size={15} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminTimeTable;
