"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { UserApplicationHistoryInterface } from "@/types/interface";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { formatDateString } from "@/lib/utils";

export default function DepartmentSecretarySignatureValidationCard({
  index,
  user,
}: {
  index: number;
  user: UserApplicationHistoryInterface;
}) {
  const router = useRouter();

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{user?.name && user?.name}</TableCell>
      <TableCell className="text-center">{user?.nip && user?.nip}</TableCell>
      <TableCell className="text-center">
        {user?.layanan_name && user?.layanan_name}
      </TableCell>
      <TableCell className="text-center">
        {user?.createdAt && formatDateString(user?.createdAt)}
      </TableCell>
      <TableCell className={`text-center`}>
        <div
          className={`${user?.status === 1 ? "text-primary-70 bg-primary-40" : user?.status === 2 ? "text-secondary-70 bg-secondary-40" : user?.status === 3 ? "text-warning-70 bg-warning-40" : user?.status === 4 ? "text-error-70 bg-error-40" : user?.status === 5 ? "text-primary-70 bg-primary-50" : user?.status === 6 ? "text-secondary-70 bg-secondary-50" : user?.status === 7 ? "text-warning-70 bg-warning-50" : user?.status === 8 ? "text-error-70 bg-error-50" : user?.status === 9 ? "text-success-70 bg-success-40" : "text-error-70 bg-error-40"} bg-opacity-20 py-3 px-3 rounded-lg`}>
          {user.status === 1
            ? "Menunggu"
            : user?.status === 2
              ? "Sedang Diproses"
              : user?.status === 3
                ? "Butuh Perbaikan"
                : user?.status === 4
                  ? "Sudah Diperbaiki"
                  : user?.status === 5
                    ? "Sedang Divalidasi"
                    : user?.status === 6
                      ? "Sudah Divalidasi"
                      : user?.status === 7
                        ? "Sedang Ditandatangani"
                        : user?.status === 8
                          ? "Sudah Ditandatangani"
                          : user?.status === 9
                            ? "Selesai"
                            : "Ditolak"}
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="w-full flex flex-roe items-center justify-center">
          <Button
            onClick={() =>
              router.push(
                `/department-secretary/department-signature-validation/department-signature-validation-detail/${user?.id}`
              )
            }
            className="w-full h-[45px] bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 hover:text-line-10 rounded-lg">
            Detail
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
