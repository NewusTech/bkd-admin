"use client";

import UnduhMenus from "@/components/ui/UnduhMenus";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import DatePages from "../../date";
import { months } from "@/constants/main";
import SearchPages from "../../search";
import {
  HistoryApplicationFilterInterface,
  ServiceInterface,
} from "@/types/interface";

export default function HistoryApplicationFilter({
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
}: HistoryApplicationFilterInterface) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-3`}>
      <div className="w-full flex flex-col md:flex-row gap-x-8 gap-y-3">
        <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
          <Select
            onValueChange={(value) =>
              setLayananId(value === "all" ? undefined : Number(value))
            }>
            <SelectTrigger
              className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
              <SelectValue
                placeholder="Pilih Layanan"
                className="text-black-80 tex-[14px] w-full"
              />
            </SelectTrigger>
            <SelectContent className="bg-line-10">
              <div className="pt-2">
                <SelectItem className="w-full px-4" value="all">
                  Semua Status
                </SelectItem>
                {services &&
                  services.map((service: ServiceInterface, i: number) => {
                    return (
                      <SelectItem
                        key={i}
                        className={`w-full px-4`}
                        value={service.id.toString()}>
                        {service?.nama}
                      </SelectItem>
                    );
                  })}
              </div>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <SearchPages
            search={search}
            change={(e: any) => setSearch(e.target.value)}
            placeholder="Pencarian"
          />
        </div>
      </div>

      <div className={`w-full flex flex-col md:flex-row gap-y-5 gap-x-3`}>
        <div className="flex flex-row justify-center items-center w-full md:w-10/12 gap-x-3">
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

        <div className="w-full flex flex-row gap-x-3">
          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
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

          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
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
        </div>

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
          {/* PDF Excel Komponen */}
        </div>
      </div>
    </div>
  );
}
