"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DepartmentSecretarySignatureValidationCard from "@/components/all_cards/dapartmentSecretarySignatureValidationCard";
import { UserApplicationHistoryInterface } from "@/types/interface";

export default function DepartmentSecretarySignatureValidationTablePages({
  users,
}: {
  users: UserApplicationHistoryInterface[];
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
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            users.length > 0 &&
            users.map((user: UserApplicationHistoryInterface, i: number) => {
              return (
                <DepartmentSecretarySignatureValidationCard
                  key={i}
                  user={user}
                  index={i}
                />
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}
