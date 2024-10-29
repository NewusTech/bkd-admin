"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
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
import DataNotFound from "@/components/elements/data_not_found";
import HistoryApplicationMobileFilter from "@/components/elements/filters/mobile/historyApplicationMobileFilter";
import HistoryApplicationFilter from "@/components/elements/filters/website/historyApplicationFilter";
import PaginationComponent from "@/components/elements/pagination";
import MobileDivisionVerificationAdminApplicationHistoryCard from "@/components/mobile_all_cards/mobileDivisionVerificationAdminApplicationHistoryCard";
import VerificationUserApplicationHistoryTablePages from "@/components/tables/verification_admin_user_application_history_table";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  JwtPayload,
  SuperAdminDashboardInterface,
  TabsApplicationSuperAdminDashBoardInterface,
  UserApplicationHistoryInterface,
  UserComplaintInterface,
} from "@/types/interface";
import React, { useCallback, useEffect, useState } from "react";
import {
  getDownloadUserComplaintExcelPrint,
  getDownloadUserComplaintPrint,
  getUserComplaints,
} from "@/services/api";
import { formatDate } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import HistoryUserComplaintFilter from "@/components/elements/filters/website/historyUserComplaintFilter";
import HistoryUserComplaintMobileFilter from "@/components/elements/filters/mobile/historyUserComplaintMobileFilter";
import MobileUserComplaintCardPages from "@/components/mobile_all_cards/mobileUserComplaintCard";
import VerificationUserComplaintTablePages from "@/components/tables/verification_admin_user_compaint_table";

export default function TabsComplaintSuperAdminDashBoard({
  superAdmin,
}: {
  superAdmin: SuperAdminDashboardInterface;
}) {
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

  let chartData;

  if (role === "Kepala Bidang" || role === "Admin Verifikasi") {
    chartData = superAdmin?.allLayananMonth?.map((item, index) => {
      return {
        nama: item?.LayananName,
        jumlah: item?.TotalPengaduan,
      };
    });
  } else if (role === "Super Admin") {
    chartData = superAdmin?.countbyLayanan?.map((item, index) => {
      return {
        nama: item?.layanan_name,
        jumlah: item?.pengaduanCount,
      };
    });
  } else {
    chartData = superAdmin?.countbyBidang?.flatMap((items) =>
      items?.layanans?.map((item) => ({
        nama: item?.name,
        jumlah: item?.total_pengaduan,
      }))
    );
  }

  const chartConfig = {
    jumlah: {
      label: "Jumlah",
      color: "#1B99E9",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full flex flex-row gap-x-5">
        <div className="w-full bg-line-10 rounded-lg shadow-md p-5">
          <Card>
            <CardHeader>
              <CardTitle>Line Chart - Label</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    top: 40,
                    left: 12,
                    right: 12,
                    bottom: 40,
                  }}>
                  <CartesianGrid vertical={false} />
                  {/* <XAxis
                    dataKey="nama"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(8)}
                  /> */}
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Line
                    dataKey="jumlah"
                    type="natural"
                    stroke="#FF6600"
                    strokeWidth={2}
                    dot={{
                      fill: "#27DE27",
                    }}
                    activeDot={{
                      r: 6,
                    }}>
                    <LabelList
                      position="top"
                      offset={12}
                      className="text-[#1B99E9]"
                      fontSize={12}
                    />
                  </Line>
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-full bg-line-10 rounded-lg shadow-md p-4 flex flex-col gap-y-4">
        {/* filter website */}
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

        {/* filter mobile */}
        <div className="w-full">
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
    </div>
  );
}
