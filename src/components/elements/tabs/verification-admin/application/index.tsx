"use client";

import waiting from "@/../../public/assets/icons/admin-dashboard-time.png";
import done from "@/../../public/assets/icons/admin-dashboard-approval.png";
import revision from "@/../../public/assets/icons/admin-dashboard-revision.png";
import failed from "@/../../public/assets/icons/admin-dashboard-reject.png";
import DatePages from "@/components/elements/date";
import PaginationComponent from "@/components/elements/pagination";
import SearchPages from "@/components/elements/search";
import VerificationUserApplicationHistoryTablePages from "@/components/tables/verification_admin_user_application_history_table";
import { Button } from "@/components/ui/button";
import { Printer } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useMemo } from "react";
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
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ServiceInterface,
  TabsApplicationSuperAdminDashBoardInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import DataNotFound from "@/components/elements/data_not_found";
import HistoryApplicationMobileFilter from "@/components/elements/filters/mobile/historyApplicationMobileFilter";
import HistoryApplicationFilter from "@/components/elements/filters/website/historyApplicationFilter";
import MobileDivisionVerificationAdminApplicationHistoryCard from "@/components/mobile_all_cards/mobileDivisionVerificationAdminApplicationHistoryCard";

export default function TabsApplicationVerificationAdminDashBoard({
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
  user,
}: TabsApplicationSuperAdminDashBoardInterface) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const chartDataBar = superAdmin?.allLayananMonth?.map((item) => {
    return {
      nama: item?.LayananName,
      layanan: item?.LayananformnumCount,
      fill: `${item?.LayananId == 1 ? "#1947BC" : item?.LayananId == 2 ? "#BC6D19" : item?.LayananId == 3 ? "#D51C7F" : "#4D56B7"}`,
    };
  });

  const chartConfigBar = {
    layanan: {
      label: "Layanan",
    },
  } satisfies ChartConfig;

  let chartDataPie: any;
  if (role === "Kepala Bidang") {
    chartDataPie = [
      {
        permohonan: "Menunggu",
        totals: superAdmin?.totalMenungguVerifikasi,
        fill: "#1947BC",
      },
      {
        permohonan: "Selesai",
        totals: superAdmin?.totalDisetujui,
        fill: "#1947BC",
      },
      {
        permohonan: "Ditolak",
        totals: superAdmin?.totalDitolak,
        fill: "#BC6D19",
      },
    ];
  } else if (role === "Admin Verifikasi") {
    chartDataPie = [
      {
        permohonan: "Menunggu",
        totals: superAdmin?.totalMenunggu,
        fill: "#1947BC",
      },
      {
        permohonan: "Selesai",
        totals: superAdmin?.totalDisetujui,
        fill: "#1947BC",
      },
      {
        permohonan: "Ditolak",
        totals: superAdmin?.totalDitolak,
        fill: "#BC6D19",
      },
    ];
  }

  const chartConfigPie = {
    totals: {
      label: "Total",
    },
    Menunggu: {
      label: "Menunggu",
      color: "#1947BC",
    },
    Selesai: {
      label: "Selesai",
      color: "#1947BC",
    },
    Ditolak: {
      label: "Ditolak",
      color: "#BC6D19",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full flex flex-col md:mt-5">
        <div className="w-full md:flex md:flex-row gap-x-5">
          {user && user?.role_name && user.role_name === "Kepala Bidang" ? (
            <Card className="bg-line-10 shadow-md rounded-lg border-none w-full md:w-8/12 mb-4 md:mb-0">
              <div className="w-full flex flex-col p-3">
                <div className="w-full flex flex-col items-center p-2 gap-y-5">
                  <div className="w-full flex flex-col items-center">
                    <CardTitle className="text-sm md:text-[16px] font-normal">
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
                      dataKey="layanan"
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
                      dataKey="layanan"
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
                        dataKey="layanan"
                        position="right"
                        offset={8}
                        fontSize={12}
                      />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-line-10 shadow-md rounded-lg border-none w-full md:w-8/12 mb-4 md:mb-0">
              <div className="w-full flex flex-col p-3">
                <div className="w-full flex flex-col items-center p-2 gap-y-5">
                  <div className="w-full flex flex-col items-center">
                    <CardTitle className="text-sm md:text-[16px] font-normal">
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
                      dataKey="layanan"
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
                      dataKey="layanan"
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
                        dataKey="layanan"
                        position="right"
                        offset={8}
                        fontSize={12}
                      />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          )}

          {user && user?.role_name && user.role_name === "Kepala Bidang" ? (
            <Card className="bg-line-10 shadow-md rounded-lg border-none px-4 md:w-5/12 w-full">
              <div className="w-full flex flex-row justify-center items-center p-5">
                <CardTitle className="text-sm md:text-[16px] text-center font-normal">
                  Grafik Status
                </CardTitle>
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
                      dataKey="totals"
                      nameKey="permohonan"
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
                                  {superAdmin?.totalKeseluruhanPermohonan.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground">
                                  Total
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
                <div className="flex">
                  <div className="border-[##E4E4E7] border-t-4 border-r-4 p-4">
                    <div className="div">Menunggu</div>
                    <div className="text-center text-[#3572EF]">
                      {role &&
                        role === "Admin Verifikasi" &&
                        superAdmin?.totalMenunggu}

                      {role &&
                        role === "Kepala Bidang" &&
                        superAdmin?.totalMenungguVerifikasi}
                    </div>
                  </div>
                  <div className="border-[##E4E4E7] border-t-4 border-r-4 p-4">
                    <div className="div">Gagal</div>
                    <div className="text-center text-[#DF1212]">
                      {superAdmin?.totalDitolak}
                    </div>
                  </div>
                  <div className="border-[##E4E4E7] border-t-4 p-4">
                    <div className="div">Selesai</div>
                    <div className="text-center text-[#188B09]">
                      {superAdmin?.totalDisetujui}
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card className="bg-line-10 shadow-md rounded-lg border-none px-4 md:w-5/12 w-full">
              <div className="w-full flex flex-row justify-center items-center p-5">
                <CardTitle className="text-sm text-center md:text-[16px] font-normal">
                  Grafik Status
                </CardTitle>
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
                      dataKey="totals"
                      nameKey="permohonan"
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
                                  {superAdmin?.totalKeseluruhanPermohonan.toLocaleString()}
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
                <div className="flex">
                  <div className="border-[##E4E4E7] border-t-4 border-r-4 p-4">
                    <div className="div">Menunggu</div>
                    <div className="text-center text-[#3572EF]">
                      {superAdmin?.totalMenunggu}
                    </div>
                  </div>
                  <div className="border-[##E4E4E7] border-t-4 border-r-4 p-4">
                    <div className="div">Gagal</div>
                    <div className="text-center text-[#DF1212]">
                      {superAdmin?.totalDitolak}
                    </div>
                  </div>
                  <div className="border-[##E4E4E7] border-t-4 p-4">
                    <div className="div">Selesai</div>
                    <div className="text-center text-[#188B09]">
                      {superAdmin?.totalDisetujui}
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4">
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
            {role && role === "Admin Verifikasi" && "Menunggu"}

            {role && role === "Kepala Bidang" && "Sedang Diproses"}
          </p>
          <p className="text-primary-40 font-semibold text-xl md:text-4xl">
            {role && role === "Admin Verifikasi" && superAdmin?.totalMenunggu}

            {role &&
              role === "Kepala Bidang" &&
              superAdmin?.totalMenungguVerifikasi}
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
            {superAdmin && superAdmin?.totalDisetujui}
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
