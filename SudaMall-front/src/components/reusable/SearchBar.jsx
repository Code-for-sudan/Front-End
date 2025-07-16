// components/SearchBar.tsx
import React, { useState } from "react";
import { useAutocompleteWebSocket } from "../../hooks";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { connect, disconnect, sendQuery } = useAutocompleteWebSocket((data) => {
    setSuggestions(data);
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim().length > 1) {
      sendQuery({
        query: value,
        size: 10,
        type: "product",
      });
      console.log("sent")
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between text-sm border border-gray-400 bg-gray-50 rounded-md p-2 w-full">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onFocus={connect}
          onBlur={() => {
            // Delay disconnect slightly so click on suggestion works
            setTimeout(() => {
              disconnect();
              setSuggestions([]); // Optional: Clear suggestions on blur
            }, 200);
          }}
          placeholder="أبحث..."
          className="flex-1 outline-none focus:outline-none border-none"
        />
        <IoSearch className="size-5 text-gray-400" />
      </div>
      {suggestions.length > 0 && (
        <ul className="border mt-2 bg-white z-50 relative">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => setInput(item)} // onMouseDown so it doesn't trigger blur first
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
