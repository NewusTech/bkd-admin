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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  SatisfactionComplaintInterface,
  SatisfactionFeedbackInterface,
  SuperAdminDashboardInterface,
  SuperAdminDashboardServiceInterface,
  TabsApplicationSuperAdminDashBoardInterface,
  UserApplicationHistoryInterface,
  VerificationAdminAreasDataInterface,
} from "@/types/interface";
import React from "react";
import { ProgressBar } from "@/components/elements/progress_bars";

export default function TabsSurveySuperAdminDashBoard({
  superAdmin,
  role,
}: {
  superAdmin: SuperAdminDashboardInterface;
  role: string | null;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full flex flex-row gap-x-5">
        <div className="w-full bg-line-10 rounded-lg shadow-md p-5 flex flex-col gap-y-8">
          <div className="w-full flex flex-col gap-y-5">
            <h5 className="font-semibold text-black-80 md:text-[22px]">
              Total Hasil Data Indeks Kepuasan
            </h5>
          </div>

          <div>
            {role && role === "Super Admin" && (
              <>
                {superAdmin &&
                  superAdmin.countbyLayanan?.map(
                    (item: SuperAdminDashboardServiceInterface, i: number) => {
                      return (
                        <ProgressBar
                          key={i}
                          name={item?.layanan_name}
                          value={item?.totalFeedback}
                        />
                      );
                    }
                  )}
              </>
            )}

            {role &&
              (role === "Sekretaris Dinas" ||
                role === "Kepala Dinas" ||
                role === "Sekretaris Daerah") && (
                <>
                  {superAdmin?.countbyBidang?.flatMap((items) =>
                    items.layanans.map(
                      (item: SatisfactionComplaintInterface) => {
                        return (
                          <ProgressBar
                            key={item?.name}
                            name={item?.name}
                            value={Number(item?.nilai_feedback)}
                          />
                        );
                      }
                    )
                  )}
                </>
              )}

            {role && role === "Admin Verifikasi" && (
              <>
                {superAdmin &&
                  superAdmin.allFeedbackData?.map(
                    (item: SatisfactionFeedbackInterface, i: number) => {
                      return (
                        <ProgressBar
                          key={i}
                          name={item?.LayananName}
                          value={Number(item?.RataRataNilai)}
                        />
                      );
                    }
                  )}
              </>
            )}

            {role && role === "Kepala Bidang" && (
              <>
                {superAdmin &&
                  superAdmin.allUserFeedback?.map(
                    (item: SatisfactionFeedbackInterface, i: number) => {
                      return (
                        <ProgressBar
                          key={i}
                          name={item?.LayananName}
                          value={Number(item?.RataRataNilai)}
                        />
                      );
                    }
                  )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
