"use client";

import React, { useRef } from "react";
import { Button } from "../ui/button";
import {
  AreasInterface,
  GradeInterface,
  StructureOrganizationInterface,
  UserComplaintInterface,
} from "@/types/interface";
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
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import TypingEffect from "../ui/TypingEffect";
import { Input } from "../ui/input";
import { staffStatus } from "@/constants/main";
import Image from "next/image";
import { Trash } from "@phosphor-icons/react";
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

export default function MobileStaffBkdCardPages({
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
  isDialogOpenDetail,
  setIsDialogOpenDetail,
  handleDeleteStructureOrganization,
  handleUpdateStructureOrganization,
}: {
  item: StructureOrganizationInterface;
  index: number;
  areas: AreasInterface[];
  grades: GradeInterface[];
  previewImage: string;
  isDialogOpenDetail: boolean;
  setIsDialogOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
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
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col p-4 mb-4">
      <>
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
                  Aksi
                </DropdownMenuLabel>
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all animate-pulse"></div>
                <div className="bg-white w-full h-full">
                  <div className="gap-4 w-full px-2 py-2">
                    <div className="w-full mb-2">
                      <div className="w-full">
                        <Drawer
                          open={isDialogOpenDetail}
                          onOpenChange={setIsDialogOpenDetail}>
                          <DrawerTrigger
                            onClick={() => {
                              handleSetStaff();
                              setIsDialogOpenDetail(true);
                            }}
                            className="w-full">
                            <div className="w-full text-[14px] md:text-[16px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                              Detail
                            </div>
                          </DrawerTrigger>
                          <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                            <div className="w-full flex flex-col gap-y-3 verticalScroll">
                              <DrawerTitle className="text-center">
                                <DrawerDescription className="text-center text-[18px]">
                                  Staff BKD
                                </DrawerDescription>
                              </DrawerTitle>

                              <TypingEffect
                                className="custom-class text-center text-[14px] md:text-[16px]"
                                speed={125}
                                deleteSpeed={50}
                                text={["Detail Staff BKD"]}
                              />

                              <form
                                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                                  handleUpdateStructureOrganization(e, item?.slug);
                                }}
                                className="flex flex-col gap-6 overflow-y-auto max-h-[400px] pr-4 bg-white rounded-xl p-6">
                                <>
                                  {previewImage || item?.image ? (
                                    <div className="relative flex justify-center mb-4">
                                      <Image
                                        src={previewImage || item?.image}
                                        width={500}
                                        height={500}
                                        alt="Preview"
                                        className="h-[300px] w-[300px] rounded-full object-cover shadow-lg transform transition-all hover:scale-105"
                                      />
                                    </div>
                                  ) : null}
                                </>
                                <div className="px-6">
                                  <div className="w-full text-primary-70 flex flex-col gap-y-5">
                                    <div className="flex justify-between items-center border-b pb-2">
                                      <span className="font-semibold text-[15px] md:text-[17px] text-gray-700">Bidang:</span>
                                      <span className="text-[15px] md:text-[17px] text-gray-500 text-right">{data?.bidang_id || "-"}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b pb-2">
                                      <span className="font-semibold text-[15px] md:text-[17px] text-gray-700">Nama Lengkap:</span>
                                      <span className="text-[15px] md:text-[17px] text-gray-500 text-right">{data?.nama || "-"}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b pb-2">
                                      <span className="font-semibold text-[15px] md:text-[17px] text-gray-700">NIP:</span>
                                      <span className="text-[15px] md:text-[17px] text-gray-500 text-right">{data?.nip || "-"}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b pb-2">
                                      <span className="font-semibold text-[15px] md:text-[17px] text-gray-700">Jabatan:</span>
                                      <span className="text-[15px] md:text-[17px] text-gray-500 text-right">{data?.jabatan || "-"}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b pb-2">
                                      <span className="font-semibold text-[15px] md:text-[17px] text-gray-700">Golongan:</span>
                                      <span className="text-[15px] md:text-[17px] text-gray-500 text-right">{data?.golongan || "-"}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b pb-2">
                                      <span className="font-semibold text-[15px] md:text-[17px] text-gray-700">Status:</span>
                                      <span className="text-[15px] md:text-[17px] text-gray-500 text-right">{data?.status || "-"}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex justify-center items-center space-x-5 mt-6">
                                  <DrawerClose className="text-sm md:text-base bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                                    Batal
                                  </DrawerClose>
                                </div>
                              </form>
                            </div>
                          </DrawerContent>
                        </Drawer>
                      </div>
                    </div>
                    <div className="w-full mb-2">
                      <div className="w-full">
                        <Drawer
                          open={isDialogOpenUpdate}
                          onOpenChange={setIsDialogOpenUpdate}>
                          <DrawerTrigger
                            onClick={() => {
                              handleSetStaff();
                              setIsDialogOpenUpdate(true);
                            }}
                            className="w-full">
                            <div className="w-full text-[14px] md:text-[16px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                              Edit
                            </div>
                          </DrawerTrigger>
                          <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                            <div className="w-full flex flex-col gap-y-3 verticalScroll">
                              <DrawerTitle className="text-center">
                                <DrawerDescription className="text-center text-[18px]">
                                  Staff BKD
                                </DrawerDescription>
                              </DrawerTitle>

                              <TypingEffect
                                className="custom-class text-center text-[14px] md:text-[16px]"
                                speed={125}
                                deleteSpeed={50}
                                text={["Input data yang diperlukan"]}
                              />

                              <form
                                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                                  handleUpdateStructureOrganization(e, item?.slug);
                                }}
                                className="w-full flex flex-col gap-y-5 verticalScroll">
                                <div className="w-full flex flex-col gap-y-3 verticalScroll">
                                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                    <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                      Bidang
                                    </Label>

                                    <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                                      <Select
                                        onValueChange={(value) =>
                                          setData({ ...data, bidang_id: value })
                                        }>
                                        <SelectTrigger
                                          className={`w-full gap-x-4 text-[14px] md:text-[16px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                          <SelectValue
                                            placeholder="Pilih Bidang"
                                            className="text-black-80 text-[14px] md:text-[16px] w-full"
                                          />
                                        </SelectTrigger>
                                        <SelectContent className="bg-line-10">
                                          <div className="pt-2">
                                            {areas &&
                                              areas.map((area: AreasInterface, i: number) => {
                                                return (
                                                  <SelectItem
                                                    key={i}
                                                    className={`w-full px-4 text-[14px] md:text-[16px]`}
                                                    value={area.id.toString()}>
                                                    {area?.nama}
                                                  </SelectItem>
                                                );
                                              })}
                                          </div>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                    <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                      Nama Lengkap
                                    </Label>

                                    <Input
                                      id="nama"
                                      name="nama"
                                      value={data.nama}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setData({
                                          ...data,
                                          nama: e.target.value,
                                        });
                                      }}
                                      type="text"
                                      className="w-full text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                      placeholder="Masukkan Nama Lengkap Anda"
                                    />
                                  </div>

                                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                    <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                      NIP
                                    </Label>

                                    <Input
                                      id="nip"
                                      name="nip"
                                      value={data.nip}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setData({
                                          ...data,
                                          nip: e.target.value,
                                        });
                                      }}
                                      type="text"
                                      className="w-full text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                      placeholder="Masukkan NIP Anda"
                                    />
                                  </div>

                                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                    <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                      Jabatan
                                    </Label>

                                    <Input
                                      id="jabatan"
                                      name="jabatan"
                                      value={data.jabatan}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setData({
                                          ...data,
                                          jabatan: e.target.value,
                                        });
                                      }}
                                      type="text"
                                      className="w-full text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                      placeholder="Masukkan Jabatan Anda"
                                    />
                                  </div>

                                  <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                    <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                      Golongan
                                    </Label>

                                    <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                                      <Select
                                        onValueChange={(value) =>
                                          setData({ ...data, golongan: value })
                                        }>
                                        <SelectTrigger
                                          className={`w-full gap-x-4 text-[14px] md:text-[16px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                          <SelectValue
                                            placeholder="Pilih Golongan"
                                            className="text-black-80 text-[14px] md:text-[16px] w-full"
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
                                                      className={`w-full px-4 text-[14px] md:text-[16px]`}
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
                                    <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                                      Status
                                    </Label>

                                    <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                                      <Select
                                        onValueChange={(value) =>
                                          setData({ ...data, status: value })
                                        }>
                                        <SelectTrigger
                                          className={`w-full gap-x-4 text-[14px] md:text-[16px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                          <SelectValue
                                            placeholder="Pilih Status Staff"
                                            className="text-black-80 text-[14px] md:text-[16px] w-full"
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
                                                      className={`w-full px-4 text-[14px] md:text-[16px]`}
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
                                    <Label className="text-[14px] md:text-[16px] text-neutral-700 font-normal mb-2">
                                      Foto Staff
                                    </Label>

                                    <div className="flex flex-col md:flex-row w-full">
                                      <div
                                        ref={dropRef}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDropImage}
                                        className={`w-full ${previewImage ? "md:w-8/12" : "w-full"
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
                                            className="text-[14px] md:text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
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
                                </div>

                                <div className="flex gap-4 justify-between">
                                  <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg">
                                    <DrawerDescription className="text-[14px] md:text-[16px]">
                                      Batal
                                    </DrawerDescription>
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
                      </div>
                    </div>
                    <div className="w-full">
                      <Button
                        title="Hapus Data"
                        disabled={isLoadingDelete ? true : false}
                        onClick={() => handleDeleteStructureOrganization(item?.slug)}
                        className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 h-10 text-[14px] px-3 border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
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
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <hr className="border border-primary transition-all ease-in-out animate-pulse ml-2 mr-2" /> */}
          </div>
        </div>
      </>

      <>
        <div className="w-full grid grid-cols-3 gap-y-4 items-center">
          <div className="w-full font-semibold text-[14px] md:text-[16px] text-gray-700">No.</div>
          <div className="w-full col-span-2 text-[14px] md:text-[16px] text-gray-600">: {index + 1}</div>

          <div className="w-full font-semibold text-[14px] md:text-[16px] text-gray-700">Nama</div>
          <div className="w-full col-span-2 text-[14px] md:text-[16px] text-gray-600">: {item?.nama || '-'}</div>

          <div className="w-full font-semibold text-[14px] md:text-[16px] text-gray-700">NIP</div>
          <div className="w-full col-span-2 text-[14px] md:text-[16px] text-gray-600">: {item?.nip || '-'}</div>

          <div className="w-full font-semibold text-[14px] md:text-[16px] text-gray-700">Jabatan</div>
          <div className="w-full col-span-2 text-[14px] md:text-[16px] text-gray-600">: {item?.jabatan || '-'}</div>

          <div className="w-full font-semibold text-[14px] md:text-[16px] text-gray-700">Gol/Pangkat</div>
          <div className="w-full col-span-2 text-[14px] md:text-[16px] text-gray-600">: {item?.golongan || '-'}</div>

          <div className="w-full font-semibold text-[14px] md:text-[16px] text-gray-700">Status</div>
          <div className="w-full col-span-2 flex items-center gap-x-2">
            <p className="text-[14px] md:text-[16px] text-gray-600">:</p>
            <div
              className={`text-[14px] md:text-[16px] text-center py-1 px-4 rounded-lg ${Number(item?.status) === 1
                ? "text-success-70 bg-success-40"
                : "text-error-70 bg-error-40"
                } bg-opacity-20`}
            >
              {Number(item?.status) === 1 ? "Aktif" : "Tidak Aktif"}
            </div>
          </div>
        </div>
      </>

    </section>
  );
}
