import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  LogOut,
} from "lucide-react";

const Sidebar = ({ menuItems, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Toggle Button for Mobile/Tablet */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-[#00b8f1] text-white p-2 rounded-lg shadow-lg"
        onClick={toggleSidebar}
      >
        <Menu size={22} />
      </button>

      {/* Background Overlay (for blur effect) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-md flex flex-col transition-all duration-300 z-50
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"} md:translate-x-0 md:w-64`}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="bg-[#00b8f1] text-white font-bold text-xl w-10 h-10 rounded-lg flex items-center justify-center">
              M
            </div>
            <h1 className="text-lg font-semibold text-gray-700">MET</h1>
          </div>
          <button
            className="text-gray-600 hover:text-[#00b8f1] md:hidden"
            onClick={toggleSidebar}
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center p-3 mx-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#00b8f1] text-white"
                    : "text-gray-700 hover:bg-[#e6f7fc] hover:text-[#00b8f1]"
                }`}
              >
                <item.icon size={20} className="min-w-[20px]" />
                <span className="ml-3 text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-700">{userRole}</p>
            <p className="text-xs text-gray-500">Logged in</p>
          </div>
          <button className="text-gray-600 hover:text-red-500">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
