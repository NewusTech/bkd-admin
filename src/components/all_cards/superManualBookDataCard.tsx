"use client";

// import "quill/dist/quill.snow.css";
// import { useQuill } from "react-quilljs";
import React, { useRef } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import { AreasInterface, ManualBooksInterfaceInterface } from "@/types/interface";
import { Loader } from "lucide-react";
import { Trash } from "@phosphor-icons/react";
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
import Image from "next/image";
import TypingEffect from "../ui/TypingEffect";

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
  handleRemoveImage,
  previewImage,
}: {
  book: ManualBooksInterfaceInterface;
  index: number;
  data: {
    title: string;
    dokumen: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      dokumen: string;
    }>
  >;
  handleUpdateManualBook: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  previewImage: string;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropImage: (e: React.DragEvent<HTMLDivElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
}) {
  const dropRef = useRef<HTMLDivElement>(null);
  const handleSetManual = () => {
    setData({
      title: book.title,
      dokumen: book.dokumen,
    })
  }

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index}</TableCell>
      <TableCell className="text-center">{book.title}</TableCell>
      <TableCell className="text-center">
        <Link href={book.dokumen} target="_blank" rel="noopener noreferrer">
          Lihat Dokumen
        </Link>
      </TableCell>
      <TableCell className="text-center">{new Date(book.createdAt).toLocaleDateString()}</TableCell>
      <TableCell className="text-center flex items-center w-full">
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          {/* Aksi Edit */}
          <div className="w-full">
            <AlertDialog open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
              <AlertDialogTrigger onClick={() => {
                handleSetManual();
                setIsDialogEditOpen(true);
              }} className="w-full">
                <div className="w-full text-[14px] md:text-[16px] bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                  Edit
                </div>
              </AlertDialogTrigger>

              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center">
                    Master Data Manual Books
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    <TypingEffect className="custom-class text-[14px] md:text-[16px]" speed={125} deleteSpeed={50} text={["Edit data yang diperlukan"]} />
                  </AlertDialogDescription>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleUpdateManualBook(e, book?.id)
                    }
                    className="w-full flex flex-col gap-y-3 verticalScroll">

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
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
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Nama Manual Book"
                      />
                    </div>

                    {/* <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                        File
                      </Label>
                      <div className="flex flex-col md:flex-row w-full">
                        <div
                          ref={dropRef}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDropImage}
                          className={`w-full ${data?.dokumen || previewImage ? "md:w-8/12" : "w-full"
                            }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                          <>
                            <input
                              type="file"
                              id="file-input-image"
                              name="file"
                              accept="image/*,.pdf"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                            <label
                              htmlFor="file-input-image"
                              className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                              Drag and drop file here or click to select file
                            </label>
                          </>
                        </div>

                        {(data?.dokumen || previewImage) && (
                          <div className="relative md:ml-4 w-full mt-1">
                            <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                              <div className="w-full h-full">
                                <Image
                                  src={data?.dokumen || previewImage}
                                  width={1000}
                                  height={1000}
                                  alt="Preview"
                                  className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                <Trash />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                    </div> */}

                    <div className="w-full flex flex-row justify-between items-center gap-x-5">
                      <AlertDialogCancel>Batal</AlertDialogCancel>
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
        </div>
      </TableCell>
    </TableRow>

  );
}
