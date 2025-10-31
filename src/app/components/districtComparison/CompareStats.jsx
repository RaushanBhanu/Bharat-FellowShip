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
import { useLanguage } from "@/app/context/LanguageContext";

export default function CompareStats({ district1, district2, data1, data2 }) {
  const { t } = useLanguage();

  if (!data1 || !data2) return null;

  const latest1 = data1.at(-1);
  const latest2 = data2.at(-1);

  // ✅ Use translation keys instead of hardcoded text
  const metrics = [
    {
      key: "Total_Exp",
      label: t("app.components.districtComparison.CompareStats.total_expenditure"),
    },
    {
      key: "Total_Individuals_Worked",
      label: t("app.components.districtComparison.CompareStats.individuals_worked"),
    },
    {
      key: "Number_of_Completed_Works",
      label: t("app.components.districtComparison.CompareStats.completed_works"),
    },
    {
      key: "Average_Wage_rate_per_day_per_person",
      label: t("app.components.districtComparison.CompareStats.avg_wage"),
    },
    {
      key: "Women_Persondays",
      label: t("app.components.districtComparison.CompareStats.women_persondays"),
    },
    {
      key: "percentage_payments_gererated_within_15_days",
      label: t("app.components.districtComparison.CompareStats.payments_15_days"),
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
              <th className="p-4 text-left text-lg font-semibold">
                {t("app.components.districtComparison.CompareStats.metric_column")}
              </th>
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
          {t("app.components.districtComparison.CompareStats.key_metrics_comparison")}
        </h3>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 40, left: 50, bottom: 150 }}
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
