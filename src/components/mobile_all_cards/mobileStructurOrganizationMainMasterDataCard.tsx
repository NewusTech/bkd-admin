"use client";

import React, { useRef } from "react";
import { Button } from "../ui/button";
import { formatDateString } from "@/lib/utils";
import { useRouter } from "next/navigation";
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NewsInterface,
  StructureOrganizationInterface,
  StructureOrganizationInterfaceMain,
} from "@/types/interface";
import Image from "next/image";
import { Label } from "../ui/label";
import EditorProvide from "../pages/areas";
import { Input } from "../ui/input";
import { EllipsisVertical, Loader } from "lucide-react";
import { Trash } from "@phosphor-icons/react";
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
} from "@/components/ui/dropdown-menu"
import TypingEffect from "../ui/TypingEffect";

export default function MobileStructureOrganizationMainMasterDataCard({
  organization,
  index,
  handleDeleteStructureOrganizationMain,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  // handleUpdateStructureOrganization,
  isDialogEditOpen,
  setIsDialogEditOpen,
}: {
  organization: StructureOrganizationInterfaceMain;
  index: number;
  handleDeleteStructureOrganizationMain: (id: number) => void;
  isDeleteLoading: boolean;
  data: {
    bkdstruktur_id: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      bkdstruktur_id: string;
    }>
  >;
  isUpdateLoading: boolean;
  // handleUpdateStructureOrganization: (
  //   e: React.FormEvent<HTMLFormElement>,
  //   slug: string
  // ) => void;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dropRef = useRef<HTMLDivElement>(null);
  const handleSetGallery = () => {
    setData({
      bkdstruktur_id: "",
    });
  };

  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4">
      <div className="w-full flex justify-end items-end">
        <div className="w-full text-xs md:text-sm flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300"
              >
                <EllipsisVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="transition-all duration-300 ease-in-out opacity-1 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-white border border-gray-300 shadow-2xl rounded-md w-fit mr-6">
              <DropdownMenuLabel className="font-semibold text-primary text-sm w-full shadow-md">
                Aksi
              </DropdownMenuLabel>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all animate-pulse"></div>
              <div className="bg-white w-full h-full">
                <div className="gap-4 w-full px-2 py-2">
                  {/* <div className="w-full mb-2">
                    <div className="w-full">
                      <Drawer
                        open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}
                      >
                        <DrawerTrigger
                          onClick={() => {
                            handleSetService();
                            setIsDialogEditOpen(true);
                          }}
                          className="h-10 text-xs md:text-sm rounded-lg border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 hover:text-line-10 w-full">
                          Edit
                        </DrawerTrigger>
                        <DrawerContent className="bg-white">
                          <DrawerHeader>
                            <DrawerTitle className="text-center">
                              Master Data Berita
                            </DrawerTitle>
                            <form
                              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                                handleUpdateNews(e, item?.slug)
                              }
                              className="w-full flex flex-col gap-y-3 max-h-full h-[700px]">
                              <DrawerDescription className="text-center">
                                <TypingEffect className="custom-class md:text-sm text-xs" speed={125} deleteSpeed={50} text={["Edit data yang diperlukan"]} />
                              </DrawerDescription>
                              <div className="w-full flex flex-col gap-y-3 verticalScroll">

                                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                  <Label className="focus-within:text-primary-70 font-normal text-xs md:text-sm text-left">
                                    Pilih Strusktur Yang Ditampilkan
                                  </Label>

                                  <Select
                                    onValueChange={handleSelectChange}
                                  >
                                    <SelectTrigger
                                      className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                      <SelectValue
                                        placeholder="Pilih Bidang"
                                        className="text-black-80 w-full"
                                      />
                                    </SelectTrigger>
                                    <SelectContent className="bg-line-10">
                                      <div className="pt-2">
                                        {organizations &&
                                          organizations.length > 0 &&
                                          organizations.map(
                                            (
                                              organization: StructureOrganizationInterface,
                                              i: number
                                            ) => {
                                              return (
                                                <SelectItem
                                                  key={i}
                                                  className={`w-full px-4`}
                                                  value={organization.id.toString()}>
                                                  {organization?.jabatan}
                                                </SelectItem>
                                              );
                                            }
                                          )}
                                      </div>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="flex gap-4 justify-between">
                                <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg text-xs">
                                  <DrawerDescription className="text-xs md:text-sm">Batal</DrawerDescription>
                                </DrawerClose>
                                <Button
                                  title="Simpan Data"
                                  type="submit"
                                  disabled={isUpdateLoading ? true : false}
                                  className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-xs md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-full">
                                  {isUpdateLoading ? (
                                    <Loader className="animate-spin" />
                                  ) : (
                                    "Simpan"
                                  )}
                                </Button>
                              </div>
                            </form>
                          </DrawerHeader>
                        </DrawerContent>
                      </Drawer>
                    </div>
                  </div> */}
                  <div className="w-full">
                    <Button
                      disabled={isDeleteLoading ? true : false}
                      onClick={() =>
                        handleDeleteStructureOrganizationMain(organization?.select_id)
                      }
                      className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 text-xs md:text-sm">
                      {isDeleteLoading ? (
                        <Loader className="animate-spin" />
                      ) : isDeleteLoading ? (
                        ""
                      ) : (
                        "Hapus"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">No.</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {index + 1}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Nama Lengkap</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {organization.nama && organization.nama}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Jabatan</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {organization.jabatan && organization.jabatan}
        </div>
      </div>

    </section>
  );
}
