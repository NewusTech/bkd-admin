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
} from "@/types/interface";
import Image from "next/image";
import { Label } from "../ui/label";
import EditorProvide from "../pages/areas";
import { Input } from "../ui/input";
import { Loader } from "lucide-react";
import { Trash } from "@phosphor-icons/react";

export default function MobileRegulationMasterDataCard({
  regulation,
  index,
  data,
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
  regulation: RegulationInterface;
  index: number;
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
      title: regulation?.title,
      file: regulation?.file,
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
          : {regulation?.title && regulation?.title}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">File</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          {regulation?.file && (
            <iframe
              src={regulation?.file}
              className="w-full h-[200px] rounded-lg">
              {regulation?.title && regulation?.title}
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
            className="w-full py-3 text-[14px] bg-line-40 bg-opacity-20 border border-black-80 hover:bg-black-80 hover:bg-opacity-20 hover:text-line-10 rounded-lg">
            <div className="w-full text-[14px]">Edit</div>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
            <div className="w-full flex flex-col gap-y-3 verticalScroll">
              <DrawerTitle className="text-center">
                Master Data Regulasi
              </DrawerTitle>

              <DrawerDescription className="text-center">
                Input data yang diperlukan
              </DrawerDescription>

              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  handleUpdateRegulations(e, regulation?.id)
                }
                className="w-full flex flex-col gap-y-3 verticalScroll">
                <div className="flex flex-col gap-y-3 w-full">
                  <Label className="text-[16px] text-neutral-700 font-normal mb-2">
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

                <div className="flex flex-col w-full">
                  <Label className="text-[16px] text-neutral-700 font-normal mb-2">
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
                          className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                          Drag and drop file here or click to select file
                        </label>
                      </div>
                    </div>

                    {regulation?.file && (
                      <div className="relative md:ml-4 w-full mt-1">
                        <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                          <div className="w-full h-full">
                            <iframe
                              src={regulation?.file}
                              className="w-full h-[200px] rounded-lg">
                              {regulation?.title && regulation?.title}
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

                <div className="w-full flex flex-row justify-center items-center gap-x-5">
                  {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}

                  <Button
                    type="submit"
                    disabled={isUpdateLoading ? true : false}
                    className="bg-primary-40 hover:bg-primary-70 text-line-10">
                    {isUpdateLoading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </section>
  );
}
