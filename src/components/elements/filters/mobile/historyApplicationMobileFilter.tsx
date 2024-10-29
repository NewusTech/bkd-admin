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
import { months, statusApps } from "@/constants/main";
import {
  HistoryApplicationFilterInterface,
  ServiceInterface,
} from "@/types/interface";
import { Menu } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DotsThreeVertical, SlidersHorizontal } from "@phosphor-icons/react";

export default function HistoryApplicationMobileFilter({
  layananId,
  setLayananId,
  search,
  setSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  fetchPdf,
  fetchExcel,
  services,
  setMonth,
  years,
  setYear,
  status,
  setStatus,
}: HistoryApplicationFilterInterface) {
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
                  onClick={() => handleFilterClick("layanan")}>
                  Filter Layanan
                </MenubarItem>
                {status && (
                  <MenubarItem
                    className="hover:text-primary-40 text-[14px]"
                    onClick={() => handleFilterClick("status")}>
                    Filter Status
                  </MenubarItem>
                )}
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
        {activeFilter === "layanan" && (
          <div className="w-full flex items-center h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
            <Select
              onValueChange={(value) =>
                setLayananId(value === "all" ? undefined : Number(value))
              }>
              <SelectTrigger className="w-full gap-x-4 text-[14px] rounded-lg border-none">
                <SelectValue
                  placeholder="Pilih Layanan"
                  className="text-black-80 tex-[14px] w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <SelectItem className="w-full px-4" value="all">
                  Semua Status
                </SelectItem>
                {services.map((service: ServiceInterface, i: number) => (
                  <SelectItem
                    key={i}
                    className="w-full px-4"
                    value={service.id.toString()}>
                    {service?.nama}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {activeFilter === "status" && (
          <div className="w-full flex items-center h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
            <Select
              onValueChange={(value) =>
                setStatus &&
                setStatus(value === "all" ? undefined : Number(value))
              }>
              <SelectTrigger
                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                <SelectValue
                  placeholder="Bulan"
                  className="text-black-80 tex-[14px] w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <div className="pt-2">
                  <SelectItem className="w-full px-4" value="all">
                    Semua Bulan
                  </SelectItem>
                  {statusApps &&
                    statusApps.map(
                      (item: { id: number; name: string }, i: number) => {
                        return (
                          <SelectItem
                            key={i}
                            className={`w-full px-4`}
                            value={item.id.toString()}>
                            {item?.name}
                          </SelectItem>
                        );
                      }
                    )}
                </div>
              </SelectContent>
            </Select>
          </div>
        )}

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
            <Select
              onValueChange={(value) =>
                setMonth(value === "all" ? undefined : Number(value))
              }>
              <SelectTrigger
                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                <SelectValue
                  placeholder="Bulan"
                  className="text-black-80 tex-[14px] w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <div className="pt-2">
                  <SelectItem className="w-full px-4" value="all">
                    Semua Bulan
                  </SelectItem>
                  {months &&
                    months.map(
                      (month: { id: number; name: string }, i: number) => {
                        return (
                          <SelectItem
                            key={i}
                            className={`w-full px-4`}
                            value={month.id.toString()}>
                            {month?.name}
                          </SelectItem>
                        );
                      }
                    )}
                </div>
              </SelectContent>
            </Select>
          </div>
        )}

        {activeFilter === "year" && (
          <div className="w-full flex items-center h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
            <Select
              onValueChange={(value) =>
                setYear(value === "all" ? undefined : value)
              }>
              <SelectTrigger
                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                <SelectValue
                  placeholder="Tahun"
                  className="text-black-80 tex-[14px] w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <div className="pt-2">
                  <SelectItem className="w-full px-4" value="all">
                    Semua Tahun
                  </SelectItem>
                  {years &&
                    years.map(
                      (year: { id: number; value: string }, i: number) => {
                        return (
                          <SelectItem
                            key={i}
                            className={`w-full px-4`}
                            value={year?.value}>
                            {year?.value}
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
