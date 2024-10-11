"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { UserComplaintInterface } from "@/types/interface";
import { formatDateString } from "@/lib/utils";

export default function VerificationUserComplaintCard({
  complaint,
  index,
}: {
  complaint: UserComplaintInterface;
  index: number;
}) {
  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">
        {formatDateString(complaint?.createdAt)}
      </TableCell>
      <TableCell className="text-center">{complaint?.Bidang?.nama}</TableCell>
      <TableCell className="text-center">{complaint?.Layanan?.nama}</TableCell>
      <TableCell className="text-center">
        {complaint?.judul_pengaduan}
      </TableCell>
      <TableCell className={`text-center`}>
        <div
          className={`${complaint.status === 0 ? "text-primary-70 bg-primary-40" : "text-success-70 bg-success-50"} bg-opacity-20 py-3 px-3 rounded-lg`}>
          {complaint?.status === 0 ? "Menunggu" : "Selesai"}
        </div>
      </TableCell>
      <TableCell className="text-center">
        {/* {permohonan.status === 3 ||
        permohonan.status === 4 ||
        permohonan.status === 5 ? (
          <div>
            <Link
              href={`riwayat/${permohonan.id}`}
              className="bg-primary-700 hover:bg-primary-600 rounded-full text-[12px] py-1.5 px-5 text-neutral-50">
              Lihat
            </Link>
          </div>
        ) : (
          <div>
            <button
              disabled
              className="bg-gray-400 rounded-full py-1 px-5 text-neutral-50 text-[12px] cursor-not-allowed">
              Lihat
            </button>
          </div>
        )} */}
        <div>
          <Link
            href={`/verification-admin/verification-user-complaint-history/${complaint.id}`}
            className="bg-black-80 bg-opacity-20 hover:bg-black-30 rounded-lg text-[14px] md:text-[16px] py-3 px-8 text-black-80">
            Detail
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
}
