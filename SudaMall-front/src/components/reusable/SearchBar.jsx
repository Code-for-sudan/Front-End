// components/SearchBar.tsx
import React, { useState } from "react";
import { useAutocompleteWebSocket } from "../../hooks";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const sendQuery = useAutocompleteWebSocket((suggestions) => {
  setSuggestions(suggestions);
});

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim().length > 1) {
      sendQuery({
        query: value,
        size: 5,
        type: "product",
      });
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search products..."
        className="border p-2 w-full"
      />
      {suggestions.length > 0 && (
        <ul className="border mt-2 bg-white">
          {suggestions.map((item, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
