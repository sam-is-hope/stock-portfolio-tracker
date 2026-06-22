import React from "react";

const TopMovers = ({
  gainers = [],
  losers = [],
}) => {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-5">
        Market Movers
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-green-600 font-bold mb-3">
            Top Gainers
          </h3>

          {gainers.map((stock) => (
            <div
              key={stock.symbol}
              className="flex justify-between py-2"
            >
              <div>
                <p>{stock.symbol}</p>
                <small>{stock.name}</small>
              </div>

              <div className="text-green-500">
                +{stock.changePercent}%
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-red-600 font-bold mb-3">
            Top Losers
          </h3>

          {losers.map((stock) => (
            <div
              key={stock.symbol}
              className="flex justify-between py-2"
            >
              <div>
                <p>{stock.symbol}</p>
                <small>{stock.name}</small>
              </div>

              <div className="text-red-500">
                {stock.changePercent}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopMovers;
