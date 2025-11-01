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
import { useLanguage } from "@/app/context/LanguageContext";

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#8B5CF6",
];

const ChartsSection = ({ data }) => {
  const { t } = useLanguage();
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-10 sm:space-y-14 mt-10 sm:mt-16 overflow-hidden">
      {/* 🔹 Section Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        {t(
          "app.components.dashboardComponents.MonthlyTrendChart.monthly_insights"
        )}
      </h2>

      {/* Responsive Chart Container Style */}
      {[
        {
          key: "total_expenditure",
          type: "line",
          title: t(
            "app.components.dashboardComponents.MonthlyTrendChart.total_expenditure"
          ),
          dataKey: "Total_Exp",
          color: "#4F46E5",
          height: 260,
        },
        {
          key: "individuals_vs_completed",
          type: "bar",
          title: t(
            "app.components.dashboardComponents.MonthlyTrendChart.individuals_vs_completed"
          ),
          bars: [
            {
              dataKey: "Total_Individuals_Worked",
              color: "#10B981",
              name: t(
                "app.components.dashboardComponents.MonthlyTrendChart.individuals_worked"
              ),
            },
            {
              dataKey: "Number_of_Completed_Works",
              color: "#F59E0B",
              name: t(
                "app.components.dashboardComponents.MonthlyTrendChart.completed_works"
              ),
            },
          ],
          height: 260,
        },
        {
          key: "average_wage",
          type: "area",
          title: t(
            "app.components.dashboardComponents.MonthlyTrendChart.average_wage"
          ),
          dataKey: "Average_Wage_rate_per_day_per_person",
          color: "#3B82F6",
          height: 260,
        },
      ].map((chart) => (
        <div
          key={chart.key}
          className="bg-white rounded-2xl shadow-md p-4 sm:p-6 overflow-hidden"
        >
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
            {chart.title}
          </h3>

          <div className="w-full h-[220px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {chart.type === "line" && (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey={chart.dataKey}
                    stroke={chart.color}
                    strokeWidth={3}
                    dot={{ r: 2 }}
                    name={chart.title}
                  />
                </LineChart>
              )}

              {chart.type === "bar" && (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                  {chart.bars.map((bar) => (
                    <Bar
                      key={bar.dataKey}
                      dataKey={bar.dataKey}
                      fill={bar.color}
                      name={bar.name}
                    />
                  ))}
                </BarChart>
              )}

              {chart.type === "area" && (
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={chart.color}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={chart.color}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey={chart.dataKey}
                    stroke={chart.color}
                    fill="url(#colorArea)"
                    name={chart.title}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      ))}

      {/*  Women Persondays */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
          {t(
            "app.components.dashboardComponents.MonthlyTrendChart.women_persondays"
          )}
        </h3>
        <div className="w-full h-[250px] sm:h-[350px] flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="Women_Persondays"
                nameKey="month"
                cx="50%"
                cy="50%"
                outerRadius="60%"
                fill="#8B5CF6"
                labelLine={false}
                label={({ month }) => month}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Efficiency */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
          {t(
            "app.components.dashboardComponents.MonthlyTrendChart.payments_15_days"
          )}
        </h3>
        <div className="w-full h-[220px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="percentage_payments_gererated_within_15_days"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ r: 2 }}
                name={t(
                  "app.components.dashboardComponents.MonthlyTrendChart.payments_15_days"
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
