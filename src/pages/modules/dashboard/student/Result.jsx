import React from "react";

const SemesterGrades = () => {
  const firstSemester = [
    { subject: "(CS3452) Theory of Computation", grade: "A+" },
    { subject: "(CS3751) Data Structures", grade: "A" },
    { subject: "(CS3453) Cryptography and Cyber Security", grade: "B+" },
    { subject: "(CS3852) Database Management System", grade: "O" },
  ];

  const secondSemester = [
    { subject: "(CS3452) Theory of Computation", grade: "A+" },
    { subject: "(CS3751) Data Structures", grade: "A" },
    { subject: "(CS3453) Cryptography and Cyber Security", grade: "B+" },
    { subject: "(CS3852) Database Management System", grade: "O" },
  ];

  const Table = ({ data }) => (
    <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
      <thead>
        <tr className="bg-sky-500 text-white text-left">
          <th className="p-3 font-semibold">Subject Name</th>
          <th className="p-3 font-semibold text-center">Grade</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? "bg-sky-100" : "bg-sky-50"
            } border-t border-gray-200`}
          >
            <td className="p-3">{row.subject}</td>
            <td className="p-3 text-center">{row.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-6">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">First Semester</h2>
        <Table data={firstSemester} />
      </div>

      <div className="bg-white w-full max-w-3xl rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Second Semester</h2>
        <Table data={secondSemester} />
      </div>
    </div>
  );
};

export default SemesterGrades;
