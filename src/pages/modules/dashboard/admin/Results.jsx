import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { LuEye, LuPencil } from "react-icons/lu";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const AdminSemesterResults = () => {
  const [year, setYear] = useState("III Year");
  const [semester, setSemester] = useState("Semester 06");
  const [status, setStatus] = useState("Pass");
  const [search, setSearch] = useState("");

  const results = [
    { name: "John", subject: "Theory of Computation", code: "CS3452", pass: true, mark: "A+" },
    { name: "Arjun Kumar", subject: "Theory of Computation", code: "CS3452", pass: true, mark: "A" },
    { name: "Rahul Verma", subject: "Theory of Computation", code: "CS3452", pass: true, mark: "B" },
    { name: "Sneha", subject: "Theory of Computation", code: "CS3452", pass: true, mark: "B+" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-lg font-semibold text-gray-700">Semester Results</h2>

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

            {/* Semester Dropdown */}
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none"
            >
              <option>Semester 01</option>
              <option>Semester 02</option>
              <option>Semester 03</option>
              <option>Semester 04</option>
              <option>Semester 05</option>
              <option>Semester 06</option>
              <option>Semester 07</option>
              <option>Semester 08</option>
            </select>

            {/* Status Dropdown */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none"
            >
              <option>Pass</option>
              <option>Fail</option>
            </select>

            {/* Search */}
            <div className="relative">
              <IoIosSearch className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search code"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none"
              />
            </div>

            {/* Add Button */}
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              Add
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-gray-600 text-sm">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Subject</th>
                <th className="text-left py-2">Code</th>
                <th className="text-left py-2">Pass</th>
                <th className="text-left py-2">Mark</th>
                <th className="text-left py-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} className="border-b text-sm text-gray-700">
                  <td className="py-2">{r.name}</td>
                  <td className="py-2">{r.subject}</td>
                  <td className="py-2">{r.code}</td>
                  <td className="py-2">
                    {r.pass ? (
                      <span className="text-green-500 text-lg font-bold">✔</span>
                    ) : (
                      <span className="text-red-500 text-lg font-bold">✖</span>
                    )}
                  </td>
                  <td className="py-2">{r.mark}</td>
                  <td className="py-2 flex items-center gap-3">
                    <LuEye className="text-gray-500 hover:text-sky-600 cursor-pointer" />
                    <LuPencil className="text-gray-500 hover:text-sky-600 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <button className="p-1 border rounded-md hover:bg-gray-100">
              <HiChevronLeft />
            </button>
            <span>Page 1 of 2</span>
            <button className="p-1 border rounded-md hover:bg-gray-100">
              <HiChevronRight />
            </button>
          </div>
          <p>Total Students: 8</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSemesterResults;
