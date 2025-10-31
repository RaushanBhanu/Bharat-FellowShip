"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const today = new Date();
const curYear = today.getFullYear();

// Default Gujarat Districts
const gujaratDistricts = [
  "SABAR KANTHA",
  "VADODARA",
  "BHARUCH",
  "PATAN",
  "TAPI",
  "BOTAD",
  "BHAVNAGAR",
  "KACHCHH",
  "PANCH MAHALS",
  'RAJKOT',
  'DANG',
  'ANAND',
  'NAVSARI  ',
  'SURENDRANAGAR',
  'SURAT'
];

const DistrictSelector = () => {
  const router = useRouter();

  const [district, setDistrict] = useState("");
  const [compareDistrict, setCompareDistrict] = useState(""); // for comparison
  const [loading, setLoading] = useState(false);
  const [outOfStateDistrict, setOutOfStateDistrict] = useState("");
  const [autoDetected, setAutoDetected] = useState(false);
  const [year, setYear] = useState(curYear);
  const [compareMode, setCompareMode] = useState(false); //  toggle mode

  const years = Array.from({ length: 6 }, (_, i) => 2020 + i);

  const handleSubmit = () => {
    if (!district) return;

    // 🆕 Redirect based on mode
    if (compareMode && compareDistrict) {
      router.push(
        `/districtComparison?district1=${district}&district2=${compareDistrict}&year=${year}`
      );
    } else {
      router.push(`/dashboard?district=${district}&year=${year}`);
    }
  };

  const getStatusMessage = () => {
    if (loading) return "Detecting your location...";
    if (district && autoDetected) return `📍 Auto-detected: ${district}`;
    if (district) return `Selected District: ${district}`;
    return "You can select your district below.";
  };

  //  Auto Detect District
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
          🏡 Choose Your District
        </h2>

        {/*  Status message */}
        {outOfStateDistrict ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-md text-left">
            <p className="font-semibold">
              ⚠️ {outOfStateDistrict} data is not available.
            </p>
            <p className="text-sm mt-1">
              Currently, only <b>Gujarat</b> district data is supported.
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
          <option value="">-- Select District --</option>
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
          <option value="">-- Select Year --</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* 🆕 Compare Mode Toggle */}
        <div className="flex items-center justify-center gap-2">
          <input
            type="checkbox"
            id="compare"
            checked={compareMode}
            onChange={() => setCompareMode(!compareMode)}
            className="h-4 w-4 accent-blue-600"
          />
          <label htmlFor="compare" className="text-gray-700 text-sm">
            Compare with another district
          </label>
        </div>

        {/*  Second District Dropdown */}
        {compareMode && (
          <select
            value={compareDistrict}
            onChange={(e) => setCompareDistrict(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 mt-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select District to Compare --</option>
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
          {compareMode ? "📊 Compare Districts" : "📈 View Dashboard"}
        </button>

        <p className="text-gray-500 text-sm">
          You can view or compare MGNREGA performance data by district and year.
        </p>
      </section>
    </div>
  );
};

export default DistrictSelector;
