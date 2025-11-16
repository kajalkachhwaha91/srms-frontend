import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

const Layout = ({ menuItems, userName, userRole, profileImage }) => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar menuItems={menuItems} userRole={userRole} />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col transition-all duration-300">
        {/* Navbar */}
        <Navbar
          userName={userName}
          userRole={userRole}
          profileImage={profileImage}
        />

        {/* Page Content */}
        <main className="mt-16 p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
