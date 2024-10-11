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
import { JwtPayload, UserComplaintInterface } from "@/types/interface";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getUserComplaints } from "@/services/api";
import VerificationUserComplaintTablePages from "@/components/tables/verification_admin_user_compaint_table";
import { userComplaintStatus } from "@/constants/main";
import { useDebounce } from "@/hooks/useDebounce";
import PaginationComponent from "@/components/elements/pagination";
import DataNotFound from "@/components/elements/data_not_found";
import MobileUserComplaintCardPages from "@/components/mobile_all_cards/mobileUserComplaintCard";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function VerificationUserComplaintScreen() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const deboucedSearch = useDebounce(search, 500);
  const [status, setStatus] = useState<number | undefined>(undefined);
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

  const fetchUserComplaints = async (
    page: number,
    limit: number,
    search?: string,
    start_date?: string,
    end_date?: string,
    status?: number,
    bidang_id?: number
  ) => {
    try {
      const response = await getUserComplaints(
        page,
        limit,
        search,
        start_date,
        end_date,
        status,
        bidang_id
      );

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
  };

  useEffect(() => {
    if (role === "Admin Verifikasi" || role === "Kepala Bidang") {
      if (areaId) {
        fetchUserComplaints(
          1,
          10,
          deboucedSearch,
          startDateFormatted,
          endDateFormatted,
          status,
          areaId
        );
      }
    } else {
      fetchUserComplaints(
        1,
        10,
        deboucedSearch,
        startDateFormatted,
        endDateFormatted,
        status
      );
    }
  }, [
    deboucedSearch,
    startDateFormatted,
    endDateFormatted,
    status,
    areaId,
    role,
  ]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchUserComplaints(newPage, 10, "", "", "", status);
    }
  };

  return (
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-5`}>
        <h2 className="text-2xl text-black-80 text-center md:mb-6">
          Pengaduan Layanan
        </h2>

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
              onValueChange={(value) =>
                setStatus(value === "all" ? undefined : Number(value))
              }>
              <SelectTrigger
                className={`w-full text-[14px] md:text-[16px] px-2 gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                <SelectValue
                  placeholder="Status"
                  className="text-black-80 text-[14px] md:text-[16px] w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <div className="pt-2">
                  <SelectItem className="w-full px-4" value="all">
                    Semua Status
                  </SelectItem>
                  {userComplaintStatus &&
                    userComplaintStatus.map(
                      (
                        status: { id: number; name: string; key: number },
                        i: number
                      ) => {
                        return (
                          <SelectItem
                            key={i}
                            className={`w-full px-4 text-[14px] md:text-[16px]`}
                            value={status.key.toString()}>
                            {status.name}
                          </SelectItem>
                        );
                      }
                    )}
                </div>
              </SelectContent>
            </Select>
          </div>
        </div>

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
