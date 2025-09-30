// src/screens/Riders.js
import React, { useEffect, useState } from "react";
import Layout from "./Layout";

const Riders = () => {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        // Replace with your Django API endpoint for riders
        const res = await fetch("http://localhost:8000/riders/");
        const data = await res.json();
        setRiders(data);
      } catch (error) {
        console.error("Error fetching riders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRiders();
  }, []);

  return (
    <Layout title="Riders">
      {loading ? (
        <p className="text-gray-600">Loading riders...</p>
      ) : riders.length === 0 ? (
        <p className="text-gray-600">No riders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Phone</th>
                <th className="p-4 border-b">Email</th>
                <th className="p-4 border-b">Location</th>
                <th className="p-4 border-b">Joined</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider) => (
                <tr key={rider.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b flex items-center space-x-3">
                    <img
                      src={rider.profile_image}
                      alt={rider.full_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{rider.full_name}</span>
                  </td>
                  <td className="p-4 border-b">{rider.phone_number}</td>
                  <td className="p-4 border-b">{rider.email}</td>
                  <td className="p-4 border-b">
                    {rider.current_lat && rider.current_lng ? (
                      <span>
                        Lat: {rider.current_lat}, Lng: {rider.current_lng}
                      </span>
                    ) : (
                      <span className="text-gray-500">Unknown</span>
                    )}
                  </td>
                  <td className="p-4 border-b">
                    {new Date(rider.date_joined).toLocaleDateString()}
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

export default Riders;
