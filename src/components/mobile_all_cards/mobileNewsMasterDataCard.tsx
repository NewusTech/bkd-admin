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
import { NewsInterface } from "@/types/interface";
import Image from "next/image";
import { Label } from "../ui/label";
import EditorProvide from "../pages/areas";
import { Input } from "../ui/input";
import { EllipsisVertical, Loader } from "lucide-react";
import { Trash } from "@phosphor-icons/react";
import CombinedReadMoreRichTextDisplay from "../ui/CombinedReadMoreRichTextDisplay";
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
} from "@/components/ui/dropdown-menu"
import Truncate from "../ui/Truncate";
import { RichTextDisplay } from "../ui/RichTextDisplay";
import TruncateRichText from "../ui/TruncateRichText";

export default function MobileNewsMasterDataCard({
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
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const handleSetService = () => {
    setData({
      title: item?.title,
      desc: item?.desc,
      image: item?.image,
    });

    // if (quillEdit && item?.desc) {
    //   quillEdit.clipboard.dangerouslyPasteHTML(item?.desc);
    // }
  };

  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col p-4 mb-4">
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
                            handleSetService();
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
                                handleUpdateNews(e, item?.slug)
                              }
                              className="w-full flex flex-col gap-y-3 max-h-full h-[700px]">
                              <DrawerDescription className="text-center">
                                <TypingEffect className="custom-class md:text-sm text-xs" speed={125} deleteSpeed={50} text={["Edit data yang diperlukan"]} />
                              </DrawerDescription>
                              <div className="w-full flex flex-col gap-y-3 verticalScroll">

                                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                  <Label className="focus-within:text-primary-70 font-normal text-xs md:text-sm text-left">
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
                                    className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                    placeholder="Masukkan Judul Berita"
                                  />
                                </div>

                                <div className="w-full flex flex-col gap-y-2">
                                  <Label className="text-black-70 font-normal text-xs md:text-sm text-left">
                                    Deskripsi Berita
                                  </Label>

                                  <div className="w-full h-full border border-line-20 rounded-lg">
                                    <EditorProvide
                                      content={data.desc}
                                      onChange={(e: any) => setData({ ...data, desc: e })}
                                    />
                                  </div>

                                  {/* <div className="w-full h-[250px] flex flex-col gap-y-2">
                        <div
                          className="flex flex-col h-[250px] w-full border border-line-20 rounded-b-lg"
                          ref={quillEditRef}></div>
                      </div> */}

                                  {/* <Textarea
                        name="desc"
                        placeholder="Masukkan Deskripsi Berita"
                        value={data.desc}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setData({ ...data, desc: e.target.value })
                        }
                        className="w-full rounded-lg h-[74px] border border-line-20 md:h-[122px] text-sm placeholder:opacity-[70%]"
                      /> */}
                                </div>

                                <div className="flex flex-col w-full">
                                  <Label className="text-neutral-700 font-normal mb-2 text-xs md:text-sm text-left">
                                    Foto Berita
                                  </Label>

                                  <div className="flex flex-col md:flex-row w-full">
                                    <div
                                      ref={dropRef}
                                      onDragOver={handleDragOver}
                                      onDragLeave={handleDragLeave}
                                      onDrop={handleDropImage}
                                      className={`w-full ${data?.image || previewImage ? "md:w-8/12" : "w-full"
                                        }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                                      <div>
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
                                      </div>
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
                      onClick={() => handleDeleteNews(item?.slug)}
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
        <div className="text-xs md:text-sm flex flex-col gap-y-4 mt-4">
          <div className="w-full grid grid-cols-3">
            <div className="w-full text-xs md:text-sm">No.</div>

            <div className="w-full col-span-2 text-xs md:text-sm">
              : {index + 1}
            </div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full text-xs md:text-sm">Nama Layanan</div>

            <div className="w-full col-span-2 text-xs md:text-sm">
              : {item.title && item.title}
            </div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full text-xs md:text-sm">Deskripsi</div>
            <div className="w-full col-span-2 text-xs md:text-sm ">
              <div className="w-full flex">
                <span>: </span>
                <div className="">
                  <div className="pl-1">
                    <TruncateRichText content={item.desc} length={20} keys={true} />
                  </div>
                  <span>
                    <AlertDialog>
                      <AlertDialogTrigger className="w-full text-left">
                        Selengkapnya
                      </AlertDialogTrigger>
                      <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                        <AlertDialogHeader className="flex flex-col max-h-[700px]">
                          <AlertDialogTitle className="text-center">
                            Deskripsi Selengkapnya
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-justify">
                            <div className="overflow-y-auto max-h-[500px]"> {/* Tambahkan max-h di sini */}
                              Deskripsi
                              <RichTextDisplay content={item.desc} keys={true} />
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="-mt-6">
                          <AlertDialogCancel className="hover:bg-line-70 hover:text-line-10 text-center w-full flex items-center justify-center">
                            Kembali
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-3">
            <div className="w-full text-xs md:text-sm">Foto Berita</div>
            <div className="w-full col-span-2 text-xs md:text-sm ">
              <div className="w-full flex">
                <span>: </span>
                <div className="">
                  <div className="pl-1">
                    {/* <TruncateRichText content={item.desc} length={20} keys={true} /> */}
                  </div>
                  <span>
                    <AlertDialog>
                      <AlertDialogTrigger className="w-full text-left pl-1">
                        Lihat Foto Berita
                      </AlertDialogTrigger>
                      <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                        <AlertDialogHeader className="flex flex-col max-h-[500px]">
                          <AlertDialogTitle className="text-center">
                            Master Data
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-center">
                            Berita
                          </AlertDialogDescription>
                          {item && (
                            <div className="w-full h-full flex justify-center">
                              <Image
                                src={item?.image}
                                alt="Slider"
                                width={1000}
                                height={1000}
                                className="w-10/12 h-5/6"
                              />
                            </div>
                          )}
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="hover:bg-line-70 hover:text-line-10 text-center w-full flex items-center justify-center">
                            Kembali
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* <TruncateRichText content={item.desc} length={20} keys={true} /> */}
      {/* <RichTextDisplay content={item.desc} keys={true} /> */}
      {/* {item.desc && (
              <CombinedReadMoreRichTextDisplay content={item.desc} keys={true} />
            )} */}
      {/* <Truncate text={item.desc} length={10} /> */}

    </section>
  );
}
