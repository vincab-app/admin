// components/Sidebar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react"; // icons
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses =
    "block px-6 py-3 hover:bg-blue-600 cursor-pointer transition-colors";
  const activeClasses = "bg-blue-800";

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/");
  };

  return (
    <>
      {/* Mobile Top Bar (only small screens) */}
      <div className="md:hidden flex items-center justify-between bg-blue-700 text-white px-4 py-3 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="text-xl font-bold">VinCab Admin</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full md:h-screen w-64 bg-blue-700 text-white flex flex-col transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Sidebar Header (desktop only) */}
        <div className="hidden md:flex items-center justify-between px-6 py-4 border-b border-blue-600">
          <div className="text-2xl font-bold">VinCab Admin</div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto mt-16 md:mt-0">
          <ul>
            <li>
              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeClasses : ""}`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/drivers"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeClasses : ""}`
                }
              >
                Drivers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/riders"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeClasses : ""}`
                }
              >
                Riders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/rides"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeClasses : ""}`
                }
              >
                Rides
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/payments"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeClasses : ""}`
                }
              >
                Payments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pushnotification"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeClasses : ""}`
                }
              >
                Push Notifications
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeClasses : ""}`
                }
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      {/* bottom section */}
      <div className="border-t border-blue-600 px-6 py-4">
        <button onClick={handleLogout}
        className="w-full flex items-center gap-2 text-white hover:text-white hover:bg-blue-600 px-3 py-2 rounded-lg transition">
          <LogOut size={18} />
          Logout
        </button>
        <p className="text-xs text-blue-200 mt-3 text-center">
          Version 1.0.0
        </p>
      </div>
      </aside>

      {/* Background Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
