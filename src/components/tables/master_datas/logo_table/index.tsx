"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  AboutUsVisionMisionInterface,
  AboutVisionMisionInterface,
} from "@/types/interface";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EditorProvide from "@/components/pages/areas";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import TypingEffect from "@/components/ui/TypingEffect";
import { useRef } from "react";
import Image from "next/image";

export default function SuperLogoMasterDataTablePages({
  abouts,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleUpdateAbout,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  handleRemoveImage,
  previewImage,
}: {
  abouts: AboutVisionMisionInterface;
  data: {
    image_bkd: string;
    logo: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      image_bkd: string;
      logo: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateAbout: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
  previewImage: string;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropImage: (e: React.DragEvent<HTMLDivElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
}) {
  const dropRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const handleSetAbout = () => {
    setData({
      logo: abouts.logo,
      image_bkd: abouts.image_bkd,
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-y-5">
      <div className="w-full flex flex-col md:flex-row bg-line-10 rounded-lg shadow-md py-3 items-center px-3 gap-y-3">
        <div className="w-full text-center md:text-start text-[14px] md:text-[16px]">
          Data Logo
        </div>

        <div className="w-full md:w-7/12 flex flex-row gap-x-3">
          <div className="w-full flex flex-row items-center justify-center gap-x-2">
            <div className="w-full">
              {!isMobile ? (
                <AlertDialog
                  open={isDialogEditOpen}
                  onOpenChange={setIsDialogEditOpen}>
                  <AlertDialogTrigger
                    onClick={() => {
                      handleSetAbout();
                      setIsDialogEditOpen(true);
                    }}
                    className="w-full">
                    <div className="w-full bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 text-[14px] md:text-[16px]">
                      Edit
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                    <AlertDialogHeader className="flex flex-col">
                      <AlertDialogTitle className="text-center">
                        Master Data Visi Misi
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-center">
                        <TypingEffect
                          className="custom-class text-[14px] md:text-[16px]"
                          speed={125}
                          deleteSpeed={50}
                          text={["Edit data yang diperlukan"]}
                        />
                      </AlertDialogDescription>
                      <form
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                          handleUpdateAbout(e, abouts.id)
                        }
                        className="w-full flex flex-col gap-y-3 max-h-[500px]">
                        <div className="w-full flex flex-col gap-y-3 verticalScroll">

                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                            <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                              Logo
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
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                  />
                                  <label
                                    htmlFor="file-input-image"
                                    className="text-[14px] md:text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                    Drag and drop file here or click to select
                                    file
                                  </label>
                                </>
                              </div>
                              {previewImage && (
                                <div className="relative md:ml-4 w-full mt-1">
                                  <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                    <div className="w-full h-full">
                                      <Image
                                        src={previewImage}
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
              ) : (
                <Drawer
                  open={isDialogEditOpen}
                  onOpenChange={setIsDialogEditOpen}>
                  <DrawerTrigger
                    onClick={() => {
                      handleSetAbout();
                      setIsDialogEditOpen(true);
                    }}
                    className="w-full min-h-[40px] md:min-h-[60px] text-line-10 text-[14px] md:text-[16px] md:bg-primary-40 md:hover:bg-primary-70 rounded-lg">
                    <div className="w-full text-[14px] md:text-[16px] bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                      Edit
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-5/6 px-3 pb-6">
                    <div className="w-full flex flex-col gap-y-3 verticalScroll">
                      <DrawerTitle className="text-center">
                        Master Data Tentang BKD
                      </DrawerTitle>
                      <DrawerDescription className="text-center">
                        <TypingEffect
                          className="custom-class text-[14px] md:text-[16px]"
                          speed={125}
                          deleteSpeed={50}
                          text={["Edit data yang diperlukan"]}
                        />
                      </DrawerDescription>

                      <form
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                          handleUpdateAbout(e, abouts.id)
                        }
                        className="w-full flex flex-col gap-y-5 verticalScroll">
                        <div className="w-full flex flex-col gap-y-3 verticalScroll">

                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                            <Label className="focus-within:text-primary-70 font-normal text-sm">
                              Logo
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
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                  />
                                  <label
                                    htmlFor="file-input-image"
                                    className="text-[14px] md:text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                    Drag and drop file here or click to select
                                    file
                                  </label>
                                </>
                              </div>
                              {previewImage && (
                                <div className="relative md:ml-4 w-full mt-1">
                                  <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                    <div className="w-full h-full">
                                      <Image
                                        src={previewImage}
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

                        <div className="w-full flex flex-row justify-end items-center gap-x-5">
                          <DrawerClose className="w-full">
                            <DrawerDescription>Batal</DrawerDescription>
                          </DrawerClose>
                          <Button
                            type="submit"
                            disabled={isUpdateLoading ? true : false}
                            className="bg-primary-40 w-full hover:bg-primary-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
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
              )}
            </div>
          </div>

          {/* <div className="w-full">
                        <Button
                            className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 text-[14px] md:text-[16px]">
                            Hapus
                        </Button>
                    </div> */}
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-5 bg-line-10 p-3 rounded-lg shadow-md">
        <div className="w-full flex flex-col gap-y-3">
          <h5 className="text-primary-40 text-[14px] md:text-[16px]">Logo</h5>
          <div className="w-full border border-black-80 rounded-lg p-3">
            {abouts?.logo && (
              <Image
                src={abouts?.logo}
                alt="Logo"
                width={500} // Tentukan ukuran lebar gambar
                height={300} // Tentukan ukuran tinggi gambar
                className="w-full h-auto object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
