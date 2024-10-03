"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import EditorProvide from "../pages/areas";
import TypingEffect from "../ui/TypingEffect";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function SuperAreasMasterDataCard({
  area,
  index,
  handleDeleteArea,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  handleUpdateArea,
  isDialogEditOpen,
  setIsDialogEditOpen,

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
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
      <TableRow className="border border-line-20 text-sm text-left">
        <TableCell className="text-sm">{index + 1}</TableCell>
        <TableCell className="text-sm">{area?.nama}</TableCell>
        <TableCell className="text-sm">{area?.pj}</TableCell>
        <TableCell className="text-sm">{area?.nip_pj}</TableCell>
        <TableCell className="text-sm">
          {truncateString(area?.desc, 30)}
        </TableCell>
        <TableCell className="text-center flex items-center w-full">
          <div className="w-full flex flex-row items-center justify-center gap-x-2">
            {/* <div className="w-full">
            <Button title="Lihat Data" className="w-full text-sm bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
              Lihat
            </Button>
          </div> */}
            <div className="w-full">
              <AlertDialog
                open={isDialogEditOpen}
                onOpenChange={setIsDialogEditOpen}>
                <AlertDialogTrigger
                  onClick={() => {
                    handleSetArea();
                    setIsDialogEditOpen(true);
                  }}
                  className="w-full">
                  <Button
                    name="Edit"
                    title="Edit Data"
                    className='h-10 text-xs md:text-sm px-3 rounded-lg border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 hover:text-line-10'>
                    Edit
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col">
                    <AlertDialogTitle className="text-center">
                      Master Data Bidang
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      <TypingEffect text={["Edit data yang diperlukan"]} />
                    </AlertDialogDescription>
                    <form
                      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                        handleUpdateArea(e, area?.slug)
                      }
                      className="w-full flex flex-col gap-y-3 max-h-[500px]">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-xs lg:text-sm text-left">
                            Nama Bidang
                          </Label>
                          <Input
                            id="nama-bidang"
                            name="nama"
                            value={data?.nama}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setData({ ...data, nama: e.target.value })
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setData({ ...data, nip_pj: e.target.value })
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
                              onChange={(e: any) => setData({ ...data, desc: e })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-between items-center gap-x-5">
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <Button
                          title="Simpan Data"
                          type="submit"
                          disabled={isUpdateLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-xs md:text-sm px-3 rounded-lg border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                          {isUpdateLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </AlertDialogHeader>
                  {/* <AlertDialogFooter className="w-full flex flex-row justify-center items-center gap-x-5"></AlertDialogFooter> */}
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="w-full">
              <Button
                title="Hapus Data"
                disabled={isDeleteLoading ? true : false}
                onClick={() => handleDeleteArea(area?.slug)}
                className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 h-10 text-xs md:text-sm px-3 border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
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
        </TableCell>
      </TableRow>
    </>

  );
}
