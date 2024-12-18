"use client";

import React, { useRef } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { StructureOrganizationInterface } from "@/types/interface";
import { Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Trash } from "@phosphor-icons/react";
import Image from "next/image";
import TypingEffect from "../ui/TypingEffect";

export default function SuperStructureOrganizationMasterDataCard({
  organization,
  index,
  handleDeleteStructureOrganization,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  handleUpdateStructureOrganization,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  handleRemoveImage,
  previewImage,
}: {
  organization: StructureOrganizationInterface;
  index: number;
  handleDeleteStructureOrganization: (slug: string) => void;
  isDeleteLoading: boolean;
  data: {
    nama: string;
    jabatan: string;
    image: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      nama: string;
      jabatan: string;
      image: string;
    }>
  >;
  isUpdateLoading: boolean;
  handleUpdateStructureOrganization: (
    e: React.FormEvent<HTMLFormElement>,
    slug: string
  ) => void;
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
  const handleSetGallery = () => {
    setData({
      nama: organization.nama,
      jabatan: organization.jabatan,
      image: organization.image,
    });
  };

  return (
    <TableRow className="border border-line-20 text-[14px]">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{organization.nama}</TableCell>
      <TableCell className="text-left">{organization.jabatan}</TableCell>
      {/* <TableCell className="text-left">{item?.image}</TableCell> */}
      <TableCell className="text-left flex items-center w-full">
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
              open={isDialogEditOpen}
              onOpenChange={setIsDialogEditOpen}>
              <AlertDialogTrigger
                onClick={() => {
                  handleSetGallery();
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
                    Master Data Struktur Kegiatan
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    <TypingEffect className="custom-class text-[14px]" speed={125} deleteSpeed={50} text={["Edit data yang diperlukan"]} />
                  </AlertDialogDescription>

                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleUpdateStructureOrganization(e, organization?.slug)
                    }
                    className="w-full flex flex-col gap-y-3 max-h-[500px]">
                    <div className="w-full flex flex-col gap-y-5 verticalScroll">

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label className="focus-within:text-primary-70 font-normal text-[14px]">
                          Nama Lengkap
                        </Label>
                        <Input
                          id="nama"
                          name="nama"
                          value={data.nama}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData({
                              ...data,
                              nama: e.target.value,
                            })
                          }
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px]"
                          placeholder="Masukkan Judul Foto Kegiatan"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label className="focus-within:text-primary-70 font-normal text-[14px]">
                          Jabatan
                        </Label>
                        <Input
                          id="jabatan"
                          name="jabatan"
                          value={data.jabatan}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData({
                              ...data,
                              jabatan: e.target.value,
                            })
                          }
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px]"
                          placeholder="Masukkan Judul Foto Kegiatan"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label className="text-[14px] text-neutral-700 font-normal mb-2">
                          Foto Diri
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
                                className="text-[14px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
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
                    </div>

                    <div className="w-full flex flex-row justify-between items-center gap-x-5">
                      <AlertDialogCancel className="text-[14px]">Cancel</AlertDialogCancel>
                      <Button
                        type="submit"
                        disabled={isUpdateLoading ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 text-[14px]">
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
              onClick={() =>
                handleDeleteStructureOrganization(organization?.slug)
              }
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
