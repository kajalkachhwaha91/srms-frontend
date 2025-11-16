import React from "react";

const TimeTable = () => {
  const timetable = [
    {
      day: "Monday",
      periods: ["CS3452", "CS3751", "CS3453", "CS3852", "CS3852", "CS3453"],
    },
    {
      day: "Tuesday",
      periods: ["CS3852", "CS3852", "CS3452", "CS3852", "CS3453", "CS3452"],
    },
    {
      day: "Wednesday",
      periods: ["CS3453", "Break", "CS3852", "Lunch", "CS3852", "CS3453"],
    },
    {
      day: "Thursday",
      periods: ["CS3452", "CS3852", "CS3852", "CS3452", "CS3751", "CS3852"],
    },
    {
      day: "Friday",
      periods: ["CS3751", "CS3453", "CS3852", "CS3751", "CS3852", "CS3453"],
    },
  ];

  const details = [
    {
      subject: "Theory of Computation (CS3452)",
      teacher: "Mr. Smith",
    },
    {
      subject: "Data Structures (CS3751)",
      teacher: "Ms. Priya",
    },
    {
      subject: "Cryptography and Cyber Security (CS3453)",
      teacher: "Mr. Rajesh",
    },
    {
      subject: "Database Management System (CS3852)",
      teacher: "Ms. Jenifer",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Time Table</h2>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-sky-500 text-white text-center">
                <th className="p-2 border">Day/Period</th>
                <th className="p-2 border">I<br />9:30-10:30</th>
                <th className="p-2 border">10:30-10:45</th>
                <th className="p-2 border">II<br />10:45-11:45</th>
                <th className="p-2 border">III<br />11:45-12:45</th>
                <th className="p-2 border">12:45-1:15</th>
                <th className="p-2 border">IV<br />1:15-2:15</th>
                <th className="p-2 border">V<br />2:15-3:15</th>
                <th className="p-2 border">3:15-3:30</th>
                <th className="p-2 border">VI<br />3:30-4:00</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((row, index) => (
                <tr key={index} className="text-center border">
                  <td className="p-2 font-medium border bg-sky-100">{row.day}</td>
                  {row.periods.map((p, i) => (
                    <td
                      key={i}
                      className={`p-2 border ${
                        p === "Break" || p === "Lunch" ? "bg-white font-semibold" : "bg-sky-50"
                      }`}
                    >
                      {p}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Details Section */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Details:</h3>
          <ol className="list-decimal pl-6 space-y-1">
            {details.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item.subject} – <span className="font-medium">{item.teacher}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
