"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { gujDistricts, translations, districtMap } from "@/app/data/constants";

const today = new Date();
const curYear = today.getFullYear();

const DistrictSelector = () => {
  const router = useRouter();
  const { t, selectedLang } = useLanguage();

  const gujaratDistricts = gujDistricts[translations[selectedLang]];

  const [district, setDistrict] = useState("");
  const [compareDistrict, setCompareDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const [outOfStateDistrict, setOutOfStateDistrict] = useState("");
  const [autoDetected, setAutoDetected] = useState(false);
  const [year, setYear] = useState(curYear);
  const [compareMode, setCompareMode] = useState(false);

  const years = Array.from({ length: 6 }, (_, i) => 2020 + i);

const handleSubmit = () => {
  if (!district) return;

  //  Always map to English before using in API call
  const mappedDistrict =
    translations[selectedLang] === "en"
      ? district
      : districtMap[translations[selectedLang]][district] || district;

  //  Use mappedDistrict directly for routing
  if (compareMode && compareDistrict) {
    const mappedCompare =
      translations[selectedLang] === "en"
        ? compareDistrict
        : districtMap[translations[selectedLang]][compareDistrict] ||
          compareDistrict;

    router.push(
      `/districtComparison?district1=${mappedDistrict}&district2=${mappedCompare}&year=${year}`
    );
  } else {
    router.push(`/dashboard?district=${mappedDistrict}&year=${year}`);
  }
};


  const getStatusMessage = () => {
    if (loading)
      return t("app.components.layouts.DistrictSelector.status_detecting");
    if (district && autoDetected)
      return t("app.components.layouts.DistrictSelector.auto_detected", {
        district,
      });
    if (district)
      return t("app.components.layouts.DistrictSelector.selected_district", {
        district,
      });
    return t("app.components.layouts.DistrictSelector.select_prompt");
  };

  // 🌍 Auto Detect District
  useEffect(() => {
    const detectLocation = async () => {
      setLoading(true);
      try {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const districtName = data.address?.state_district;

          if (districtName) {
            const matchedDistrict = gujaratDistricts.find(
              (d) => d.toLowerCase() === districtName.toLowerCase()
            );
            if (matchedDistrict) {
              setDistrict(matchedDistrict);
              setOutOfStateDistrict("");
              setAutoDetected(true);
            } else {
              setOutOfStateDistrict(districtName);
            }
          }
        });
      } catch (error) {
        console.error("Error detecting location:", error);
      } finally {
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

  return (
    <div className="flex items-center justify-center mt-14 md:mt-28 mb-28">
      <section className="bg-white p-10 md:p-14 rounded-2xl shadow-lg text-center space-y-6 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          🏡 {t("app.components.layouts.DistrictSelector.title")}
        </h2>

        {/* Status message */}
        {outOfStateDistrict ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-md text-left">
            <p className="font-semibold">
              {t(
                "app.components.layouts.DistrictSelector.out_of_state_warning",
                { outOfStateDistrict }
              )}
            </p>
            <p className="text-sm mt-1">
              {t(
                "app.components.layouts.DistrictSelector.only_gujarat_supported"
              )}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-md mb-7">{getStatusMessage()}</p>
        )}

        {/* Primary District */}
        <select
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            setAutoDetected(false);
            setOutOfStateDistrict("");
          }}
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">
            {t(
              "app.components.layouts.DistrictSelector.select_district_placeholder"
            )}
          </option>
          {gujaratDistricts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Year Dropdown */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
        >
          <option value="">
            {t(
              "app.components.layouts.DistrictSelector.select_year_placeholder"
            )}
          </option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* Compare Mode Toggle */}
        <div className="flex items-center justify-center gap-2">
          <input
            type="checkbox"
            id="compare"
            checked={compareMode}
            onChange={() => setCompareMode(!compareMode)}
            className="h-4 w-4 accent-blue-600"
          />
          <label htmlFor="compare" className="text-gray-700 text-sm">
            {t("app.components.layouts.DistrictSelector.compare_label")}
          </label>
        </div>

        {/* Compare District Dropdown */}
        {compareMode && (
          <select
            value={compareDistrict}
            onChange={(e) => setCompareDistrict(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mt-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">
              {t(
                "app.components.layouts.DistrictSelector.select_compare_placeholder"
              )}
            </option>
            {gujaratDistricts
              .filter((d) => d !== district)
              .map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
          </select>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!district || (compareMode && !compareDistrict)}
          className={`w-full py-3 rounded-lg transition text-white ${
            district && (!compareMode || compareDistrict)
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {compareMode
            ? t("app.components.layouts.DistrictSelector.btn_compare")
            : t("app.components.layouts.DistrictSelector.btn_view_dashboard")}
        </button>

        <p className="text-gray-500 text-sm">
          {t("app.components.layouts.DistrictSelector.description")}
        </p>
      </section>
    </div>
  );
};

export default DistrictSelector;
