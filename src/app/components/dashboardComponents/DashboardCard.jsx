const DashboardCard = ({ title, value, trend }) => {
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-800";

  if (trend >= 10) {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
  } else if (trend >= 0) {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-800";
  } else if (trend < 0) {
    bgColor = "bg-red-100";
    textColor = "text-red-800";
  }

  return (
    <div
      className={`p-4 rounded-xl shadow-md flex flex-col items-start justify-between ${bgColor} h-40`}
    >
      <h3 className="text-md font-semibold text-gray-600">{title}</h3>
      <p className={`text-xl font-bold ${textColor}`}>{value}</p>
      {trend !== undefined && (
        <p className="text-md text-gray-500 mt-1">
          {trend > 0 ? "▲" : trend < 0 ? "▼" : "▬"} {Math.abs(trend)}%
        </p>
      )}
    </div>
  );
};

export default DashboardCard;
