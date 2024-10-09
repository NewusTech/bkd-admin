"use client";

import React from "react";
import { Button } from "../ui/button";
import { UserComplaintInterface } from "@/types/interface";
import { useRouter } from "next/navigation";
import { formatDateString } from "@/lib/utils";

export default function MobileUserComplaintCardPages({
  complaint,
  index,
}: {
  complaint: UserComplaintInterface;
  index: number;
}) {
  const router = useRouter();
  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4 mb-5">
      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">No.</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {index + 1}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Tanggal</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {formatDateString(complaint?.createdAt)}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Bidang</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {complaint?.Bidang?.nama}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-ful text-[14px] md:text-[16px]">Layanan</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {complaint?.Layanan?.nama}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Judul Pengaduan</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {complaint?.judul_pengaduan}
        </div>
      </div>

      <div className="w-full grid grid-cols-3 items-center">
        <div className="w-full text-[14px] md:text-[16px]">Status</div>

        <div className="w-full flex flex-row items-center gap-x-1">
          <p className="text-[14px] md:text-[16px]">:</p>
          <div
            className={`w-full text-[14px] md:text-[16px] text-center col-span-2 ${complaint.status === 0 ? "text-primary-70 bg-primary-40" : "text-success-70 bg-success-50"} bg-opacity-20 p-2 px-2 rounded-lg`}>
            {complaint?.status === 0 ? "Menunggu" : "Selesai"}
          </div>
        </div>
      </div>

      <div className="w-full">
        <Button
          onClick={() => router.push(`/user-complaint/${complaint.id}`)}
          className="bg-black-80 bg-opacity-20 text-[14px] md:text-[16px] hover:bg-black-80 hover:bg-opacity-50 text-black-80 w-full rounded-lg">
          Detail
        </Button>
      </div>
    </section>
  );
}
