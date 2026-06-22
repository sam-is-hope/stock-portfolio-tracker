import React, {
  useMemo,
  useState,
} from "react";

const HoldingsTable = ({
  holdings = [],
}) => {
  const [sortField, setSortField] =
    useState("symbol");

  const [sortDirection, setSortDirection] =
    useState("asc");

  const sortedHoldings = useMemo(() => {
    const copied =
      [...holdings];

    copied.sort((a, b) => {
      if (
        sortDirection === "asc"
      ) {
        return a[
          sortField
        ] > b[sortField]
          ? 1
          : -1;
      }

      return a[
        sortField
      ] < b[sortField]
        ? 1
        : -1;
    });

    return copied;
  }, [
    holdings,
    sortField,
    sortDirection,
  ]);

  const changeSort = (field) => {
    if (field === sortField) {
      setSortDirection(
        sortDirection === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortField(field);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

      <h2 className="text-2xl font-bold mb-5">
        Holdings
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th
              className="text-left py-3 cursor-pointer"
              onClick={() =>
                changeSort("symbol")
              }
            >
              Symbol
            </th>

            <th
              onClick={() =>
                changeSort(
                  "quantity"
                )
              }
            >
              Quantity
            </th>

            <th>Average</th>

            <th>Current</th>

            <th>PnL</th>

            <th>Value</th>

          </tr>

        </thead>

        <tbody>

          {sortedHoldings.map(
            (holding) => {
              const pnl =
                (holding.currentPrice -
                  holding.averagePrice) *
                holding.quantity;

              return (
                <tr
                  key={
                    holding.symbol
                  }
                  className="border-b"
                >
                  <td className="py-3">
                    {
                      holding.symbol
                    }
                  </td>

                  <td>
                    {
                      holding.quantity
                    }
                  </td>

                  <td>
                    ₹
                    {
                      holding.averagePrice
                    }
                  </td>

                  <td>
                    ₹
                    {
                      holding.currentPrice
                    }
                  </td>

                  <td
                    className={
                      pnl >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    ₹
                    {pnl.toFixed(
                      2
                    )}
                  </td>

                  <td>
                    ₹
                    {(
                      holding.currentPrice *
                      holding.quantity
                    ).toLocaleString()}
                  </td>
                </tr>
              );
            }
          )}

        </tbody>

      </table>

    </div>
  );
};

export default HoldingsTable;
