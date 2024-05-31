import React from "react";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";

const SearchComponent = ({ onChange, value }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        className="block w-full pl-[2.5rem] pr-[0.9375rem] py-[0.9375rem] border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Search"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default SearchComponent;
