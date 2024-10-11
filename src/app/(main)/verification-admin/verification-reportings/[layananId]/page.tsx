"use client";

import DatePages from "@/components/elements/date";
import { formatDate } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  getSatisfactionIndexHistoryReportDetail,
  getVerificationReportingsDetail,
} from "@/services/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChevronLeft, Loader } from "lucide-react";
import PaginationComponent from "@/components/elements/pagination";
import { useDebounce } from "@/hooks/useDebounce";
import VerificationSatisfactionIndexTablePages from "@/components/tables/verification_admin_satisfaction_index_detail_history_table";
import { Printer } from "@phosphor-icons/react";
import MobileSatisfactionIndexDetailCardPages from "@/components/mobile_all_cards/mobileSatisfactionIndexDetailCard";
import DataNotFound from "@/components/elements/data_not_found";
import { StatisVerificationReportingsDetailInterface } from "@/types/interface";
import VerificationReportingsDetailTablePages from "@/components/tables/verification_reportings_detail_table/page";
import SearchPages from "@/components/elements/search";
import MobileReportingDetailCard from "@/components/mobile_all_cards/mobileReportingDetail";

export default function VerificationReportingsDetailScreen({
  params,
}: {
  params: { layananId: number };
}) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const deboucedSearch = useDebounce(search, 500);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [indexes, setIndexes] = useState<
    StatisVerificationReportingsDetailInterface[]
  >([]);
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

  const fetchVerificationReportings = async (
    page: number,
    limit: number,
    start_date: string,
    end_date: string,
    layanan_id: number
  ) => {
    try {
      const response = await getVerificationReportingsDetail(
        page,
        limit,
        start_date,
        end_date,
        layanan_id
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
    fetchVerificationReportings(
      1,
      10,
      startDateFormatted ?? "",
      endDateFormatted ?? "",
      params?.layananId
    );
  }, [params?.layananId, startDateFormatted, endDateFormatted]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchVerificationReportings(newPage, 10, "", "", params?.layananId);
    }
  };

  return (
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
      <div className="px-2 md:px-4 flex flex-row justify-between items-center w-full">
        <div className="flex flex-row items-center">
          <button onClick={() => router.back()}>
            <ChevronLeft className="w-7 h-7 text-black-80 mr-2" />
          </button>

          <h5 className="text-xl text-start text-black-80 font-normal">
            Detail Verification Reporting
          </h5>
        </div>
      </div>

      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-5 pb-10`}>
        {!isMobile && (
          <h2 className="text-2xl text-black-80 text-center md:mb-6">
            Verification Reportings
          </h2>
        )}

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

          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
            <Select
            // onValueChange={handleSelectStatusChange}
            >
              <SelectTrigger
                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                {/* <Checks className="w-6 h-6 text-black-80" /> */}
                <SelectValue
                  placeholder="Pilih Status"
                  className="text-black-80 tex-[14px] w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <div className="pt-2">
                  {/* {statusDatas &&
                statusDatas.map(
                  (status: { id: number; value: string }, i: number) => {
                    return (
                      <SelectItem
                        key={i}
                        className={`w-full px-4`}
                        value={status.id.toString()}>
                        {status.value}
                      </SelectItem>
                    );
                  }
                )} */}
                  <SelectItem className="w-full px-4 pl-8" value="1">
                    Hello World
                  </SelectItem>
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-5/12">
            <Button className="w-full flex flex-row gap-x-4 text-sm bg-primary-40 items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
              <Printer className="w-6 h-6 text-line-10" />

              <span>Print</span>
            </Button>
          </div>
        </div>

        <div className="w-full">
          {!isMobile ? (
            <>
              {indexes && indexes.length > 0 && (
                <VerificationReportingsDetailTablePages indexes={indexes} />
              )}
            </>
          ) : (
            <div className="w-full flex flex-col gap-y-5">
              {indexes &&
                indexes.length > 0 &&
                indexes.map(
                  (
                    item: StatisVerificationReportingsDetailInterface,
                    i: number
                  ) => {
                    return (
                      <MobileReportingDetailCard
                        key={i}
                        index={i}
                        item={item}
                      />
                    );
                  }
                )}
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

        <div className="w-full">
          {indexes && indexes.length === 0 && <DataNotFound />}
        </div>
      </div>
    </section>
  );
}
