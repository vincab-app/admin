import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import api from "../Api/Api";
import Swal from "sweetalert2";


export default function RiderManage() {
  const { id } = useParams();
  const [rider, setRider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Fetch Single Rider
  const fetchRider = async () => {
  setLoading(true);

  try {
    const res = await api.get(`/get_single_rider/${id}/`);
    setRider(res.data.rider);
  } catch (err) {
    console.error("Fetch error:", err);

    const msg = err.response?.data?.error || "Failed to load rider";

    setFeedback(msg);

    await Swal.fire({
      title: "Error",
      text: msg,
      icon: "error",
    });
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchRider();
}, [id]);


  // Admin Action
  const adminAction = async (action) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: `You are about to ${action} this rider.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, continue",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d33",
  });

  if (!result.isConfirmed) return;

  setActionLoading(true);
  setFeedback("Processing...");

  try {
    const res = await api.post("/admin_rider_action/", {
      
      user_id: id,
      action: action,
    });

    setFeedback(res.data?.message || "Action completed successfully");

    await Swal.fire({
      title: "Success!",
      text: res.data?.message || "Action completed successfully",
      icon: "success",
    });

    // Re-fetch rider to update UI
    fetchRider();

  } catch (error) {
    console.error("Action error:", error);

    const errorMsg =
      error.response?.data?.error || "Action failed!";

    setFeedback(errorMsg);

    await Swal.fire({
      title: "Error",
      text: errorMsg,
      icon: "error",
    });
  } finally {
    setActionLoading(false);
  }
};


  // LOADING STATE
  if (loading) {
    return (
      <Layout title="Loading rider...">
        <div className="text-gray-500">Loading rider data…</div>
      </Layout>
    );
  }

  if (!rider) {
    return (
      <Layout title="Not Found">
        <div className="text-red-500">Rider not found.</div>
      </Layout>
    );
  }

  return (
    <Layout title={`Manage Rider: ${rider.full_name}`}>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow space-y-6">

        {/* Profile */}
        <div className="flex items-center space-x-4">
          <img
            src={rider.profile_image || "/avatar.png"}
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-bold">{rider.full_name}</h2>
            <p className="text-gray-500">{rider.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4">
          <p><b>Phone:</b> {rider.phone_number}</p>
          <p>
            <b>Status:</b>{" "}
            {rider.is_active ? (
              <span className="text-green-600">Active</span>
            ) : (
              <span className="text-red-600">Blocked</span>
            )}
          </p>
          <p><b>Joined:</b> {new Date(rider.date_joined).toLocaleDateString()}</p>
          <p><b>Verified:</b> {rider.phone_verified === true ? "Yes" : "No"}</p>
        </div>

        {/*  Feedback */}
        {feedback && (
          <div className={`text-sm text-center font-semibold ${
            feedback.includes("✅") ? "text-green-600" : feedback.includes("❌") ? "text-red-600" : "text-blue-600"
          }`}>
            {feedback}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-4">

          <ActionButton
            label="Recover"
            color="green"
            loading={actionLoading}
            onClick={() => adminAction("recover")}
          />

          <ActionButton
            label="Block"
            color="red"
            loading={actionLoading}
            onClick={() => adminAction("block")}
          />

          <ActionButton
            label="Delete"
            color="red"
            loading={actionLoading}
            onClick={() => adminAction("delete")}
          />

          <ActionButton
            label="Message"
            color="blue"
            loading={actionLoading}
            onClick={() => adminAction("message")}
          />

        </div>

      </div>
    </Layout>
  );
}

/* Reusable Button Component */
function ActionButton({ label, color, onClick, loading }) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`bg-${color}-600 hover:bg-${color}-700 text-white py-2 rounded-lg transition disabled:opacity-50`}
    >
      {loading ? "Processing..." : label}
    </button>
  );
}
