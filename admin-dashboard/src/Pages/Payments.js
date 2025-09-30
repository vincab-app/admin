// src/screens/admin/Payments.js
import React from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dummy Data
const payments = [
  {
    id: "TXN-001",
    rider: "Alice John",
    driver: "James Maina",
    amount: 1200,
    method: "M-Pesa",
    status: "Completed",
    date: "2025-09-25",
  },
  {
    id: "TXN-002",
    rider: "Mark Peter",
    driver: "David Kamau",
    amount: 850,
    method: "Card",
    status: "Pending",
    date: "2025-09-26",
  },
  {
    id: "TXN-003",
    rider: "Sarah K.",
    driver: "Paul Mwangi",
    amount: 1500,
    method: "M-Pesa",
    status: "Failed",
    date: "2025-09-27",
  },
];

// Chart data
const chartData = payments.map((p) => ({
  name: p.id,
  amount: p.amount,
}));

const Payments = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* TopBar */}
        <TopBar title="Payments" />

        <div className="p-6">
          {/* Chart */}
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold">Payments Overview</h1>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Payments Table */}
          <h2 className="text-xl font-semibold mb-2">Payments Table</h2>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-y-auto max-h-[400px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2">Transaction ID</th>
                    <th className="p-2">Rider</th>
                    <th className="p-2">Driver</th>
                    <th className="p-2">Amount (KES)</th>
                    <th className="p-2">Method</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-2">{payment.id}</td>
                      <td className="p-2">{payment.rider}</td>
                      <td className="p-2">{payment.driver}</td>
                      <td className="p-2 font-semibold">{payment.amount}</td>
                      <td className="p-2">{payment.method}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-white text-xs font-medium
                            ${
                              payment.status === "Completed"
                                ? "bg-green-600"
                                : payment.status === "Pending"
                                ? "bg-yellow-500"
                                : "bg-red-600"
                            }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="p-2">{payment.date}</td>
                      <td className="p-2">
                        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
