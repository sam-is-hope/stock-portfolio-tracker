import React, {
  useEffect,
  useState,
} from "react";

const MarketOverview = () => {
  const [indices, setIndices] =
    useState([]);

  useEffect(() => {
    setIndices([
      {
        name: "NIFTY 50",
        value: 24752.10,
        change: 0.83,
      },
      {
        name: "SENSEX",
        value: 81324.77,
        change: 1.12,
      },
      {
        name: "BANK NIFTY",
        value: 54233.15,
        change: -0.55,
      },
      {
        name: "NASDAQ",
        value: 21153.76,
        change: 0.42,
      },
      {
        name: "S&P 500",
        value: 6284.71,
        change: 0.25,
      },
    ]);
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="font-semibold text-xl mb-6">
        Global Market Overview
      </h2>

      <div className="grid md:grid-cols-5 gap-4">
        {indices.map((index) => (
          <div
            key={index.name}
            className="border rounded-lg p-4"
          >
            <p className="font-semibold">
              {index.name}
            </p>

            <h3 className="text-xl font-bold">
              {index.value.toLocaleString()}
            </h3>

            <span
              className={
                index.change >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {index.change >= 0
                ? "+"
                : ""}
              {index.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketOverview;
