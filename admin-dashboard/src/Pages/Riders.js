// src/screens/Riders.js
import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../Api/Api";
import Swal from "sweetalert2";
import { API_URL } from "../Env/Env";

const Riders = () => {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


  useEffect(() => {
  const fetchRiders = async () => {
    try {
      const res = await api.get("/get_all_riders/");
      setRiders(res.data.riders || []);
    } catch (error) {
      console.error("Error fetching riders:", error);
      Swal.fire("Error", "Failed to fetch riders.", "error");
    } finally {
      setLoading(false);
    }
  };

  fetchRiders();
}, []);


  const filteredRiders = riders.filter((r) =>
  `${r.full_name} ${r.phone_number} ${r.email}`
    .toLowerCase()
    .includes(search.toLowerCase())
);


  return (
    <Layout title="Riders">

   <div className="mb-4 flex justify-between items-center">
  <input
    type="text"
    placeholder="Search by name, phone or email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
  />
</div>

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
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.map((rider) => (
                <tr key={rider.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b flex items-center space-x-3">
                    <img
                      src={`${API_URL}${rider.profile_image}`}
                      alt={rider.full_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{rider.full_name}</span>
                  </td>
                  <td className="p-4 border-b">{rider.phone_number}</td>
                  <td className="p-4 border-b">{rider.email}</td>
                  <td className="p-4 border-b">
                    {rider.current_lat !== 0.0 && rider.current_lng !== 0.0 ? (
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
                  <td className="p-4 border-b">
  <button
    onClick={() => window.location.href = `/riders/${rider.id}`}
    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
  >
    Manage
  </button>
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
