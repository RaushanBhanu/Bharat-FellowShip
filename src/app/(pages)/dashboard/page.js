"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import DashboardCard from "../../components/dashboardComponents/DashboardCard";
import ChartsSection from "../../components/dashboardComponents/MonthlyTrendChart";
import LoadingPage from "../../components/common/LoadingPage";
import NoDataPage from "../../components/common/NoDataPage";
import { useLanguage } from "@/app/context/LanguageContext";
import { monthNameMap } from "@/app/data/constants";

const monthOrder = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Trend calculation helper
const calcTrend = (current, previous) => {
  const curr = parseFloat(current);
  const prev = parseFloat(previous);
  if (isNaN(curr) || isNaN(prev) || prev === 0) return 0;
  return (((curr - prev) / prev) * 100).toFixed(1);
};

//  Clean & Sort Records
const cleanAndSortRecords = (rawRecords) => {
  if (!rawRecords?.length) return [];

  const uniqueRecordsMap = rawRecords.reduce((acc, record) => {
    const key = `${record.fin_year}-${record.month}`;
    acc[key] = record;
    return acc;
  }, {});

  const cleanedRecords = Object.values(uniqueRecordsMap);
  const normalizeMonth = (month) => month.slice(0, 3);

  return cleanedRecords
    .sort(
      (a, b) =>
        monthOrder.indexOf(normalizeMonth(a.month)) -
        monthOrder.indexOf(normalizeMonth(b.month))
    )
    .map((record) => ({
      ...record,
      Total_Exp: parseFloat(record.Total_Exp),
      Total_Individuals_Worked: parseFloat(record.Total_Individuals_Worked),
      Number_of_Completed_Works: parseFloat(record.Number_of_Completed_Works),
      Average_Wage_rate_per_day_per_person: parseFloat(record.Average_Wage_rate_per_day_per_person),
      Women_Persondays: parseFloat(record.Women_Persondays),
      percentage_payments_gererated_within_15_days: parseFloat(record.percentage_payments_gererated_within_15_days),
    }));
};

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const district = searchParams.get("district");
  const year = searchParams.get("year");
  const { t, selectedLang } = useLanguage();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours

  // Cleanup cache only once (not on every render)
  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("data-")) {
        try {
          const cached = JSON.parse(localStorage.getItem(key));
          if (cached && Date.now() - cached.timestamp > CACHE_TTL) {
            localStorage.removeItem(key);
            console.log(`🧹 Removed expired cache: ${key}`);
          }
        } catch {
          localStorage.removeItem(key);
        }
      }
    });
  }, []);

  //  Fetch data safely (no infinite loop)
  useEffect(() => {
    if (!district || !year) return;

    const fetchData = async () => {
      const cacheKey = `data-${district}-${year}`;
      const cached = JSON.parse(localStorage.getItem(cacheKey));

      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        console.log(" Using cached data for:", cacheKey);
        setRecords(cached.data);
        setLoading(false);
        return;
      }

      setLoading(true);
      const finYear = `${year}-${parseInt(year) + 1}`;
      const apiUrl = `https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&filters[state_name]=GUJARAT&filters[district_name]=${district}&filters[fin_year]=${finYear}`;

      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();
        const processedRecords = cleanAndSortRecords(json.records);

        localStorage.setItem(
          cacheKey,
          JSON.stringify({ timestamp: Date.now(), data: processedRecords })
        );

        setRecords(processedRecords);
      } catch (error) {
        console.error(" Error fetching data:", error);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [district, year]);

  //  Latest record & localized months
  const latest = useMemo(() => records.at(-1), [records]);

  const localizedRecords = useMemo(() => {
    if (!records?.length) return [];
    return records.map((rec) => ({
      ...rec,
      month: monthNameMap[selectedLang]?.[rec.month.slice(0, 3)] || rec.month,
    }));
  }, [records, selectedLang]);

  //  Trends
  const trends = useMemo(() => {
    if (records.length < 2 || !latest) return {};
    const prev = records.at(-2);
    return {
      Total_Exp: calcTrend(latest.Total_Exp, prev.Total_Exp),
      Total_Individuals_Worked: calcTrend(latest.Total_Individuals_Worked, prev.Total_Individuals_Worked),
      Number_of_Completed_Works: calcTrend(latest.Number_of_Completed_Works, prev.Number_of_Completed_Works),
      Average_Wage_rate_per_day_per_person: calcTrend(latest.Average_Wage_rate_per_day_per_person, prev.Average_Wage_rate_per_day_per_person),
      Women_Persondays: calcTrend(latest.Women_Persondays, prev.Women_Persondays),
      percentage_payments_gererated_within_15_days: calcTrend(
        latest.percentage_payments_gererated_within_15_days,
        prev.percentage_payments_gererated_within_15_days
      ),
    };
  }, [records, latest]);

  //  Loading / Empty states
  if (loading) return <LoadingPage text={t("app.pages.dashboard.loading_dashboard")} />;
  if (!records.length || !latest)
    return <NoDataPage district={district} year={year} />;

  const translatedMonth =
    monthNameMap[selectedLang]?.[latest.month.slice(0, 3)] || latest.month;

  return (
    <div className="p-6 md:px-20 py-10 space-y-16 mt-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {t("app.pages.dashboard.dashboard_title", {
          district,
          fin_year: latest.fin_year,
        })}
      </h1>

      <p className="text-gray-600 mb-8">
        {t("app.pages.dashboard.last_updated_month", { month: translatedMonth })}
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <DashboardCard
          title={t("app.pages.dashboard.card_total_expenditure")}
          value={(latest.Total_Exp / 100).toFixed(2)}
          trend={parseFloat(trends.Total_Exp)}
        />
        <DashboardCard
          title={t("app.pages.dashboard.card_individuals_worked")}
          value={latest.Total_Individuals_Worked.toLocaleString("en-IN")}
          trend={parseFloat(trends.Total_Individuals_Worked)}
        />
        <DashboardCard
          title={t("app.pages.dashboard.card_completed_works")}
          value={latest.Number_of_Completed_Works.toLocaleString("en-IN")}
          trend={parseFloat(trends.Number_of_Completed_Works)}
        />
        <DashboardCard
          title={t("app.pages.dashboard.card_avg_wage")}
          value={latest.Average_Wage_rate_per_day_per_person.toFixed(2)}
          trend={parseFloat(trends.Average_Wage_rate_per_day_per_person)}
        />
        <DashboardCard
          title={t("app.pages.dashboard.card_women_persondays")}
          value={latest.Women_Persondays.toLocaleString("en-IN")}
          trend={parseFloat(trends.Women_Persondays)}
        />
        <DashboardCard
          title={t("app.pages.dashboard.card_payments_15d")}
          value={`${latest.percentage_payments_gererated_within_15_days.toFixed(1)}%`}
          trend={parseFloat(trends.percentage_payments_gererated_within_15_days)}
        />
      </div>

      {/*  Charts */}
      <ChartsSection data={localizedRecords} />
    </div>
  );
}
