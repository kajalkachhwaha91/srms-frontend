import React from "react";
import { Check, X } from "lucide-react";

const AssignmentsPage = () => {
  const assignments = [
    {
      title: "First Assignment",
      subjects: [
        {
          code: "CS3452",
          name: "Theory of Computation",
          status: true,
          mark: "9/10",
        },
        { code: "CS3751", name: "Data Structures", status: false, mark: "-" },
        {
          code: "CS3453",
          name: "Cryptography and Cyber Security",
          status: true,
          mark: "8/10",
        },
        {
          code: "CS3852",
          name: "Database Management System",
          status: true,
          mark: "10/10",
        },
      ],
    },
    {
      title: "Second Assignment",
      subjects: [
        {
          code: "CS3452",
          name: "Theory of Computation",
          status: true,
          mark: "9/10",
        },
        { code: "CS3751", name: "Data Structures", status: false, mark: "-" },
        {
          code: "CS3453",
          name: "Cryptography and Cyber Security",
          status: true,
          mark: "8/10",
        },
        {
          code: "CS3852",
          name: "Database Management System",
          status: true,
          mark: "10/10",
        },
      ],
    },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {assignments.map((assignment, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl p-4 sm:p-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            {assignment.title}
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-[#00b8f1] rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#00b8f1] text-white text-sm sm:text-base">
                  <th className="py-2 px-3 sm:px-5 text-left rounded-tl-lg">
                    Subject Name
                  </th>
                  <th className="py-2 px-3 sm:px-5 text-center">Status</th>
                  <th className="py-2 px-3 sm:px-5 text-center rounded-tr-lg">
                    Mark
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#e6f7fc] text-gray-700">
                {assignment.subjects.map((subj, idx) => (
                  <tr
                    key={idx}
                    className={`border-t border-gray-200 ${
                      idx % 2 === 0 ? "bg-[#f7fcfe]" : ""
                    }`}
                  >
                    <td className="py-2 px-3 sm:px-5">
                      ({subj.code}) {subj.name}
                    </td>
                    <td className="text-center">
                      {subj.status ? (
                        <Check className="text-green-500 inline" size={18} />
                      ) : (
                        <X className="text-red-500 inline" size={18} />
                      )}
                    </td>
                    <td className="text-center">{subj.mark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssignmentsPage;
