import React, { useMemo } from "react";

const AssetAllocation = ({
  holdings = [],
}) => {
  const sectors = useMemo(() => {
    const allocation = {};

    holdings.forEach((holding) => {
      const sector =
        holding.sector || "Unknown";

      const value =
        holding.currentPrice *
        holding.quantity;

      allocation[sector] =
        (allocation[sector] || 0) + value;
    });

    const total = Object.values(
      allocation
    ).reduce((a, b) => a + b, 0);

    return Object.entries(allocation).map(
      ([sector, value]) => ({
        sector,
        value,
        percentage:
          ((value / total) * 100).toFixed(2),
      })
    );
  }, [holdings]);

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-5">
        Sector Allocation
      </h2>

      {sectors.map((item) => (
        <div
          key={item.sector}
          className="mb-4"
        >
          <div className="flex justify-between">
            <span>{item.sector}</span>
            <span>{item.percentage}%</span>
          </div>

          <div className="w-full bg-gray-200 h-3 rounded mt-2">
            <div
              className="bg-blue-500 h-3 rounded"
              style={{
                width: `${item.percentage}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssetAllocation;
