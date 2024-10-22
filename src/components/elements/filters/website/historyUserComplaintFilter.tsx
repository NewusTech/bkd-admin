"use client";

import React from "react";
import SearchPages from "../../search";
import DatePages from "../../date";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months, userComplaintStatus } from "@/constants/main";
import UnduhMenus from "@/components/ui/UnduhMenus";
import { HistoryUserComplaintFilterInterface } from "@/types/interface";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function HistoryUserComplaintFilter({
  search,
  setSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  fetchPdf,
  fetchExcel,
  setStatus,
  setMonth,
}: HistoryUserComplaintFilterInterface) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className={`w-full flex flex-col ${!isMobile ? "" : "p-3 rounded-lg shadow-md"} bg-line-10 gap-y-5 gap-x-5`}>
      <SearchPages
        search={search}
        change={(e: any) => setSearch(e.target.value)}
        placeholder="Pencarian"
      />

      <div className="w-full flex flex-row gap-x-3">
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
                setStatus(value === "all" ? undefined : Number(value))
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
        </div>

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

        <>
          {/* PDF Excel Komponen */}
          <div className="w-full">
            <UnduhMenus
              fetchPdf={fetchPdf}
              fetchExcel={fetchExcel}
              pdfFileName="Laporan Pengaduan Pengguna.pdf"
              excelFileName="Laporan Pengaduan Pengguna.xlsx"
              successTitlePdf="File PDF Berhasil Diunduh!"
              successTitleExcel="File Excel Sukses Diunduh!"
              id={0}
            />
          </div>
          {/* PDF Excel Komponen */}
        </>
      </div>
    </div>
  );
}
