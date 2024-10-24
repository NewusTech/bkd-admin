"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import SuperDashboardCard from "@/components/all_cards/superDashboardCard";
import {
  ServiceInterface,
  SuperAdminDashboardAreasInterface,
  SuperAdminDashboardInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import {
  getApplicationUserHistories,
  getDownloadApplicationExcelPrint,
  getDownloadApplicationPrint,
  getService,
  getSuperAdminDashboard,
} from "@/services/api";
import { formatDate, getLast10Years } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import TabsApplicationSuperAdminDashBoard from "@/components/elements/tabs/superadmin/application";
import TabsComplaintSuperAdminDashBoard from "@/components/elements/tabs/superadmin/complaint";
import TabsSurveySuperAdminDashBoard from "@/components/elements/tabs/superadmin/survey";

export default function SuperAdminDashboardPages() {
  const [search, setSearch] = useState("");
  const [layananId, setLayananId] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>("");
  const [years, setYears] = useState<{ id: number; value: string }[]>([]);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [superAdmin, setSuperAdmin] = useState<SuperAdminDashboardInterface>();
  const [users, setUsers] = useState<UserApplicationHistoryInterface[]>([]);
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });
  const debounceSearch = useDebounce(search);

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
    fetchApplicationHistoryUser(
      1,
      10,
      1,
      debounceSearch,
      startDateFormatted,
      endDateFormatted,
      month,
      year,
      layananId
    );
  }, [
    debounceSearch,
    startDateFormatted,
    endDateFormatted,
    month,
    layananId,
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

  const fetchSuperAdminDashboard = async () => {
    try {
      const response = await getSuperAdminDashboard();

      setSuperAdmin(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSuperAdminDashboard();
  }, []);

  // ini batas

  // Api PDF
  const fetchPdf = async () => {
    return await getDownloadApplicationPrint(layananId);
  };
  // Api Excel
  const fetchExcel = async () => {
    return await getDownloadApplicationExcelPrint(layananId);
  };

  return (
    <div className="w-full flex flex-col gap-y-5 mb-24">
      <div className="w-full h-[450px] md:h-full verticalScroll md:horizontalScroll flex flex-col md:flex-row gap-y-3 md:gap-x-5 items-center md:items-start bg-primary-40 bg-opacity-20 rounded-lg pl-3 pt-3 md:pr-3 pb-3">
        {superAdmin &&
          superAdmin.countbyBidang &&
          superAdmin.countbyBidang.length > 0 &&
          superAdmin.countbyBidang.map(
            (item: SuperAdminDashboardAreasInterface, i: number) => {
              return <SuperDashboardCard key={i} item={item} />;
            }
          )}
      </div>

      <div className="flex flex-col h-full items-center w-full gap-y-6">
        <Tabs defaultValue="permohonan" className={`w-full flex flex-col`}>
          <TabsList
            className={`w-full bg-primary-40 p-3 rounded-full h-full flex flex-row gap-x-3 verticalScroll`}>
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

          <TabsContent value="permohonan" className="w-full flex flex-col mt-5">
            {superAdmin && users && services && (
              <TabsApplicationSuperAdminDashBoard
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
                superAdmin={superAdmin}
              />
            )}
          </TabsContent>
          <TabsContent value="pengaduan" className="w-full flex flex-col mt-5">
            {superAdmin && (
              <TabsComplaintSuperAdminDashBoard superAdmin={superAdmin} />
            )}
          </TabsContent>

          <TabsContent value="kepuasan" className="w-full flex flex-col mt-5">
            {superAdmin && (
              <TabsSurveySuperAdminDashBoard superAdmin={superAdmin} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
