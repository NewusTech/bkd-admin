"use client";

import React from "react";
import { Button } from "../ui/button";

export default function MobileVerificationSatisfactionIndexCardPages() {
  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4">
      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">No.</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">: 1</div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Bidang</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : Bidang Mutasi
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Layanan</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : Pengajuan Pangkat
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Tanggal</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : 22 Januari 2022
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Waktu</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : 08.30 WIB
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">
          Kritik dan Saran
        </div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : Sedikit Kesulitan dan juga saya mengalami kendala
        </div>
      </div>

      <div className="w-full">
        <Button className="bg-black-80 bg-opacity-20 hover:bg-black-80 hover:bg-opacity-50 text-black-80 w-full rounded-lg">
          Detail
        </Button>
      </div>
    </section>
  );
}
