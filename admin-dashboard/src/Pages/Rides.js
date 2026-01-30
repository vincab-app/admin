// src/screens/Rides.js
import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../Api/Api";
import Swal from "sweetalert2";

const Rides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await api.get("/get_all_rides/");
        setRides(res.data);
      } catch (error) {
        console.error("Error fetching rides:", error);
        Swal.fire("Error!", "Failed to fetch rides.", "error");
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
        <p className="text-gray-600 dark:text-gray-800">No rides found.</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-left">
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
                <tr key={ride.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  {/* Rider */}
                  <td className="p-4 border-b dark:text-gray-100">{ride.rider_name}</td>

                  {/* Driver */}
                  <td className="p-4 border-b dark:text-gray-100">
                    {ride.driver_name ? ride.driver_name : "Unassigned"}
                  </td>

                  {/* Pickup */}
                  <td className="p-4 border-b dark:text-gray-100">
                    {ride.pickup_lat}, {ride.pickup_lng}
                  </td>

                  {/* Dropoff */}
                  <td className="p-4 border-b dark:text-gray-100">
                    {ride.dropoff_lat}, {ride.dropoff_lng}
                  </td>

                  {/* Fare */}
                  <td className="p-4 border-b font-semibold text-blue-600 dark:text-blue-400">
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
                  <td className="p-4 border-b dark:text-gray-100">
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
