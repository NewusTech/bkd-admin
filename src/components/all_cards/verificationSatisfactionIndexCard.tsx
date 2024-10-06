"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { formatDateString, formatToWIB } from "@/lib/utils";
import { SatisfactionHistoryInterface } from "@/types/interface";

export default function VerificationSatisfactionIndexCard({
  index,
  item,
}: {
  index: number;
  item: SatisfactionHistoryInterface;
}) {
  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">
        {item?.bidang_name && item?.bidang_name}
      </TableCell>
      <TableCell className="text-center">
        {item?.layanan_name && item?.layanan_name}
      </TableCell>
      <TableCell className="text-center">
        {formatDateString(item?.createdAt)}
      </TableCell>
      <TableCell className="text-center">
        {formatToWIB(item?.createdAt)}
      </TableCell>
      <TableCell className={`text-center`}>
        {item?.feedback && item?.feedback}
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
            href={`/satisfaction-index/${item?.id}`}
            className="bg-black-80 bg-opacity-20 hover:bg-black-30 rounded-lg text-[14px] py-3 px-8 text-black-80">
            Detail
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
}
