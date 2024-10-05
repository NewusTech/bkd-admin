"use client";

import React from "react";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import { TableCell, TableRow } from "@/components/ui/table";
import { AreasInterface, ServiceInterface } from "@/types/interface";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import Link from "next/link";
import { EllipsisVertical, Loader } from "lucide-react";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import TypingEffect from "@/components/ui/TypingEffect";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import EditorProvide from "@/components/pages/areas";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import CombinedReadMoreRichTextDisplay from "@/components/ui/CombinedReadMoreRichTextDisplay";

export default function MobileSuperServicesMasterDataCard({
    service,
    areas,
    index,
    handleDeleteService,
    isDeleteLoading,
    data,
    setData,
    isUpdateLoading,
    handleUpdateService,
    isDrawerEditOpen,
    setIsDrawerEditOpen,
    quillConditionEdit,
    quillConditionEditRef,
    quillTermEdit,
    quillTermEditRef,
    quillStepEdit,
    quillStepEditRef,
    quillDescEdit,
    quillDescEditRef,
}: {
    service: ServiceInterface;
    areas: AreasInterface[];
    index: number;
    handleDeleteService: (id: number) => void;
    isDeleteLoading: boolean;
    data: {
        nama: string;
        desc: string;
        syarat: string;
        bidang_id: string;
        penanggung_jawab: string;
        ketentuan: string;
        langkah: string;
    };
    setData: React.Dispatch<
        React.SetStateAction<{
            nama: string;
            desc: string;
            syarat: string;
            bidang_id: string;
            penanggung_jawab: string;
            ketentuan: string;
            langkah: string;
        }>
    >;
    isUpdateLoading: boolean;
    handleUpdateService: (
        e: React.FormEvent<HTMLFormElement>,
        id: number
    ) => void;
    isDrawerEditOpen: boolean;
    setIsDrawerEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    quillConditionEdit: any;
    quillConditionEditRef: any;
    quillTermEdit: any;
    quillTermEditRef: any;
    quillStepEdit: any;
    quillStepEditRef: any;
    quillDescEdit: any;
    quillDescEditRef: any;
}) {
    const handleSetService = () => {
        setData({
            nama: service.nama,
            desc: service.desc,
            syarat: service.syarat,
            bidang_id: service.bidang_id.toString(),
            penanggung_jawab: service.penanggung_jawab,
            ketentuan: service.ketentuan,
            langkah: service.langkah,
        });

        if (quillConditionEdit && service?.syarat) {
            quillConditionEdit.clipboard.dangerouslyPasteHTML(service?.syarat);
        }

        if (quillTermEdit && service?.ketentuan) {
            quillTermEdit.clipboard.dangerouslyPasteHTML(service?.ketentuan);
        }

        if (quillStepEdit && service?.langkah) {
            quillStepEdit.clipboard.dangerouslyPasteHTML(service?.langkah);
        }

        if (quillDescEdit && service?.desc) {
            quillDescEdit.clipboard.dangerouslyPasteHTML(service?.desc);
        }
    };

    function truncateString(str: string, num: number): string {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + "...";
    }

    return (
        <>
            <section className="w-full bg-line-10 rounded-lg shadow-md p-4 mb-4">
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
                                    Menu
                                </DropdownMenuLabel>
                                {/* <hr className="border border-primary transition-all ease-in-out animate-pulse ml-2 mr-2" /> */}
                                <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all animate-pulse"></div>
                                <div className="bg-white w-full h-full">
                                    <div className="flex gap-4 w-full px-2 py-2">
                                        <div className="w-fit">
                                            <div className="w-full">
                                                <Drawer
                                                    open={isDrawerEditOpen}
                                                    onOpenChange={setIsDrawerEditOpen}>
                                                    <DrawerTrigger onClick={() => {
                                                        handleSetService();
                                                        setIsDrawerEditOpen(true);
                                                    }} className="w-full">
                                                        <Button
                                                            name="Edit"
                                                            title="Edit Data"
                                                            className='h-10 text-xs md:text-sm px-3 rounded-lg border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 hover:text-line-10'>
                                                            Edit
                                                        </Button>
                                                    </DrawerTrigger>
                                                    <DrawerContent className="bg-white">
                                                        <DrawerHeader>
                                                            <DrawerTitle>Master Data Layanan</DrawerTitle>
                                                            <form
                                                                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                                                                    handleUpdateService(e, service?.id)
                                                                }
                                                                className="w-full flex flex-col gap-y-3 max-h-full h-[600px]">
                                                                <DrawerDescription>
                                                                    <div className="text-center mb-4">
                                                                        <TypingEffect text={["Edit data yang diperlukan...."]} />
                                                                    </div>
                                                                </DrawerDescription>
                                                                <div className="w-full flex flex-col gap-y-3 verticalScroll">
                                                                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                                                        <Label className="focus-within:text-primary-70 font-normal text-xs lg:text-sm text-left">
                                                                            Nama Layanan
                                                                        </Label>
                                                                        <Input
                                                                            id="nama-layanan"
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
                                                                            placeholder="Masukkan Nama Bidang"
                                                                        />
                                                                    </div>

                                                                    <div className="w-full flex flex-col gap-y-3">
                                                                        <Label className="focus-within:text-primary-70 font-normal text-xs lg:text-sm text-left">
                                                                            Syarat Layanan
                                                                        </Label>
                                                                        <div className="w-full h-full border border-line-20 rounded-lg text-left">
                                                                            <EditorProvide
                                                                                content={data?.syarat}
                                                                                onChange={(e: any) => setData({ ...data, desc: e })}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="w-full focus-within:text-black-80 flex flex-col gap-y-2">
                                                                        <Label className="focus-within:text-black-800 font-normal text-sm">
                                                                            Pilih Bidang
                                                                        </Label>

                                                                        <div className="w-full border border-line-20 rounded-lg">
                                                                            <Select value={data.bidang_id}
                                                                                onValueChange={(value: string) =>
                                                                                    setData({ ...data, bidang_id: value })
                                                                                }>
                                                                                <SelectTrigger
                                                                                    className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                                                                    <SelectValue
                                                                                        placeholder="Pilih Bidang"
                                                                                        className="text-black-80 w-full"
                                                                                    />
                                                                                </SelectTrigger>
                                                                                <SelectContent className="bg-line-10">
                                                                                    <div className="pt-2">
                                                                                        {areas &&
                                                                                            areas.length > 0 &&
                                                                                            areas.map((area: AreasInterface, i: number) => {
                                                                                                return (
                                                                                                    <SelectItem
                                                                                                        key={i}
                                                                                                        className={`w-full px-4`}
                                                                                                        value={area.id.toString()}>
                                                                                                        {area.nama}
                                                                                                    </SelectItem>
                                                                                                );
                                                                                            })}
                                                                                    </div>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                    </div>

                                                                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                                                        <Label className="focus-within:text-primary-70 font-normal text-xs lg:text-sm text-left">
                                                                            Deskripsi Bidang
                                                                        </Label>
                                                                        <div className="w-full h-full border border-line-20 rounded-lg text-left">
                                                                            <EditorProvide
                                                                                content={data?.bidang_id}
                                                                                onChange={(e: any) => setData({ ...data, desc: e })}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                                                        <Label className="focus-within:text-primary-70 font-normal text-xs lg:text-sm text-left">
                                                                            Penanggung Jawab
                                                                        </Label>
                                                                        <Input
                                                                            id="pj"
                                                                            name="penanggung_jawab"
                                                                            value={data.penanggung_jawab}
                                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                                                setData({
                                                                                    ...data,
                                                                                    penanggung_jawab: e.target.value,
                                                                                })
                                                                            }
                                                                            type="text"
                                                                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                                                            placeholder="Masukkan Nama Penanggung Jawab"
                                                                        />
                                                                    </div>

                                                                    <div className="w-full flex flex-col gap-y-3">
                                                                        <Label className="focus-within:text-primary-70 font-normal text-xs lg:text-sm text-left">
                                                                            Ketentuan
                                                                        </Label>
                                                                        <div className="w-full h-full border border-line-20 rounded-lg text-left">
                                                                            <EditorProvide
                                                                                content={data?.ketentuan}
                                                                                onChange={(e: any) => setData({ ...data, desc: e })}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="w-full flex flex-col gap-y-3">
                                                                        <Label className="focus-within:text-primary-70 font-normal text-xs lg:text-sm text-left">
                                                                            Langkah
                                                                        </Label>
                                                                        <div className="w-full h-full border border-line-20 rounded-lg text-left">
                                                                            <EditorProvide
                                                                                content={data?.langkah}
                                                                                onChange={(e: any) => setData({ ...data, desc: e })}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex gap-4 justify-center">
                                                                        <DrawerClose>
                                                                            <div className="text-xs md:text-sm">Batal</div>
                                                                        </DrawerClose>
                                                                        <Button
                                                                            title="Simpan Data"
                                                                            type="submit"
                                                                            disabled={isUpdateLoading ? true : false}
                                                                            className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-xs md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-fit">
                                                                            {isUpdateLoading ? (
                                                                                <Loader className="animate-spin" />
                                                                            ) : (
                                                                                "Simpan"
                                                                            )}
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </DrawerHeader>
                                                    </DrawerContent>
                                                </Drawer>
                                            </div>
                                        </div>
                                        <div className="w-fit">
                                            <Button
                                                title="Hapus Data"
                                                disabled={isDeleteLoading ? true : false}
                                                onClick={() => handleDeleteService(service.id)}
                                                className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 h-10 text-xs md:text-sm px-3 border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
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
                <div className="text-xs md:text-sm flex flex-col gap-y-4">
                    <div className="w-full grid grid-cols-3">
                        <div className="w-full font-medium text-black">No.</div>
                        <div className="w-full col-span-2">: {index + 1}</div>
                    </div>

                    <div className="w-full grid grid-cols-3">
                        <div className="w-full font-medium text-black">Nama Layanan</div>
                        <div className="w-full col-span-2">
                            : {service.nama}
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-3">
                        <div className="w-full font-medium text-black">Bidang</div>
                        <div className="w-full col-span-2">
                            :
                            <>
                                {service.bidang_id}
                            </>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-3">
                        <div className="w-full font-medium text-black">Deskripsi</div>
                        <div className="w-full col-span-2">
                            : {service.desc && (
                                // <ReadMore text={service.desc}/>
                                // <RichTextDisplay content={service.desc} />
                                <CombinedReadMoreRichTextDisplay content={service.desc} keys={true} />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
