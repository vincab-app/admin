import { useState } from "react";
import axios from "axios";
import Layout from "./Layout";

export default function PushNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const res = await axios.post(
        "https://vincab-backend.onrender.com/send_push_notification/",
        {
          title,
          message,
          data: data ? JSON.parse(data) : {},
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setResponseMsg(res.data.message);
      setTitle("");
      setMessage("");
      setData("");
    } catch (error) {
      setResponseMsg(
        error.response?.data?.error || "Failed to send notification"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Send Push Notification">
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Send Push Notification
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notification Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 w-full border p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="e.g. System Update"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="4"
              className="mt-1 w-full border p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Write notification message here..."
            />
          </div>

          {/* Optional Data */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Extra Data (JSON - Optional)
            </label>
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              rows="3"
              className="mt-1 w-full border p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              placeholder='{"screen": "dashboard"}'
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? "Sending..." : "Send Notification"}
          </button>

          {/* Response */}
          {responseMsg && (
            <p className="text-center text-sm text-blue-700 mt-2">
              {responseMsg}
            </p>
          )}
        </form>
      </div>
    </div>
    </Layout>
  );
}
