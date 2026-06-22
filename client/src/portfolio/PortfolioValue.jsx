import React, { useMemo } from "react";

const PortfolioValue = ({ holdings }) => {
  const stats = useMemo(() => {
    let invested = 0;
    let current = 0;

    holdings.forEach((stock) => {
      invested +=
        stock.averagePrice *
        stock.quantity;

      current +=
        stock.currentPrice *
        stock.quantity;
    });

    const pnl =
      current - invested;

    return {
      invested,
      current,
      pnl,
      percentage:
        ((pnl / invested) * 100).toFixed(2),
    };
  }, [holdings]);

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Portfolio Valuation
      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        <div>
          <h4>Total Investment</h4>
          <p className="text-xl font-bold">
            ₹{stats.invested.toLocaleString()}
          </p>
        </div>

        <div>
          <h4>Current Value</h4>
          <p className="text-xl font-bold">
            ₹{stats.current.toLocaleString()}
          </p>
        </div>

        <div>
          <h4>Total PnL</h4>
          <p
            className={`text-xl font-bold ${
              stats.pnl >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            ₹{stats.pnl.toLocaleString()}
          </p>
        </div>

        <div>
          <h4>Return %</h4>
          <p
            className={`text-xl font-bold ${
              stats.pnl >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {stats.percentage}%
          </p>
        </div>

      </div>

    </div>
  );
};

export default PortfolioValue;
