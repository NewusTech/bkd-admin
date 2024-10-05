"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { AreasInterface } from "@/types/interface";
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

export default function MobileSuperAreasMasterDataCard({
  area,
  index,
  handleDeleteArea,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  handleUpdateArea,
  isDrawerEditOpen,
  setIsDrawerEditOpen,
}: {
  area: AreasInterface;
  index: number;
  handleDeleteArea: (slug: string) => void;
  isDeleteLoading: boolean;
  data: {
    nama: string;
    desc: string;
    pj: string;
    nip_pj: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      nama: string;
      desc: string;
      pj: string;
      nip_pj: string;
    }>
  >;
  isUpdateLoading: boolean;
  handleUpdateArea: (e: React.FormEvent<HTMLFormElement>, slug: string) => void;
  isDrawerEditOpen: boolean;
  setIsDrawerEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleSetArea = () => {
    setData({
      nama: area?.nama,
      desc: area?.desc,
      pj: area?.pj,
      nip_pj: area?.nip_pj,
    });
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
                <DropdownMenuLabel className="font-semibold text-primary text-sm w-full shadow-md">
                  Actions
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
                              handleSetArea();
                              setIsDrawerEditOpen(true);
                            }}
                            className="w-full">
                            <div
                              //   name="Edit"
                              //   title="Edit Data"
                              className="w-full h-10 text-xs md:text-sm px-3 rounded-lg border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 hover:text-line-10">
                              Edit
                            </div>
                          </DrawerTrigger>
                          <DrawerContent className="bg-line-10">
                            <DrawerHeader>
                              <DrawerTitle>Master Data Bidang</DrawerTitle>
                              <form
                                onSubmit={(
                                  e: React.FormEvent<HTMLFormElement>
                                ) => handleUpdateArea(e, area?.slug)}
                                className="w-full flex flex-col gap-y-3 max-h-full">
                                <div className="text-center mb-4">
                                  <TypingEffect className="custom-class md:text-sm text-xs"
                                    text={["Edit data yang diperlukan...."]}
                                  />
                                </div>

                                <div className="w-full flex flex-col gap-y-3 verticalScroll">
                                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                    <Label className="focus-within:text-primary-70 font-normal text-xs lg:text-sm text-left">
                                      Nama Bidang
                                    </Label>
                                    <Input
                                      id="nama-bidang"
                                      name="nama"
                                      value={data?.nama}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) =>
                                        setData({
                                          ...data,
                                          nama: e.target.value,
                                        })
                                      }
                                      type="text"
                                      className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                      placeholder="Masukkan Nama Bidang"
                                    />
                                  </div>

                                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                    <Label className="focus-within:text-primary-70 font-normal text-xs lg:text-sm text-left">
                                      Penanggung Jawab
                                    </Label>
                                    <Input
                                      id="pj"
                                      name="pj"
                                      value={data.pj}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) =>
                                        setData({ ...data, pj: e.target.value })
                                      }
                                      type="text"
                                      className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                      placeholder="Masukkan Nama Penanggung Jawab"
                                    />
                                  </div>

                                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                    <Label
                                      htmlFor="nip-pj"
                                      className="focus-within:text-primary-70 font-normal text-xs lg:text-sm text-left">
                                      NIP Penanggung Jawab
                                    </Label>
                                    <Input
                                      id="nip-pj"
                                      name="nip_pj"
                                      value={data.nip_pj}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) =>
                                        setData({
                                          ...data,
                                          nip_pj: e.target.value,
                                        })
                                      }
                                      type="text"
                                      inputMode="numeric"
                                      className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                      placeholder="Masukkan NIP Penanggung Jawab"
                                    />
                                  </div>

                                  <div className="w-full flex flex-col gap-y-3">
                                    <Label className="focus-within:text-primary-70 font-normal text-xs lg:text-sm text-left">
                                      Deskripsi Bidang
                                    </Label>
                                    <div className="w-full h-[250px] border border-line-20 rounded-lg text-left">
                                      <EditorProvide
                                        content={data.desc}
                                        onChange={(e: any) =>
                                          setData({ ...data, desc: e })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="flex gap-4 justify-center">
                                    <DrawerClose>
                                      <DrawerDescription>
                                        Batal
                                      </DrawerDescription>
                                    </DrawerClose>
                                    <Button
                                      title="Simpan Data"
                                      type="submit"
                                      disabled={isUpdateLoading ? true : false}
                                      className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-xs md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-fit">
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
                    <div className="w-full">
                      <Button
                        title="Hapus Data"
                        disabled={isDeleteLoading ? true : false}
                        onClick={() => handleDeleteArea(area?.slug)}
                        className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 h-10 text-xs md:text-sm px-3 border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
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
            {/* <hr className="border border-primary transition-all ease-in-out animate-pulse ml-2 mr-2" /> */}
          </div>
        </div>
        <div className="text-xs md:text-sm flex flex-col gap-y-4">
          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">No.</div>
            <div className="w-full col-span-2">: {index + 1}</div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">Nama Bidang</div>
            <div className="w-full col-span-2">: {area?.nama}</div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">
              Penanggung Jawab
            </div>
            <div className="w-full col-span-2">: {area?.pj}</div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">
              NIP Penanggung Jawab
            </div>
            <div className="w-full col-span-2">: {area?.nip_pj}</div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">Deskripsi</div>
            <div className="w-full col-span-2">: {area?.desc}</div>
          </div>
        </div>

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
      </section>
    </>
  );
}
