import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

export default function RiderManage() {
  const { id } = useParams();
  const [rider, setRider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Fetch Single Rider
  const fetchRider = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`https://vincab-backend.onrender.com/get_single_rider/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setRider(data.rider);
    } catch (err) {
      console.error("Fetch error:", err);
      setFeedback("Failed to load rider");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRider();
  }, [id]);

  // Admin Action
  const adminAction = async (action) => {
    if (!window.confirm(`Are you sure you want to ${action} this rider?`)) return;

    setActionLoading(true);
    setFeedback("Processing...");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://vincab-backend.onrender.com/admin_rider_action/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: id,
          action
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Action failed");
      }

      setFeedback("Action completed successfully");

      // Re-fetch rider to update UI
      fetchRider();

    } catch (error) {
      console.error("Action error:", error);
      setFeedback("Action failed!");
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
          <p><b>Verified:</b> {rider.phone_verified == true ? "Yes" : "No"}</p>
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
