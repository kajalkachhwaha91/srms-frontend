import React from "react";
import { GraduationCap, User, IndianRupee } from "lucide-react";

const Students = () => {
  const student = {
    name: "John",
    regNo: "961321104000",
    cgpa: 8.5,
    attendance: "85%",
    dues: 12000,
    dob: "01.04.2000",
    gender: "Male",
    department: "CSE",
    yearSem: "Third/06",
    batch: "2020 - 2024",
    arrears: 4,
    degree: "B.E",
    email: "xyz@gmail.com",
    mobile: "123456789",
    accommodation: "Day scholar",
    image:
      "https://cdn-icons-png.flaticon.com/512/219/219983.png",
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Welcome Header */}
      <div className="bg-white shadow-md rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Welcome {student.name}
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {/* CGPA */}
          <div className="flex flex-col items-center justify-center border border-[#00b8f1] rounded-lg py-3 sm:py-4 shadow-sm">
            <GraduationCap className="text-[#00b8f1]" size={24} />
            <p className="text-gray-600 text-sm mt-2">CGPA</p>
            <p className="text-lg font-semibold">{student.cgpa}</p>
          </div>

          {/* Attendance */}
          <div className="flex flex-col items-center justify-center border border-[#00b8f1] rounded-lg py-3 sm:py-4 shadow-sm">
            <User className="text-[#00b8f1]" size={24} />
            <p className="text-gray-600 text-sm mt-2">Attendance</p>
            <p className="text-lg font-semibold">{student.attendance}</p>
          </div>

          {/* Dues */}
          <div className="flex flex-col items-center justify-center border border-[#00b8f1] rounded-lg py-3 sm:py-4 shadow-sm">
            <IndianRupee className="text-[#00b8f1]" size={24} />
            <p className="text-gray-600 text-sm mt-2">Dues</p>
            <p className="text-lg font-semibold">{student.dues}</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Profile */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-gray-800 font-semibold mb-4">Your Profile</h3>
          <img
            src={student.image}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-[#00b8f1] mb-3"
          />
          <p className="text-gray-700 font-medium">{student.name}</p>
          <p className="text-gray-500 text-sm">{student.regNo}</p>
        </div>

        {/* Right: Personal Details */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-gray-800 font-semibold mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-700">
            <p><strong>DOB:</strong> {student.dob}</p>
            <p><strong>Arrears:</strong> {student.arrears}</p>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p><strong>Degree:</strong> {student.degree}</p>
            <p><strong>Department:</strong> {student.department}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Year/Sem:</strong> {student.yearSem}</p>
            <p><strong>Mobile:</strong> {student.mobile}</p>
            <p><strong>Batch:</strong> {student.batch}</p>
            <p><strong>Accommodation:</strong> {student.accommodation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
