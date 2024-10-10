"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VerificationReportingCard from "@/components/all_cards/verificationReportingCard";
import { ReportDataInterface } from "@/types/interface";

export default function VerificationReportingTablePages({
  reports,
}: {
  reports: ReportDataInterface[];
}) {
  return (
    <>
      <Table className="w-full border border-line-20">
        <TableHeader className="bg-primary-40 text-line-10">
          <TableRow className="">
            <TableHead className="">No.</TableHead>
            <TableHead className="text-center">Layanan</TableHead>
            <TableHead className="text-center">Gagal</TableHead>
            <TableHead className="text-center">Selesai</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports &&
            reports.length > 0 &&
            reports.map((item: ReportDataInterface, i: number) => {
              return (
                <VerificationReportingCard key={i} index={i} item={item} />
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}
