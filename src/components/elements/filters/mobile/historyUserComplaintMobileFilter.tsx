"use client";

import React, { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePages from "../../date";
import UnduhMenus from "@/components/ui/UnduhMenus";
import SearchPages from "../../search";
import { months, userComplaintStatus } from "@/constants/main";
import {
  HistoryApplicationFilterInterface,
  HistoryUserComplaintFilterInterface,
  ServiceInterface,
} from "@/types/interface";
import { Menu } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DotsThreeVertical, SlidersHorizontal } from "@phosphor-icons/react";

export default function HistoryUserComplaintMobileFilter({
  search,
  setSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  fetchPdf,
  fetchExcel,
  setStatus,
}: HistoryUserComplaintFilterInterface) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // State to track which filter is active
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Handler to update the active filter
  const handleFilterClick = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter)); // Toggle logic
  };

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full flex flex-row justify-end">
        <div className="w-1/12 px-10">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <DotsThreeVertical className="w-7 h-7 text-line-80" />
              </MenubarTrigger>
              <MenubarContent className="bg-line-10 p-0 w-10/12">
                <MenubarItem
                  className="hover:text-primary-40 text-[14px]"
                  onClick={() => handleFilterClick("search")}>
                  Pencarian
                </MenubarItem>
                <MenubarItem
                  className="hover:text-primary-40 text-[14px]"
                  onClick={() => handleFilterClick("dateRange")}>
                  Filter Jarak Tanggal
                </MenubarItem>
                <MenubarItem
                  className="hover:text-primary-40 text-[14px]"
                  onClick={() => handleFilterClick("month")}>
                  Filter Bulan
                </MenubarItem>
                <MenubarItem
                  className="hover:text-primary-40 text-[14px]"
                  onClick={() => handleFilterClick("year")}>
                  Filter Tahun
                </MenubarItem>
                <MenubarItem
                  className="hover:text-primary-40 text-[14px]"
                  onClick={() => handleFilterClick("status")}>
                  Status
                </MenubarItem>
                <MenubarItem
                  className="hover:text-primary-40 text-[14px]"
                  onClick={() => handleFilterClick("print")}>
                  Cetak
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>

      {/* Conditional Rendering for Selected Filter */}
      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-3`}>
        {activeFilter === "search" && (
          <SearchPages
            search={search}
            change={(e: any) => setSearch(e.target.value)}
            placeholder="Pencarian"
          />
        )}

        {activeFilter === "dateRange" && (
          <div className="w-full flex flex-row justify-center items-center gap-x-3">
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
        )}

        {activeFilter === "month" && (
          <div className="w-full flex items-center h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
            <Select>
              <SelectTrigger className="w-full gap-x-4 text-[14px] rounded-lg border-none">
                <SelectValue
                  placeholder="Pilih Bulan"
                  className="text-black-80 tex-[14px] w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <SelectItem className="w-full px-4" value="all">
                  Semua Bulan
                </SelectItem>
                {months.map(
                  (month: { id: number; name: string }, i: number) => (
                    <SelectItem
                      key={i}
                      className="w-full px-4"
                      value={month.id.toString()}>
                      {month?.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        )}

        {activeFilter === "year" && (
          <div className="w-full flex items-center h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
            <Select>
              <SelectTrigger className="w-full gap-x-4 text-[14px] rounded-lg border-none">
                <SelectValue
                  placeholder="Pilih Tahun"
                  className="text-black-80 tex-[14px] w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <SelectItem className="w-full px-4" value="all">
                  Semua Tahun
                </SelectItem>
                {/* Assuming you have an array of years */}
                {[2021, 2022, 2023].map((year, i) => (
                  <SelectItem
                    key={i}
                    className="w-full px-4"
                    value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {activeFilter === "status" && (
          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
            <Select
              onValueChange={(value) =>
                setStatus(value === "all" ? undefined : Number(value))
              }>
              <SelectTrigger
                className={`w-full text-[14px] md:text-[16px] px-2 gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                <SelectValue
                  placeholder="Status"
                  className="text-black-80 text-[14px] md:text-[16px] w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <div className="pt-2">
                  <SelectItem className="w-full px-4" value="all">
                    Semua Status
                  </SelectItem>
                  {userComplaintStatus &&
                    userComplaintStatus.map(
                      (
                        status: { id: number; name: string; key: number },
                        i: number
                      ) => {
                        return (
                          <SelectItem
                            key={i}
                            className={`w-full px-4 text-[14px] md:text-[16px]`}
                            value={status.key.toString()}>
                            {status.name}
                          </SelectItem>
                        );
                      }
                    )}
                </div>
              </SelectContent>
            </Select>
          </div>
        )}

        {activeFilter === "print" && (
          <div className="w-full md:w-6/12">
            {/* PDF Excel Komponen */}
            <div className="w-full">
              <UnduhMenus
                fetchPdf={fetchPdf}
                fetchExcel={fetchExcel}
                pdfFileName="Laporan Permohonan Pengguna.pdf"
                excelFileName="Laporan Permohonan Pengguna.xlsx"
                successTitlePdf="File PDF Berhasil Diunduh!"
                successTitleExcel="File Excel Sukses Diunduh!"
                id={0}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
