"use client";

import { formatDate } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import FilterDataPages from "@/components/elements/data_filters";
import VerificationReportingTablePages from "@/components/tables/verification_admin_reporting_table";
import { ReportDataInterface } from "@/types/interface";
import { getReportHistories } from "@/services/api";
import PaginationComponent from "@/components/elements/pagination";
import DataNotFound from "@/components/elements/data_not_found";

export default function VerificationUserApplicationRevitionHistoriesScreen() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [reports, setReports] = useState<ReportDataInterface[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const startDateFormatted = startDate
    ? formatDate(new Date(startDate))
    : undefined;
  const endDateFormatted = endDate ? formatDate(new Date(endDate)) : undefined;

  const fetchReportData = async (page: number, limit: number) => {
    try {
      const response = await getReportHistories(page, limit);

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
    fetchReportData(1, 5);
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchReportData(newPage, 5);
    }
  };

  console.log(reports, "ini report");

  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <FilterDataPages
        startDate={startDate as Date}
        setStartDate={setStartDate}
        endDate={endDate as Date}
        setEndDate={setEndDate}
        search={search}
        setSearch={setSearch}
      />

      <div className="w-full">
        {reports && reports?.length > 0 && (
          <VerificationReportingTablePages reports={reports} />
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
