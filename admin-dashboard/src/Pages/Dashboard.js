// App.js
import React from "react";
import Layout from "./Layout";

function Dashboard() {
  return (
    <Layout title="Dashboard">
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
    </Layout>
  );
}

export default Dashboard;
