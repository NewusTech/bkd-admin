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
  FaqsInterface,
  NewsInterface,
  StructureOrganizationInterface,
} from "@/types/interface";
import Image from "next/image";
import { Label } from "../ui/label";
import EditorProvide from "../pages/areas";
import { Input } from "../ui/input";
import { Loader } from "lucide-react";
import { Trash } from "@phosphor-icons/react";

export default function MobileFaqMasterDataCard({
  faq,
  index,
  handleDeleteFaqs,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  handleUpdateFaqs,
  isDialogEditOpen,
  setIsDialogEditOpen,
}: {
  faq: FaqsInterface;
  index: number;
  handleDeleteFaqs: (id: number) => void;
  isDeleteLoading: boolean;
  data: {
    answer: string;
    question: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      answer: string;
      question: string;
    }>
  >;
  isUpdateLoading: boolean;
  handleUpdateFaqs: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const handleSetFaqs = () => {
    setData({
      answer: faq?.answer,
      question: faq?.question,
    });
  };

  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4">
      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">No.</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {index + 1}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Pertanyaan</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {faq?.question && faq?.question}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Jawaban</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {faq?.answer && faq?.answer}
        </div>
      </div>

      <div className="w-full flex flex-row gap-x-5">
        <Drawer open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
          <DrawerTrigger
            onClick={() => {
              handleSetFaqs();
              setIsDialogEditOpen(true);
            }}
            className="w-full text-[14px] border border-black-80 hover:bg-black-80 hover:bg-opacity-20 hover:text-line-10 rounded-lg">
            <div className="w-full">Edit</div>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
            <div className="w-full flex flex-col gap-y-3 verticalScroll">
              <DrawerTitle className="text-center">Master Data FAQ</DrawerTitle>

              <DrawerDescription className="text-center">
                Input data yang diperlukan
              </DrawerDescription>

              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  handleUpdateFaqs(e, faq?.id)
                }
                className="w-full flex flex-col gap-y-3 verticalScroll">
                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label className="focus-within:text-primary-70 font-normal text-sm">
                    Pertanyaan
                  </Label>

                  <Input
                    id="question"
                    name="question"
                    value={data?.question}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setData({ ...data, question: e.target.value })
                    }
                    type="text"
                    className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Pertanyaan Anda"
                  />
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label className="focus-within:text-primary-70 font-normal text-sm">
                    Jawaban
                  </Label>

                  <Input
                    id="answer"
                    name="answer"
                    value={data.answer}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setData({ ...data, answer: e.target.value })
                    }
                    type="text"
                    className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Jawaban Anda"
                  />
                </div>

                <div className="w-full flex flex-row justify-center items-center gap-x-5">
                  {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}

                  <Button
                    type="submit"
                    disabled={isUpdateLoading ? true : false}
                    className="bg-primary-40 hover:bg-primary-70 text-line-10">
                    {isUpdateLoading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Simpan"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </DrawerContent>
        </Drawer>

        <div className="w-full">
          <Button
            disabled={isDeleteLoading ? true : false}
            onClick={() => handleDeleteFaqs(faq?.id)}
            className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10">
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
    </section>
  );
}
