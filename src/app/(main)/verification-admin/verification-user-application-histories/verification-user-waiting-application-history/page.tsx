"use client";

import DatePages from "@/components/elements/date";
import SearchPages from "@/components/elements/search";
import { formatDate } from "@/lib/utils";
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
import { getApplicationUserHistories, getDownloadApplicationPrint, getService } from "@/services/api";
import {
  ServiceInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import DataNotFound from "@/components/elements/data_not_found";
import { useDebounce } from "@/hooks/useDebounce";
import PaginationComponent from "@/components/elements/pagination";
import MobileDivisionVerificationAdminApplicationHistoryCard from "@/components/mobile_all_cards/mobileDivisionVerificationAdminApplicationHistoryCard";
import UnduhMenus from "@/components/ui/UnduhMenus";

export default function VerificationUserApplicationHistoriesScreen() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [layananId, setLayananId] = useState<number | undefined>(undefined);
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

  const fetchApplicationHistoryUser = async (
    page: number,
    limit: number,
    status?: number,
    search?: string,
    start_date?: string,
    end_date?: string,
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
      1,
      debounceSearch,
      startDateFormatted,
      endDateFormatted,
      layananId
    );
  }, [debounceSearch, startDateFormatted, endDateFormatted, layananId]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchApplicationHistoryUser(
        newPage,
        10,
        1,
        debounceSearch,
        "",
        "",
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
  const fetchPdf = async (id: number) => {
    return await getDownloadApplicationPrint(id);
  };
  // Api Excel
  const fetchExcel = async (id: number) => {
    return await getDownloadApplicationPrint(id);
  };

  return (
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-3`}>
        <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
          <Select
            onValueChange={(value) =>
              setLayananId(value === "all" ? undefined : Number(value))
            }>
            <SelectTrigger
              className={`w-full gap-x-4 text-[14px] md:text-[16px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
              <SelectValue
                placeholder="Pilih Layanan"
                className="text-black-80 text-[14px] md:text-[16px] w-full"
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
                        className={`w-full px-4 text-[14px] md:text-[16px]`}
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

          <>
            {/* PDF Excel Komponen */}
            <div className="w-full">
              <UnduhMenus fetchPdf={fetchPdf} fetchExcel={fetchExcel} pdfFileName="Laporan Permohonan Pengguna.pdf" excelFileName="Laporan Permohonan Pengguna.xlsx" successTitlePdf="File PDF Berhasil Diunduh!"
                successTitleExcel="File Excel Sukses Diunduh!" id={0} />
            </div>
            {/* PDF Excel Komponen */}
          </>

        </div>
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

      {users && users.length > 10 && (
        <div className="w-full">
          <PaginationComponent
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <div className="w-full">{users.length === 0 && <DataNotFound />}</div>
    </section>
  );
}
