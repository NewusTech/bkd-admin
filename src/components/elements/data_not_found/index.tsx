"use client";

import backHome from "@/../../public/assets/icons/undraw_feeling_blue_-4-b7q.svg";
import Image from "next/legacy/image";
import React from "react";

export default function DataNotFound() {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center w-full h-full">
      <Image src={backHome} width={200} height={200} alt="sad" />
      <p className="text-center text-neutral-900 text-[12px] md:text-[32px] font-thin mt-4">
        Data tidak ditemukan!
      </p>
    </div>
  );
}
