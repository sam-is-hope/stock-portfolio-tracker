import React, { useState, useEffect } from "react";

const SearchBar = ({
  placeholder = "Search stocks...",
  onSearch,
  debounce = 500,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(query);
      }
    }, debounce);

    return () => clearTimeout(timer);
  }, [query, debounce, onSearch]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="
          w-full
          border
          border-gray-300
          rounded-lg
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      <div className="absolute right-4 top-3 text-gray-500">
        🔍
      </div>
    </div>
  );
};

export default SearchBar;
