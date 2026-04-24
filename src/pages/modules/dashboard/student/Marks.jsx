import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const STUDENT_ID = "S101";
const STUDENT_NAME = "Kajal Kachhwaha";
const COLLEGE_NAME = "ABC College of Engineering";

const InternalMarksBreadcrumb = () => (
  <div className="mb-6">
    <nav className="flex">
      <ol className="flex items-center space-x-2 text-sm">
        <li><HiChevronRight className="w-4 h-4 text-gray-400" /></li>
        <li className="font-medium text-cyan-600">Internal Marks</li>
      </ol>
    </nav>
  </div>
);

const MarksTable = ({ title, data }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
    <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>

    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="min-w-full">
        <thead className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Subject Name</th>
            <th className="px-6 py-3 text-center">Mark</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="px-6 py-4">{row.subject}</td>
              <td className="px-6 py-4 text-center text-cyan-600 font-semibold">
                {row.mark}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const InternalMarks = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

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

  const handleDownload = () => {
    try {
      setIsDownloading(true);

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text(COLLEGE_NAME, 14, 20);

      doc.setFontSize(14);
      doc.text("Student Result", 14, 30);

      doc.setFontSize(11);
      doc.text(`Name: ${STUDENT_NAME}`, 14, 40);
      doc.text(`College ID: ${STUDENT_ID}`, 14, 48);

      autoTable(doc, {
        startY: 58,
        head: [["First Internal Examination", "Marks"]],
        body: firstInternal.map(item => [item.subject, item.mark]),
      });

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Semester Internal Marks", "Marks"]],
        body: semesterInternal.map(item => [item.subject, item.mark]),
      });

      doc.save(`${STUDENT_NAME}_Result.pdf`);
    } catch (error) {
      setDownloadError("Unable to generate PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <InternalMarksBreadcrumb />

      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Student Internal Marks
              </h1>
              <p className="text-sm text-gray-500">
                View detailed marks for internal examinations.
              </p>
            </div>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center text-white px-5 py-3 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600"
            >
              <FaDownload className="mr-2" />
              {isDownloading ? "Downloading..." : "Download Marksheet"}
            </button>
          </div>

          {downloadError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
              <RxCross2 className="mr-2" />
              {downloadError}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <MarksTable title="First Internal Examination" data={firstInternal} />
        <MarksTable title="Semester Internal Marks" data={semesterInternal} />
      </div>
    </div>
  );
};

export default InternalMarks;