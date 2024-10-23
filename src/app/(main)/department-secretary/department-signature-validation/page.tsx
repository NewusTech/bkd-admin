"use client";

import DatePages from "@/components/elements/date";
import SearchPages from "@/components/elements/search";
import { formatDate, getLast10Years } from "@/lib/utils";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checks, Printer } from "@phosphor-icons/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import FilterDataPages from "@/components/elements/data_filters";
import DepartmentSecretarySignatureValidationTablePages from "@/components/tables/department_secretary_signature_validation_table";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import {
  JwtPayload,
  ServiceInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import {
  getApplicationUserHistories,
  getDownloadApplicationPrint,
  getService,
} from "@/services/api";
import { jwtDecode } from "jwt-decode";
import UnduhMenus from "@/components/ui/UnduhMenus";
import HistoryApplicationMobileFilter from "@/components/elements/filters/mobile/historyApplicationMobileFilter";
import HistoryApplicationFilter from "@/components/elements/filters/website/historyApplicationFilter";
import MobileDepartmentSecretarySignatureHistoryCard from "@/components/mobile_all_cards/mobileDepartmentSecretarySignatureHistoryCard";
import PaginationComponent from "@/components/elements/pagination";
import DataNotFound from "@/components/elements/data_not_found";

export default function DepartmentSecretarySignatureValidationScreen() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [layananId, setLayananId] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>("");
  const [years, setYears] = useState<{ id: number; value: string }[]>([]);
  const [role, setRole] = useState<string | null>(null);
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
    status?: number,
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
    if (role && role === "Sekretaris Daerah") {
      fetchApplicationHistoryUser(
        1,
        10,
        7,
        debounceSearch,
        startDateFormatted,
        endDateFormatted,
        month,
        year,
        layananId
      );
    } else if (role && role === "Kepala Dinas") {
      fetchApplicationHistoryUser(
        1,
        10,
        6,
        debounceSearch,
        startDateFormatted,
        endDateFormatted,
        month,
        year,
        layananId
      );
    } else if (
      role &&
      (role === "Sekretaris Dinas" || role === "Super Admin")
    ) {
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
    }
  }, [
    debounceSearch,
    startDateFormatted,
    endDateFormatted,
    layananId,
    month,
    role,
    year,
  ]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchApplicationHistoryUser(
        newPage,
        10,
        1,
        "",
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
  const fetchPdf = async (id?: number) => {
    return await getDownloadApplicationPrint(id);
  };
  // Api Excel
  const fetchExcel = async (id?: number) => {
    return await getDownloadApplicationPrint(id);
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
          />
        )}
      </div>

      <div className="w-full">
        {!isMobile ? (
          <>
            {users && users.length > 0 && (
              <DepartmentSecretarySignatureValidationTablePages users={users} />
            )}
          </>
        ) : (
          <div className="w-full flex flex-col gap-y-5">
            {users &&
              users.length > 0 &&
              users.map((user: UserApplicationHistoryInterface, i: number) => {
                return (
                  <MobileDepartmentSecretarySignatureHistoryCard
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
