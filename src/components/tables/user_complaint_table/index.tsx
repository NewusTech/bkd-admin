"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ApplicationHistoryCard from "@/components/all_cards/applicationHistoryCard";
import UserComplaintCard from "@/components/all_cards/userComplaintCard";

export default function UserComplaintTablePages() {
  return (
    <>
      <Table className="w-full border border-line-20">
        <TableHeader className="bg-primary-40 text-line-10">
          <TableRow className="">
            <TableHead className="">No.</TableHead>
            <TableHead className="text-center">Tanggal</TableHead>
            <TableHead className="text-center">Bidang</TableHead>
            <TableHead className="text-center">Layanan</TableHead>
            <TableHead className="text-center">Judul Pengaduan</TableHead>
            <TableHead className="text-center">Status</TableHead>
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
          <UserComplaintCard />
        </TableBody>
      </Table>
    </>
  );
}
