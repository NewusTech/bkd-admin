"use client";

import React, { useRef } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import {
  AreasInterface,
  GradeInterface,
  StructureOrganizationInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateString, formatToWIB } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash, X } from "@phosphor-icons/react";
import { Label } from "../ui/label";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import AddIcon from "../elements/add_button";
import TypingEffect from "../ui/TypingEffect";
import { Input } from "../ui/input";
import { staffStatus } from "@/constants/main";
import { Loader } from "lucide-react";

export default function DepartmentHeadStaffBkdCard({
  item,
  index,
  areas,
  grades,
  previewImage,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  handleRemoveImage,
  data,
  setData,
  isLoadingDelete,
  isLoadingUpdate,
  isDialogOpenUpdate,
  setIsDialogOpenUpdate,
  handleDeleteStructureOrganization,
  handleUpdateStructureOrganization,
}: {
  item: StructureOrganizationInterface;
  index: number;
  areas: AreasInterface[];
  grades: GradeInterface[];
  previewImage: string;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropImage: (e: React.DragEvent<HTMLDivElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  data: {
    nama: string;
    jabatan: string;
    image: string;
    golongan: string;
    nip: string;
    bidang_id: string;
    status: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      nama: string;
      jabatan: string;
      image: string;
      golongan: string;
      nip: string;
      bidang_id: string;
      status: string;
    }>
  >;
  isLoadingDelete: boolean;
  isLoadingUpdate: boolean;
  isDialogOpenUpdate: boolean;
  setIsDialogOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteStructureOrganization: (slug: string) => void;
  handleUpdateStructureOrganization: (
    e: React.FormEvent<HTMLFormElement>,
    slug: string
  ) => void;
}) {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const handleSetStaff = () => {
    setData({
      nama: item?.nama || "",
      jabatan: item?.jabatan || "",
      image: item?.image || "",
      golongan: item?.golongan || "",
      nip: item?.nip || "",
      bidang_id: item?.bidang_id !== null ? item.bidang_id.toString() : "",
      status: item?.status !== null ? item.status.toString() : "",
    });
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{item?.nama && item?.nama}</TableCell>
      <TableCell className="text-center">{item?.nip && item?.nip}</TableCell>
      <TableCell className="text-center">
        {item?.jabatan && item?.jabatan}
      </TableCell>
      <TableCell className="text-center">
        {item?.golongan && item?.golongan}
      </TableCell>
      <TableCell className={`text-center`}>
        <div
          className={`${item?.status === 1 ? "text-success-70 bg-success-40" : "text-error-70 bg-error-40"} bg-opacity-20 py-3 px-3 rounded-lg`}>
          {item?.status === 1 ? "Aktif" : "Tidak Aktif"}
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="w-full flex flex-row items-center justify-center gap-x-3">
          <Dialog>
            <DialogTrigger>
              <div className="bg-black-80 hover:text-line-10 text-black-80 hover:bg-primary-40 hover:bg-opacity-100 bg-opacity-20 py-3 px-3 rounded-lg">
                detail
              </div>
            </DialogTrigger>

            <DialogContent className="bg-line-10 w-full max-w-2xl h-[500px] px-0 py-0 shadow-sm rounded-lg border border-line-20 [&>button]:hidden">
              <DialogHeader className="hidden">
                <DialogTitle>Detail {item?.nama && item?.nama}</DialogTitle>
                <DialogDescription>
                  {item?.jabatan && item?.jabatan}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col bg-primary-40 rounded-lg overflow-hidden p-6">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full mb-6">
                    <DialogClose className="float-right">
                      <X className="text-white" />
                    </DialogClose>
                  </div>
                  <div className="w-[180px] h-[180px] rounded-full overflow-hidden">
                    {item?.image && item?.nama && (
                      <Image
                        src={item?.image}
                        alt={item?.nama}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 py-4 text-white">
                    <span className="font-semibold text-center line-clamp-2 text-xl">
                      {item?.nama && item?.nama}
                    </span>
                    <span className="text-center text-base">
                      NIP. {item?.nip && item?.nip}
                    </span>
                  </div>
                  <div className="flex flex-col text-white w-full items-center gap-y-3 mt-6">
                    <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                      <p className="font-semibold w-full sm:max-w-[50%] text-left">
                        Jabatan
                      </p>
                      <p className="text-left w-full">
                        <span className="hidden md:inline-block">:</span>{" "}
                        {item?.jabatan && item?.jabatan}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                      <p className="font-semibold w-full sm:max-w-[50%] text-left">
                        Golongan
                      </p>
                      <p className="text-left w-full">
                        <span className="hidden md:inline-block">:</span>{" "}
                        {item?.golongan && item?.golongan}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row border-b sm:border-b-0 pb-2 sm:pb-0 gap-y-2 w-full justify-left items-center">
                      <p className="font-semibold w-full sm:max-w-[50%] text-left">
                        Status
                      </p>
                      <p className="text-left w-full">
                        <span className="hidden md:inline-block">:</span>{" "}
                        {item?.status && item?.status === 1
                          ? "Aktif"
                          : "Tidak Aktif"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="w-full md:w-6/12">
            {!isMobile ? (
              <AlertDialog
                open={isDialogOpenUpdate}
                onOpenChange={setIsDialogOpenUpdate}>
                <AlertDialogTrigger
                  onClick={() => {
                    handleSetStaff();
                    setIsDialogOpenUpdate(true);
                  }}
                  className="w-full">
                  <div className="w-full text-xs bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    Edit
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col max-h-[500px]">
                    <AlertDialogTitle className="text-center">
                      <AlertDialogDescription className="text-center">
                        Staff BKD
                      </AlertDialogDescription>
                    </AlertDialogTitle>

                    <TypingEffect
                      className="custom-class md:text-sm text-xs"
                      speed={125}
                      deleteSpeed={50}
                      text={["Input data yang diperlukan"]}
                    />

                    <form
                      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        handleUpdateStructureOrganization(e, item?.slug);
                      }}
                      className="w-full flex flex-col gap-y-3 verticalScroll">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Bidang
                        </Label>

                        <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                          <Select
                            name="bidang_id"
                            value={data?.bidang_id || ""}
                            onValueChange={(value) =>
                              setData({ ...data, bidang_id: value })
                            }>
                            <SelectTrigger
                              className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                              <SelectValue
                                placeholder="Pilih Bidang"
                                className="text-black-80 tex-[14px] w-full"
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-line-10">
                              <div className="pt-2">
                                {areas &&
                                  areas.map(
                                    (area: AreasInterface, i: number) => {
                                      return (
                                        <SelectItem
                                          key={i}
                                          className={`w-full px-4`}
                                          value={area.id.toString()}>
                                          {area?.nama}
                                        </SelectItem>
                                      );
                                    }
                                  )}
                              </div>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Nama Lengkap
                        </Label>

                        <Input
                          id="nama"
                          name="nama"
                          value={data.nama || ""}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setData({
                              ...data,
                              nama: e.target.value,
                            });
                          }}
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Masukkan Nama Lengkap Anda"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          NIP
                        </Label>

                        <Input
                          id="nip"
                          name="nip"
                          value={data.nip || ""}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setData({
                              ...data,
                              nip: e.target.value,
                            });
                          }}
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Masukkan NIP Anda"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Jabatan
                        </Label>

                        <Input
                          id="jabatan"
                          name="jabatan"
                          value={data.jabatan || ""}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setData({
                              ...data,
                              jabatan: e.target.value,
                            });
                          }}
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Masukkan Jabatan Anda"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Golongan
                        </Label>

                        <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                          <Select
                            name="golongan"
                            value={data?.golongan || ""}
                            onValueChange={(value) =>
                              setData({ ...data, golongan: value })
                            }>
                            <SelectTrigger
                              className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                              <SelectValue
                                placeholder="Pilih Golongan"
                                className="text-black-80 tex-[14px] w-full"
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-line-10">
                              <div className="pt-2">
                                {grades &&
                                  grades.map(
                                    (grade: GradeInterface, i: number) => {
                                      return (
                                        <SelectItem
                                          key={i}
                                          className={`w-full px-4`}
                                          value={grade?.nama}>
                                          {grade?.nama}
                                        </SelectItem>
                                      );
                                    }
                                  )}
                              </div>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Status
                        </Label>

                        <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                          <Select
                            name="status"
                            value={data?.status || ""}
                            onValueChange={(value) =>
                              setData({ ...data, status: value })
                            }>
                            <SelectTrigger
                              className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                              <SelectValue
                                placeholder="Pilih Status Staff"
                                className="text-black-80 tex-[14px] w-full"
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-line-10">
                              <div className="pt-2">
                                {staffStatus &&
                                  staffStatus.map(
                                    (
                                      status: {
                                        id: number;
                                        value: string;
                                        keys: number;
                                      },
                                      i: number
                                    ) => {
                                      return (
                                        <SelectItem
                                          key={i}
                                          className={`w-full px-4`}
                                          value={status.keys.toString()}>
                                          {status?.value}
                                        </SelectItem>
                                      );
                                    }
                                  )}
                              </div>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex flex-col w-full">
                        <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                          Foto Staff
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

                          {previewImage ||
                            (item?.image && (
                              <div className="relative md:ml-4 w-full mt-1">
                                <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                  <div className="w-full h-full">
                                    <Image
                                      src={previewImage || item?.image}
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
                            ))}
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-center items-center gap-x-5">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <Button
                          type="submit"
                          disabled={isLoadingUpdate ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                          {isLoadingUpdate ? (
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
                open={isDialogOpenUpdate}
                onOpenChange={setIsDialogOpenUpdate}>
                <DrawerTrigger
                  onClick={() => {
                    handleSetStaff();
                    setIsDialogOpenUpdate(true);
                  }}
                  className="w-full">
                  <div className="w-full text-xs bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    Edit
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                  <div className="w-full flex flex-col gap-y-3 verticalScroll">
                    <DrawerTitle className="text-center">Staff BKD</DrawerTitle>

                    <DrawerDescription className="text-center">
                      <TypingEffect
                        className="custom-class md:text-sm text-xs"
                        speed={125}
                        deleteSpeed={50}
                        text={["Input data yang diperlukan"]}
                      />
                    </DrawerDescription>

                    <form
                      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        handleUpdateStructureOrganization(e, item?.slug);
                      }}
                      className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Bidang
                          </Label>

                          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                            <Select
                              onValueChange={(value) =>
                                setData({ ...data, bidang_id: value })
                              }>
                              <SelectTrigger
                                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                <SelectValue
                                  placeholder="Pilih Bidang"
                                  className="text-black-80 tex-[14px] w-full"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-line-10">
                                <div className="pt-2">
                                  {areas &&
                                    areas.map(
                                      (area: AreasInterface, i: number) => {
                                        return (
                                          <SelectItem
                                            key={i}
                                            className={`w-full px-4`}
                                            value={area.id.toString()}>
                                            {area?.nama}
                                          </SelectItem>
                                        );
                                      }
                                    )}
                                </div>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Nama Lengkap
                          </Label>

                          <Input
                            id="nama"
                            name="nama"
                            value={data.nama}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setData({
                                ...data,
                                nama: e.target.value,
                              });
                            }}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Nama Lengkap Anda"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            NIP
                          </Label>

                          <Input
                            id="nip"
                            name="nip"
                            value={data.nip}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setData({
                                ...data,
                                nip: e.target.value,
                              });
                            }}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan NIP Anda"
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setData({
                                ...data,
                                jabatan: e.target.value,
                              });
                            }}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Jabatan Anda"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Golongan
                          </Label>

                          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                            <Select
                              onValueChange={(value) =>
                                setData({ ...data, golongan: value })
                              }>
                              <SelectTrigger
                                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                <SelectValue
                                  placeholder="Pilih Golongan"
                                  className="text-black-80 tex-[14px] w-full"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-line-10">
                                <div className="pt-2">
                                  {grades &&
                                    grades.map(
                                      (grade: GradeInterface, i: number) => {
                                        return (
                                          <SelectItem
                                            key={i}
                                            className={`w-full px-4`}
                                            value={grade?.nama}>
                                            {grade?.nama}
                                          </SelectItem>
                                        );
                                      }
                                    )}
                                </div>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Status
                          </Label>

                          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                            <Select
                              onValueChange={(value) =>
                                setData({ ...data, status: value })
                              }>
                              <SelectTrigger
                                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                <SelectValue
                                  placeholder="Pilih Status Staff"
                                  className="text-black-80 tex-[14px] w-full"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-line-10">
                                <div className="pt-2">
                                  {staffStatus &&
                                    staffStatus.map(
                                      (
                                        status: {
                                          id: number;
                                          value: string;
                                          keys: number;
                                        },
                                        i: number
                                      ) => {
                                        return (
                                          <SelectItem
                                            key={i}
                                            className={`w-full px-4`}
                                            value={status.keys.toString()}>
                                            {status?.value}
                                          </SelectItem>
                                        );
                                      }
                                    )}
                                </div>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex flex-col w-full">
                          <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                            Foto Staff
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
                                  name="image"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  className="hidden"
                                />
                                <label
                                  htmlFor="file-input-image"
                                  className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                  Drag and drop file here or click to select
                                  file
                                </label>
                              </div>
                            </div>

                            {previewImage ||
                              (item?.image && (
                                <div className="relative md:ml-4 w-full mt-1">
                                  <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                    <div className="w-full h-full">
                                      <Image
                                        src={previewImage || item?.image}
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
                              ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 justify-between">
                        <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg">
                          <DrawerDescription>Batal</DrawerDescription>
                        </DrawerClose>
                        <Button
                          title="Simpan Data"
                          type="submit"
                          disabled={isLoadingUpdate ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[14px] md:text-[16px] px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-full">
                          {isLoadingUpdate ? (
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

          <div className="w-full">
            <Button
              title="Hapus Data"
              disabled={isLoadingDelete ? true : false}
              onClick={() => handleDeleteStructureOrganization(item?.slug)}
              className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 h-10 text-xs md:text-sm px-3 border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
              {isLoadingDelete ? (
                <Loader className="animate-spin" />
              ) : isLoadingDelete ? (
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
