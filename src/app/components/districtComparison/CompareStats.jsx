"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CompareStats({ district1, district2, data1, data2 }) {
  if (!data1 || !data2) return null;

  const latest1 = data1.at(-1);
  const latest2 = data2.at(-1);

  const metrics = [
    { key: "Total_Exp", label: "Total Expenditure (₹ Cr)" },
    { key: "Total_Individuals_Worked", label: "Individuals Worked" },
    { key: "Number_of_Completed_Works", label: "Completed Works" },
    {
      key: "Average_Wage_rate_per_day_per_person",
      label: "Avg Wage / Day (₹)",
    },
    { key: "Women_Persondays", label: "Women Persondays" },
    {
      key: "percentage_payments_gererated_within_15_days",
      label: "% Payments in 15 Days",
    },
  ];

  // Combine data for charts
  const chartData = metrics.map((m) => ({
    name: m.label,
    [district1]: parseFloat(latest1[m.key]) || 0,
    [district2]: parseFloat(latest2[m.key]) || 0,
  }));

  return (
    <div className="space-y-10">
      {/* 📊 Table Comparison */}
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="w-full border-collapse overflow-hidden">
          <thead>
            <tr className="bg-linear-to-r from-orange-500 to-green-500 text-white">
              <th className="p-4 text-left text-lg font-semibold">Metric</th>
              <th className="p-4 text-lg font-semibold text-center">
                {district1}
              </th>
              <th className="p-4 text-lg font-semibold text-center">
                {district2}
              </th>
            </tr>
          </thead>
          <tbody>
            {metrics.map(({ key, label }) => (
              <tr key={key} className="odd:bg-orange-50 even:bg-green-50">
                <td className="p-4 font-medium text-gray-700">{label}</td>
                <td className="p-4 text-center text-gray-800">
                  {latest1[key] ? latest1[key].toLocaleString("en-IN") : "—"}
                </td>
                <td className="p-4 text-center text-gray-800">
                  {latest2[key] ? latest2[key].toLocaleString("en-IN") : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📈 Bar Chart Comparison */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          📉 Key Metrics Comparison
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 40, left: 0, bottom: 60 }}
          >
            <XAxis
              dataKey="name"
              angle={-50}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 15 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={district1} fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey={district2} fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
