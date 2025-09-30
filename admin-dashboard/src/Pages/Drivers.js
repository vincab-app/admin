// src/screens/Drivers.js
import React, { useEffect, useState } from "react";
import Layout from "./Layout";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await fetch("https://vincab-backend.onrender.com/get_all_drivers/"); // your Django API endpoint
        const data = await res.json();
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <Layout title="Drivers">
      {loading ? (
        <p className="text-gray-600">Loading drivers...</p>
      ) : drivers.length === 0 ? (
        <p className="text-gray-600">No drivers found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Phone</th>
                <th className="p-4 border-b">Email</th>
                <th className="p-4 border-b">License</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Rating</th>
                <th className="p-4 border-b">Vehicles</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b flex items-center space-x-3">
                    <img
                      src={driver.user.profile_image}
                      alt={driver.user.full_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{driver.user.full_name}</span>
                  </td>
                  <td className="p-4 border-b">{driver.user.phone_number}</td>
                  <td className="p-4 border-b">{driver.user.email}</td>
                  <td className="p-4 border-b">{driver.license_number}</td>
                  <td className="p-4 border-b">
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        driver.status === "active"
                          ? "bg-green-100 text-green-700"
                          : driver.status === "busy"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {driver.status}
                    </span>
                  </td>
                  <td className="p-4 border-b">{driver.rating}</td>
                  <td className="p-4 border-b">
                    {driver.vehicles && driver.vehicles.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {driver.vehicles.map((v) => (
                          <li key={v.id}>
                            {v.model} ({v.plate_number})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500">No vehicle</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default Drivers;
