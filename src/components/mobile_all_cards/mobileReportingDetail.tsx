"use client";

import { formatDateString, formatToWIB } from "@/lib/utils";
import {
  StatisVerificationReportingsDetailInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import DataNotFound from "../elements/data_not_found";

function MobileReportingDetailCard({
  item,
  index,
}: {
  item: StatisVerificationReportingsDetailInterface;
  index: number;
}) {
  const router = useRouter();

  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-5 p-7 mb-4">
      {item?.status === 9 || item?.status === 10 ? (
        <>
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
            <div className="w-full text-[14px] md:text-[16px]">Layanan</div>
            <div className="w-full col-span-2 text-[14px] md:text-[16px]">
              : {item?.layanan_name && item?.layanan_name}
            </div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full text-[14px] md:text-[16px]">Tanggal</div>
            <div className="w-full col-span-2 text-[14px] md:text-[16px]">
              : {item?.createdAt && formatDateString(item?.createdAt)}
            </div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full text-[14px] md:text-[16px]">Jam</div>
            <div className="w-full col-span-2 text-[14px] md:text-[16px]">
              : {item?.createdAt && formatToWIB(item?.createdAt)}
            </div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full text-[14px] md:text-[16px]">Status</div>
            <div className="w-full col-span-2 text-[14px] md:text-[16px]">
              :{" "}
              <span
                className={`${item?.status === 9 ? "text-success-70 bg-success-40" : "text-error-70 bg-error-40"} bg-opacity-20 py-3 px-3 rounded-lg`}>
                {item?.status === 9 ? "Selesai" : "Ditolak"}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full">
          <DataNotFound />
        </div>
      )}
    </section>
  );
}

export default MobileReportingDetailCard;
