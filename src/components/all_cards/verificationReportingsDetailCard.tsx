"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import {
  ReportDataInterface,
  StatisVerificationReportingsDetailInterface,
} from "@/types/interface";
import { formatDateString } from "@/lib/utils";
import DataNotFound from "../elements/data_not_found";

export default function VerificationReportingsDetailCard({
  item,
  index,
}: {
  index: number;
  item: StatisVerificationReportingsDetailInterface;
}) {
  return (
    <>
      {(item?.status === 9 || item?.status === 10) && (
        <TableRow className="border border-line-20">
          <TableCell className="text-center">{index + 1}</TableCell>
          <TableCell className="text-center">
            {item?.name && item?.name}
          </TableCell>
          <TableCell className="text-center">
            {item?.nip && item?.nip}
          </TableCell>
          <TableCell className="text-center">
            {item?.layanan_name && item?.layanan_name}
          </TableCell>
          <TableCell className="text-center">
            {item?.createdAt && formatDateString(item?.createdAt)}
          </TableCell>
          <TableCell className={`text-center`}>
            <div
              className={`${item?.status === 9 ? "text-success-70 bg-success-40" : "text-error-70 bg-error-40"} bg-opacity-20 py-3 px-3 rounded-lg`}>
              {item?.status === 9 ? "Selesai" : "Ditolak"}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
