import React, { useState } from "react";

const TransactionForm = ({
  onSubmit,
}) => {
  const [form, setForm] = useState({
    symbol: "",
    quantity: "",
    price: "",
    type: "BUY",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);

    setForm({
      symbol: "",
      quantity: "",
      price: "",
      type: "BUY",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow"
    >

      <h2 className="text-2xl font-bold mb-5">
        Add Transaction
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <input
          type="text"
          name="symbol"
          placeholder="Stock Symbol"
          value={form.symbol}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option>BUY</option>
          <option>SELL</option>
        </select>

      </div>

      <button
        type="submit"
        className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg"
      >
        Save Transaction
      </button>

    </form>
  );
};

export default TransactionForm;
