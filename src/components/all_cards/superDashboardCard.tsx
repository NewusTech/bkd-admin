"use client";

import { SuperAdminDashboardAreasInterface } from "@/types/interface";
import { Notepad } from "@phosphor-icons/react";
import React from "react";

export default function SuperDashboardCard({
  item,
}: {
  item: SuperAdminDashboardAreasInterface;
}) {
  return (
    <div className="w-full min-h-[200px] group flex flex-row gap-x-5 p-5 bg-line-10 hover:bg-primary-40 rounded-lg shadow-md border border-line-20">
      <div className="min-w-[175px] flex flex-col gap-y-5">
        <h4 className="text-black-80 group-hover:text-line-10 font-normal text-[20px]">
          {item?.name && item?.name}
        </h4>

        <div className="w-full h-full flex flex-col justify-end gap-y-1">
          <h6 className="text-black-80 group-hover:text-line-10 font-normal text-[24px]">
            {item?.permohonan_count && item?.permohonan_count}
          </h6>

          <p className="text-black-80 group-hover:text-line-10 font-normal text-[16px]">
            Total Pengajuan
          </p>
        </div>
      </div>

      <div className="w-3/12 md:w-3/12 flex flex-col items-center">
        <div className="w-full p-4 flex md:p-2 rounded-full bg-black-80 bg-opacity-30 group-hover:bg-opacity-100 group-hover:bg-line-10">
          <Notepad className="w-10 h-10 text-black-80" />
        </div>
      </div>
    </div>
  );
}
