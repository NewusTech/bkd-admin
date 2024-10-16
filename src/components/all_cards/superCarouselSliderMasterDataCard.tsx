"use client";

import React, { useRef } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { CarouselSliderInterface } from "@/types/interface";
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
import { Label } from "../ui/label";
import { Trash } from "@phosphor-icons/react";
import Image from "next/image";
import TypingEffect from "../ui/TypingEffect";

export default function SuperCarouselSliderMasterDataCard({
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
  const dropRef = useRef<HTMLDivElement>(null);
  const dropRefMobile = useRef<HTMLDivElement>(null);
  const handleSetCarousel = () => {
    setData({
      image: carousel?.image,
      image_potrait: carousel?.image_potrait,
    });
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">
        <div className="w-full flex gap-4">
          <AlertDialog>
            <AlertDialogTrigger className="w-full">
              <div className="w-full text-[16px] flex items-center justify-center h-10 text-black-80 hover:underline hover:text-primary-40 rounded-lg">
                Lihat Slider Dekstop
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
              <AlertDialogHeader className="flex flex-col max-h-[500px]">
                <AlertDialogTitle className="text-center text-[16px]">
                  Master Data
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center text-[14px]">
                  Carousel Slider Desktop
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
                <AlertDialogCancel className="text-[16px]">Batal</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger className="w-full">
              <div className="w-full text-[16px] flex items-center justify-center h-10 text-black-80 hover:underline hover:text-primary-40 rounded-lg">
                Lihat Slider Mobile
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
              <AlertDialogHeader className="flex flex-col max-h-[500px]">
                <AlertDialogTitle className="text-center text-[16px]">
                  Master Data
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center text-[14px]">
                  Carousel Slider Mobile
                </AlertDialogDescription>
                {carousel && (
                  <div className="w-full h-full flex justify-center">
                    <Image
                      src={carousel?.image_potrait}
                      alt="Slider"
                      width={1000}
                      height={1000}
                      className="w-10/12 h-5/6"
                    />
                  </div>
                )}
              </AlertDialogHeader>
              <AlertDialogFooter className="w-full flex flex-row justify-center">
                <AlertDialogCancel className="text-[16px]">Batal</AlertDialogCancel>
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
                  handleSetCarousel();
                  setIsDialogEditOpen(true);
                }}
                className="w-full">
                <div className="w-full text-[14px] bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg">
                  Edit
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center text-[16px]">
                    Master Data Slider
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    <TypingEffect className="custom-class text-[14px]" speed={125} deleteSpeed={50} text={["Edit data yang diperlukan"]} />
                  </AlertDialogDescription>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleUpdateSlider(e, carousel?.id)
                    }
                    className="w-full flex flex-col gap-y-5 verticalScroll">

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                      <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                        Slider Dekstop
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

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                      <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                        Slider Mobile
                      </Label>
                      <div className="flex flex-col md:flex-row w-full">
                        <div
                          ref={dropRefMobile}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDropImageMobile}
                          className={`w-full ${data?.image_potrait || previewImageMobile ? "md:w-8/12" : "w-full"
                            }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                          <>
                            <input
                              type="file"
                              id="file-input-image-potrait"
                              name="image_potrait"
                              accept="image/*"
                              onChange={handleImageChangeMobile}
                              className="hidden"
                            />
                            <label
                              htmlFor="file-input-image-potrait"
                              className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                              Drag and drop file here or click to select
                              file
                            </label>
                          </>
                        </div>
                        {(previewImageMobile || data?.image_potrait) && (
                          <div className="relative md:ml-4 w-full mt-1">
                            <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                              <div className="w-full h-full">
                                <Image
                                  src={previewImageMobile || data?.image_potrait}
                                  width={1000}
                                  height={1000}
                                  alt="Preview"
                                  className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={handleRemoveImageMobile}
                                className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                <Trash />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="w-full flex flex-row justify-between items-center gap-x-5">
                      <AlertDialogCancel className="text-[16px]">Batal</AlertDialogCancel>
                      <Button
                        type="submit"
                        disabled={isUpdateLoading ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10 text-[16px]">
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
              onClick={() => handleDeleteSlider(carousel?.id)}
              className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 text-[14px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
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
