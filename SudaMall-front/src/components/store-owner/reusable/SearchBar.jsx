import React, { useState, useRef, useEffect, useCallback } from "react";
import { useAutocompleteWebSocket } from "../../../hooks";
import { IoSearch } from "react-icons/io5";
import debounce from "lodash/debounce";

const SearchBar = ({ placeholder, handleSearch}) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const blurTimeoutRef = useRef(null);

  const { connect, disconnect, sendQuery, isConnected } = useAutocompleteWebSocket((data) => {
    setSuggestions(data);
  });

  // Debounced sendQuery to avoid flooding the server
  const debouncedSendQuery = useCallback(
    debounce((value) => {
      if (!isConnected) {
        console.log("Reconnecting WebSocket...");
        connect();
        setTimeout(() => {
          sendQuery({
            query: value,
            size: 5,
            type: "product",
          });
        }, 200);
      } else {
        sendQuery({
          query: value,
          size: 5,
          type: "product",
        });
      }
      console.log("sent:", value);
    }, 500),
    [isConnected]
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
    }, 1000); // Delay disconnect for 5s
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

  // set selected item to the search input
  const handleSelectedItem = (item) => {
    setInput(item);
    setSuggestions([]);
  }
  // click handler for search button
  const handleSearchClick = () => {
    if (input.trim().length >= 2) {
      handleSearch(input);
    }
  };


  return (
    <div className="">
      <div className="flex items-center justify-between text-sm border border-gray-300 bg-gray-50 rounded-md p-2 w-full">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={ placeholder || "أبحث..."}
          className="flex-1 outline-none focus:outline-none border-none"
        />
        <button
          type="button"
          onClick={handleSearchClick}
        >
          <IoSearch
            className={`size-5 ${input.trim().length >= 2 ? "text-black cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}
          />
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="mt-2 bg-white z-50 shadow-lg rounded relative">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
              onMouseDown={() => handleSelectedItem(item)}
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
