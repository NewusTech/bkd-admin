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
  StructureOrganizationInterface,
} from "@/types/interface";
import Image from "next/image";
import { Label } from "../ui/label";
import EditorProvide from "../pages/areas";
import { Input } from "../ui/input";
import { Loader } from "lucide-react";
import { Trash } from "@phosphor-icons/react";

export default function MobileStructureOrganizationMasterDataCard({
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
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const handleSetGallery = () => {
    setData({
      nama: organization.nama,
      jabatan: organization.jabatan,
      image: organization.image,
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
        <div className="w-full text-[14px] md:text-[16px]">Nama Lengkap</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {organization.nama && organization.nama}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Jabatan</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {organization.jabatan && organization.jabatan}
        </div>
      </div>

      <div className="w-full flex flex-row gap-x-5">
        <Drawer open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
          <DrawerTrigger
            onClick={() => {
              handleSetGallery();
              setIsDialogEditOpen(true);
            }}
            className="w-full text-[14px] border border-black-80 hover:bg-black-80 hover:bg-opacity-20 hover:text-line-10 rounded-lg">
            <div className="w-full">Edit</div>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
            <div className="w-full flex flex-col gap-y-3 verticalScroll">
              <DrawerTitle className="text-center">
                Master Data Struktur Kegiatan
              </DrawerTitle>

              <DrawerDescription className="text-center">
                Input data yang diperlukan
              </DrawerDescription>

              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  handleUpdateStructureOrganization(e, organization?.slug)
                }
                className="w-full flex flex-col gap-y-3 verticalScroll">
                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label className="focus-within:text-primary-70 font-normal text-sm">
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
                    className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Judul Foto Kegiatan"
                  />
                </div>

                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                  <Label className="focus-within:text-primary-70 font-normal text-sm">
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
                    className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                    placeholder="Masukkan Judul Foto Kegiatan"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                    Foto Diri
                  </Label>

                  <div className="flex flex-col md:flex-row w-full">
                    <div
                      ref={dropRef}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDropImage}
                      className={`w-full ${
                        data?.image || previewImage ? "md:w-8/12" : "w-full"
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

        <div className="w-full">
          <Button
            disabled={isDeleteLoading ? true : false}
            onClick={() =>
              handleDeleteStructureOrganization(organization?.slug)
            }
            className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10">
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
