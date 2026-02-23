import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import api from "../Api/Api";
import Swal from "sweetalert2";
import { API_URL } from "../Env/Env";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingDriverId, setUpdatingDriverId] = useState(null);
  const [verifyingDriverId, setVerifyingDriverId] = useState(null);

  const fetchDrivers = async () => {
    try {
      const res = await api.get("/get_all_drivers/");
      setDrivers(res.data || []);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Function to show large image preview
  const handleViewImage = (imageUrl, title) => {
    Swal.fire({
      title: title,
      imageUrl: imageUrl,
      imageAlt: title,
      showCloseButton: true,
      showConfirmButton: false,
      width: 'auto',
      customClass: {
        image: 'rounded-lg shadow-lg'
      }
    });
  };

  const handleUpdateStatus = async (driverId, newStatus) => {
    setUpdatingDriverId(driverId);
    try {
      await api.patch(`/update_driver_status/${driverId}/`, {
        status: newStatus,
      });
      fetchDrivers();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Driver status updated",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.error || "Something went wrong!",
        icon: "error",
      });
    } finally {
      setUpdatingDriverId(null);
    }
  };

  const handleVerifyDriver = async (driverId) => {
    setVerifyingDriverId(driverId);
    try {
      await api.patch(`/update_driver_status/${driverId}/`, {
        verified: true,
      });
      fetchDrivers();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Driver verified",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.error || "Something went wrong!",
        icon: "error",
      });
    } finally {
      setVerifyingDriverId(null);
    }
  };

  return (
    <Layout title="Drivers">
      {loading ? (
        <p className="text-gray-600 text-center py-10">Loading drivers...</p>
      ) : drivers.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center py-10">No drivers found.</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-left">
                <th className="p-4 border-b">Driver</th>
                <th className="p-4 border-b">ID Details</th>
                <th className="p-4 border-b">License</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Verified</th>
                <th className="p-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  {/* Name & Contact */}
                  <td className="p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <img
                        src={`${API_URL}${driver.user.profile_image}`}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <div className="font-bold dark:text-gray-100">{driver.user.full_name}</div>
                        <div className="text-xs text-gray-500">{driver.user.email}</div>
                        <div className="text-xs text-gray-500">{driver.user.phone_number}</div>
                      </div>
                    </div>
                  </td>

                  {/* ID Number and Image Previews */}
                  <td className="p-4 border-b dark:text-gray-100">
                    <p className="text-sm font-semibold mb-2">ID: {driver.id_number || "N/A"}</p>
                    <div className="flex space-x-2">
                      {driver.id_front_image && (
                        <div className="group relative cursor-pointer" onClick={() => handleViewImage(`${API_URL}${driver.id_front_image}`, "Front ID")}>
                          <img 
                            src={`${API_URL}${driver.id_front_image}`} 
                            className="h-12 w-16 object-cover rounded border hover:opacity-75 transition"
                            alt="Front"
                          />
                          <span className="hidden group-hover:block absolute bottom-0 left-0 right-0 bg-black/50 text-[10px] text-white text-center">Front</span>
                        </div>
                      )}
                      {driver.id_back_image && (
                        <div className="group relative cursor-pointer" onClick={() => handleViewImage(`${API_URL}${driver.id_back_image}`, "Back ID")}>
                          <img 
                            src={`${API_URL}${driver.id_back_image}`} 
                            className="h-12 w-16 object-cover rounded border hover:opacity-75 transition"
                            alt="Back"
                          />
                          <span className="hidden group-hover:block absolute bottom-0 left-0 right-0 bg-black/50 text-[10px] text-white text-center">Back</span>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-4 border-b dark:text-gray-100">{driver.license_number}</td>

                  {/* Status Dropdown */}
                  <td className="p-4 border-b">
                    <select
                      value={driver.status}
                      onChange={(e) => handleUpdateStatus(driver.id, e.target.value)}
                      className="border border-gray-300 rounded p-1 text-sm dark:bg-gray-700 dark:text-white"
                    >
                      <option value="active">Active</option>
                      <option value="busy">Busy</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>

                  {/* Verification Status */}
                  <td className="p-4 border-b">
                    {driver.verified ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Verified</span>
                    ) : (
                      <button
                        onClick={() => handleVerifyDriver(driver.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                      >
                        {verifyingDriverId === driver.id ? "..." : "Verify"}
                      </button>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4 border-b text-center">
                    <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => handleUpdateStatus(driver.id, "active")}
                          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs transition"
                        >
                          {updatingDriverId === driver.id ? "..." : "Set Active"}
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(driver.id, "inactive")}
                          className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-xs transition"
                        >
                          {updatingDriverId === driver.id ? "..." : "Deactivate"}
                        </button>
                    </div>
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