"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  AccountManagingRolesInterface,
  AreasInterface,
  RolesInterface,
} from "@/types/interface";
import { EllipsisVertical, Eye, EyeOff, Loader } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import EditorProvide from "../pages/areas";
import TypingEffect from "../ui/TypingEffect";
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
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CombinedReadMoreRichTextDisplay from "../ui/CombinedReadMoreRichTextDisplay";

export default function SuperAccountManagingRolesCard({
  account,
  roles,
  areas,
  index,
  // handleDeleteArea,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  // handleUpdateArea,
  isDialogEditOpen,
  setIsDialogEditOpen,
  seen,
  setSeen,
}: {
  account: AccountManagingRolesInterface;
  areas: AreasInterface[];
  roles: RolesInterface[];
  index: number;
  // handleDeleteArea: (slug: string) => void;
  isDeleteLoading: boolean;
  data: {
    bidang_id: string;
    nip: string;
    name: string;
    role_id: string;
    email: string;
    password: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      bidang_id: string;
      nip: string;
      name: string;
      role_id: string;
      email: string;
      password: string;
    }>
  >;
  isUpdateLoading: boolean;
  // handleUpdateArea: (e: React.FormEvent<HTMLFormElement>, slug: string) => void;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  seen: boolean;
  setSeen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const handleSetArea = () => {
  //   setData({
  //     nama: area?.nama,
  //     desc: area?.desc,
  //     pj: area?.pj,
  //     nip_pj: area?.nip_pj,
  //   });
  // };

  function truncateString(str: string, num: number): string {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  return (
    <>
      <TableRow className="border border-line-20 text-sm text-left">
        <TableCell className="text-sm">{index + 1}</TableCell>
        <TableCell className="text-sm">
          {account?.name && account?.name}
        </TableCell>
        <TableCell className="text-sm">
          {account?.nip && account?.nip}
        </TableCell>
        <TableCell className="text-sm">
          {account?.Role && account?.Role}
        </TableCell>
        <TableCell className="">
          <div className="w-full flex flex-row items-center justify-center gap-x-2">
            {/* <div className="w-full">
            <Button title="Lihat Data" className="w-full text-sm bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
              Lihat
            </Button>
          </div> */}
            {/* <div className="w-full">
              <AlertDialog
                open={isDialogEditOpen}
                onOpenChange={setIsDialogEditOpen}>
                <AlertDialogTrigger
                  onClick={() => {
                    // handleSetArea();
                    setIsDialogEditOpen(true);
                  }}
                  className="w-full">
                  <div
                    className="h-10 text-xs md:text-sm px-3 rounded-lg border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 hover:text-line-10">
                    Lihat
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col gap-y-3">
                    <AlertDialogTitle className="text-center">
                      Kelola Akun
                    </AlertDialogTitle>

                    <div className="w-full flex justify-center gap-y-3">
                      <TypingEffect
                        className="custom-class md:text-sm text-xs"
                        text={["Edit data yang diperlukan"]}
                      />
                    </div>

                    <form
                      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                        handleUpdateArea(e, area?.slug)
                      }
                      className="w-full flex flex-col gap-y-3 max-h-[500px]">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="w-full focus-within:text-black-80 flex flex-col gap-y-2">
                          <Label className="focus-within:text-black-800 font-normal text-[14px] md:text-smtext-left">
                            Pilih Bidang
                          </Label>
                          <div className="w-full border border-line-20 rounded-lg">
                            <Select
                              onValueChange={(value) =>
                                setData({ ...data, bidang_id: value })
                              }>
                              <SelectTrigger
                                className={`w-full text-[14px] gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                <SelectValue
                                  placeholder="Pilih Bidang"
                                  className="text-black-80 text-[14px] w-full"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-line-10">
                                <div className="pt-2">
                                  {areas &&
                                    areas.length > 0 &&
                                    areas.map(
                                      (area: AreasInterface, i: number) => {
                                        return (
                                          <SelectItem
                                            key={i}
                                            className={`w-full px-4`}
                                            value={area.id.toString()}>
                                            {area.nama}
                                          </SelectItem>
                                        );
                                      }
                                    )}
                                </div>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="w-full focus-within:text-black-80 flex flex-col gap-y-2">
                          <Label className="focus-within:text-black-800 font-normal text-[14px] md:text-smtext-left">
                            Pilih Peran
                          </Label>
                          <div className="w-full border border-line-20 rounded-lg">
                            <Select
                              onValueChange={(value) =>
                                setData({ ...data, role_id: value })
                              }>
                              <SelectTrigger
                                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                <SelectValue
                                  placeholder="Pilih Bidang"
                                  className="text-black-80 tetx-[14px] w-full"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-line-10">
                                <div className="pt-2">
                                  {roles &&
                                    roles.length > 0 &&
                                    roles.map(
                                      (role: RolesInterface, i: number) => {
                                        return (
                                          <SelectItem
                                            key={i}
                                            className={`w-full px-4`}
                                            value={role.id.toString()}>
                                            {role?.name}
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
                          <Label
                            htmlFor="name"
                            className="focus-within:text-primary-70 font-normal text-left text-xs md:text-sm">
                            Nama Lengkap
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setData({ ...data, name: e.target.value })}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Nama Lengkap"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="nip"
                            className="focus-within:text-primary-70 font-normal text-left text-xs md:text-sm">
                            NIP
                          </Label>
                          <Input
                            id="nip"
                            name="nip"
                            value={data.nip}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setData({ ...data, nip: e.target.value })}
                            type="text"
                            inputMode="numeric"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan NIP"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="email"
                            className="focus-within:text-primary-70 font-normal text-left text-xs md:text-sm">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setData({ ...data, email: e.target.value })}
                            type="email"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Email"
                          />
                        </div>

                        <div className="w-full focus-within:text-black-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="password"
                            className="focus-within:text-primary-40 text-[14px] font-normal">
                            Kata Sandi
                          </Label>

                          <div className="focus-within:border focus-within:border-primary-40 flex items-center mt-1 justify-between rounded-lg bg-transparent text-[14px] w-full h-[40px] font-normal border border-grey-50 placeholder:text-[14px] placeholder:text-neutral-700">
                            <Input
                              id="password"
                              name="password"
                              autoComplete="true"
                              value={data.password}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setData({
                                  ...data,
                                  password: e.target.value,
                                })
                              }
                              type={!seen ? "text" : "password"}
                              className="w-full focus-visible:text-black-70 border-none outline-none bg-transparent"
                              placeholder="Masukkan Kata Sandi"
                            />

                            <div
                              onClick={() => setSeen(!seen)}
                              className="p-2 cursor-pointer">
                              {seen ? (
                                <EyeOff className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                              ) : (
                                <Eye className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-between items-center gap-x-5">
                        <AlertDialogCancel>
                          <AlertDialogDescription className="text-center">
                            Batal
                          </AlertDialogDescription>
                        </AlertDialogCancel>
                        <Button
                          title="Simpan Data"
                          type="submit"
                          disabled={isUpdateLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-xs md:text-sm px-3 rounded-lg border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
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
            </div> */}

            <div className="w-full">
              <AlertDialog
                open={isDialogEditOpen}
                onOpenChange={setIsDialogEditOpen}>
                <AlertDialogTrigger
                  onClick={() => {
                    // handleSetArea();
                    setIsDialogEditOpen(true);
                  }}
                  className="w-full">
                  <div
                    // name="Edit"
                    // title="Edit Data"
                    className="h-10 text-[14px] px-3 rounded-lg border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 hover:text-line-10 w-fit m-auto">
                    Edit
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col gap-y-3">
                    <AlertDialogTitle className="text-center">
                      Kelola Akun
                    </AlertDialogTitle>

                    <div className="w-full flex justify-center gap-y-3">
                      <TypingEffect
                        className="custom-class md:text-sm text-xs"
                        text={["Edit data yang diperlukan"]}
                      />
                    </div>

                    <form
                      // onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      //   handleUpdateArea(e, area?.slug)
                      // }
                      className="w-full flex flex-col gap-y-3 max-h-[500px]">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="w-full focus-within:text-black-80 flex flex-col gap-y-2">
                          <Label className="focus-within:text-black-800 font-normal text-[14px] md:text-smtext-left">
                            Pilih Bidang
                          </Label>
                          <div className="w-full border border-line-20 rounded-lg">
                            <Select
                              onValueChange={(value) =>
                                setData({ ...data, bidang_id: value })
                              }>
                              <SelectTrigger
                                className={`w-full text-[14px] gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                <SelectValue
                                  placeholder="Pilih Bidang"
                                  className="text-black-80 text-[14px] w-full"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-line-10">
                                <div className="pt-2">
                                  {areas &&
                                    areas.length > 0 &&
                                    areas.map(
                                      (area: AreasInterface, i: number) => {
                                        return (
                                          <SelectItem
                                            key={i}
                                            className={`w-full px-4`}
                                            value={area.id.toString()}>
                                            {area.nama}
                                          </SelectItem>
                                        );
                                      }
                                    )}
                                </div>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="w-full focus-within:text-black-80 flex flex-col gap-y-2">
                          <Label className="focus-within:text-black-800 font-normal text-[14px] md:text-smtext-left">
                            Pilih Peran
                          </Label>
                          <div className="w-full border border-line-20 rounded-lg">
                            <Select
                              onValueChange={(value) =>
                                setData({ ...data, role_id: value })
                              }>
                              <SelectTrigger
                                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                <SelectValue
                                  placeholder="Pilih Bidang"
                                  className="text-black-80 tetx-[14px] w-full"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-line-10">
                                <div className="pt-2">
                                  {roles &&
                                    roles.length > 0 &&
                                    roles.map(
                                      (role: RolesInterface, i: number) => {
                                        return (
                                          <SelectItem
                                            key={i}
                                            className={`w-full px-4`}
                                            value={role.id.toString()}>
                                            {role?.name}
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
                          <Label
                            htmlFor="name"
                            className="focus-within:text-primary-70 font-normal text-left text-xs md:text-sm">
                            Nama Lengkap
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setData({ ...data, name: e.target.value })}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Nama Lengkap"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="nip"
                            className="focus-within:text-primary-70 font-normal text-left text-xs md:text-sm">
                            NIP
                          </Label>
                          <Input
                            id="nip"
                            name="nip"
                            value={data.nip}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setData({ ...data, nip: e.target.value })}
                            type="text"
                            inputMode="numeric"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan NIP"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="email"
                            className="focus-within:text-primary-70 font-normal text-left text-xs md:text-sm">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setData({ ...data, email: e.target.value })}
                            type="email"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Email"
                          />
                        </div>

                        <div className="w-full focus-within:text-black-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="password"
                            className="focus-within:text-primary-40 text-[14px] font-normal">
                            Kata Sandi
                          </Label>

                          <div className="focus-within:border focus-within:border-primary-40 flex items-center mt-1 justify-between rounded-lg bg-transparent text-[14px] w-full h-[40px] font-normal border border-grey-50 placeholder:text-[14px] placeholder:text-neutral-700">
                            <Input
                              id="password"
                              name="password"
                              autoComplete="true"
                              value={data.password}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setData({
                                  ...data,
                                  password: e.target.value,
                                })
                              }
                              type={!seen ? "text" : "password"}
                              className="w-full focus-visible:text-black-70 border-none outline-none bg-transparent"
                              placeholder="Masukkan Kata Sandi"
                            />

                            <div
                              onClick={() => setSeen(!seen)}
                              className="p-2 cursor-pointer">
                              {seen ? (
                                <EyeOff className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                              ) : (
                                <Eye className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-between items-center gap-x-5">
                        <AlertDialogCancel>
                          <AlertDialogDescription className="text-center">
                            Batal
                          </AlertDialogDescription>
                        </AlertDialogCancel>
                        <Button
                          title="Simpan Data"
                          type="submit"
                          disabled={isUpdateLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-xs md:text-sm px-3 rounded-lg border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                          {isUpdateLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Simpan"
                          )}
                        </Button>
                      </div>
                    </form>
                  </AlertDialogHeader>
                  {/* <AlertDialogFooter className="w-full flex flex-row justify-center items-center gap-x-5"></AlertDialogFooter> */}
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* <div className="w-full">
              <Button
                title="Hapus Data"
                disabled={isDeleteLoading ? true : false}
                // onClick={() => handleDeleteArea(area?.slug)}
                className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 h-10 text-xs md:text-sm px-3 border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                {isDeleteLoading ? (
                  <Loader className="animate-spin" />
                ) : isDeleteLoading ? (
                  ""
                ) : (
                  "Hapus"
                )}
              </Button>
            </div> */}
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
