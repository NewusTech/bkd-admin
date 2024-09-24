"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function HeadManageApprovalsCard() {
  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">1</TableCell>
      <TableCell className="text-center">22 Maret 2024</TableCell>
      <TableCell className="text-center">Bidang Mutasi</TableCell>
      <TableCell className="text-center">Pengajuan Pangkat</TableCell>
      <TableCell className="text-center">NIK Tidak Terdaftar</TableCell>
      <TableCell className={`text-center`}>
        <div className="text-[#188B09] bg-[#188B09] bg-opacity-20 py-3 px-3 rounded-lg">
          Divalidasi
        </div>
      </TableCell>
      <TableCell className="text-center">
        {/* {permohonan.status === 3 ||
        permohonan.status === 4 ||
        permohonan.status === 5 ? (
          <div>
            <Link
              href={`riwayat/${permohonan.id}`}
              className="bg-primary-700 hover:bg-primary-600 rounded-full text-[12px] py-1.5 px-5 text-neutral-50">
              Lihat
            </Link>
          </div>
        ) : (
          <div>
            <button
              disabled
              className="bg-gray-400 rounded-full py-1 px-5 text-neutral-50 text-[12px] cursor-not-allowed">
              Lihat
            </button>
          </div>
        )} */}
        <div>
          <Link
            href={`/`}
            className="bg-black-80 bg-opacity-20 hover:bg-black-30 rounded-lg text-[14px] py-3 px-8 text-black-80">
            Detail
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
}
