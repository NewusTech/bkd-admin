"use client";

// import "quill/dist/quill.snow.css";
// import { useQuill } from "react-quilljs";
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import { AreasInterface, RegulationInterface } from "@/types/interface";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Trash } from "@phosphor-icons/react";
import Image from "next/image";
import TypingEffect from "../ui/TypingEffect";

export default function SuperregulationMasterDataCard({
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
  const handleSetRegulation = () => {
    setData({
      title: regulation?.title,
      file: regulation?.file,
    });
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center text-[16px]">
        {regulation?.title && regulation?.title}
      </TableCell>
      <TableCell className="text-center">
        {regulation?.file && (
          <iframe
            src={regulation?.file}
            className="w-full h-[200px] rounded-lg">
            {regulation?.title && regulation?.title}
          </iframe>
        )}
      </TableCell>
      <TableCell className="text-center">
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
              open={isDialogEditOpen}
              onOpenChange={setIsDialogEditOpen}>
              <AlertDialogTrigger
                onClick={() => {
                  handleSetRegulation();
                  setIsDialogEditOpen(true);
                }}
                className="w-full">
                <div className="w-full text-[14px] md:text-[16px] bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg">
                  Edit
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center">
                    Master Data Regulasi
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    <TypingEffect className="custom-class text-[14px] md:text-[16px]" speed={125} deleteSpeed={50} text={["Edit data yang diperlukan"]} />
                  </AlertDialogDescription>

                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleUpdateRegulations(e, regulation?.id)
                    }
                    className="w-full flex flex-col gap-y-3 verticalScroll">

                    <div className="flex flex-col gap-y-3 w-full">
                      <Label className="text-[14px] md:text-[16px] text-neutral-700 font-normal mb-2">
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
                      <Label className="text-[14px] md:text-[16px] text-neutral-700 font-normal mb-2">
                        File
                      </Label>
                      <div className="flex flex-col md:flex-row w-full">
                        <div
                          ref={dropRef}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDropImage}
                          className={`w-full ${previewImage ? "md:w-8/12" : "w-full"
                            }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                          <>
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
                              className="text-[14px] md:text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                              Drag and drop file here or click to select file
                            </label>
                          </>
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
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button
                        type="submit"
                        disabled={isUpdateLoading ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10">
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
