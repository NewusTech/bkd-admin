"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { AreasInterface, NipInterface } from "@/types/interface";
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

export default function MobileSuperManagementListCard({
  item,
  index,
  data2,
  setData2,
  isUpdateLoading,
  handleUpdateNipData,
  isDrawerEditOpen,
  setIsDrawerEditOpen,
  nipId,
  setNipId,
}: {
  item: NipInterface;
  nipId: number | null;
  setNipId: React.Dispatch<React.SetStateAction<number | null>>;
  index: number;
  data2: {
    nip: string;
    name:string
  };
  setData2: React.Dispatch<
    React.SetStateAction<{
      nip: string;
      name:string
    }>
  >;
  isUpdateLoading: boolean;
  handleUpdateNipData: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  isDrawerEditOpen: boolean;
  setIsDrawerEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleSetNipData = () => {
    setData2({
      nip: item?.nip,
      name : item.name
    });

    setNipId(item?.id);
  };

  function truncateString(str: string, num: number): string {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  return (
    <>
      <section className="w-full bg-line-10 rounded-lg shadow-md p-4 mb-4">
        <div className="w-full flex justify-end items-end">
          <div className="w-full text-xs md:text-sm flex justify-end">
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
                {/* <hr className="border border-primary transition-all ease-in-out animate-pulse ml-2 mr-2" /> */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all animate-pulse"></div>
                <div className="bg-white w-full h-full">
                  <div className="flex flex-col gap-y-2 w-full px-2 py-2">
                    <div className="w-full">
                      <div className="w-full">
                        <Drawer
                          open={isDrawerEditOpen}
                          onOpenChange={setIsDrawerEditOpen}>
                          <DrawerTrigger
                            onClick={() => {
                              handleSetNipData();
                              setIsDrawerEditOpen(true);
                            }}
                            className="w-full">
                            <div
                              //   name="Edit"
                              //   title="Edit Data"
                              className="w-full h-10 text-[14px] px-3 rounded-lg border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 hover:text-line-10">
                              Edit
                            </div>
                          </DrawerTrigger>
                          <DrawerContent className="bg-line-10">
                            <DrawerHeader>
                              <DrawerTitle className="text-[16px]">
                                Master Data NIP
                              </DrawerTitle>
                              <form
                                onSubmit={(
                                  e: React.FormEvent<HTMLFormElement>
                                ) => handleUpdateNipData(e, nipId as number)}
                                className="w-full flex flex-col gap-y-3 max-h-full">
                                <div className="text-center mb-4">
                                  <TypingEffect
                                    className="custom-class text-[14px]"
                                    text={["Edit data yang diperlukan...."]}
                                  />
                                </div>

                                <div className="w-full flex flex-col gap-y-5 verticalScroll">
                                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                                    <Label className="focus-within:text-primary-70 font-normal text-[14px] text-left">
                                      NIP
                                    </Label>
                                    <Input
                                      id="nip"
                                      name="nip"
                                      value={data2?.nip}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) =>
                                        setData2({
                                          ...data2,
                                          nip: e.target.value,
                                        })
                                      }
                                      type="text"
                                      className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px]"
                                      placeholder="Masukkan NIP"
                                    />
                                  </div>
                                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                                    <Label className="focus-within:text-primary-70 font-normal text-[14px] text-left">
                                      NAMA
                                    </Label>
                                    <Input
                                      id="name"
                                      name="name"
                                      value={data2?.name}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) =>
                                        setData2({
                                          ...data2,
                                          name: e.target.value,
                                        })
                                      }
                                      type="text"
                                      className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px]"
                                      placeholder="Masukkan NIP"
                                    />
                                  </div>

                                  <div className="flex gap-4 justify-between">
                                    <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg text-xs">
                                      <DrawerDescription className="text-[14px]">
                                        Batal
                                      </DrawerDescription>
                                    </DrawerClose>
                                    <Button
                                      title="Simpan Data"
                                      type="submit"
                                      disabled={isUpdateLoading ? true : false}
                                      className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[14px] px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-full">
                                      {isUpdateLoading ? (
                                        <Loader className="animate-spin" />
                                      ) : (
                                        "Simpan"
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </form>
                            </DrawerHeader>
                          </DrawerContent>
                        </Drawer>
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="text-[14px] flex flex-col gap-y-4">
          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">No.</div>
            <div className="w-full col-span-2">: {index + 1}</div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">NIP</div>
            <div className="w-full col-span-2">: {item?.nip}</div>
          </div>
        </div>
      </section>
    </>
  );
}
