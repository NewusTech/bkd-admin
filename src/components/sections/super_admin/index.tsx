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
// ini batas
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchPages from "@/components/elements/search";
import DatePages from "@/components/elements/date";
import { Button } from "@/components/ui/button";
import { Printer } from "@phosphor-icons/react";
import DivitionVerificationAdminApplicationHistoryTablePages from "@/components/tables/division_application_history_table";
import SuperDashboardCard from "@/components/all_cards/superDashboardCard";
import {
  ServiceInterface,
  SuperAdminDashboardAreasInterface,
  SuperAdminDashboardInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import {
  getApplicationUserHistories,
  getService,
  getSuperAdminDashboard,
} from "@/services/api";
import { formatDate } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import VerificationUserApplicationHistoryTablePages from "@/components/tables/verification_admin_user_application_history_table";
import PaginationComponent from "@/components/elements/pagination";
import DataNotFound from "@/components/elements/data_not_found";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function SuperAdminDashboardPages() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [layananId, setLayananId] = useState<number | undefined>(undefined);
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
      layananId
    );
  }, [debounceSearch, startDateFormatted, endDateFormatted, layananId]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchApplicationHistoryUser(newPage, 10, 1, "", "", "", layananId);
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

  console.log(superAdmin, "data");

  return (
    <div className="w-full flex flex-col gap-y-5 mb-24">
      <div className="w-full h-[450px] md:h-full verticalScroll md:horizontalScroll flex flex-col md:flex-row gap-y-3 md:gap-x-5 items-center md:items-start bg-primary-40 bg-opacity-20 rounded-lg p-3">
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
        <div
          className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-3`}>
          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
            <Select
              onValueChange={(value) =>
                setLayananId(value === "all" ? undefined : Number(value))
              }>
              <SelectTrigger
                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                <SelectValue
                  placeholder="Pilih Layanan"
                  className="text-black-80 tex-[14px] w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <div className="pt-2">
                  <SelectItem className="w-full px-4" value="all">
                    Semua Status
                  </SelectItem>
                  {services &&
                    services.map((service: ServiceInterface, i: number) => {
                      return (
                        <SelectItem
                          key={i}
                          className={`w-full px-4`}
                          value={service.id.toString()}>
                          {service?.nama}
                        </SelectItem>
                      );
                    })}
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className={`w-full flex flex-col md:flex-row gap-y-5 gap-x-5`}>
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

            <div className="w-full">
              <Button className="w-full flex flex-row gap-x-4 text-sm bg-primary-40 items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
                <Printer className="w-6 h-6 text-line-10" />

                <span>Print</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full">
          {users && users.length > 0 && (
            <VerificationUserApplicationHistoryTablePages users={users} />
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
      </div>
    </div>
  );
}
