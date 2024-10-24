"use client";

// import "quill/dist/quill.snow.css";
// import { useQuill } from "react-quilljs";
import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import { AreasInterface, ServiceInterface } from "@/types/interface";
import { EllipsisVertical, Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

export default function SuperServiceRequirementsCard({
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
      router.push(
        `/super-admin/master-data/service-requirements/update/form/${item?.id}`
      );
    }, 2000);
  };

  return (
    <TableRow className="border border-line-20 text-[14px]">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{item?.nama && item?.nama}</TableCell>
      <TableCell className="text-center">
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
      </TableCell>
    </TableRow>
  );
}
