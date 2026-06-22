import React from "react";

const HoldingCard = ({ holding }) => {
  const investment =
    holding.averagePrice *
    holding.quantity;

  const currentValue =
    holding.currentPrice *
    holding.quantity;

  const pnl =
    currentValue - investment;

  const pnlPercent =
    ((pnl / investment) * 100).toFixed(2);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all">

      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-xl">
            {holding.symbol}
          </h3>

          <p className="text-gray-500">
            {holding.companyName}
          </p>
        </div>

        <div>
          <span
            className={`px-3 py-1 rounded-full text-white ${
              pnl >= 0
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {pnlPercent}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">

        <div>
          <p className="text-gray-500">
            Quantity
          </p>
          <p className="font-semibold">
            {holding.quantity}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Avg Price
          </p>
          <p className="font-semibold">
            ₹{holding.averagePrice}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Current Price
          </p>
          <p className="font-semibold">
            ₹{holding.currentPrice}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Investment
          </p>
          <p className="font-semibold">
            ₹{investment.toLocaleString()}
          </p>
        </div>

      </div>

      <div className="border-t mt-4 pt-4">

        <div className="flex justify-between">

          <span>Current Value</span>

          <span className="font-bold">
            ₹{currentValue.toLocaleString()}
          </span>

        </div>

        <div className="flex justify-between mt-2">

          <span>PnL</span>

          <span
            className={`font-bold ${
              pnl >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            ₹{pnl.toLocaleString()}
          </span>

        </div>

      </div>

    </div>
  );
};

export default HoldingCard;
