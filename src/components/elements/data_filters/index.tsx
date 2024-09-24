"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchPages from "../search";
import DatePages from "../date";
import { Button } from "@/components/ui/button";
import { Printer } from "@phosphor-icons/react";
import { AdminApplicationHistoryInterface } from "@/types/interface";

export default function FilterDataPages({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  search,
  setSearch,
}: AdminApplicationHistoryInterface) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-3`}>
        <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
          <Select
          // onValueChange={handleSelectStatusChange}
          >
            <SelectTrigger
              className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
              {/* <Checks className="w-6 h-6 text-black-80" /> */}
              <SelectValue
                placeholder="Pilih Layanan"
                className="text-black-80 w-full"
              />
            </SelectTrigger>
            <SelectContent className="bg-line-10">
              <div className="pt-2">
                {/* {statusDatas &&
                statusDatas.map(
                  (status: { id: number; value: string }, i: number) => {
                    return (
                      <SelectItem
                        key={i}
                        className={`w-full px-4`}
                        value={status.id.toString()}>
                        {status.value}
                      </SelectItem>
                    );
                  }
                )} */}
                <SelectItem className="w-full px-4 pl-8" value="1">
                  Hello World
                </SelectItem>
              </div>
            </SelectContent>
          </Select>
        </div>

        <div
          className={`w-full flex flex-col md:flex-row ${!isMobile ? "" : "p-3 rounded-lg shadow-md"} bg-line-10 gap-y-5 gap-x-5`}>
          <SearchPages
            search={search}
            change={(e: any) => setSearch(e.target.value)}
            placeholder="Pencarian"
          />

          <div className="flex flex-row justify-center items-center w-full gap-x-3">
            <DatePages
              date={startDate ?? null}
              setDate={(e) => setStartDate(e ?? undefined)}
            />
            <p className="text-center">to</p>
            <DatePages
              date={endDate ?? null}
              setDate={(e) => setEndDate(e ?? undefined)}
            />
          </div>

          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
            <Select
            // onValueChange={handleSelectStatusChange}
            >
              <SelectTrigger
                className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                {/* <Checks className="w-6 h-6 text-black-80" /> */}
                <SelectValue
                  placeholder="Status"
                  className="text-black-80 w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <div className="pt-2">
                  {/* {statusDatas &&
                statusDatas.map(
                  (status: { id: number; value: string }, i: number) => {
                    return (
                      <SelectItem
                        key={i}
                        className={`w-full px-4`}
                        value={status.id.toString()}>
                        {status.value}
                      </SelectItem>
                    );
                  }
                )} */}
                  <SelectItem className="w-full px-4 pl-8" value="1">
                    Hello World
                  </SelectItem>
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <Button className="w-full flex flex-row gap-x-4 text-sm bg-primary-40 items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
              <Printer className="w-6 h-6 text-line-10" />

              <span>Print</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
