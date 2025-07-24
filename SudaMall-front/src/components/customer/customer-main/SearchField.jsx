import React from 'react';
import { SearchIcon } from '../../../assets';

function SearchField({ placeholder = '', searchTerm, setSearchTerm }) {
  return (
    <div className="w-full bg-[#f0f0f0] px-4 py-1 rounded-lg border-2 border-[#D9D9D940] mt-2 max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <img
          src={SearchIcon}
          alt="search"
          className="absolute left-2 h-5 w-5 text-[$000000] pointer-events-none"
        />
        <input
          type="text"
          id="search"
          name="search"
          value={searchTerm}
          placeholder={placeholder}
          className="w-full py-2 sm:pr-2 pl-10 text-base text-[#1f1e1e] placeholder:text-[#797979] outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchField;
