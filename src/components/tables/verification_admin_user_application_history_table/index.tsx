"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VerificationUserApplicationHistoryCard from "@/components/all_cards/verificationUserApplicationHistoryCard";

export default function VerificationUserApplicationHistoryTablePages() {
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
            <TableHead className="text-center">Jam</TableHead>
            <TableHead className="text-center">Status</TableHead>
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
          <VerificationUserApplicationHistoryCard />
        </TableBody>
      </Table>
    </>
  );
}
