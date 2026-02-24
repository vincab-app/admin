// components/Topbar.js
import React from "react";
import { API_URL } from "../Env/Env";

const Topbar = ({ title }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6">
      <h1 className="text-xl dark:text-gray-100 font-semibold">{title}</h1>
      {user && (
        <div className="flex items-center space-x-4">
          <span className="font-medium dark:text-gray-100">{user.user_name}</span>
          <img
            src={user.profile_image}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      )}
    </header>
  );
};

export default Topbar;
