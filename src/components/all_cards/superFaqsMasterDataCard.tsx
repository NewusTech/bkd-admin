"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { FaqsInterface } from "@/types/interface";
import { Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function SuperFaqsMasterDataCard({
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
  const handleSetFaqs = () => {
    setData({
      answer: faq?.answer,
      question: faq?.question,
    });
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-left">{index + 1}</TableCell>
      <TableCell className="text-left">{faq?.question}</TableCell>
      <TableCell className="text-left">{faq?.answer}</TableCell>
      <TableCell className="text-left flex items-center w-full">
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
              open={isDialogEditOpen}
              onOpenChange={setIsDialogEditOpen}>
              <AlertDialogTrigger
                onClick={() => {
                  handleSetFaqs();
                  setIsDialogEditOpen(true);
                }}
                className="w-full">
                <div className="w-full text-[14px] md:text-[16px] bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2x ">
                  Edit
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center">
                    Master Data Faqs
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Input data yang diperlukan
                  </AlertDialogDescription>

                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleUpdateFaqs(e, faq?.id)
                    }
                    className="w-full flex flex-col gap-y-3 verticalScroll">

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                      <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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

                    <div className="w-full flex flex-row justify-between items-center gap-x-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button
                        type="submit"
                        disabled={isUpdateLoading ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
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

          <div className="w-full">
            <Button
              disabled={isDeleteLoading ? true : false}
              onClick={() => handleDeleteFaqs(faq?.id)}
              className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
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
  );
}
