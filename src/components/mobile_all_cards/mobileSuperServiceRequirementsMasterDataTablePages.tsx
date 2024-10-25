"use client";

import { ServiceInterface } from "@/types/interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SuperServiceRequirementsMasterDataTablePages({
  item,
  index,
}: {
  item: ServiceInterface;
  index: number;
}) {
  const router = useRouter();
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const handleDetail = async () => {
    setIsLoadingDetail(true);
    setTimeout(() => {
      setIsLoadingDetail(false);
      router.push(
        `/super-admin/master-data/service-requirements/detail/${item?.id}`
      );
    }, 2000);
  };

  const handleEdit = async () => {
    setIsLoadingUpdate(true);
    setTimeout(() => {
      setIsLoadingUpdate(false);
      router.push(`/super-admin/master-data/service-requirements/${item?.id}`);
    }, 2000);
  };

  return (
    <>
      <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4 mb-4">
        <div className="w-full flex flex-col gap-y-3">
          <div className="w-full flex flex-row justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300">
                  <EllipsisVertical className="w-4 h-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="transition-all duration-300 ease-in-out opacity-1 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-white border border-gray-300 shadow-2xl rounded-md w-fit mr-6">
                <DropdownMenuLabel className="font-semibold text-primary text-[14px] w-full shadow-md">
                  Aksi
                </DropdownMenuLabel>
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all animate-pulse"></div>
                <div className="bg-white w-full h-full">
                  <div className="flex flex-col gap-y-2 w-full px-2 py-2">
                    <Button
                      onClick={handleDetail}
                      disabled={isLoadingDetail ? true : false}
                      className="w-full rounded-lg bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[14px] px-3 border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                      {isLoadingDetail ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Detail"
                      )}
                    </Button>

                    <Button
                      onClick={handleEdit}
                      disabled={isLoadingDetail ? true : false}
                      className="w-full rounded-lg bg-secondary-40 hover:bg-secondary-70 text-line-10 h-10 text-[14px] px-3 border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                      {isLoadingUpdate ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Edit"
                      )}
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="text-[14px] md:text-[16px] flex flex-col gap-y-4">
            <div className="w-full grid grid-cols-3">
              <div className="w-full text-[14px] md:text-[16px]">No.</div>
              <div className="w-full col-span-2 text-[14px] md:text-[16px]">
                : {index + 1}
              </div>
            </div>

            <div className="w-full grid grid-cols-3">
              <div className="w-full text-[14px] md:text-[16px]">Jawaban</div>
              <div className="w-full col-span-2 text-[14px] md:text-[16px]">
                : {item?.nama && item?.nama}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
