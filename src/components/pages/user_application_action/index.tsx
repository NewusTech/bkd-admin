"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserApplicationActionsInterface } from "@/types/interface";

export default function UserApplicationActions({
  id,
  name,
  isGlobalDialog,
  setIsGlobalDialog,
  handleSubmit,
  data,
  setData,
  isGlobalLoading,
}: UserApplicationActionsInterface) {
  return (
    <div className="w-full md:w-full">
      <AlertDialog open={isGlobalDialog} onOpenChange={setIsGlobalDialog}>
        <AlertDialogTrigger
          onClick={() => setIsGlobalDialog(true)}
          className="w-full">
          <div
            className={`w-full py-6 text-[14px] ${name === "Perbaiki" ? "bg-primary-40 hover:bg-primary-70" : "bg-error-50 hover:bg-error-70"} flex items-center justify-center h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2`}>
            {name}
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
          <AlertDialogHeader className="flex flex-col max-h-[500px]">
            <AlertDialogTitle className="text-center">
              Data pemohon tidak sesuai?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Silakan masukan catatan untuk pemohon
            </AlertDialogDescription>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                handleSubmit(e, id);
              }}
              className="w-full flex flex-col gap-y-3 verticalScroll">
              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label className="focus-within:text-primary-70 font-normal text-sm">
                  Berikan Pesan Kepada Pemohon!
                </Label>

                <Textarea
                  id="pesan"
                  name="pesan"
                  value={data.pesan}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setData({ ...data, pesan: e.target.value })
                  }
                  className="w-full h-[80px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                  placeholder="Masukkan Jawaban Anda"
                />
              </div>

              <div className="w-full flex flex-row justify-center items-center gap-x-5">
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <Button
                  type="submit"
                  disabled={isGlobalLoading ? true : false}
                  className="bg-primary-40 hover:bg-primary-70 text-line-10">
                  {isGlobalLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Kirim"
                  )}
                </Button>
              </div>
            </form>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
