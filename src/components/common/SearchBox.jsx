import React, { useEffect } from "react";
import { SearchDataChange } from "@/context/SearchDataContext";
import { useLocation } from "react-router";
import { SEARCH_ICON } from "@/lib/images";

const SearchBox = () => {
  const { searchQuery, setSearchQuery } = SearchDataChange();

  const location = useLocation();

  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname]);

  return (
    <div className="bg-white rounded-[12px] flex items-center px-2 sm:px-[18px]">
      <img src={SEARCH_ICON} alt="" />
      <input
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder="Search"
        className="w-full border-none font-[400] text-[16px] placeholder:text-[#7E808C] outline-none pl-4 h-14 sm:text-lg text-primary focus-visible:ring-0"
      />
    </div>
  );
};

export default SearchBox;
