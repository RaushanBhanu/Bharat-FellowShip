"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#8B5CF6",
];

const ChartsSection = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-14 mt-16">
      <h2 className="text-2xl font-bold text-gray-800">📈 Monthly Insights</h2>

      {/* 1️⃣ Total Expenditure Trend */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Total Expenditure (₹ Crore)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Total_Exp"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 2️⃣ Individuals Worked vs Completed Works */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Individuals Worked vs Completed Works
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="Total_Individuals_Worked"
              fill="#10B981"
              name="Individuals Worked"
            />
            <Bar
              dataKey="Number_of_Completed_Works"
              fill="#F59E0B"
              name="Completed Works"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 3️⃣ Average Wage Rate */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Average Wage Rate per Day
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorWage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Average_Wage_rate_per_day_per_person"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorWage)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 4️⃣ Women Persondays */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Women Persondays Distribution
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              dataKey="Women_Persondays"
              nameKey="month"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8B5CF6"
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 5️⃣ Payment Efficiency */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          % Payments Generated within 15 Days
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="percentage_payments_gererated_within_15_days"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;
