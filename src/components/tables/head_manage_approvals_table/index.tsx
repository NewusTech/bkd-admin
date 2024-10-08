"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HeadManageApprovalsCard from "@/components/all_cards/headManageApprovalsCard";
import { UserApplicationHistoryInterface } from "@/types/interface";

export default function HeadManageApprovalsTablePages({
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
          {/* {currentPermohonans?.map(
            (permohonan: PermohonanDataType, i: number) => {
              return (
                <TablePermohonanComponent key={i} permohonan={permohonan} />
              );
            }
          )} */}
          {users &&
            users.length > 0 &&
            users.map((user: UserApplicationHistoryInterface, i: number) => {
              return <HeadManageApprovalsCard key={i} user={user} index={i} />;
            })}
        </TableBody>
      </Table>
    </>
  );
}
