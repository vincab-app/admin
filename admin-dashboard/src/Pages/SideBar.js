// components/Sidebar.js
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClasses =
    "block px-6 py-3 hover:bg-blue-600 cursor-pointer transition-colors";

  const activeClasses = "bg-blue-800"; // style for active page

  return (
    <aside className="w-64 bg-blue-700 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold">VinCab Admin</div>
      <nav className="flex-1">
        <ul>
          <li>
            <NavLink
              to="/dashbaord"
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
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeClasses : ""}`
              }
            >
              Payments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeClasses : ""}`
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
