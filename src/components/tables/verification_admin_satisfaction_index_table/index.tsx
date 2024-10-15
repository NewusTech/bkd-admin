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
  SatisfactionIndexHistoryReportInterface,
} from "@/types/interface";
import VerificationSatisfactionIndexDetailCard from "@/components/all_cards/verificationSatisfactionIndexDetailCard";
import VerificationSatisfactionIndexCard from "@/components/all_cards/verificationSatisfactionIndexCard";

export default function VerificationSatisfactionIndexTablePages({
  reports,
}: {
  reports: SatisfactionIndexHistoryReportInterface[];
}) {
  return (
    <>
      <Table className="w-full border border-line-20">
        <TableHeader className="bg-primary-40 text-line-10">
          <TableRow className="">
            <TableHead className="text-center">No.</TableHead>
            <TableHead className="text-center">Bidang</TableHead>
            <TableHead className="text-center">Layanan</TableHead>
            <TableHead className="text-center">Total</TableHead>
            <TableHead className="text-center">Jumlah</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {currentPermohonans?.map(
            (permohonan: PermohonanDataType, i: number) => {
              return (
                <TablePermohonanComponent key={i} permohonan={permohonan} />
              );
            }
          )} */}
          {reports &&
            reports.length > 0 &&
            reports.map(
              (item: SatisfactionIndexHistoryReportInterface, i: number) => {
                return (
                  <VerificationSatisfactionIndexCard
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
