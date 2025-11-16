import React from "react";

const InternalMarks = () => {
  const firstInternal = [
    { subject: "(CS3452) Theory of Computation", mark: "75/100" },
    { subject: "(CS3751) Data Structures", mark: "97/100" },
    { subject: "(CS3453) Cryptography and Cyber Security", mark: "80/100" },
    { subject: "(CS3852) Database Management System", mark: "98/100" },
  ];

  const semesterInternal = [
    { subject: "(CS3452) Theory of Computation", mark: "25/40" },
    { subject: "(CS3751) Data Structures", mark: "35/40" },
    { subject: "(CS3453) Cryptography and Cyber Security", mark: "30/40" },
    { subject: "(CS3852) Database Management System", mark: "39/40" },
  ];

  const Table = ({ data }) => (
    <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
      <thead>
        <tr className="bg-sky-500 text-white text-left">
          <th className="p-3 font-semibold">Subject Name</th>
          <th className="p-3 font-semibold text-center">Mark</th>
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
            <td className="p-3 text-center">{row.mark}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-6">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">
          First Internal Examination
        </h2>
        <Table data={firstInternal} />
      </div>

      <div className="bg-white w-full max-w-3xl rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Semester Internal Marks</h2>
        <Table data={semesterInternal} />
      </div>
    </div>
  );
};

export default InternalMarks;
