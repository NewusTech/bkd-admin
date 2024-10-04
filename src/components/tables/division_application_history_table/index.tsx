"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DivisionVerificationAdminApplicationHistoryCard from "@/components/all_cards/divisionVerificationAdminCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileDivisionVerificationAdminApplicationHistoryCard from "@/components/mobile_all_cards/mobileDivisionVerificationAdminApplicationHistoryCard";

export default function DivitionVerificationAdminApplicationHistoryTablePages() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {!isMobile ? (
        <>
          {/* Dekstop */}
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
              <DivisionVerificationAdminApplicationHistoryCard />
            </TableBody>
          </Table>
          {/* Desktop */}
        </>
      ) : (
        <>
          {/* Dekstop */}
          <MobileDivisionVerificationAdminApplicationHistoryCard />
          {/* Dektop */}
        </>
      )}
    </>
  );
}
