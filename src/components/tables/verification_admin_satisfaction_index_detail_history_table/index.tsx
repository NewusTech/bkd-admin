"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SatisfactionHistoryInterface } from "@/types/interface";
import VerificationSatisfactionIndexDetailCard from "@/components/all_cards/verificationSatisfactionIndexDetailCard";

export default function VerificationSatisfactionIndexDetailTablePages({
  indexes,
}: {
  indexes: SatisfactionHistoryInterface[];
}) {
  return (
    <>
      <Table className="w-full border border-line-20">
        <TableHeader className="bg-primary-40 text-line-10">
          <TableRow className="">
            <TableHead className="">No.</TableHead>
            <TableHead className="text-center">Bidang</TableHead>
            <TableHead className="text-center">Layanan</TableHead>
            <TableHead className="text-center">Tanggal</TableHead>
            <TableHead className="text-center">Waktu</TableHead>
            <TableHead className="text-center">Kritik dan Saran</TableHead>
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
          {indexes &&
            indexes.length > 0 &&
            indexes.map((item: SatisfactionHistoryInterface, i: number) => {
              return (
                <VerificationSatisfactionIndexDetailCard
                  key={i}
                  index={i}
                  item={item}
                />
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}
