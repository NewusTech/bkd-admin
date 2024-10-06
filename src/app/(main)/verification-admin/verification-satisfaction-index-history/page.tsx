"use client";

import DatePages from "@/components/elements/date";
import SearchPages from "@/components/elements/search";
import { formatDate } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AreasInterface,
  SatisfactionHistoryInterface,
  ServiceInterface,
} from "@/types/interface";
import {
  getAreas,
  getSatisfactionUser,
  getServiceByAreas,
} from "@/services/api";
import { Label } from "@/components/ui/label";
import DateFormInput from "@/components/elements/date_form_input";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Loader } from "lucide-react";
import { set } from "date-fns";
import PaginationComponent from "@/components/elements/pagination";
import { useDebounce } from "@/hooks/useDebounce";
import VerificationSatisfactionIndexTablePages from "@/components/tables/verification_admin_satisfaction_index_history_table";
import MobileVerificationSatisfactionIndexCardPages from "@/components/mobile_all_cards/mobileSatisfactionIndexVerificationCard";

export default function VerificationSatisfactionIndexScreen() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const deboucedSearch = useDebounce(search, 500);
  // const limitItem = 35;
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [indexes, setIndexes] = useState<SatisfactionHistoryInterface[]>();
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

  const fetchSatisfactionHistory = async (
    page: number,
    limit: number,
    search: string,
    start_date: string,
    end_date: string
  ) => {
    try {
      const response = await getSatisfactionUser(
        page,
        limit,
        search,
        start_date,
        end_date
      );

      setIndexes(response.data);
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
    fetchSatisfactionHistory(
      1,
      10,
      deboucedSearch,
      startDateFormatted ?? "",
      endDateFormatted ?? ""
    );
  }, [deboucedSearch, startDateFormatted, endDateFormatted]);

  console.log(indexes, "ini index");

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchSatisfactionHistory(newPage, 10, "", "", "");
    }
  };

  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-3`}>
        <h2 className="text-2xl text-black-80 text-center md:mb-6">
          Indeks Kepuasan
        </h2>

        <div
          className={`w-full flex flex-col md:flex-row ${!isMobile ? "" : "p-3 rounded-lg shadow-md"} bg-line-10 gap-y-5 gap-x-5`}>
          <div className="w-full md:w-7/12">
            <SearchPages
              search={search}
              change={(e: any) => setSearch(e.target.value)}
              placeholder="Pencarian"
            />
          </div>

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

        <div className="w-full">
          {!isMobile ? (
            <>
              {indexes && indexes.length > 0 && (
                <VerificationSatisfactionIndexTablePages indexes={indexes} />
              )}
            </>
          ) : (
            <MobileVerificationSatisfactionIndexCardPages />
          )}
        </div>

        {indexes && indexes.length > 10 && (
          <div className="w-full">
            <PaginationComponent
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}
