"use client";

import waiting from "@/../../public/assets/icons/admin-dashboard-time.png";
import dasboard from "@/../../public/assets/images/dashboard-dashboard.png";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  Label,
  Pie,
  PieChart,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import SearchPages from "@/components/elements/search";
import DatePages from "@/components/elements/date";
import { Button } from "@/components/ui/button";
import { Printer } from "@phosphor-icons/react";
import DivitionVerificationAdminApplicationHistoryTablePages from "@/components/tables/division_application_history_table";
import TypingEffect from "@/components/ui/TypingEffect";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useDebounce } from "@/hooks/useDebounce";
import {
  getApplicationUserHistories,
  getService,
  getUserProfile,
} from "@/services/api";
import { formatDate } from "@/lib/utils";
import {
  AdminProfileInterface,
  ServiceInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import PaginationComponent from "@/components/elements/pagination";
import VerificationUserApplicationHistoryTablePages from "@/components/tables/verification_admin_user_application_history_table";
import DataNotFound from "@/components/elements/data_not_found";

export default function DivisionVerificationAdminDashboardPages() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [layananId, setLayananId] = useState<number | undefined>(undefined);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [user, setUser] = useState<AdminProfileInterface>();
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
    if (user && user?.role_name === "Kepala Bidang") {
      fetchApplicationHistoryUser(
        1,
        10,
        5,
        debounceSearch,
        startDateFormatted,
        endDateFormatted,
        layananId
      );
    } else if (user && user?.role_name === "Admin Verifikasi") {
      fetchApplicationHistoryUser(
        1,
        10,
        2,
        debounceSearch,
        startDateFormatted,
        endDateFormatted,
        layananId
      );
    }
  }, [debounceSearch, startDateFormatted, endDateFormatted, layananId, user]);

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

  const chartDataBar = [
    {
      service: "Layanan Mutasi PNS",
      device: 300,
      perangkat: 80,
      fill: "#1947BC",
    },
    {
      service: "Layanan Kenaikan",
      device: 305,
      perangkat: 80,
      fill: "#BC6D19",
    },
    { service: "Layanan Pensiun", device: 237, perangkat: 80, fill: "#D51C7F" },
    { service: "Layanan Cuti PNS", device: 73, perangkat: 80, fill: "#4D56B7" },
  ];

  const chartConfigBar = {
    device: {
      label: "Device",
    },
    perangkat: {
      label: "Perangkat",
    },
    // laptop: {
    //   label: "Laptop",
    //   color: "#1947BC",
    // },
    // mobile: {
    //   label: "Mobile",
    //   color: "#BC6D19",
    // },
    // tab: {
    //   label: "Tab",
    //   color: "#D51C7F",
    // },
    // iphone: {
    //   label: "Iphone",
    //   color: "#4D56B7",
    // },
  } satisfies ChartConfig;

  const chartDataPie = useMemo(
    () => [
      { browser: "chrome", visitors: 275, fill: "#1947BC" },
      { browser: "safari", visitors: 200, fill: "#1947BC" },
      { browser: "firefox", visitors: 287, fill: "#BC6D19" },
      { browser: "edge", visitors: 173, fill: "#D51C7F" },
      { browser: "other", visitors: 190, fill: "#4D56B7" },
    ],
    []
  );

  const chartConfigPie = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "#1947BC",
    },
    safari: {
      label: "Safari",
      color: "#1947BC",
    },
    firefox: {
      label: "Firefox",
      color: "#BC6D19",
    },
    edge: {
      label: "Edge",
      color: "#D51C7F",
    },
    other: {
      label: "Other",
      color: "#4D56B7",
    },
  } satisfies ChartConfig;

  const totalVisitors = useMemo(() => {
    return chartDataPie?.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartDataPie]);

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
            <div className="w-full text-black-80 font-semibold text-lg md:text-3xl text-center  md:text-left">
              <TypingEffect
                className="text-3xl"
                speed={250}
                deleteSpeed={50}
                text={["Admin Verifikasi"]}
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col md:mt-5">
        <div className="w-full md:flex md:flex-row gap-x-5">
          <Card className="bg-line-10 shadow-md rounded-lg border-none w-full md:w-8/12 mb-4 md:mb-0">
            <div className="w-full flex flex-col p-3">
              <div className="w-full flex flex-col items-center p-2 gap-y-5">
                <div className="w-full flex flex-col items-center">
                  <CardTitle className="text-[16px] font-normal">
                    Jumlah Keseluruhan Pengajuan
                  </CardTitle>
                  {/* <CardDescription>Bidang Pengadaan</CardDescription> */}
                </div>

                <div className="w-full h-0.5 bg-line-20"></div>

                <div className="w-full flex flex-row justify-center items-center gap-x-4">
                  <div className="bg-[#1947BC] px-3 py-3"></div>
                  <div className="bg-[#BC6D19] px-3 py-3"></div>
                  <div className="bg-[#D51C7F] px-3 py-3"></div>
                  <div className="bg-[#4D56B7] px-3 py-3"></div>
                  <div className="bg-[#039C00] px-3 py-3"></div>
                </div>
              </div>
            </div>

            <CardContent>
              <ChartContainer config={chartConfigBar}>
                <BarChart
                  accessibilityLayer
                  data={chartDataBar}
                  layout="vertical"
                  margin={{
                    right: 16,
                  }}>
                  {/* <CartesianGrid horizontal={false} /> */}
                  <YAxis
                    dataKey="service"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    hide={true}
                  />

                  <XAxis
                    dataKey="device"
                    type="number"
                    hide={true}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  {/* <YAxis
                    dataKey="service"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    // tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <XAxis dataKey="device" type="number" hide /> */}
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Bar
                    dataKey="device"
                    layout="vertical"
                    fill="#1947BC"
                    radius={4}>
                    <LabelList
                      dataKey="service"
                      position="insideLeft"
                      offset={8}
                      className="#1947BC"
                      // className="#ffffff"
                      fill="#ffffff"
                      fontSize={12}
                    />
                    <LabelList
                      dataKey="device"
                      position="right"
                      offset={8}
                      className="#1947BC"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="bg-line-10 shadow-md rounded-lg border-none px-4 md:w-5/12 w-full">
            <div className="w-full flex flex-row justify-between items-center p-3">
              <CardTitle className="text-[16px] font-normal">
                Grafik Status
              </CardTitle>
              <div className="flex items-center w-5/12 justify-between">
                <Select
                // onValueChange={handleSelectStatusChange}
                >
                  <SelectTrigger
                    className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                    {/* <Checks className="w-6 h-6 text-black-80" /> */}
                    <SelectValue
                      placeholder="Sort By"
                      className="text-black-80 w-full"
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
            </div>

            <div className="w-full h-0.5 bg-line-20"></div>

            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfigPie}
                className="mx-auto aspect-square max-h-[200px] md:max-h-[250px]">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartDataPie}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                    strokeWidth={5}>
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle">
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-2xl md:text-3xl font-bold">
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground">
                                Visitors
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-4">
        <div className="flex flex-col items-center bg-line-10 shadow-md rounded-lg p-6 md:p-4 gap-y-4 m-auto justify-center">
          <div className="w-full md:w-3/12 h-full transition-all animate-pulse">
            <Image
              src={waiting}
              alt="Menunggu"
              width={1000}
              height={1000}
              className="w-1/2 h-1/2 md:w-full md:h-full flex justify-center m-auto"
            />
          </div>
          <p className="text-black-80 md:text-sm text-xs">
            Menunggu verifikasi
          </p>
          <p className="text-primary-40 font-semibold text-xl md:text-4xl">
            65
          </p>
        </div>
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

        {/* <div className="w-full">{users.length === 0 && <DataNotFound />}</div> */}
        <div className="w-full">{users === undefined && <DataNotFound />}</div>
      </div>
    </div>
  );
}
