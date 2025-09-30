// src/screens/Rides.js
import React, { useEffect, useState } from "react";
import Layout from "./Layout";

const Rides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await fetch("https://vincab-backend.onrender.com/get_all_rides/");
        const data = await res.json();
        setRides(data);
      } catch (error) {
        console.error("Error fetching rides:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  return (
    <Layout title="Rides">
      {loading ? (
        <p className="text-gray-600">Loading rides...</p>
      ) : rides.length === 0 ? (
        <p className="text-gray-600">No rides found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4 border-b">Rider</th>
                <th className="p-4 border-b">Driver</th>
                <th className="p-4 border-b">Pickup</th>
                <th className="p-4 border-b">Dropoff</th>
                <th className="p-4 border-b">Fare</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((ride) => (
                <tr key={ride.id} className="hover:bg-gray-50">
                  {/* Rider */}
                  <td className="p-4 border-b">{ride.rider_name}</td>

                  {/* Driver */}
                  <td className="p-4 border-b">
                    {ride.driver_name ? ride.driver_name : "Unassigned"}
                  </td>

                  {/* Pickup */}
                  <td className="p-4 border-b">
                    {ride.pickup_lat}, {ride.pickup_lng}
                  </td>

                  {/* Dropoff */}
                  <td className="p-4 border-b">
                    {ride.dropoff_lat}, {ride.dropoff_lng}
                  </td>

                  {/* Fare */}
                  <td className="p-4 border-b font-semibold text-blue-600">
                    {ride.estimated_fare
                      ? `KES ${ride.estimated_fare}`
                      : "Pending"}
                  </td>

                  {/* Status */}
                  <td className="p-4 border-b">
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        ride.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : ride.status === "ongoing"
                          ? "bg-yellow-100 text-yellow-700"
                          : ride.status === "accepted"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {ride.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="p-4 border-b">
                    {new Date(ride.requested_at).toLocaleString()}
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

export default Rides;
