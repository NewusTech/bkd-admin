"use client";

import React, { useRef } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import { ManualBooksInterfaceInterface } from "@/types/interface";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CloudArrowUp } from "@phosphor-icons/react";
import Image from "next/image";
import TypingEffect from "../ui/TypingEffect";
import { formatDateString, formatToWIB } from "@/lib/utils";

export default function SuperManualBookMasterDataCard({
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
  handleDropVideo: (e: React.DragEvent<HTMLDivElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
  videoName: string;
  previewFile: string;
  previewVideo: string;
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
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index}</TableCell>
      <TableCell className="text-center">{book.title}</TableCell>
      <TableCell className="text-center">
        <Link href={book.dokumen} target="_blank" rel="noopener noreferrer">
          Lihat Dokumen
        </Link>
      </TableCell>
      <TableCell className="text-center">
        {book.video_tutorial ? (
          <Link
            href={book.video_tutorial}
            target="_blank"
            rel="noopener noreferrer"
          >
            Lihat Video
          </Link>
        ) : (
          "Belum Upload Video"
        )}
      </TableCell>
      <TableCell className="text-center">
        {book?.createdAt && formatDateString(book?.createdAt)}
      </TableCell>
      <TableCell className="text-center flex items-center w-full">
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          {/* Aksi Edit */}
          <div className="w-full">
            <AlertDialog
              open={isDialogEditOpen}
              onOpenChange={setIsDialogEditOpen}
            >
              <AlertDialogTrigger
                onClick={() => {
                  handleSetManual();
                  setIsDialogEditOpen(true);
                }}
                className="w-full"
              >
                <div className="w-full text-[14px] bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                  Edit
                </div>
              </AlertDialogTrigger>

              <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center text-[16px]">
                    Master Data Manual Books
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    <TypingEffect
                      className="custom-class text-[14px]"
                      speed={125}
                      deleteSpeed={50}
                      text={["Edit data yang diperlukan"]}
                    />
                  </AlertDialogDescription>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleUpdateManualBook(e, book?.id)
                    }
                    className="w-full flex flex-col gap-y-3 verticalScroll"
                  >
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                        Nama Manual Books
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={data?.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData({ ...data, title: e.target.value })
                        }
                        type="text"
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[16px]"
                        placeholder="Masukkan Nama Manual Book"
                      />
                    </div>

                    {/* atas */}
                    <div className="flex flex-col gap-y-5 mt-3 md:mt-0">
                      <div className="flex flex-col items-center w-full gap-y-5">
                        <div className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-line-10 border border-primary-40 px-4">
                          <div className="flex flex-col w-full justify-center gap-[9px]">
                            <h6 className="text-black-80 font-normal text-[16px]">
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
                              className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal hover:bg-primary-40 hover:text-line-10 border border-primary-40 text-primary-40 py-[10px] cursor-pointer"
                            >
                              {fileName || "Upload"}
                            </label>

                            <Dialog>
                              <DialogTrigger className="w-full md:w-3/12">
                                <div className="flex items-center justify-center w-full text-black-80 font-normal hover:text-primary-40 hover:border-b hover:border-line-20 ml-4 mr-2 text-[16px]">
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
                    {/* middle */}
                    <div className="flex flex-col gap-y-5 mt-3 md:mt-0">
                      <div className="flex flex-col items-center w-full gap-y-5">
                        <div className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-line-10 border border-primary-40 px-4">
                          <div className="flex flex-col w-full justify-center gap-[9px]">
                            <h6 className="text-black-80 font-normal text-[16px]">
                              File Video Tutorial
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
                              id="file-input-video"
                              type="file"
                              className="md:appearance-none hidden"
                              onChange={handleVideoChange}
                            />
                            <label
                              htmlFor="file-input-video"
                              className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal hover:bg-primary-40 hover:text-line-10 border border-primary-40 text-primary-40 py-[10px] cursor-pointer"
                            >
                              {videoName || "Upload"}
                            </label>

                            <Dialog>
                              <DialogTrigger className="w-full md:w-3/12">
                                <div className="flex items-center justify-center w-full text-black-80 font-normal hover:text-primary-40 hover:border-b hover:border-line-20 ml-4 mr-2 text-[16px]">
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

                    <div className="w-full flex flex-row justify-between items-center gap-x-5">
                      <AlertDialogCancel className="text-[16px]">
                        Batal
                      </AlertDialogCancel>
                      <Button
                        type="submit"
                        disabled={isUpdateLoading ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 text-[16px]"
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
  );
}
