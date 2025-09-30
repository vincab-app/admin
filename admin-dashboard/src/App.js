import React from "react";

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold">VinCab Admin</div>
        <nav className="flex-1">
          <ul>
            <li className="px-6 py-3 hover:bg-blue-600 cursor-pointer">Dashboard</li>
            <li className="px-6 py-3 hover:bg-blue-600 cursor-pointer">Drivers</li>
            <li className="px-6 py-3 hover:bg-blue-600 cursor-pointer">Riders</li>
            <li className="px-6 py-3 hover:bg-blue-600 cursor-pointer">Rides</li>
            <li className="px-6 py-3 hover:bg-blue-600 cursor-pointer">Payments</li>
            <li className="px-6 py-3 hover:bg-blue-600 cursor-pointer">Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="font-medium">Admin</span>
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cards */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Total Drivers</h2>
              <p className="text-2xl font-bold text-blue-600">120</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Total Riders</h2>
              <p className="text-2xl font-bold text-green-600">540</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Total Rides</h2>
              <p className="text-2xl font-bold text-purple-600">1,230</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
