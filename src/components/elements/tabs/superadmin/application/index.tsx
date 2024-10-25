"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
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
import DataNotFound from "@/components/elements/data_not_found";
import HistoryApplicationMobileFilter from "@/components/elements/filters/mobile/historyApplicationMobileFilter";
import HistoryApplicationFilter from "@/components/elements/filters/website/historyApplicationFilter";
import PaginationComponent from "@/components/elements/pagination";
import MobileDivisionVerificationAdminApplicationHistoryCard from "@/components/mobile_all_cards/mobileDivisionVerificationAdminApplicationHistoryCard";
import VerificationUserApplicationHistoryTablePages from "@/components/tables/verification_admin_user_application_history_table";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  TabsApplicationSuperAdminDashBoardInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import React from "react";
import { string } from "zod";

export default function TabsApplicationSuperAdminDashBoard({
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
}: TabsApplicationSuperAdminDashBoardInterface) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const chartData = superAdmin?.countbyBidang?.map((item, index) => {
    let colour: string | undefined = "#FF6600";
    if (index === 0) colour = "#FF6600";
    else if (index === 1) colour = "#27DE27";
    else if (index === 2) colour = "#1B99E9";
    else if (index === 3) colour = "#FFD94F";

    return {
      nama: item?.name,
      permohonan: item?.permohonan_count,
      fill: colour,
    };
  });

  const chartConfig = {
    permohonan: {
      label: "Permohonan",
    },
  } satisfies ChartConfig;

  const chartDataStaff = superAdmin?.countPegawaibyBidang?.map(
    (item, index) => {
      let color: string | undefined = "#FF0000";

      if (index === 0) color = "#FF0000";
      else if (index === 1) color = "#44E6FF";
      else if (index === 2) color = "#646464";
      else if (index === 3) color = "#5033F5";

      return {
        nama: item?.name,
        jumlah: item?.pegawai_count,
        fill: color,
      };
    }
  );

  const chartConfigStaff = {
    jumlah: {
      label: "Jumlah",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full flex flex-col md:flex-row gap-x-5 gap-y-5">
        <div className="w-full bg-line-10 rounded-lg shadow-md p-5">
          <Card className="flex flex-col px-3 gap-y-3 p-3 border-none">
            <CardHeader className="w-full flex flex-col items-start pb-0 p-0">
              <CardDescription className="md:text-[16px] font-light">
                Statistik Permohonan Per Bidang
              </CardDescription>
              <CardTitle className="md:text-[20px] font-normal">
                Jumlah Keseluruhan Permohonan
              </CardTitle>
            </CardHeader>
            <div className="h-0.5 w-full bg-black-80"></div>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={chartData}
                    dataKey="permohonan"
                    label
                    className="border border-line-10 text-line-10"
                    nameKey="nama">
                    {/* <LabelList
                      dataKey="nama"
                      className="text-black-80"
                      // stroke="none"
                      fontSize={8}
                      // formatter={(value: keyof typeof chartConfig) =>
                      //   chartConfig[value]?.label
                      // }
                    /> */}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="w-full bg-line-10 rounded-lg shadow-md p-5">
          <Card className="flex flex-col px-3 gap-y-3 p-3">
            <CardHeader className="w-full flex flex-col items-start pb-0 p-0">
              <CardDescription className="md:text-[16px] font-light">
                Statistik Pegawai Per Bidang
              </CardDescription>
              <CardTitle className="md:text-[20px] font-normal">
                Jumlah Keseluruhan Pegawai
              </CardTitle>
            </CardHeader>
            <div className="h-0.5 w-full bg-black-80"></div>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfigStaff}
                className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={chartDataStaff}
                    dataKey="jumlah"
                    label
                    nameKey="nama"
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
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

        <div className="w-full">
          <PaginationComponent
            currentPage={pagination?.currentPage}
            totalPages={pagination?.totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        <div className="w-full">{users.length === 0 && <DataNotFound />}</div>
      </div>
    </div>
  );
}
