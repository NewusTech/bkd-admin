"use client";

import React from "react";
import { SatisfactionIndexHistoryReportDetailInterface } from "@/types/interface";
import { formatDateString } from "@/lib/utils";

export default function MobileSatisfactionIndexDetailCardPages({
  index,
  item,
}: {
  index: number;
  item: SatisfactionIndexHistoryReportDetailInterface;
}) {
  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4">
      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">No.</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {index + 1}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Nama</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.name && item?.name}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">NIP</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.nip && item?.nip}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Jenis Kelamin</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.gender && item?.gender}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Tanggal</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.date && formatDateString(item?.date)}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">
          Kritik dan Saran
        </div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.kritiksaran && item?.kritiksaran}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Nilai</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {item?.nilai && item?.nilai}
        </div>
      </div>
    </section>
  );
}
