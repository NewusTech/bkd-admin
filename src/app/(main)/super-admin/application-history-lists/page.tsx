"use client";

import DatePages from "@/components/elements/date";
import SearchPages from "@/components/elements/search";
import { formatDate, getLast10Years } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Printer } from "@phosphor-icons/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import VerificationUserApplicationHistoryTablePages from "@/components/tables/verification_admin_user_application_history_table";
import {
  getApplicationUserHistories,
  getDownloadApplicationExcelPrint,
  getDownloadApplicationPrint,
  getService,
} from "@/services/api";
import {
  ServiceInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import DataNotFound from "@/components/elements/data_not_found";
import { useDebounce } from "@/hooks/useDebounce";
import PaginationComponent from "@/components/elements/pagination";
import MobileDivisionVerificationAdminApplicationHistoryCard from "@/components/mobile_all_cards/mobileDivisionVerificationAdminApplicationHistoryCard";
import UnduhMenus from "@/components/ui/UnduhMenus";
import HistoryApplicationFilter from "@/components/elements/filters/website/historyApplicationFilter";
import HistoryApplicationMobileFilter from "@/components/elements/filters/mobile/historyApplicationMobileFilter";

export default function SuperAdminListUserApplicationHistoriesScreen() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [layananId, setLayananId] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<number>();
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>("");
  const [years, setYears] = useState<{ id: number; value: string }[]>([]);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [users, setUsers] = useState<UserApplicationHistoryInterface[]>([]);
  const [services, setServices] = useState<ServiceInterface[]>([]);
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

  useEffect(() => {
    const years = getLast10Years(new Date().toISOString());
    setYears(years);
  }, []);

  const fetchApplicationHistoryUser = async (
    page: number,
    limit: number,
    status: number,
    search?: string,
    start_date?: string,
    end_date?: string,
    month?: number,
    year?: string,
    layanan_id?: number
  ) => {
    try {
      const response = await getApplicationUserHistories(
        page,
        limit,
        status,
        search,
        start_date,
        end_date,
        month,
        year,
        layanan_id
      );

      setUsers(response.data);
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
    fetchApplicationHistoryUser(
      1,
      10,
      status ?? 0,
      debounceSearch,
      startDateFormatted,
      endDateFormatted,
      month,
      year,
      layananId
    );
  }, [
    debounceSearch,
    startDateFormatted,
    endDateFormatted,
    month,
    layananId,
    year,
    status,
  ]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchApplicationHistoryUser(
        newPage,
        10,
        status ?? 0,
        debounceSearch,
        "",
        "",
        month,
        year,
        layananId
      );
    }
  };

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

  // Api PDF
  const fetchPdf = async () => {
    return await getDownloadApplicationPrint(
      startDateFormatted,
      endDateFormatted,
      year,
      month,
      layananId
    );
  };
  // Api Excel
  const fetchExcel = async () => {
    return await getDownloadApplicationExcelPrint(
      startDateFormatted,
      endDateFormatted,
      year,
      month,
      layananId
    );
  };

  return (
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
      {!isMobile && (
        <HistoryApplicationFilter
          layananId={layananId}
          setLayananId={setLayananId}
          services={services}
          fetchPdf={fetchPdf}
          fetchExcel={fetchExcel}
          search={search}
          setSearch={setSearch}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setMonth={setMonth}
          setYear={setYear}
          years={years}
          status={status}
          setStatus={setStatus}
          keys={true}
        />
      )}

      {/* filter mobile */}
      <div className="w-full">
        {isMobile && (
          <HistoryApplicationMobileFilter
            layananId={layananId}
            setLayananId={setLayananId}
            services={services}
            fetchPdf={fetchPdf}
            fetchExcel={fetchExcel}
            search={search}
            setSearch={setSearch}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setMonth={setMonth}
            setYear={setYear}
            years={years}
            status={status}
            setStatus={setStatus}
            keys={true}
          />
        )}
      </div>

      <div className="w-full">
        {!isMobile ? (
          <>
            {users && users.length > 0 && (
              <VerificationUserApplicationHistoryTablePages users={users} />
            )}
          </>
        ) : (
          <div className="w-full flex flex-col gap-y-5">
            {users &&
              users.length > 0 &&
              users.map((user: UserApplicationHistoryInterface, i: number) => {
                return (
                  <MobileDivisionVerificationAdminApplicationHistoryCard
                    key={i}
                    index={i}
                    user={user}
                  />
                );
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

      <div className="w-full">{users.length === 0 && <DataNotFound />}</div>
    </section>
  );
}
