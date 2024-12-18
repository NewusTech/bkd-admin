"use client";

import DatePages from "@/components/elements/date";
import { formatDate } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SatisfactionIndexHistoryReportDetailInterface } from "@/types/interface";
import {
  getDownloadApplicationExcelPrint,
  getDownloadSatisfactionIndexExcelPrint,
  getDownloadSatisfactionIndexPrint,
  getSatisfactionIndexHistoryReportDetail,
} from "@/services/api";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChevronLeft, Loader } from "lucide-react";
import PaginationComponent from "@/components/elements/pagination";
import { useDebounce } from "@/hooks/useDebounce";
import VerificationSatisfactionIndexTablePages from "@/components/tables/verification_admin_satisfaction_index_detail_history_table";
import { Printer } from "@phosphor-icons/react";
import MobileSatisfactionIndexDetailCardPages from "@/components/mobile_all_cards/mobileSatisfactionIndexDetailCard";
import DataNotFound from "@/components/elements/data_not_found";
import Swal from "sweetalert2";
import UnduhMenus from "@/components/ui/UnduhMenus";

export default function VerificationSatisfactionIndexDetailScreen({
  params,
}: {
  params: { serviceId: number };
}) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const deboucedSearch = useDebounce(search, 500);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [indexes, setIndexes] =
    useState<SatisfactionIndexHistoryReportDetailInterface[]>();
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
    id: number,
    page: number,
    limit: number,
    start_date: string,
    end_date: string
  ) => {
    try {
      const response = await getSatisfactionIndexHistoryReportDetail(
        id,
        page,
        limit,
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
      params.serviceId,
      1,
      10,
      startDateFormatted ?? "",
      endDateFormatted ?? ""
    );
  }, [params?.serviceId, startDateFormatted, endDateFormatted]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchSatisfactionHistory(params?.serviceId, newPage, 10, "", "");
    }
  };

  // Api PDF
  const fetchPdf = async (id: number) => {
    return await getDownloadSatisfactionIndexPrint(id);
  };
  // Api Excel
  const fetchExcel = async (id: number) => {
    return await getDownloadSatisfactionIndexExcelPrint(id);
  };

  return (
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
      <div className="px-2 md:px-4 flex flex-row justify-between items-center w-full">
        <div className="flex flex-row items-center">
          <button onClick={() => router.back()}>
            <ChevronLeft className="w-7 h-7 text-black-80 mr-2" />
          </button>

          <h5 className="text-xl text-start text-black-80 font-normal">
            Detail Indeks Kepuasan
          </h5>
        </div>
      </div>

      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-5 pb-10`}>
        {!isMobile && (
          <h2 className="text-2xl text-black-80 text-center md:mb-6">
            Indeks Kepuasan Masuk
          </h2>
        )}

        <div
          className={`w-full flex flex-col md:flex-row ${!isMobile ? "" : "p-3 rounded-lg shadow-md"} bg-line-10 gap-y-5 gap-x-5`}>
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
              <UnduhMenus
                fetchPdf={fetchPdf}
                fetchExcel={fetchExcel}
                pdfFileName="Laporan Pengaduan Pengguna.pdf"
                excelFileName="Laporan Pengaduan Pengguna.xlsx"
                successTitlePdf="File PDF Berhasil Diunduh!"
                successTitleExcel="File Excel Sukses Diunduh!"
                id={params?.serviceId}
              />
            </div>
            {/* PDF Excel Komponen */}
          </>
        </div>

        <div className="w-full">
          {!isMobile ? (
            <>
              {indexes && indexes.length > 0 && (
                <VerificationSatisfactionIndexTablePages indexes={indexes} />
              )}
            </>
          ) : (
            <div className="w-full flex flex-col gap-y-5">
              {indexes &&
                indexes.length > 0 &&
                indexes.map(
                  (
                    item: SatisfactionIndexHistoryReportDetailInterface,
                    i: number
                  ) => {
                    return (
                      <MobileSatisfactionIndexDetailCardPages
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
