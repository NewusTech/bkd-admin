"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function DepartmentSecretarySignatureValidationCard() {
  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">1</TableCell>
      <TableCell className="text-center">Irsyad Al-Haq Husein</TableCell>
      <TableCell className="text-center">1234567812345678</TableCell>
      <TableCell className="text-center">Pengajuan Pangkat</TableCell>
      <TableCell className="text-center">22 Maret 2024</TableCell>
      <TableCell className="text-center">22.00 WIB</TableCell>
      <TableCell className={`text-center`}>
        <div className="text-[#188B09] bg-[#188B09] bg-opacity-20 py-3 px-3 rounded-lg">
          Divalidasi
        </div>
      </TableCell>
    </TableRow>
  );
}
