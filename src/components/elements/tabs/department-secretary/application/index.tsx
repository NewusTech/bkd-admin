"use client";

import waiting from "@/../../public/assets/icons/admin-dashboard-time.png";
import done from "@/../../public/assets/icons/admin-dashboard-approval.png";
import revision from "@/../../public/assets/icons/admin-dashboard-revision.png";
import failed from "@/../../public/assets/icons/admin-dashboard-reject.png";
import React from "react";
import {
  ServiceInterface,
  TabsApplicationSuperAdminDashBoardInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
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
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import SearchPages from "@/components/elements/search";
import DatePages from "@/components/elements/date";
import { Button } from "@/components/ui/button";
import { Printer } from "@phosphor-icons/react";
import VerificationUserApplicationHistoryTablePages from "@/components/tables/verification_admin_user_application_history_table";
import PaginationComponent from "@/components/elements/pagination";
import DataNotFound from "@/components/elements/data_not_found";
import HistoryApplicationMobileFilter from "@/components/elements/filters/mobile/historyApplicationMobileFilter";
import HistoryApplicationFilter from "@/components/elements/filters/website/historyApplicationFilter";
import MobileDivisionVerificationAdminApplicationHistoryCard from "@/components/mobile_all_cards/mobileDivisionVerificationAdminApplicationHistoryCard";

export default function TabsApplicationDepartmentSecretaryDashBoard({
  layananId,
  setLayananId,
  services,
  fetchPdf,
  fetchExcel,
  search,
  setSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setMonth,
  years,
  setYear,
  users,
  pagination,
  handlePageChange,
  superAdmin,
  role,
}: TabsApplicationSuperAdminDashBoardInterface) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const chartDataBar = superAdmin?.countbyBidang?.map((item) => {
    return {
      nama: item?.name,
      bidang: item?.permohonan_count,
      fill: `${item?.id == 1 ? "#1947BC" : item?.id == 2 ? "#BC6D19" : item?.id == 3 ? "#D51C7F" : "#4D56B7"}`,
    };
  });

  const chartConfigBar = {
    bidang: {
      label: "Bidang",
    },
  } satisfies ChartConfig;

  const chartDataLegend = superAdmin?.monthlyCounts?.map((item) => {
    return {
      bulan: item?.month,
      permohonan: item?.permohonanCount,
      fill: "#1947BC",
    };
  });

  const chartConfigLegend = {
    permohonan: {
      label: "Permohonan",
      color: "#1947BC",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full flex flex-col md:mt-5">
        <div className="w-full md:flex md:flex-row gap-x-5">
          <Card className="bg-line-10 shadow-md rounded-lg border-none w-full md:w-8/12 mb-4 md:mb-0">
            <div className="w-full flex flex-col p-3">
              <div className="w-full flex flex-col items-center p-2 gap-y-5">
                <div className="w-full flex flex-col items-center">
                  <CardTitle className="text-[16px] font-normal">
                    Jumlah Keseluruhan Pengajuan
                  </CardTitle>
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
                  <YAxis
                    dataKey="nama"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    hide={true}
                  />

                  <XAxis
                    dataKey="bidang"
                    type="number"
                    hide={true}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Bar
                    dataKey="bidang"
                    layout="vertical"
                    fill="#1947BC"
                    radius={4}>
                    <LabelList
                      dataKey="nama"
                      position="insideLeft"
                      offset={8}
                      className="#1947BC"
                      fill="#ffffff"
                      fontSize={12}
                    />
                    <LabelList
                      dataKey="bidang"
                      position="right"
                      offset={8}
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
              {/* <div className="flex items-center w-5/12 justify-between">
                <Select */}
              {/* // onValueChange={handleSelectStatusChange} */}
              {/* >
                  <SelectTrigger
                    className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}> */}
              {/* <Checks className="w-6 h-6 text-black-80" /> */}
              {/* <SelectValue
                      placeholder="Sort By"
                      className="text-black-80 w-full"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-line-10">
                    <div className="pt-2"> */}
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
              {/* <SelectItem className="w-full px-4 pl-8" value="1">
                        Hello World
                      </SelectItem>
                    </div>
                  </SelectContent>
                </Select>
              </div> */}
            </div>

            <div className="w-full h-0.5 bg-line-20"></div>

            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfigLegend}
                className="mx-auto aspect-square max-h-[250px]">
                <RadarChart
                  data={chartDataLegend}
                  margin={{
                    top: -40,
                    bottom: -10,
                  }}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <PolarAngleAxis dataKey="bulan" tick={{ fill: "#BC6D19" }} />
                  <PolarGrid stroke="#cccccc" />
                  <Radar
                    dataKey="permohonan"
                    fill="#1947BC"
                    stroke="#1947BC"
                    fillOpacity={0.6}
                  />
                  <ChartLegend
                    className="mt-8"
                    content={<ChartLegendContent />}
                  />
                </RadarChart>
              </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter> */}
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
            {role && role === "Sekretaris Dinas"
              ? "Sedang Divalidasi"
              : role && role === "Kepala Dinas"
                ? "Sudah Divalidasi"
                : "Sedang Ditandatangi"}
          </p>
          <p className="text-primary-40 font-semibold text-xl md:text-4xl">
            {role && role === "Sekretaris Daerah"
              ? superAdmin?.totalMenungguTandatangan
              : role === "Kepala Dinas"
                ? superAdmin?.totalMenungguVerifikasi
                : superAdmin?.totalMenungguVerifikasi}
          </p>
        </div>

        <div className="flex flex-col items-center bg-line-10 shadow-md rounded-lg p-6 md:p-4 gap-y-4 m-auto justify-center">
          <div className="w-full md:w-3/12 h-full transition-all animate-pulse">
            <Image
              src={done}
              alt="Berhasil"
              width={1000}
              height={1000}
              className="w-1/2 h-1/2 md:w-full md:h-full flex justify-center m-auto"
            />
          </div>
          <p className="text-black-80 md:text-sm text-xs">Permohonan Selesai</p>
          <p className="text-primary-40 font-semibold text-xl md:text-4xl">
            {role && role === "Sekretaris Daerah"
              ? superAdmin?.totalDitandatangan
              : superAdmin?.totalDisetujui}
          </p>
        </div>

        <div className="flex flex-col items-center bg-line-10 shadow-md rounded-lg p-6 md:p-4 gap-y-4 m-auto justify-center">
          <div className="w-full md:w-3/12 h-full transition-all animate-pulse">
            <Image
              src={failed}
              alt="Gagal"
              width={1000}
              height={1000}
              className="w-1/2 h-1/2 md:w-full md:h-full flex justify-center m-auto"
            />
          </div>
          <p className="text-black-80 md:text-sm text-xs">Permohonan Ditolak</p>
          <p className="text-primary-40 font-semibold text-xl md:text-4xl">
            {superAdmin && superAdmin?.totalDitolak}
          </p>
        </div>

        <div className="flex flex-col items-center bg-line-10 shadow-md rounded-lg p-6 md:p-4 gap-y-4 m-auto justify-center">
          <div className="w-full md:w-3/12 h-full transition-all animate-pulse">
            <Image
              src={revision}
              alt="Revisi"
              width={1000}
              height={1000}
              className="w-1/2 h-1/2 md:w-full md:h-full flex justify-center m-auto"
            />
          </div>
          <p className="text-black-80 md:text-sm text-xs">
            Permohonan Direvisi
          </p>
          <p className="text-primary-40 font-semibold text-xl md:text-4xl">
            {superAdmin && superAdmin?.totalDirevisi}
          </p>
        </div>
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
            years={years}
            setYear={setYear}
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
              years={years}
              setYear={setYear}
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
