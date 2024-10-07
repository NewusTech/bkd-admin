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
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4 mb-4">
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
                Actions
              </DropdownMenuLabel>
              {/* <hr className="border border-primary transition-all ease-in-out animate-pulse ml-2 mr-2" /> */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all animate-pulse"></div>
              <div className="bg-white w-full h-full">
                <div className="gap-4 w-full px-2 py-2">
                  <div className="w-full mb-2">
                    <div className="w-full">
                      <Drawer open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
                        <DrawerTrigger
                          onClick={() => {
                            handleSetFaqs();
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
                                handleUpdateFaqs(e, faq?.id)
                              }
                              className="w-full flex flex-col gap-y-3 max-h-full h-[700px]">
                              <DrawerDescription className="text-center">
                                <TypingEffect className="custom-class md:text-sm text-xs" speed={125} deleteSpeed={50} text={["Edit data yang diperlukan"]} />
                              </DrawerDescription>
                              <div className="w-full flex flex-col gap-y-3 verticalScroll">

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
                  </div>
                  <div className="w-full">
                    <Button
                      disabled={isDeleteLoading ? true : false}
                      onClick={() => handleDeleteFaqs(faq?.id)}
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
          {/* <hr className="border border-primary transition-all ease-in-out animate-pulse ml-2 mr-2" /> */}
        </div>
      </div>

      <>
        <div className="text-xs md:text-sm flex flex-col gap-y-4">
          <div className="w-full grid grid-cols-3">
            <div className="w-full text-xs md:text-sm">No.</div>

            <div className="w-full col-span-2 text-xs md:text-sm">
              : {index + 1}
            </div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full text-xs md:text-sm">Pertanyaan</div>

            <div className="w-full col-span-2 text-xs md:text-sm">
              : {faq?.question && faq?.question}
            </div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full text-xs md:text-sm">Jawaban</div>

            <div className="w-full col-span-2 text-xs md:text-sm">
              : {faq?.answer && faq?.answer}
            </div>
          </div>
        </div>
      </>

    </section>
  );
}