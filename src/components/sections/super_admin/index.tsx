"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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
import { formatDate } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import VerificationUserApplicationHistoryTablePages from "@/components/tables/verification_admin_user_application_history_table";
import PaginationComponent from "@/components/elements/pagination";
import DataNotFound from "@/components/elements/data_not_found";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileDivisionVerificationAdminApplicationHistoryCard from "@/components/mobile_all_cards/mobileDivisionVerificationAdminApplicationHistoryCard";
import HistoryApplicationFilter from "@/components/elements/filters/website/historyApplicationFilter";
import HistoryApplicationMobileFilter from "@/components/elements/filters/mobile/historyApplicationMobileFilter";

export default function SuperAdminDashboardPages() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const [layananId, setLayananId] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState<number | undefined>(undefined);
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

  const fetchApplicationHistoryUser = async (
    page: number,
    limit: number,
    status?: number,
    search?: string,
    start_date?: string,
    end_date?: string,
    month?: number,
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
      layananId
    );
  }, [debounceSearch, startDateFormatted, endDateFormatted, month, layananId]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchApplicationHistoryUser(newPage, 10, 1, "", "", "", month, layananId);
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

  const chartData = superAdmin?.countbyLayanan?.map((item) => {
    return {
      nama: item?.layanan_name,
      permohonan: item?.permohonanCount,
    };
  });

  const chartConfig = {
    reporting: {
      label: "Total Permohonan",
    },
    permohonan: {
      label: "Permohonan",
      color: "#3572EF",
    },
  } satisfies ChartConfig;

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
      <div className="w-full h-[450px] md:h-full verticalScroll md:horizontalScroll flex flex-col md:flex-row gap-y-3 md:gap-x-5 items-center md:items-start bg-primary-40 bg-opacity-20 rounded-lg pl-3 pt-3 pb-3">
        {superAdmin &&
          superAdmin.countbyBidang &&
          superAdmin.countbyBidang.length > 0 &&
          superAdmin.countbyBidang.map(
            (item: SuperAdminDashboardAreasInterface, i: number) => {
              return <SuperDashboardCard key={i} item={item} />;
            }
          )}
      </div>

      <div className="w-full">
        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle className="text-black-80 font-normal text-[18px] md:text-[20px]">
                Bar Chart - Laporan Permohonan Pengguna
              </CardTitle>
              {/* <CardDescription>Laporan Permohonan Pengguna</CardDescription> */}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-1">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                // margin={{
                //   left: 1,
                //   right: 1,
                // }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="nama"
                  tickLine={false}
                  axisLine={false}
                  // tickMargin={1}
                  // minTickGap={1}
                  // className="w-full"
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-full"
                      nameKey="reporting"
                    />
                  }
                />
                <Bar dataKey="permohonan" className="w-full" fill="#3572EF" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="w-full bg-line-10 rounded-lg shadow-md p-4 flex flex-col gap-y-4">
        {/* filter website */}
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
            />
          )}
        </div>

        <div className="w-full">
          {!isMobile ? (
            <>
              {users && users.length > 0 && (
                <VerificationUserApplicationHistoryTablePages users={users} />
              )}
            </>
          ) : (
            <div className="w-full flex flex-col gap-y-5">
              {users &&
                users.length > 0 &&
                users.map(
                  (user: UserApplicationHistoryInterface, i: number) => {
                    return (
                      <MobileDivisionVerificationAdminApplicationHistoryCard
                        key={i}
                        index={i}
                        user={user}
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

        <div className="w-full">{users.length === 0 && <DataNotFound />}</div>
      </div>
    </div>
  );
}
