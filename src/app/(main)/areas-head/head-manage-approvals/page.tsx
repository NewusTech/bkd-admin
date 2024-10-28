"use client";

import { formatDate, getLast10Years } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import VerificationAdminManageApprovalsTablePages from "@/components/tables/head_manage_approvals_table";
import {
  JwtPayload,
  ServiceInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import {
  getApplicationUserHistories,
  getDownloadApplicationExcelPrint,
  getDownloadApplicationPrint,
  getDownloadUserComplaintPrint,
  getService,
} from "@/services/api";
import DataNotFound from "@/components/elements/data_not_found";
import { useDebounce } from "@/hooks/useDebounce";
import PaginationComponent from "@/components/elements/pagination";
import { useRouter } from "next/navigation";
import MobileHeadManageApprovalCard from "@/components/mobile_all_cards/mobileHeadManageApprovalCard";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import HistoryApplicationMobileFilter from "@/components/elements/filters/mobile/historyApplicationMobileFilter";
import HistoryApplicationFilter from "@/components/elements/filters/website/historyApplicationFilter";

export default function HeadManageApprovalsScreen() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [role, setRole] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [layananId, setLayananId] = useState<number | undefined>(undefined);
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

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);

        if (decoded && decoded.role !== undefined) {
          setRole(decoded.role);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      router.push("/login");
    }
  }, [router]);

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
    status?: number | number[],
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
    if (role && role === "Kepala Bidang") {
      fetchApplicationHistoryUser(
        1,
        10,
        2,
        debounceSearch,
        startDateFormatted,
        endDateFormatted,
        month,
        year,
        layananId
      );
    } else if (role === "Sekretaris Dinas") {
      fetchApplicationHistoryUser(
        1,
        10,
        5,
        debounceSearch,
        startDateFormatted,
        endDateFormatted,
        month,
        year,
        layananId
      );
    } else if (role === "Super Admin") {
      fetchApplicationHistoryUser(
        1,
        10,
        [2, 5],
        debounceSearch,
        startDateFormatted,
        endDateFormatted,
        month,
        year,
        layananId
      );
    }
  }, [
    debounceSearch,
    startDateFormatted,
    endDateFormatted,
    layananId,
    month,
    year,
    role,
  ]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      if (role && role === "Super Admin") {
        fetchApplicationHistoryUser(
          newPage,
          10,
          [2, 5],
          "",
          "",
          "",
          month,
          year,
          layananId
        );
      } else if (role && role === "Sekretaris Dinas") {
        fetchApplicationHistoryUser(
          newPage,
          10,
          5,
          "",
          "",
          "",
          month,
          year,
          layananId
        );
      } else if (role && role === "Kepala Bidang") {
        fetchApplicationHistoryUser(
          newPage,
          10,
          2,
          "",
          "",
          "",
          month,
          year,
          layananId
        );
      }
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
          years={years}
          setYear={setYear}
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
            years={years}
            setYear={setYear}
          />
        )}
      </div>

      <div className="w-full">
        {!isMobile ? (
          <>
            {users && users.length > 0 && (
              <VerificationAdminManageApprovalsTablePages users={users} />
            )}
          </>
        ) : (
          <div className="w-full flex flex-col gap-y-5">
            {users &&
              users.length > 0 &&
              users.map((user: UserApplicationHistoryInterface, i: number) => {
                return (
                  <MobileHeadManageApprovalCard key={i} index={i} user={user} />
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
