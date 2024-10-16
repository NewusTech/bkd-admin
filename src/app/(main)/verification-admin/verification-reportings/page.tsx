"use client";

import { formatDate } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VerificationReportingTablePages from "@/components/tables/verification_admin_reporting_table";
import { ReportDataInterface, ServiceInterface } from "@/types/interface";
import { getReportHistories, getService } from "@/services/api";
import PaginationComponent from "@/components/elements/pagination";
import DataNotFound from "@/components/elements/data_not_found";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import DatePages from "@/components/elements/date";
import SearchPages from "@/components/elements/search";
import MobileReportingCard from "@/components/mobile_all_cards/mobileReportingsCard";
import { start } from "repl";

export default function VerificationUserApplicationRevitionHistoriesScreen() {
  const router = useRouter();
  // serach
  const [search, setSearch] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  // serach
  const isMobile = useMediaQuery("(max-width: 768px)");
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [layananId, setLayananId] = useState<number | undefined>(undefined);
  const [reports, setReports] = useState<ReportDataInterface[]>([]);
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });
  const debounceSearch = useDebounce(search);

  const startDateFormatted = startDate
    ? formatDate(new Date(startDate))
    : undefined;
  const endDateFormatted = endDate ? formatDate(new Date(endDate)) : undefined;

  const fetchService = async (page: number, limit: number, search?: string) => {
    try {
      const response = await getService(page, limit, search);

      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchService(1, 100, "");
  }, []);

  const fetchReportData = async (
    page: number,
    limit: number,
    search: string,
    layanan_id?: number,
    start_date?: string,
    end_date?: string
  ) => {
    try {
      const response = await getReportHistories(
        page,
        limit,
        search,
        layanan_id,
        start_date,
        end_date
      );

      setReports(response?.data?.report);
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: response?.pagination?.totalPages,
        totalCount: response?.pagination?.totalCount,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReportData(
      1,
      5,
      debounceSearch,
      layananId,
      startDateFormatted,
      endDateFormatted
    );
  }, [debounceSearch, layananId, startDateFormatted, endDateFormatted]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchReportData(
        newPage,
        5,
        "",
        layananId,
        startDateFormatted,
        endDateFormatted
      );
    }
  };

  return (
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5 pb-5">
      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-3`}>
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

        <div
          className={`w-full flex flex-col md:flex-row ${!isMobile ? "" : "p-3 rounded-lg shadow-md"} bg-line-10 gap-y-5 gap-x-5`}>
          <SearchPages
            search={search}
            setSearch={setSearch}
            change={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
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
        </div>
      </div>

      <div className="w-full">
        {!isMobile ? (
          <>
            {reports && reports?.length > 0 && (
              <VerificationReportingTablePages reports={reports} />
            )}
          </>
        ) : (
          <div className="w-full flex flex-col gap-y-5">
            {reports &&
              reports.length > 0 &&
              reports.map((item: ReportDataInterface, i: number) => {
                return <MobileReportingCard key={i} index={i} item={item} />;
              })}
          </div>
        )}
      </div>

      <div className="w-full">
        <PaginationComponent
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="w-full">{reports.length === 0 && <DataNotFound />}</div>
    </section>
  );
}
