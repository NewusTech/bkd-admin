"use client";

import waiting from "@/../../public/assets/icons/admin-dashboard-time.png";
import Image from "next/image";
import React from "react";

export default function VerificationAdminCard() {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-4">
      <div className="flex flex-col items-center bg-line-10 shadow-md rounded-lg p-6 md:p-4 gap-y-4 m-auto justify-center">
        <div className="w-full md:w-3/12 h-full transition-all animate-pulse">
          <Image
            src={waiting}
            alt="Menunggu"
            width={1000}
            height={1000}
            className="w-1/2 h-1/2 md:w-full md:h-full flex justify-center m-auto"
          />
        </div>
        <p className="text-black-80 md:text-sm text-xs">Menunggu verifikasi</p>
        <p className="text-primary-40 font-semibold text-xl md:text-4xl">65</p>
      </div>
    </div>
  );
}
