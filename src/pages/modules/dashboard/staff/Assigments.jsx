import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { LuEye, LuPencil } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Assignments = () => {
  const [year, setYear] = useState("III Year");
  const [status, setStatus] = useState("Not Submitted");
  const [assignment, setAssignment] = useState("Assignment 1");
  const [search, setSearch] = useState("");

  const assignments = [
    { name: "John", subject: "Theory of Computation", code: "CS3452", status: false, mark: "-" },
    { name: "Arjun Kumar", subject: "Theory of Computation", code: "CS3452", status: false, mark: "-" },
    { name: "Rahul Verma", subject: "Theory of Computation", code: "CS3452", status: false, mark: "-" },
    { name: "Sneha", subject: "Theory of Computation", code: "CS3452", status: false, mark: "-" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-lg font-semibold text-gray-700">Assignments</h2>

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

            {/* Status Dropdown */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none"
            >
              <option>Not Submitted</option>
              <option>Submitted</option>
            </select>

            {/* Assignment Dropdown */}
            <select
              value={assignment}
              onChange={(e) => setAssignment(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none"
            >
              <option>Assignment 1</option>
              <option>Assignment 2</option>
              <option>Assignment 3</option>
            </select>

            {/* Search box */}
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
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Mark</th>
                <th className="text-left py-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a, i) => (
                <tr key={i} className="border-b text-sm text-gray-700">
                  <td className="py-2">{a.name}</td>
                  <td className="py-2">{a.subject}</td>
                  <td className="py-2">{a.code}</td>
                  <td className="py-2">
                    {a.status ? (
                      <span className="text-green-500 text-lg font-bold">✔</span>
                    ) : (
                      <RxCross2 className="text-red-500 text-lg" />
                    )}
                  </td>
                  <td className="py-2">{a.mark}</td>
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

export default Assignments;
