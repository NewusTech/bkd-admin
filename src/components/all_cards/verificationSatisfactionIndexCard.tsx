"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { formatDateString, formatToWIB } from "@/lib/utils";
import {
  SatisfactionHistoryInterface,
  SatisfactionIndexHistoryReportInterface,
} from "@/types/interface";

export default function VerificationSatisfactionIndexCard({
  index,
  item,
}: {
  index: number;
  item: SatisfactionIndexHistoryReportInterface;
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
        {item?.total_feedback && item?.total_feedback}
      </TableCell>
      <TableCell className="text-center">
        {item?.average_nilai && item?.average_nilai}
      </TableCell>
      <TableCell className="text-center">
        <div>
          <Link
            href={`/verification-admin/verification-satisfaction-index-history/${item?.layanan_id}`}
            className="bg-black-80 bg-opacity-20 hover:bg-black-30 rounded-lg text-[14px] py-3 px-8 text-black-80">
            Detail
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
}
