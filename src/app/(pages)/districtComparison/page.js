"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CompareStats from "../../components/districtComparison/CompareStats";
import LoadingPage from "../../components/common/LoadingPage";
import NoDataPage from "../../components/common/NoDataPage";
import { useLanguage } from "@/app/context/LanguageContext"; // custom hook

export default function ComparePage() {
    const params = useSearchParams();
    const district1 = params.get("district1");
    const district2 = params.get("district2");
    const year = params.get("year");

    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [loading, setLoading] = useState(true);

    const { t } = useLanguage(); //  Translation hook

    const API_BASE =
        "https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722";
    const API_KEY = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const finYear = `${year}-${parseInt(year) + 1}`;

                const [res1, res2] = await Promise.all([
                    fetch(
                        `${API_BASE}?api-key=${API_KEY}&format=json&filters[state_name]=GUJARAT&filters[district_name]=${district1}&filters[fin_year]=${finYear}`
                    ),
                    fetch(
                        `${API_BASE}?api-key=${API_KEY}&format=json&filters[state_name]=GUJARAT&filters[district_name]=${district2}&filters[fin_year]=${finYear}`
                    ),
                ]);

                const [dataJson1, dataJson2] = await Promise.all([
                    res1.json(),
                    res2.json(),
                ]);

                setData1(dataJson1.records || []);
                setData2(dataJson2.records || []);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (district1 && district2 && year) fetchData();
    }, [district1, district2, year]);

    // Loading State
    if (loading)
        return (
            <LoadingPage text={t("app.pages.districtComparison.loading_comparison")} />
        );

    // No Data Found
    if (!data1?.length || !data2?.length)
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center p-10">
                <h1 className="text-3xl font-bold mb-4 text-red-600">
                    {t("app.pages.districtComparison.no_data_warning")}
                </h1>
                <p className="text-gray-600 mb-8">
                    {t("app.pages.districtComparison.try_different")}
                </p>
            </div>
        );

    // Render Comparison Stats
    return (
        <div className="p-6 md:px-20 py-10 space-y-16 mt-16">
            <h1 className="text-3xl font-bold text-gray-800">
                {t("app.pages.districtComparison.comparison_title", {
                    year,
                    next_year: parseInt(year) + 1,
                })}
            </h1>

            <CompareStats
                district1={district1}
                district2={district2}
                data1={data1}
                data2={data2}
            />
        </div>
    );
}
