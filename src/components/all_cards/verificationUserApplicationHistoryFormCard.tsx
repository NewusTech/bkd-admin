"use client";

import React from "react";
import { Label } from "../ui/label";
import { UserApplicationHistoryFormServiceInputInterface } from "@/types/interface";

import Image from "next/image";
import { formatDateString } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function UserApplicationHistoryFormCard({
  item,
}: {
  item: UserApplicationHistoryFormServiceInputInterface;
}) {
  let render;

  if (item?.layananform_tipedata === "radio") {
    const radioOption = item?.layananform_datajson?.find(
      (option) => option.id.toString() === item.data
    );
    const displayValue = radioOption ? radioOption.key : "Unknown";

    render = (
      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
        <Label
          htmlFor="name"
          className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
          {item?.layananform_name && item?.layananform_name}
        </Label>

        <p className="text-[14px] md:text-[16px]">{displayValue}</p>
      </div>
    );
  } else if (item?.layananform_tipedata === "checkbox") {
    render = (
      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
        <Label
          htmlFor="name"
          className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
          {item?.layananform_name && item?.layananform_name}
        </Label>

        <ul className="list-disc list-inside w-full flex flex-col gap-y-3">
          {item?.data_key?.map((key, index) => (
            <li key={index} className="text-[14px] md:text-[16px]">
              {key}
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (item?.layananform_tipedata === "date") {
    render = (
      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
        <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
          {item?.layananform_name && item?.layananform_name}
        </Label>

        <p className="text-[14px] md:text-[16px]">
          {item?.data && formatDateString(item?.data)}
        </p>
      </div>
    );
  } else if (item?.layananform_tipedata === "file") {
    render = (
      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
        <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
          {item?.layananform_name && item?.layananform_name}
        </Label>

        <div className="w-full">
          <AlertDialog>
            <AlertDialogTrigger className="w-2/12">
              <div className="w-full bg-primary-40 hover:bg-primary-70 text-line-10 text-[14px] md:text-[16px] flex justify-center items-center h-10 hover:underline rounded-lg">
                Lihat File
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
              <AlertDialogHeader className="flex flex-col max-h-[500px]">
                <AlertDialogTitle className="text-center">
                  File Upload Permohonan User
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  Cek Dengan Teliti
                </AlertDialogDescription>

                {item?.data && item?.layananform_name && (
                  <div className="w-full h-full flex justify-center">
                    <Image
                      src={item?.data}
                      alt={item?.layananform_name}
                      width={1000}
                      height={1000}
                      className="w-10/12 h-5/6"
                    />
                  </div>
                )}
              </AlertDialogHeader>
              <AlertDialogFooter className="w-full flex flex-row justify-center">
                <AlertDialogCancel className="text-[14px] md:text-[16px]">
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    );
  } else {
    render = (
      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
        <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
          {item?.layananform_name && item?.layananform_name}
        </Label>

        <p className="text-[14px] md:text-[16px]">{item?.data && item?.data}</p>
      </div>
    );
  }

  return <>{render}</>;
}
