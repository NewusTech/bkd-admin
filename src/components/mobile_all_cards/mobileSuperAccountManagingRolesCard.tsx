"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import {
  AccountAdminInterface,
  AccountManagingRolesInterface,
  AreasInterface,
  RolesInterface,
} from "@/types/interface";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import TypingEffect from "@/components/ui/TypingEffect";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import EditorProvide from "@/components/pages/areas";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CombinedReadMoreRichTextDisplay from "@/components/ui/CombinedReadMoreRichTextDisplay";

export default function MobileSuperAccountManagingRolesCard({
  account,
  roles,
  areas,
  index,
  // handleDeleteArea,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  // handleUpdateArea,
  isDialogEditOpen,
  setIsDialogEditOpen,
  seen,
  setSeen,
}: {
  account: AccountAdminInterface;
  areas: AreasInterface[];
  roles: RolesInterface[];
  index: number;
  // handleDeleteArea: (slug: string) => void;
  isDeleteLoading: boolean;
  data: {
    bidang_id: string;
    nip: string;
    name: string;
    role_id: string;
    email: string;
    password: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      bidang_id: string;
      nip: string;
      name: string;
      role_id: string;
      email: string;
      password: string;
    }>
  >;
  isUpdateLoading: boolean;
  // handleUpdateArea: (e: React.FormEvent<HTMLFormElement>, slug: string) => void;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  seen: boolean;
  setSeen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const handleSetArea = () => {
  //   setData({
  //     nama: area?.nama,
  //     desc: area?.desc,
  //     pj: area?.pj,
  //     nip_pj: area?.nip_pj,
  //   });
  // };

  function truncateString(str: string, num: number): string {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  return (
    <>
      <section className="w-full bg-line-10 rounded-lg shadow-md p-4 mb-4">
        <div className="text-[14px] flex flex-col gap-y-4">
          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">No.</div>
            <div className="w-full col-span-2">: {index + 1}</div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">Nama Role</div>
            <div className="w-full col-span-2">
              : {account?.role_name && account?.role_name}
            </div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">NIP</div>
            <div className="w-full col-span-2">
              : {account?.nip && account?.nip}
            </div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">NIK</div>
            <div className="w-full col-span-2">
              : {account?.nik && account?.nik}
            </div>
          </div>

          {/* <div className="w-full grid grid-cols-3">
                        <div className="w-full font-medium text-black">
                            Bidang
                        </div>
                        <div className="w-full col-span-2">: {account?.Bidang && account?.Bidang}</div>
                    </div> */}

          {/* <div className="card-table text-[12px] p-4 rounded-2xl border border-primary bg-white shadow-sm">
                        <div className="wrap-konten flex flex-col gap-2">
                            <div className="flex justify-between gap-5">
                                <div className="label font-medium text-black">No</div>
                                <div className="konten text-black/80 text-end">
                                    {index + 1}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5">
                                <div className="label font-medium text-black">Tanggal</div>
                                <div className="konten text-black/80 text-end">
                                    {area?.nama}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5">
                                <div className="label font-medium text-black">Nama Komoditas</div>
                                <div className="konten text-black/80 text-end">
                                    {area?.pj}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5">
                                <div className="label font-medium text-black">Satuan Komoditas</div>
                                <div className="konten text-black/80 text-end">
                                    {area?.desc}
                                </div>
                            </div>
                        </div>
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all animate-pulse my-3"></div>
                    </div> */}
        </div>
      </section>
    </>
  );
}
