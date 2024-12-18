"use client";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import React, { useRef } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { NewsInterface } from "@/types/interface";
import { Loader } from "lucide-react";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Trash } from "@phosphor-icons/react";
import Image from "next/image";
import EditorProvide from "../pages/areas";
import { RichTextDisplay } from "../ui/RichTextDisplay";
import ReadMore from "../ui/ReadMore";
import CombinedReadMoreRichTextDisplay from "../ui/CombinedReadMoreRichTextDisplay";
import TypingEffect from "../ui/TypingEffect";
import { truncateTitle } from "@/lib/utils";
import parse from "html-react-parser";

export default function SuperNewsMasterDataCard({
  item,
  index,
  handleDeleteNews,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  handleUpdateNews,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  handleRemoveImage,
  previewImage,
}: {
  item: NewsInterface;
  index: number;
  handleDeleteNews: (slug: string) => void;
  isDeleteLoading: boolean;
  data: {
    title: string;
    desc: string;
    image: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      desc: string;
      image: string;
    }>
  >;
  isUpdateLoading: boolean;
  handleUpdateNews: (e: React.FormEvent<HTMLFormElement>, slug: string) => void;
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
  const handleSetService = () => {
    setData({
      title: item?.title,
      desc: item?.desc,
      image: item?.image,
    });
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-start">{index + 1}</TableCell>
      <TableCell className="text-start">{item.title}</TableCell>
      <TableCell className="text-start">
        {/* <ReadMore text={item.desc}></ReadMore> */}
        {/* {item.desc && (
          <ReadMore text={item.desc}/>
          <RichTextDisplay content={item.desc} />
          <CombinedReadMoreRichTextDisplay content={item.desc} keys={true} />
        )} */}
        <div className="line-clamp-3">{item.desc && parse(item?.desc)}</div>
      </TableCell>
      <TableCell className="text-start">
        <div className="w-full">
          <AlertDialog>
            <AlertDialogTrigger className="w-full">
              <div className="w-full text-[14px] flex items-center justify-center h-10 text-black-80 hover:underline hover:text-primary-40 rounded-lg">
                Lihat Foto Berita
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
              <AlertDialogHeader className="flex flex-col max-h-[500px]">
                <AlertDialogTitle className="text-center text-[16px]">
                  Master Data
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center text-[14px]">
                  Berita
                </AlertDialogDescription>
                {item && (
                  <div className="w-full h-full flex justify-center">
                    <Image
                      src={item?.image}
                      alt="Slider"
                      width={1000}
                      height={1000}
                      className="w-10/12 h-96"
                      // className="w-10/12 h-5/6"
                    />
                  </div>
                )}
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="hover:bg-line-70 hover:text-line-10 text-center w-fit flex m-auto text-[16px]">
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
      <TableCell className="text-center flex items-center w-full">
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
              open={isDialogEditOpen}
              onOpenChange={setIsDialogEditOpen}>
              <AlertDialogTrigger
                onClick={() => {
                  handleSetService();
                  setIsDialogEditOpen(true);
                }}
                className="w-full">
                <div className="w-full text-[14px] bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                  Edit
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col">
                  <AlertDialogTitle className="text-center text-[16px]">
                    Master Data Berita
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
                      handleUpdateNews(e, item?.slug)
                    }
                    className="w-full flex flex-col gap-y-3 max-h-[500px]">
                    <div className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                          Judul Berita
                        </Label>
                        <Input
                          id="nama-bidang"
                          name="title"
                          value={data.title}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData({
                              ...data,
                              title: e.target.value,
                            })
                          }
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[16px]"
                          placeholder="Masukkan Judul Berita"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                          Deskripsi Berita
                        </Label>
                        <div className="w-full h-full border border-line-20 rounded-lg text-[16px]">
                          <EditorProvide
                            content={data.desc}
                            onChange={(e: any) => setData({ ...data, desc: e })}
                          />
                        </div>
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                          Foto Berita
                        </Label>
                        <div className="flex flex-col md:flex-row w-full">
                          <div
                            ref={dropRef}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDropImage}
                            className={`w-full ${
                              data?.image || previewImage
                                ? "md:w-8/12"
                                : "w-full"
                            }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                            <>
                              <input
                                type="file"
                                id="file-input-image"
                                name="image"
                                accept="image/*"
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
                          {(data?.image || previewImage) && (
                            <div className="relative md:ml-4 w-full mt-1">
                              <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                <div className="w-full h-full">
                                  <Image
                                    src={data?.image || previewImage}
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
                      </div>
                    </div>

                    <div className="w-full flex flex-row justify-center md:justify-between items-center gap-x-5">
                      <AlertDialogCancel className="text-[16px]">
                        Cancel
                      </AlertDialogCancel>
                      <Button
                        type="submit"
                        disabled={isUpdateLoading ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 text-[16px]">
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
              onClick={() => handleDeleteNews(item?.slug)}
              className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 text-[14px]">
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
