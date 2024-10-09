"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { formatDateString, formatToWIB } from "@/lib/utils";
import {
  SatisfactionHistoryInterface,
  SatisfactionIndexHistoryReportDetailInterface,
} from "@/types/interface";

export default function VerificationSatisfactionIndexDetailCard({
  index,
  item,
}: {
  index: number;
  item: SatisfactionIndexHistoryReportDetailInterface;
}) {
  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{item?.name && item?.name}</TableCell>
      <TableCell className="text-center">{item?.nip && item?.nip}</TableCell>
      <TableCell className="text-center">
        {item?.gender && item?.gender}
      </TableCell>
      <TableCell className="text-center">
        {item?.date && formatDateString(item?.date)}
      </TableCell>
      <TableCell className={`text-center`}>
        {item?.kritiksaran && item?.kritiksaran}
      </TableCell>
      <TableCell className="text-center">
        {item?.nilai && item?.nilai}
      </TableCell>
    </TableRow>
  );
}
