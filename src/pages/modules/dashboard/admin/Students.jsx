import React from "react";
import DataTable from "../../../../components/Table";

const StudentPage = () => {
  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Roll Number", accessor: "rollNumber" },
    { Header: "Year", accessor: "year" },
    { Header: "Semester", accessor: "semester" },
    { Header: "Batch", accessor: "batch" },
  ];

  const students = [
    { name: "John", rollNumber: "961321104000", year: "III", semester: "06", batch: "2020-2024" },
    { name: "Arjun Kumar", rollNumber: "961321104001", year: "III", semester: "06", batch: "2020-2024" },
    { name: "Rahul Verma", rollNumber: "961321104002", year: "III", semester: "06", batch: "2020-2024" },
    { name: "Sneha", rollNumber: "961321104003", year: "III", semester: "06", batch: "2020-2024" },
    { name: "Kiran", rollNumber: "961321104004", year: "II", semester: "04", batch: "2021-2025" },
    { name: "Anjali", rollNumber: "961321104005", year: "I", semester: "02", batch: "2022-2026" },
    { name: "Ravi", rollNumber: "961321104006", year: "III", semester: "06", batch: "2020-2024" },
    { name: "Tina", rollNumber: "961321104007", year: "III", semester: "06", batch: "2020-2024" },
  ];

  return (
    <div className="p-6">
      <DataTable
        title="Students"
        columns={columns}
        data={students}
        yearFilter={["I", "II", "III", "IV"]}
        onView={(row) => alert("Viewing: " + row.name)}
        onEdit={(row) => alert("Editing: " + row.name)}
        onDelete={(row) => alert("Deleting: " + row.name)}
        onAdd={() => alert("Add new student")}
      />
    </div>
  );
};

export default StudentPage;
