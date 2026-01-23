import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  LogOut,
} from "lucide-react";

const Sidebar = ({ menuItems, userRole, isOpen, setIsOpen, isMobile }) => {
  const location = useLocation();

  const closeSidebar = () => {
    if (isMobile) setIsOpen(false);
  };

  return (
    <div
      className={`
        fixed lg:relative top-0 left-0 h-screen bg-white border-r shadow-sm z-40
        transition-all duration-300
        ${isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0 lg:w-20"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b">
        {isOpen && <h1 className="font-bold text-lg">MET</h1>}
        {!isMobile && (
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu size={20} />
          </button>
        )}
      </div>

      {/* Menu */}
      <nav className="mt-4 space-y-1">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={closeSidebar}
              className={`flex items-center px-4 py-3 mx-2 rounded-lg transition
                ${active ? "bg-[#00b8f1] text-white" : "text-gray-700 hover:bg-[#e6f7fc]"}
              `}
            >
              <item.icon size={20} />
              {isOpen && <span className="ml-3">{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};


export default Sidebar;
