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
import { Loader } from "lucide-react";
import { Trash } from "@phosphor-icons/react";

export default function MobileSuperServiceRequirementsMasterDataTablePages({
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
        <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4">
            <div className="w-full grid grid-cols-3">
                <div className="w-full text-[14px] md:text-[16px]">No.</div>

                <div className="w-full col-span-2 text-[14px] md:text-[16px]">
                    : {index + 1}
                </div>
            </div>

            <div className="w-full grid grid-cols-3">
                <div className="w-full text-[14px] md:text-[16px]">Nama Layanan</div>

                <div className="w-full col-span-2 text-[14px] md:text-[16px]">
                    :
                    {/* {item.title && item.title} */}
                </div>
            </div>

            <div className="w-full flex flex-row gap-x-5">
                <Drawer open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
                    <DrawerTrigger
                        onClick={() => {
                            handleSetService();
                            setIsDialogEditOpen(true);
                        }}
                        className="w-full text-[14px] border border-black-80 hover:bg-black-80 hover:bg-opacity-20 hover:text-line-10 rounded-lg">
                        <div className="w-full">Edit</div>
                    </DrawerTrigger>
                    <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                        <div className="w-full flex flex-col gap-y-3 verticalScroll">
                            <DrawerTitle className="text-center">
                                Master Data Berita
                            </DrawerTitle>

                            <DrawerDescription className="text-center">
                                Input data yang diperlukan
                            </DrawerDescription>

                            <form
                                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                                    handleUpdateNews(e, item?.slug)
                                }
                                className="w-full flex flex-col gap-y-3 verticalScroll">
                                <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                    <Label className="focus-within:text-primary-70 font-normal text-sm">
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
                                    <Label className="text-sm text-black-70 font-normal">
                                        Deskripsi Berita
                                    </Label>

                                    <div className="w-full h-[250px] border border-line-20 rounded-lg">
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
                                    <Label className="text-[16px] text-neutral-700 font-normal mb-2">
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

                                <div className="w-full flex flex-row justify-center items-center gap-x-5">
                                    {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}

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
                        </div>
                    </DrawerContent>
                </Drawer>

                <div className="w-full">
                    <Button
                        disabled={isDeleteLoading ? true : false}
                        onClick={() => handleDeleteNews(item?.slug)}
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
