"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { ReportDataInterface } from "@/types/interface";

export default function VerificationReportingCard({
  item,
  index,
}: {
  item: ReportDataInterface;
  index: number;
}) {
  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{item?.nama && item?.nama}</TableCell>
      <TableCell className="text-center">
        <div className="bg-error-60 text-error-60 bg-opacity-20 py-3 px-3 rounded-lg">
          {item?.gagal && item?.gagal}
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="bg-success-70 text-success-70 bg-opacity-20 py-3 px-3 rounded-lg">
          {item?.selesai && item?.selesai}
        </div>
      </TableCell>
      <TableCell className="text-center">
        {/* <div>
          <Link
            href={`/verification-admin/verification-satisfaction-index-history/${item?.layanan_id}`}
            className="bg-black-80 bg-opacity-20 hover:bg-black-30 rounded-lg text-[14px] py-3 px-8 text-black-80">
            Detail
          </Link>
        </div> */}
      </TableCell>
    </TableRow>
  );
}
