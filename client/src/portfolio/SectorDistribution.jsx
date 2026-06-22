import React, { useMemo } from "react";

const SectorDistribution = ({
  holdings,
}) => {
  const sectors = useMemo(() => {
    const map = {};

    holdings.forEach((h) => {
      const sector =
        h.sector || "Other";

      const value =
        h.quantity *
        h.currentPrice;

      map[sector] =
        (map[sector] || 0) +
        value;
    });

    return Object.entries(map);
  }, [holdings]);

  return (
    <div className="bg-white rounded-xl p-6 shadow">

      <h2 className="text-xl font-bold mb-4">
        Sector Distribution
      </h2>

      {sectors.map(([name, value]) => (
        <div
          key={name}
          className="flex justify-between py-2"
        >
          <span>{name}</span>

          <span>
            ₹{value.toLocaleString()}
          </span>
        </div>
      ))}

    </div>
  );
};

export default SectorDistribution;
