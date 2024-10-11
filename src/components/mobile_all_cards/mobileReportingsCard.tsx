"use client";

import { formatDateString, formatToWIB } from "@/lib/utils";
import {
  ReportDataInterface,
  StatisVerificationReportingsDetailInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import DataNotFound from "../elements/data_not_found";

function MobileReportingCard({
  item,
  index,
}: {
  index: number;
  item: ReportDataInterface;
}) {
  const router = useRouter();

  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-5 p-7 mb-4">
      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">No.</div>
        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {index + 1}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Nama</div>
        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.nama && item?.nama}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Gagal</div>
        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.gagal && item?.gagal}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Selesai</div>
        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.selesai && item?.selesai}
        </div>
      </div>

      <div className="w-full mt-6 flex flex-roe items-center justify-center">
        <Button
          onClick={() =>
            router.push(
              `/verification-admin/verification-reportings/${item?.id}`
            )
          }
          className="w-full h-[45px] bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 hover:text-line-10 rounded-lg">
          Detail
        </Button>
      </div>
    </section>
  );
}

export default MobileReportingCard;
