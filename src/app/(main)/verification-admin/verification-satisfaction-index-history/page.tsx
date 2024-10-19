"use client";

import DatePages from "@/components/elements/date";
import SearchPages from "@/components/elements/search";
import { formatDate } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AreasInterface,
  JwtPayload,
  SatisfactionIndexHistoryReportInterface,
  ServiceInterface,
} from "@/types/interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getAreas,
  getDownloadSatisfactionIndexPrint,
  getSatisfactionIndexReport,
  getService,
} from "@/services/api";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import PaginationComponent from "@/components/elements/pagination";
import { useDebounce } from "@/hooks/useDebounce";
import MobileVerificationSatisfactionIndexCardPages from "@/components/mobile_all_cards/mobileSatisfactionIndexVerificationCard";
import { Printer } from "@phosphor-icons/react";
import VerificationSatisfactionIndexTablePages from "@/components/tables/verification_admin_satisfaction_index_table";
import DataNotFound from "@/components/elements/data_not_found";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import UnduhMenus from "@/components/ui/UnduhMenus";

export default function VerificationSatisfactionIndexScreen() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const deboucedSearch = useDebounce(search, 500);
  const [role, setRole] = useState<string | null>(null);
  const [areaId, setAreaId] = useState<number | undefined>(undefined);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<
    SatisfactionIndexHistoryReportInterface[]
  >([]);
  const [areas, setAreas] = useState<AreasInterface[]>([]);
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
          setAreaId(decoded.bidang_id);
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

  const fetchSatisfactionIndexHistoryReports = async (
    page: number,
    limit: number,
    bidang_id?: number
  ) => {
    try {
      const response = await getSatisfactionIndexReport(page, limit, bidang_id);

      setReports(response.data);
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
    if (role === "Admin Verifikasi" || role === "Kepala Bidang") {
      if (areaId) {
        fetchSatisfactionIndexHistoryReports(1, 5, areaId);
      }
    } else {
      fetchSatisfactionIndexHistoryReports(1, 5);
    }
  }, [role, areaId]);

  const fetchAreas = async (page: number, limit: number, search: string) => {
    try {
      const response = await getAreas(page, limit, search);

      setAreas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchService = async (page: number, limit: number, search: string) => {
    try {
      const response = await getService(page, limit, search);

      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreas(1, 50, "");
    fetchService(1, 50, "");
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchSatisfactionIndexHistoryReports(newPage, 5);
    }
  };

  // Api PDF
  const fetchPdf = async (id: number) => {
    return await getDownloadSatisfactionIndexPrint(id);
  };
  // Api Excel
  const fetchExcel = async (id: number) => {
    return await getDownloadSatisfactionIndexPrint(id);
  };

  return (
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-3 pb-10`}>
        <h2 className="text-2xl text-black-80 text-center md:mb-6">
          Indeks Kepuasan
        </h2>

        <div className="w-full flex flex-col gap-y-3">
          <div
            className={`w-full flex flex-col ${!isMobile ? "" : "p-3 rounded-lg shadow-md"} bg-line-10 gap-y-5 gap-x-5`}>
            <div className="w-full flex flex-row gap-x-3 md:gap-x-5">
              <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                <Select
                // onValueChange={handleSelectStatusChange}
                >
                  <SelectTrigger
                    className={`w-full gap-x-4 text-[14px] md:text-[16px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                    {/* <Checks className="w-6 h-6 text-black-80" /> */}
                    <SelectValue
                      placeholder="Pilih Bidang"
                      className="text-black-80 text-[14px] md:text-[16px] w-full"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-line-10">
                    <div className="pt-2">
                      {areas &&
                        areas.map((item: AreasInterface, i: number) => {
                          return (
                            <SelectItem
                              key={i}
                              className={`w-full px-4 text-[14px] md:text-[16px]`}
                              value={item.id.toString()}>
                              {item?.nama}
                            </SelectItem>
                          );
                        })}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                <Select
                // onValueChange={handleSelectStatusChange}
                >
                  <SelectTrigger
                    className={`w-full gap-x-4 text-[14px] md:text-[16px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                    {/* <Checks className="w-6 h-6 text-black-80" /> */}
                    <SelectValue
                      placeholder="Pilih Layanan"
                      className="text-black-80 text-[14px] md:text-[16px] w-full"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-line-10">
                    <div className="pt-2">
                      {services &&
                        services.map((item: ServiceInterface, i: number) => {
                          return (
                            <SelectItem
                              key={i}
                              className={`w-full px-4 text-[14px] md:text-[16px]`}
                              value={item.id.toString()}>
                              {item?.nama}
                            </SelectItem>
                          );
                        })}
                    </div>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-y-5 gap-x-5">
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

              <>
                {/* PDF Excel Komponen */}
                <div className="w-full md:w-5/12">
                  <UnduhMenus fetchPdf={fetchPdf} fetchExcel={fetchExcel} pdfFileName="Laporan Indeks Kepuasan.pdf" excelFileName="Laporan Indeks Kepuasan.xlsx" successTitlePdf="File PDF Berhasil Diunduh!"
                  successTitleExcel="File Excel Sukses Diunduh!" id={0} />
                </div>
                {/* PDF Excel Komponen */}
              </>
            </div>
          </div>
        </div>

        <div className="w-full">
          {!isMobile ? (
            <>
              {reports && reports.length > 0 && (
                <VerificationSatisfactionIndexTablePages reports={reports} />
              )}
            </>
          ) : (
            <div className="w-full flex flex-col gap-y-5">
              {reports &&
                reports.length > 0 &&
                reports.map(
                  (
                    item: SatisfactionIndexHistoryReportInterface,
                    i: number
                  ) => {
                    return (
                      <MobileVerificationSatisfactionIndexCardPages
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

        {reports && reports?.length > 0 && (
          <div className="w-full">
            <PaginationComponent
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        <div className="w-full">
          {reports && reports.length === 0 && <DataNotFound />}
        </div>
      </div>
    </section>
  );
}
