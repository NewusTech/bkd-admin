"use client";

import { formatDateString, formatToWIB } from "@/lib/utils";
import { UserApplicationHistoryInterface } from "@/types/interface";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function MobileDepartmentSecretarySignatureHistoryCard({
  user,
  index,
}: {
  user: UserApplicationHistoryInterface;
  index: number;
}) {
  const router = useRouter();

  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-5 p-7 mb-4">
      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">No.</div>
        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {index + 1}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Nama</div>
        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {user?.name && user?.name}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">NIP</div>
        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {user?.nip && user?.nip}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Layanan</div>
        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {user?.layanan_name && user?.layanan_name}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Tanggal</div>
        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {user?.createdAt && formatDateString(user?.createdAt)}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Jam</div>
        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {user?.createdAt && formatToWIB(user?.createdAt)}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Status</div>
        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          :{" "}
          <span
            className={`${user.status === 1 ? "text-primary-70 bg-primary-40" : user?.status === 2 ? "text-secondary-70 bg-secondary-40" : user?.status === 3 ? "text-warning-70 bg-warning-40" : user?.status === 4 ? "text-error-70 bg-error-40" : user?.status === 5 ? "text-primary-70 bg-primary-50" : user?.status === 6 ? "text-secondary-70 bg-secondary-50" : user?.status === 7 ? "text-warning-70 bg-warning-50" : user?.status === 8 ? "text-error-70 bg-error-50" : user?.status === 9 ? "text-success-70 bg-success-40" : "text-error-70 bg-error-40"} bg-opacity-20 py-3 px-3 rounded-lg`}>
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
          </span>
        </div>
      </div>

      <div className="w-full mt-6 flex flex-roe items-center justify-center">
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
    </section>
  );
}

export default MobileDepartmentSecretarySignatureHistoryCard;
