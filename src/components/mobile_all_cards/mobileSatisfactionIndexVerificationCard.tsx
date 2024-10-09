"use client";

import React from "react";
import { Button } from "../ui/button";
import { SatisfactionIndexHistoryReportInterface } from "@/types/interface";
import { useRouter } from "next/navigation";

export default function MobileVerificationSatisfactionIndexCardPages({
  index,
  item,
}: {
  index: number;
  item: SatisfactionIndexHistoryReportInterface;
}) {
  const router = useRouter();

  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4">
      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">No.</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {index + 1}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Bidang</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.bidang_name && item?.bidang_name}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Layanan</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.layanan_name && item?.layanan_name}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Total</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.total_feedback && item?.total_feedback}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Jumlah</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.average_nilai && item?.average_nilai}
        </div>
      </div>

      <div className="w-full">
        <Button
          onClick={() =>
            router.push(
              `/verification-admin/verification-satisfaction-index-history/${item?.layanan_id}`
            )
          }
          className="bg-black-80 bg-opacity-20 hover:bg-black-80 hover:bg-opacity-50 text-black-80 w-full rounded-lg">
          Detail
        </Button>
      </div>
    </section>
  );
}
