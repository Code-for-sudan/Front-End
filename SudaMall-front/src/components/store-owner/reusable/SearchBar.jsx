import React, { useState, useRef, useEffect, useCallback } from "react";
import { useAutocompleteWebSocket } from "../../../hooks";
import { IoSearch } from "react-icons/io5";
import debounce from "lodash/debounce";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const blurTimeoutRef = useRef(null);

  const { connect, disconnect, sendQuery } = useAutocompleteWebSocket((data) => {
    setSuggestions(data);
  });

  // Debounced sendQuery to avoid flooding the server
  const debouncedSendQuery = useCallback(
    debounce((value) => {
      sendQuery({
        query: value,
        size: 10,
        type: "product",
      });
      console.log("sent:", value);
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim().length > 1) {
      debouncedSendQuery(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleFocus = () => {
    // Cancel any pending disconnect
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    connect();
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      disconnect();
      setSuggestions([]);
    }, 5000); // Delay disconnect for 5s
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSendQuery.cancel();
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="">
      <div className="flex items-center justify-between text-sm border border-gray-300 bg-gray-50 rounded-md p-2 w-full">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
              onMouseDown={() => setInput(item)} // Keeps click before blur
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
