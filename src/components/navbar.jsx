import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ userName, userRole, profileImage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle profile navigation based on user role
  const handleProfile = () => {
    const currentPath = location.pathname;
    
    if (currentPath.startsWith("/student")) {
      navigate("/student/profile");
    } else if (currentPath.startsWith("/staff")) {
      navigate("/staff/profile");
    } else if (currentPath.startsWith("/admin")) {
      navigate("/admin/profile");
    }
  };

  // Handle logout with API call
  const handleLogout = async () => {
    try {
      // Get the token from localStorage or wherever you store it
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthamFsQGV4YW1wbGUuY29tIiwicm9sZSI6IlRlYWNoZXIiLCJleHAiOjE3NjM2NTg5NzJ9.c1U9RN9W3VdZkSq1J5V69RQkZNQ2Lh5Moyc789qb5z8';

      // Call logout API
      const response = await fetch('https://student-result-management-system-vikh.onrender.com/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Clear token from client side (localStorage, sessionStorage, etc.)
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        
        // Show success message
        console.log(data.message);
        
        // Redirect to login page
        navigate('/login');
      } else {
        console.error('Logout failed:', data.message);
        // Even if API fails, clear local data and redirect
        localStorage.clear();
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local data and redirect even on error
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 z-40">
      {/* Left Section: Page Title */}
      <div className="flex items-center space-x-3">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-700 truncate">
          Dashboard Overview
        </h1>
      </div>

      {/* Right Section: Profile */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div 
          className="flex items-center bg-[#e6f7fc] rounded-full px-2 sm:px-3 py-1 cursor-pointer hover:bg-[#d9f3fa] transition-all"
          onClick={handleProfile}
        >
          {/* Profile Image */}
          <img
            src={
              profileImage ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#00b8f1]"
          />

          {/* User Details (Hidden on small screens) */}
          <div className="hidden sm:block ml-2 text-right">
            <p className="text-sm font-semibold text-gray-800">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
        </div>

        {/* Logout Button - hidden on very small screens */}
        <button
          onClick={handleLogout}
          className="hidden sm:flex bg-[#00b8f1] hover:bg-[#009bd4] text-white px-3 py-2 rounded-lg text-sm items-center gap-2 transition-all"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;