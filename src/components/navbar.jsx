import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { FaChevronDown } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../store/slices/authSlice";
import { Menu } from "lucide-react";

const Navbar = ({
  userName,
  userRole,
  profileImage,
  toggleSidebar,
  isMobile,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    const resultAction = await dispatch(Logout());
    if (Logout.fulfilled.match(resultAction)) {
      navigate("/login");
    }
  };

  const handleProfileNavigate = () => {
    const path = location.pathname;

    if (path.startsWith("/student")) navigate("/student/profile");
    else if (path.startsWith("/staff")) navigate("/staff/profile");
    else if (path.startsWith("/admin")) navigate("/admin/profile");

    setIsProfileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-40">
      <div className="h-full px-6 flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {isMobile && (
            <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100">
              <Menu size={22} />
            </button>
          )}
          <h1 className="text-lg font-semibold text-[#00b8f1]">
           ResultIQ
          </h1>
        </div>

        {/* RIGHT */}
        <div className="relative">
          {/* PROFILE BUTTON */}
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src={
                profileImage ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="w-9 h-9 rounded-full border border-gray-300 object-cover"
            />

            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-sm font-medium text-gray-800">
                {userName}
              </span>
              <span className="text-xs text-gray-500">{userRole}</span>
            </div>

            <FaChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* DROPDOWN */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <button
                onClick={handleProfileNavigate}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Profile
              </button>

              <div className="border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={16} />
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CLICK OUTSIDE */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
