import React, { useMemo } from "react";

const PortfolioSummary = ({ holdings = [] }) => {
  const summary = useMemo(() => {
    const totalInvestment = holdings.reduce(
      (acc, stock) =>
        acc + stock.averagePrice * stock.quantity,
      0
    );

    const currentValue = holdings.reduce(
      (acc, stock) =>
        acc + stock.currentPrice * stock.quantity,
      0
    );

    const totalPnL =
      currentValue - totalInvestment;

    const pnlPercentage =
      totalInvestment > 0
        ? (totalPnL / totalInvestment) * 100
        : 0;

    return {
      totalInvestment,
      currentValue,
      totalPnL,
      pnlPercentage,
      totalHoldings: holdings.length,
    };
  }, [holdings]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
      <div className="bg-white rounded-xl shadow p-5">
        <h4>Total Holdings</h4>
        <p className="text-3xl font-bold">
          {summary.totalHoldings}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h4>Investment</h4>
        <p className="text-3xl font-bold">
          ₹{summary.totalInvestment.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h4>Current Value</h4>
        <p className="text-3xl font-bold">
          ₹{summary.currentValue.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h4>Total PnL</h4>
        <p
          className={`text-3xl font-bold ${
            summary.totalPnL >= 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          ₹{summary.totalPnL.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h4>Return %</h4>
        <p
          className={`text-3xl font-bold ${
            summary.pnlPercentage >= 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {summary.pnlPercentage.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default PortfolioSummary;
