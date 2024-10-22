"use client";

import DatePages from "@/components/elements/date";
import SearchPages from "@/components/elements/search";
import { formatDate } from "@/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JwtPayload, UserComplaintInterface } from "@/types/interface";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  getDownloadApplicationPrint,
  getDownloadUserComplaintExcelPrint,
  getDownloadUserComplaintPrint,
  getUserComplaints,
} from "@/services/api";
import VerificationUserComplaintTablePages from "@/components/tables/verification_admin_user_compaint_table";
import { userComplaintStatus } from "@/constants/main";
import { useDebounce } from "@/hooks/useDebounce";
import PaginationComponent from "@/components/elements/pagination";
import DataNotFound from "@/components/elements/data_not_found";
import MobileUserComplaintCardPages from "@/components/mobile_all_cards/mobileUserComplaintCard";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Printer } from "@phosphor-icons/react";
import UnduhMenus from "@/components/ui/UnduhMenus";
import HistoryUserComplaintFilter from "@/components/elements/filters/website/historyUserComplaintFilter";
import HistoryUserComplaintMobileFilter from "@/components/elements/filters/mobile/historyUserComplaintMobileFilter";

export default function VerificationUserComplaintScreen() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const deboucedSearch = useDebounce(search, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [role, setRole] = useState<string | null>(null);
  const [areaId, setAreaId] = useState<number | undefined>(undefined);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [complaints, setComplaints] = useState<UserComplaintInterface[]>();
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

  const fetchUserComplaints = useCallback(
    async (
      page: number,
      limit: number,
      search?: string,
      start_date?: string,
      end_date?: string,
      status?: number,
      month?: number,
      bidang_id?: number
    ) => {
      try {
        let response: any;
        if (role === "Admin Verifikasi" || role === "Kepala Bidang") {
          response = await getUserComplaints(
            page,
            limit,
            search,
            start_date,
            end_date,
            status,
            month,
            bidang_id
          );
        } else {
          response = await getUserComplaints(
            page,
            limit,
            search,
            start_date,
            end_date,
            status,
            month
          );
        }

        setComplaints(response.data);
        setPagination((prev) => ({
          ...prev,
          currentPage: page,
          totalPages: response?.pagination?.totalPages,
          totalCount: response?.pagination?.totalCount,
        }));
      } catch (error) {
        console.log(error);
      }
    },
    [role]
  );

  useEffect(() => {
    if (role === "Admin Verifikasi" || role === "Kepala Bidang") {
      fetchUserComplaints(
        1,
        10,
        deboucedSearch,
        startDateFormatted,
        endDateFormatted,
        status,
        month,
        areaId
      );
    } else {
      fetchUserComplaints(
        1,
        10,
        deboucedSearch,
        startDateFormatted,
        endDateFormatted,
        status,
        month
      );
    }
  }, [
    deboucedSearch,
    startDateFormatted,
    endDateFormatted,
    status,
    role,
    areaId,
    fetchUserComplaints,
    month,
  ]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      if (areaId) {
        fetchUserComplaints(newPage, 10, "", "", "", status, areaId);
      } else {
        fetchUserComplaints(newPage, 10, "", "", "", status);
      }
    }
  };

  // Api PDF
  const fetchPdf = async () => {
    return await getDownloadUserComplaintPrint();
  };
  // Api Excel
  const fetchExcel = async () => {
    return await getDownloadUserComplaintExcelPrint();
  };

  return (
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-5`}>
        <h2 className="text-2xl text-black-80 text-center md:mb-6">
          Pengaduan Layanan
        </h2>

        {!isMobile && (
          <HistoryUserComplaintFilter
            fetchPdf={fetchPdf}
            fetchExcel={fetchExcel}
            search={search}
            setSearch={setSearch}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStatus={setStatus}
            setMonth={setMonth}
          />
        )}

        {isMobile && (
          <HistoryUserComplaintMobileFilter
            fetchPdf={fetchPdf}
            fetchExcel={fetchExcel}
            search={search}
            setSearch={setSearch}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStatus={setStatus}
            setMonth={setMonth}
          />
        )}

        <div className="w-full">
          {!isMobile ? (
            <>
              {complaints && complaints.length > 0 && (
                <VerificationUserComplaintTablePages complaints={complaints} />
              )}
            </>
          ) : (
            <div className="w-full flex flex-col gap-y-5">
              {complaints &&
                complaints.length > 0 &&
                complaints?.map((item: UserComplaintInterface, i: number) => {
                  return (
                    <MobileUserComplaintCardPages
                      key={i}
                      complaint={item}
                      index={i}
                    />
                  );
                })}
            </div>
          )}
        </div>

        {complaints && complaints?.length > 0 && (
          <div className="w-full">
            <PaginationComponent
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        <div className="w-full">
          {complaints && complaints.length === 0 && <DataNotFound />}
        </div>
      </div>
    </section>
  );
}
