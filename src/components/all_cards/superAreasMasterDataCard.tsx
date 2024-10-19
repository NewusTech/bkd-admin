"use client";

import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { AreasInterface } from "@/types/interface";
import { Loader } from "lucide-react";
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
import EditorProvide from "../pages/areas";
import TypingEffect from "../ui/TypingEffect";
import CombinedReadMoreRichTextDisplay from "../ui/CombinedReadMoreRichTextDisplay";

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
  slug,
  setSlug,
}: {
  area: AreasInterface;
  index: number;
  slug: string;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
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

    setSlug(area?.slug);
  };

  function truncateString(str: string, num: number): string {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  return (
    <>
      <TableRow className="border border-line-20 text-[14px]">
        <TableCell className="text-[14px] text-center">{index + 1}</TableCell>
        <TableCell className="text-[14px] text-center">{area?.nama}</TableCell>
        <TableCell className="text-[14px] text-center">{area?.pj}</TableCell>
        <TableCell className="text-[14px text-center">{area?.nip_pj}</TableCell>
        <TableCell className="text-[14px]">
          {area?.desc && (
            <CombinedReadMoreRichTextDisplay content={area?.desc} keys={true} />
          )}
        </TableCell>
        <TableCell className="text-center flex items-center w-full">
          <div className="w-full flex flex-row items-center justify-center gap-x-2">
            <div className="w-1/2">
              <AlertDialog
                open={isDialogEditOpen}
                onOpenChange={setIsDialogEditOpen}>
                <AlertDialogTrigger
                  key={area?.slug}
                  onClick={() => {
                    handleSetArea();
                    setIsDialogEditOpen(true);
                  }}
                  className="w-full">
                  <div
                    title="Edit Data"
                    className="w-full text-[14px] bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    Edit
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col gap-y-3">
                    <AlertDialogTitle className="text-center">
                      Master Data Bidang
                    </AlertDialogTitle>

                    <div className="w-full flex justify-center gap-y-3">
                      <TypingEffect
                        className="custom-class md:text-sm text-xs"
                        text={["Edit data yang diperlukan"]}
                      />
                    </div>

                    <form
                      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                        handleUpdateArea(e, slug)
                      }
                      className="w-full flex flex-col gap-y-3 max-h-[500px]">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-[16px] text-left">
                            Nama Bidang
                          </Label>

                          <Input
                            id="nama-bidang"
                            name="nama"
                            value={data?.nama}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setData({ ...data, nama: e.target.value })}
                            type="text"
                            className="w-full text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Nama Bidang"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-[16px] text-left">
                            Penanggung Jawab
                          </Label>

                          <Input
                            id="pj"
                            name="pj"
                            value={data.pj}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setData({ ...data, pj: e.target.value })}
                            type="text"
                            className="w-full text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Nama Penanggung Jawab"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="nip-pj"
                            className="focus-within:text-primary-70 font-normal text-[16px] text-left">
                            NIP Penanggung Jawab
                          </Label>

                          <Input
                            id="nip-pj"
                            name="nip_pj"
                            value={data.nip_pj}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setData({ ...data, nip_pj: e.target.value })}
                            type="text"
                            inputMode="numeric"
                            className="w-full text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan NIP Penanggung Jawab"
                          />
                        </div>

                        <div className="w-full flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-[16px] text-left">
                            Deskripsi Bidang
                          </Label>

                          <div className="w-full h-full border border-line-20 rounded-lg text-left">
                            <EditorProvide
                              content={data.desc}
                              onChange={(e: any) =>
                                setData({ ...data, desc: e })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-between items-center">
                        <AlertDialogCancel>
                          <AlertDialogDescription className="text-center text-[16px] pl-3 pr-3">
                            Batal
                          </AlertDialogDescription>
                        </AlertDialogCancel>
                        <Button
                          title="Simpan Data"
                          type="submit"
                          disabled={isUpdateLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[16px] px-3 rounded-lg border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                          {isUpdateLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="w-1/2">
              <Button
                title="Hapus Data"
                disabled={isDeleteLoading ? true : false}
                onClick={() => handleDeleteArea(area?.slug)}
                className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 h-10 text-[14px] px-3 border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
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
