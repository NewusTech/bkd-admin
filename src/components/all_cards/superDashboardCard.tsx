"use client";

import { SuperAdminDashboardAreasInterface } from "@/types/interface";
import { Notepad } from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";

export default function SuperDashboardCard({
  item,
}: {
  item: SuperAdminDashboardAreasInterface;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const value = item?.permohonan_count || 0;
    const duration = 5000;
    const increment = value / (duration / 10);
    let currentVal = 0;

    const counter = setInterval(() => {
      currentVal += increment;
      if (currentVal >= value) {
        clearInterval(counter);
        setDisplayValue(value);
      } else {
        setDisplayValue(Math.floor(currentVal));
      }
    }, 10);

    return () => clearInterval(counter);
  }, [item?.permohonan_count]);

  return (
    <div className="w-full mih-h-[150px] md:min-h-[250px] group flex flex-row gap-x-5 p-5 bg-line-10 hover:bg-primary-40 rounded-lg shadow-md border border-line-20 justify-between">
      <div className="min-h-[125px] md:min-w-[175px] flex flex-col gap-y-5">
        <h4 className="text-black-80 group-hover:text-line-10 font-normal text-[20px]">
          {item?.name && item?.name}
        </h4>

        <div className="w-full h-full flex flex-col justify-end gap-y-1">
          <h6 className="text-black-80 group-hover:text-line-10 font-normal text-[24px]">
            {displayValue}
          </h6>

          <p className="text-black-80 group-hover:text-line-10 font-normal text-[16px]">
            Total Pengajuan
          </p>
        </div>
      </div>

      <div className="w-3/12 md:w-3/12 flex flex-col items-end">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black-80 bg-opacity-30 group-hover:bg-opacity-100 group-hover:bg-line-10">
          <Notepad className="w-10 h-10 text-black-80" />
        </div>
      </div>
    </div>
  );
}
