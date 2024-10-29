"use client";

import dasboard from "@/../../public/assets/images/dashboard-dashboard.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TypingEffect from "@/components/ui/TypingEffect";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useDebounce } from "@/hooks/useDebounce";
import {
  getAdminVerificationDashboard,
  getApplicationUserHistories,
  getDownloadApplicationExcelPrint,
  getDownloadApplicationPrint,
  getHeadOfDivisionDashboard,
  getService,
  getUserProfile,
} from "@/services/api";
import { formatDate } from "@/lib/utils";
import {
  JwtPayload,
  AdminProfileInterface,
  ServiceInterface,
  UserApplicationHistoryInterface,
  SuperAdminDashboardInterface,
} from "@/types/interface";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import TabsComplaintSuperAdminDashBoard from "@/components/elements/tabs/superadmin/complaint";
import TabsSurveySuperAdminDashBoard from "@/components/elements/tabs/superadmin/survey";
import TabsApplicationVerificationAdminDashBoard from "@/components/elements/tabs/verification-admin/application";

export default function DivisionVerificationAdminDashboardPages() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>("");
  const [years, setYears] = useState<{ id: number; value: string }[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [layananId, setLayananId] = useState<number | undefined>(undefined);
  const [areaId, setAreaId] = useState<number | undefined>(undefined);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [user, setUser] = useState<AdminProfileInterface>();
  const [users, setUsers] = useState<UserApplicationHistoryInterface[]>([]);
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [data, setData] = useState<SuperAdminDashboardInterface>();
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
          setAreaId(decoded?.bidang_id);
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

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
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
    layanan_id?: number,
    bidang_id?: number
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
        layanan_id,
        bidang_id
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
    if (areaId) {
      if (role === "Kepala Bidang") {
        fetchApplicationHistoryUser(
          1,
          10,
          2,
          debounceSearch,
          startDateFormatted,
          endDateFormatted,
          month,
          year,
          layananId,
          areaId
        );
      } else if (role === "Admin Verifikasi") {
        fetchApplicationHistoryUser(
          1,
          10,
          1,
          debounceSearch,
          startDateFormatted,
          endDateFormatted,
          month,
          year,
          layananId,
          areaId
        );
      }
    }
  }, [
    role,
    debounceSearch,
    startDateFormatted,
    endDateFormatted,
    layananId,
    areaId,
    month,
    year,
  ]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      if (role && role === "Admin Verifikasi") {
        fetchApplicationHistoryUser(
          newPage,
          10,
          1,
          "",
          "",
          "",
          month,
          year,
          layananId,
          areaId
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
          layananId,
          areaId
        );
      }
    }
  };

  const fetchDashboardData = async () => {
    try {
      let response: any;
      if (role && role === "Admin Verifikasi") {
        response = await getAdminVerificationDashboard();
      } else if (role && role === "Kepala Bidang") {
        response = await getHeadOfDivisionDashboard();
      }

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (role) {
      fetchDashboardData();
    }
  }, [role]);

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
    <div className="w-full flex flex-col gap-y-5 mb-24">
      <div className="w-full flex flex-col md:flex-row gap-y-3 md:gap-x-3 items-center md:items-start bg-primary-40 bg-opacity-20 rounded-lg p-5">
        <div className="w-4/12 md:w-2/12 h-full transition-all animate-pulse">
          <Image
            src={dasboard}
            alt="dashboard"
            width={1000}
            height={1000}
            className="w-full h-full"
          />
        </div>

        <div className="w-full flex flex-row items-center self-center">
          {user && user?.role_name && user.role_name === "Kepala Bidang" ? (
            <div className="w-full text-black-80 font-semibold text-lg md:text-3xl text-center  md:text-left">
              <TypingEffect
                className="text-3xl"
                speed={250}
                deleteSpeed={50}
                text={["Kepala Bidang"]}
              />
            </div>
          ) : (
            <div className="w-full text-black-80 font-semibold text-lg md:text-5xl text-center md:text-left">
              <TypingEffect
                className="text-xl md:text-3xl"
                speed={250}
                deleteSpeed={50}
                text={["Admin Verifikasi"]}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col h-full items-center w-full gap-y-6">
        <Tabs defaultValue="permohonan" className="w-full flex flex-col">
          <TabsList
            className={`w-full bg-primary-40 md:p-3 rounded-full h-full flex flex-row gap-x-1 md:gap-x-3 md:verticalScroll`}>
            <TabsTrigger
              className="w-full py-3 text-[14px] md:text-[16px] rounded-full border border-line-10 bg-opacity-20 text-line-10 data-[state=active]:border-none data-[state=active]:bg-opacity-100 data-[state=active]:bg-line-10 data-[state=active]:text-primary-40"
              value="permohonan">
              Permohonan
            </TabsTrigger>

            <TabsTrigger
              className="w-full py-3 text-[14px] md:text-[16px] rounded-full border border-line-10 bg-opacity-20 text-line-10 data-[state=active]:border-none data-[state=active]:bg-opacity-100 data-[state=active]:bg-line-10 data-[state=active]:text-primary-40"
              value="pengaduan">
              Pengaduan
            </TabsTrigger>

            <TabsTrigger
              className="w-full py-3 text-[14px] md:text-[16px] rounded-full border border-line-10 bg-opacity-20 text-line-10 data-[state=active]:border-none data-[state=active]:bg-opacity-100 data-[state=active]:bg-line-10 data-[state=active]:text-primary-40"
              value="kepuasan">
              Indeks Kepuasan
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="permohonan"
            className="w-full flex flex-col mt-0 md:mt-5">
            {data && users && services && (
              <TabsApplicationVerificationAdminDashBoard
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
                users={users}
                pagination={pagination}
                handlePageChange={handlePageChange}
                superAdmin={data}
                role={role}
                user={user}
              />
            )}
          </TabsContent>
          <TabsContent
            value="pengaduan"
            className="w-full flex flex-col mt-0 md:mt-5">
            {data && <TabsComplaintSuperAdminDashBoard superAdmin={data} />}
          </TabsContent>

          <TabsContent
            value="kepuasan"
            className="w-full flex flex-col mt-0 md:mt-5">
            {data && (
              <TabsSurveySuperAdminDashBoard superAdmin={data} role={role} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
