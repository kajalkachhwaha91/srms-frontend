import React, { useState } from "react";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";

const NotesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const notes = [
    {
      name: "Theory of Computation",
      code: "CS3452",
      regulation: "2021-2025",
      semester: "03",
    },
    {
      name: "Data Structures",
      code: "CS3751",
      regulation: "2017-2021",
      semester: "03",
    },
    {
      name: "Cryptography and Cyber Security",
      code: "CS3453",
      regulation: "2021-2025",
      semester: "04",
    },
    {
      name: "Database Management System",
      code: "CS3852",
      regulation: "2021-2025",
      semester: "04",
    },
  ];

  const filteredNotes = notes.filter((note) =>
    note.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Notes</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-full pl-10 pr-4 py-1 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1.5 text-gray-500 w-4 h-4" />
          </div>
        </div>

        <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="text-left pb-2">Name</th>
              <th className="text-left pb-2">Code</th>
              <th className="text-left pb-2">Regulation</th>
              <th className="text-left pb-2">Semester</th>
              <th className="text-left pb-2">Download</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotes.map((note, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-sky-50 transition"
              >
                <td className="py-2">{note.name}</td>
                <td>{note.code}</td>
                <td>{note.regulation}</td>
                <td>{note.semester}</td>
                <td>
                  <button className="text-sky-600 hover:text-sky-800">
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <button className="border px-2 py-1 rounded disabled:opacity-50">
              <ChevronLeft size={16} />
            </button>
            <span>Page 1 of 2</span>
            <button className="border px-2 py-1 rounded bg-sky-100 hover:bg-sky-200">
              <ChevronRight size={16} />
            </button>
          </div>
          <p>Total Notes: {filteredNotes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default NotesTable;
