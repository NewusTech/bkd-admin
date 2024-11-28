"use client";

import React, { useRef } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import { ManualBooksInterfaceInterface } from "@/types/interface";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CloudArrowUp } from "@phosphor-icons/react";
import Image from "next/image";
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
} from "@/components/ui/dropdown-menu";
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

export default function MobileManualBookCard({
  book,
  index,
  data,
  setData,
  isUpdateLoading,
  handleUpdateManualBook,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  handleVideoChange,
  manualFile,
  fileName,
  videoName,
  previewFile,
  previewVideo,
  isDrawerEditOpen,
  setIsDrawerEditOpen,
}: {
  book: ManualBooksInterfaceInterface;
  index: number;
  data: {
    title: string;
    dokumen: string;
    video_tutorial: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      dokumen: string;
      video_tutorial: string;
    }>
  >;
  handleUpdateManualBook: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  manualFile: File | null;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropImage: (e: React.DragEvent<HTMLDivElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
  videoName: string;
  previewFile: string;
  previewVideo: string;
  isDrawerEditOpen: boolean;
  setIsDrawerEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dropRef = useRef<HTMLDivElement>(null);
  const handleSetManual = () => {
    setData({
      title: book.title,
      dokumen: book.dokumen,
      video_tutorial: book.video_tutorial || "",
    });
  };

  return (
    <>
      <section>
        <div className="w-full flex justify-end items-end">
          <div className="w-full text-[14px] md:text-[16px] flex justify-end">
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
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all animate-pulse"></div>
                <div className="bg-white w-full h-full">
                  <div className="flex flex-col gap-y-2 w-full px-2 py-2">
                    <div className="w-full">
                      <div className="w-full">
                        <Drawer
                          open={isDrawerEditOpen}
                          onOpenChange={setIsDrawerEditOpen}
                        >
                          <DrawerTrigger
                            onClick={() => {
                              handleSetManual();
                              setIsDrawerEditOpen(true);
                            }}
                            className="w-full"
                          >
                            <div
                              //   name="Edit"
                              //   title="Edit Data"
                              className="w-full h-10 text-[14px] md:text-[16px] px-3 rounded-lg border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 hover:text-line-10"
                            >
                              Edit
                            </div>
                          </DrawerTrigger>
                          <DrawerContent className="bg-line-10">
                            <DrawerHeader>
                              <DrawerTitle>Master Data Manual Book</DrawerTitle>
                              <form
                                onSubmit={(
                                  e: React.FormEvent<HTMLFormElement>
                                ) => handleUpdateManualBook(e, book?.id)}
                                className="w-full flex flex-col gap-y-3 max-h-full"
                              >
                                <div className="text-center mb-4">
                                  <TypingEffect
                                    className="custom-class md:text-sm text-xs"
                                    text={["Edit data yang diperlukan...."]}
                                  />
                                </div>

                                <div className="w-full flex flex-col gap-y-3 verticalScroll">
                                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                    <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px] text-left">
                                      Nama Manual Books
                                    </Label>
                                    <Input
                                      id="title"
                                      name="title"
                                      value={data?.title}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) =>
                                        setData({
                                          ...data,
                                          title: e.target.value,
                                        })
                                      }
                                      type="text"
                                      className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                      placeholder="Masukkan Nama Manual Book"
                                    />
                                  </div>

                                  {/* atas */}
                                  <div className="flex flex-col gap-y-5 mt-3 md:mt-0">
                                    <div className="flex flex-col items-center w-full gap-y-5">
                                      <div className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-line-10 border border-primary-40 px-4">
                                        <div className="flex flex-col w-full justify-center gap-[9px]">
                                          <h6 className="text-[14px] md:text-[16px] text-black-80 font-normal">
                                            File Manual Book
                                            <span className="text-error-50 text-[14px] font-normal">
                                              *
                                            </span>
                                          </h6>

                                          <div className="text-error-50 text-[14px]">
                                            Data Wajib Diisi!
                                          </div>
                                        </div>
                                        <div className="flex self-center items-center w-full md:justify-end">
                                          <input
                                            id="file-input-image"
                                            type="file"
                                            className="md:appearance-none hidden"
                                            onChange={handleImageChange}
                                          />
                                          <label
                                            htmlFor="file-input-image"
                                            className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-sm hover:bg-primary-40 hover:text-line-10 border border-primary-40 text-primary-40 py-[10px] cursor-pointer"
                                          >
                                            {fileName || "Upload"}
                                          </label>

                                          <Dialog>
                                            <DialogTrigger className="w-full md:w-3/12">
                                              <div className="flex items-center text-sm justify-center w-full text-black-80 font-normal hover:text-primary-40 hover:border-b hover:border-line-20 ml-4 mr-2">
                                                Lihat File
                                              </div>
                                            </DialogTrigger>
                                            <DialogContent className="flex flex-col justify-between w-full bg-line-10">
                                              <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 z-50">
                                                <div className="bg-primary-100 rounded-xl shadow-md max-w-full">
                                                  {previewFile && (
                                                    <iframe
                                                      src={previewFile}
                                                      className="w-full h-64"
                                                    />
                                                  )}
                                                </div>
                                              </div>
                                            </DialogContent>
                                          </Dialog>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-y-5 mt-3 md:mt-0">
                                    <div className="flex flex-col items-center w-full gap-y-5">
                                      <div className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-line-10 border border-primary-40 px-4">
                                        <div className="flex flex-col w-full justify-center gap-[9px]">
                                          <h6 className="text-[14px] md:text-[16px] text-black-80 font-normal">
                                            File Vieo Tutorial
                                            <span className="text-error-50 text-[14px] font-normal">
                                              *
                                            </span>
                                          </h6>

                                          <div className="text-error-50 text-[14px]">
                                            Data Wajib Diisi!
                                          </div>
                                        </div>
                                        <div className="flex self-center items-center w-full md:justify-end">
                                          <input
                                            id="file-video"
                                            type="file"
                                            className="md:appearance-none hidden"
                                            onChange={handleVideoChange}
                                          />
                                          <label
                                            htmlFor="file-video"
                                            className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-sm hover:bg-primary-40 hover:text-line-10 border border-primary-40 text-primary-40 py-[10px] cursor-pointer"
                                          >
                                            {videoName || "Upload"}
                                          </label>

                                          <Dialog>
                                            <DialogTrigger className="w-full md:w-3/12">
                                              <div className="flex items-center text-sm justify-center w-full text-black-80 font-normal hover:text-primary-40 hover:border-b hover:border-line-20 ml-4 mr-2">
                                                Lihat File
                                              </div>
                                            </DialogTrigger>
                                            <DialogContent className="flex flex-col justify-between w-full bg-line-10">
                                              <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 z-50">
                                                <div className="bg-primary-100 rounded-xl shadow-md max-w-full">
                                                  {previewVideo && (
                                                    <iframe
                                                      src={previewVideo}
                                                      className="w-full h-64"
                                                    />
                                                  )}
                                                </div>
                                              </div>
                                            </DialogContent>
                                          </Dialog>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* bawah */}
                                </div>

                                <div className="flex gap-4 justify-between">
                                  <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg text-xs">
                                    <DrawerDescription className="text-[14px] md:text-[16px]">
                                      Batal
                                    </DrawerDescription>
                                  </DrawerClose>
                                  <Button
                                    title="Simpan Data"
                                    type="submit"
                                    disabled={isUpdateLoading ? true : false}
                                    className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[14px] md:text-[16px] px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-full"
                                  >
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
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="text-[14px] md:text-[16px] flex flex-col gap-y-4">
          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">No.</div>
            <div className="w-full col-span-2">: {index + 1}</div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">Nama Bidang</div>
            <div className="w-full col-span-2">: {book?.title}</div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">Dokumen</div>
            <div className="w-full col-span-2 text-[14px] md:text-[16px] ">
              <div className="w-full flex">
                <span>: </span>
                <div className="">
                  <span>
                    <AlertDialog>
                      <AlertDialogTrigger className="w-full text-left pl-1">
                        <Link
                          href={book.dokumen}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Lihat Dokumen
                        </Link>
                      </AlertDialogTrigger>
                    </AlertDialog>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-3">
            <div className="w-full font-medium text-black">Video Tutorial</div>
            <div className="w-full col-span-2 text-[14px] md:text-[16px] ">
              {book.video_tutorial ? (
                <div className="w-full flex">
                  <span>: </span>
                  <div className="">
                    <span>
                      <AlertDialog>
                        <AlertDialogTrigger className="w-full text-left pl-1">
                          <Link
                            href={book.dokumen}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Lihat Video
                          </Link>
                        </AlertDialogTrigger>
                      </AlertDialog>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full col-span-2 text-italic text-gray-500">
                  : Belum Upload Video
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
