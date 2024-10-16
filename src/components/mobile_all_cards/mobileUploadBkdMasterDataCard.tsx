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
  NewsInterface,
  RegulationInterface,
  StructureOrganizationInterface,
  UploadBKDInterface,
} from "@/types/interface";
import Image from "next/image";
import { Label } from "../ui/label";
import EditorProvide from "../pages/areas";
import { Input } from "../ui/input";
import { Loader } from "lucide-react";
import { Trash } from "@phosphor-icons/react";
import TypingEffect from "../ui/TypingEffect";

export default function MobileUploadBKDMasterDataCard({
  bkd,
  index,
  data,
  handleDeleteRegulations,
  isDeleteLoading,
  setData,
  isUpdateLoading,
  handleUpdateRegulations,
  isDialogEditOpen,
  setIsDialogEditOpen,
  dropRef,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  handleRemoveImage,
  previewImage,
}: {
  bkd: UploadBKDInterface;
  index: number;
  handleDeleteRegulations: (id: number) => void;
  isDeleteLoading: boolean;
  data: {
    title: string;
    file: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      file: string;
    }>
  >;
  isUpdateLoading: boolean;
  handleUpdateRegulations: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropRef: React.RefObject<HTMLDivElement>;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropImage: (e: React.DragEvent<HTMLDivElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  previewImage: string;
}) {
  const router = useRouter();
  const handleSetRegulation = () => {
    setData({
      title: bkd?.title,
      file: bkd?.file,
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
        <div className="w-full text-[14px] md:text-[16px]">Judul Regulasi</div>
        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {bkd?.title && bkd?.title}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">File</div>
        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          {bkd?.file && (
            <iframe src={bkd?.file} className="w-full h-[200px] rounded-lg">
              {bkd?.title && bkd?.title}
            </iframe>
          )}
        </div>
      </div>

      <div className="w-full flex flex-row gap-x-5">
        <Drawer open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
          <DrawerTrigger
            onClick={() => {
              handleSetRegulation();
              setIsDialogEditOpen(true);
            }}
            className="h-10 text-[14px] md:text-[16px] rounded-lg border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 hover:text-line-10 w-full">
            Edit
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
            <div className="w-full flex flex-col gap-y-3 verticalScroll">
              <DrawerTitle className="text-center text-[14px]">
                <DrawerDescription className="text-center">
                  Master Data Struktur BKD
                </DrawerDescription>
              </DrawerTitle>

              <div className="w-full flex flex-row justify-center">
                <TypingEffect
                  className="custom-class text-[14px]"
                  speed={125}
                  deleteSpeed={50}
                  text={["Edit data yang diperlukan"]}
                />
              </div>

              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  handleUpdateRegulations(e, bkd?.id)
                }
                className="w-full flex flex-col gap-y-5 verticalScroll">
                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                  <Label className="text-[14px] text-neutral-700 font-normal mb-2">
                    Title
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={data.title}
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                    className="w-full"
                  />
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                  <Label className="text-[14px] text-neutral-700 font-normal mb-2">
                    File
                  </Label>
                  <div className="flex flex-col md:flex-row w-full">
                    <div
                      ref={dropRef}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDropImage}
                      className={`w-full ${
                        previewImage ? "md:w-8/12" : "w-full"
                      }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                      <div>
                        <input
                          type="file"
                          id="file-input-image"
                          name="file"
                          accept="pdf, image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="file-input-image"
                          className="text-[14px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                          Drag and drop file here or click to select file
                        </label>
                      </div>
                    </div>
                    {bkd?.file && (
                      <div className="relative md:ml-4 w-full mt-1">
                        <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                          <div className="w-full h-full">
                            <iframe
                              src={bkd?.file}
                              className="w-full h-[200px] rounded-lg">
                              {bkd?.title && bkd?.title}
                            </iframe>
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
                  <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg text-[14px]">
                    <DrawerDescription className="text-[14px]">
                      Batal
                    </DrawerDescription>
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
            </div>
          </DrawerContent>
        </Drawer>
        <div className="w-full">
          <Button
            disabled={isDeleteLoading ? true : false}
            onClick={() => handleDeleteRegulations(bkd?.id)}
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
    </section>
  );
}
