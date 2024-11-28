"use client";

import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { AreasInterface, NipInterface } from "@/types/interface";
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

export default function SuperManagementListCard({
  item,
  index,
  data2,
  setData2,
  isUpdateLoading,
  handleUpdateNipData,
  isDialogEditOpen,
  setIsDialogEditOpen,
  nipId,
  setNipId,
}: {
  item: NipInterface;
  index: number;
  nipId: number | null;
  setNipId: React.Dispatch<React.SetStateAction<number | null>>;
  data2: {
    nip: string;
    name: string;
  };
  setData2: React.Dispatch<
    React.SetStateAction<{
      nip: string;
      name: string;
    }>
  >;
  isUpdateLoading: boolean;
  handleUpdateNipData: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleSetNipData = () => {
    setData2({
      nip: item?.nip,
      name: item.name,
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
      <TableRow className="border border-line-20 text-[14px]">
        <TableCell className="text-[14px] text-center">{index + 1}</TableCell>
        <TableCell className="text-[14px text-center">{item?.nip}</TableCell>
        <TableCell className="text-[14px text-center">{item?.name}</TableCell>
        <TableCell className="text-center flex items-center w-full">
          <div className="w-full flex flex-row items-center justify-center gap-x-2">
            <div className="w-1/2">
              <AlertDialog
                open={isDialogEditOpen}
                onOpenChange={setIsDialogEditOpen}
              >
                <AlertDialogTrigger
                  key={item?.id}
                  onClick={() => {
                    handleSetNipData();
                    setIsDialogEditOpen(true);
                  }}
                  className="w-full"
                >
                  <div
                    title="Edit Data"
                    className="w-full text-[14px] bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2"
                  >
                    Edit
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col gap-y-3">
                    <AlertDialogTitle className="text-center">
                      Master Data NIP
                    </AlertDialogTitle>

                    <div className="w-full flex justify-center gap-y-3">
                      <TypingEffect
                        className="custom-class md:text-sm text-xs"
                        text={["Edit data yang diperlukan"]}
                      />
                    </div>

                    <form
                      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                        handleUpdateNipData(e, nipId as number)
                      }
                      className="w-full flex flex-col gap-y-3 max-h-[500px]"
                    >
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-[16px] text-left">
                            NIP
                          </Label>

                          <Input
                            id="nip"
                            name="nip"
                            value={data2?.nip}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setData2({ ...data2, nip: e.target.value })}
                            type="text"
                            className="w-full text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan NIP"
                          />
                        </div>
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-[16px] text-left">
                            Nama
                          </Label>

                          <Input
                            id="name"
                            name="name"
                            value={data2?.name}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setData2({ ...data2, name: e.target.value })}
                            type="text"
                            className="w-full text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Nama"
                          />
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
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[16px] px-3 rounded-lg border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2"
                        >
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
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
