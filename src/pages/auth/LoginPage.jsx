import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("Kachhwahakajal91@gmail.com");
  const [password, setPassword] = useState("Kajal@91");
  const [role, setRole] = useState("");
    const navigate = useNavigate(); // ✅ Hook to navigate programmatically


    const handleLogin = (e) => {
  e.preventDefault();

  if (!role) {
    alert("Please select a role before logging in!");
    return;
  }

  console.log("Email:", email, "Password:", password, "Role:", role);

  // ✅ Redirect user based on selected role
  if (role === "student") {
    navigate("/student");
  } else if (role === "staff") {
    navigate("/staff");
  } else if (role === "admin") {
    navigate("/admin");
  }
};


  return (
    <div className="flex h-screen bg-gray-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#00b8f1] rounded-br-[200px]"></div>
      {/* <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00b8f1] opacity-20 rounded-tl-[200px]"></div> */}

      {/* Main Container */}
      <div className="relative z-10 flex w-full max-w-4xl mx-auto my-auto bg-white rounded-3xl shadow-2xl overflow-hidden h-[500px]">
        
        {/* Left Panel - Logo Section */}
        <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center p-12">
          <div className="flex items-start space-x-4">
            <div className="bg-gray-900 w-16 h-16 flex items-center justify-center rounded-lg flex-shrink-0">
              <span className="text-white text-3xl font-bold">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-700 leading-tight">MCA DEPARTMENT</h1>
              <h2 className="text-lg text-gray-600 mt-1">KDK COLLEGE OF ENGINEERING </h2>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center p-8 md:p-12">
  <div className="w-full max-w-sm">
    {/* Mobile Logo - Only visible on small screens */}
    <div className="flex md:hidden items-center justify-center space-x-3 mb-8">
      <div className="bg-gray-900 w-12 h-12 flex items-center justify-center rounded-lg">
        <span className="text-white text-2xl font-bold">M</span>
      </div>
      <div>
        <h1 className="text-sm font-bold text-gray-700">C.S.E DEPARTMENT</h1>
        <h2 className="text-xs text-gray-600">MET ENGINEERING COLLEGE</h2>
      </div>
    </div>

    {/* Email Input */}
    <input
      type="email"
      placeholder="Enter your Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full border-2 border-[#00b8f1] rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-[#00b8f1] focus:border-transparent text-gray-700 placeholder-gray-400"
      required
    />

    {/* Password Input */}
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full border-2 border-[#00b8f1] rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-[#00b8f1] focus:border-transparent text-gray-700 placeholder-gray-400"
      required
    />

    {/* Role Dropdown */}
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="w-full border-2 border-[#00b8f1] rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#00b8f1] focus:border-transparent text-gray-700 bg-white"
    >
      <option value="">Select Role</option>
      <option value="student">Student</option>
      <option value="staff">Staff</option>
      <option value="admin">Admin</option>
    </select>

    {/* Login Button */}
    <button
      onClick={handleLogin}
      className="w-full bg-[#00b8f1] text-white py-3 rounded-lg font-semibold hover:bg-[#009ed1] transition-all duration-300 shadow-md hover:shadow-lg"
    >
      Login
    </button>

    {/* Login as Student Link */}
    <p className="text-sm text-center mt-4 text-[#00b8f1] font-medium cursor-pointer hover:underline">
      Forget Password? ?
    </p>
  </div>
</div>

      </div>
    </div>
  );
};

export default Login;