"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  SatisfactionHistoryInterface,
  SatisfactionIndexHistoryReportDetailInterface,
  StatisVerificationReportingsDetailInterface,
} from "@/types/interface";
import VerificationSatisfactionIndexDetailCard from "@/components/all_cards/verificationSatisfactionIndexDetailCard";
import VerificationReportingsDetailCard from "@/components/all_cards/verificationReportingsDetailCard";

export default function VerificationReportingsDetailTablePages({
  indexes,
}: {
  indexes: StatisVerificationReportingsDetailInterface[];
}) {
  return (
    <>
      <Table className="w-full border border-line-20">
        <TableHeader className="bg-primary-40 text-line-10">
          <TableRow className="">
            <TableHead className="">No.</TableHead>
            <TableHead className="text-center">Nama</TableHead>
            <TableHead className="text-center">NIP</TableHead>
            <TableHead className="text-center">Layanan</TableHead>
            <TableHead className="text-center">Tanggal</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {indexes &&
            indexes.length > 0 &&
            indexes.map(
              (
                item: StatisVerificationReportingsDetailInterface,
                i: number
              ) => {
                return (
                  <VerificationReportingsDetailCard
                    key={i}
                    index={i}
                    item={item}
                  />
                );
              }
            )}
        </TableBody>
      </Table>
    </>
  );
}
