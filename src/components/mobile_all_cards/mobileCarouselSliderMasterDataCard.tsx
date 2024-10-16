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
import { CarouselSliderInterface, NewsInterface } from "@/types/interface";
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

export default function MobileCarouselSliderMasterDataCard({
  carousel,
  index,
  handleDeleteSlider,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  handleUpdateSlider,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  handleRemoveImage,
  previewImage,
  previewImageMobile,
  handleDropImageMobile,
  handleImageChangeMobile,
  handleRemoveImageMobile,
}: {
  carousel: CarouselSliderInterface;
  index: number;
  handleDeleteSlider: (id: number) => void;
  isDeleteLoading: boolean;
  data: {
    image: string;
    image_potrait: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      image: string;
      image_potrait: string;
    }>
  >;
  isUpdateLoading: boolean;
  handleUpdateSlider: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  previewImage: string;
  previewImageMobile: string;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropImage: (e: React.DragEvent<HTMLDivElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  handleDropImageMobile: (e: React.DragEvent<HTMLDivElement>) => void;
  handleImageChangeMobile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImageMobile: () => void;
}) {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const handleSetCarousel = () => {
    setData({
      image: carousel?.image,
      image_potrait: carousel?.image_potrait,
    });
  };

  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4 mb-4">
      <div className="w-full flex justify-end items-end">
        <div className="w-full text-[14px] flex justify-end">
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
                Aksi
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
                            handleSetCarousel();
                            setIsDialogEditOpen(true);
                          }}
                          className="h-10 text-[14px] rounded-lg border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 hover:text-line-10 w-full">
                          Edit
                        </DrawerTrigger>
                        <DrawerContent className="bg-white">
                          <DrawerHeader>
                            <DrawerTitle className="text-center text-[16px]">
                              Master Data Berita
                            </DrawerTitle>
                            <form
                              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                                handleUpdateSlider(e, carousel?.id)
                              }
                              className="w-full flex flex-col gap-y-3 max-h-full h-[700px]">
                              <DrawerDescription className="text-center">
                                <TypingEffect className="custom-class text-[14px]" speed={125} deleteSpeed={50} text={["Edit data yang diperlukan"]} />
                              </DrawerDescription>
                              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                                <Label className="text-neutral-700 font-normal mb-2 text-[14px] text-left">
                                  Slider
                                </Label>

                                <div className="flex flex-col md:flex-row w-full">
                                  <div
                                    ref={dropRef}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDropImage}
                                    className={`w-full ${data?.image || previewImage ? "md:w-8/12" : "w-full"
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

                                  {(previewImage || data?.image) && (
                                    <div className="relative md:ml-4 w-full mt-1">
                                      <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                        <div className="w-full h-full">
                                          <Image
                                            src={previewImage || data?.image}
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
                              <div className="flex gap-4 justify-between">
                                <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg text-xs">
                                  <DrawerDescription className="text-[14px]">Batal</DrawerDescription>
                                </DrawerClose>
                                <Button
                                  title="Simpan Data"
                                  type="submit"
                                  disabled={isUpdateLoading ? true : false}
                                  className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[14px] px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-full">
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
                      onClick={() => handleDeleteSlider(carousel?.id)}
                      className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 text-[14px]">
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

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] text-left">No.</div>

        <div className="w-full col-span-2 text-[14px]">
          : {index + 1}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] text-left">Slider</div>

        <div className="w-full gap-x-2 flex flex-row col-span-2 text-[14px]">
          :{" "}
          <div className="w-full">
            <AlertDialog>
              <AlertDialogTrigger className="w-full">
                <div className="w-full text-[14px] flex h-10 text-black-80 hover:underline hover:text-primary-40 rounded-lg">
                  Lihat Slider
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center text-[16px]">
                    Master Data
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center text-[14px]">
                    Carousel Slider
                  </AlertDialogDescription>

                  {carousel && (
                    <div className="w-full h-full flex justify-center">
                      <Image
                        src={carousel?.image}
                        alt="Slider"
                        width={1000}
                        height={1000}
                        className="w-10/12 h-5/6"
                      />
                    </div>
                  )}
                </AlertDialogHeader>
                <AlertDialogFooter className="w-full flex flex-row justify-center">
                  <AlertDialogCancel className="text-[14px]">Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

    </section>
  );
}
