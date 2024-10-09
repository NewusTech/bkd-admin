"use client";

import { Search } from "lucide-react";
import React from "react";

export default function SearchPages({ change, search, ...props }: any) {
  return (
    <div className="w-full flex flex-row items-center px-4 border border-primary-40 bg-transparent rounded-lg gap-x-3">
      <Search className="w-6 h-6 text-black-80" />

      <input
        type="text"
        value={search}
        onChange={change}
        name="search"
        placeholder={props.placeholder ? props.placeholder : "Cari..."}
        className="text-black-80 w-full text-[14px] md:text-[16px] h-[40px] active:border-x-line-40 focus:border-line-40 focus:outline-none active:outline-none placeholder:text-black-80 rounded-lg placeholder:text-[16px]"
      />
    </div>
  );
}
