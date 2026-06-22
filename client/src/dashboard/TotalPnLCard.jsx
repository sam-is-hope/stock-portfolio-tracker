import React from "react";

const TotalPnLCard = ({
  dailyPnL = 0,
  weeklyPnL = 0,
  monthlyPnL = 0,
  yearlyPnL = 0,
}) => {
  const getColor = (value) =>
    value >= 0
      ? "text-green-500"
      : "text-red-500";

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-semibold text-xl mb-5">
        Performance Overview
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p>Today</p>
          <h3 className={getColor(dailyPnL)}>
            ₹{dailyPnL.toLocaleString()}
          </h3>
        </div>

        <div>
          <p>This Week</p>
          <h3 className={getColor(weeklyPnL)}>
            ₹{weeklyPnL.toLocaleString()}
          </h3>
        </div>

        <div>
          <p>This Month</p>
          <h3 className={getColor(monthlyPnL)}>
            ₹{monthlyPnL.toLocaleString()}
          </h3>
        </div>

        <div>
          <p>This Year</p>
          <h3 className={getColor(yearlyPnL)}>
            ₹{yearlyPnL.toLocaleString()}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TotalPnLCard;
