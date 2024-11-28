"use client";

import DataNotFound from "@/components/elements/data_not_found";
import PaginationComponent from "@/components/elements/pagination";
import SearchPages from "@/components/elements/search";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TypingEffect from "@/components/ui/TypingEffect";
import { useDebounce } from "@/hooks/useDebounce";
import { getAccountUser, updateUserPasswordByAdmin } from "@/services/api";
import { UserAccountInterface } from "@/types/interface";
import { EllipsisVertical, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function SuperAccountManagingUsersScreen() {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isDrawerEditOpen, setIsDrawerEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    newPassword: "",
    confirmNewPassword: "",
    slug: "",
  });
  const [userData, setUserData] = useState<UserAccountInterface[]>();

  const fetchUserData = async (page: number, limit: number, search: string) => {
    try {
      const response = await getAccountUser(page, limit, search);
      setUserData(response.data);
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: response.pagination.totalPages,
        totalCount: response.pagination.totalCount,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchUserData(newPage, 10, "");
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await updateUserPasswordByAdmin(payload, payload.slug);

      if (response.status === 200) {
        setPayload({
          confirmNewPassword: "",
          newPassword: "",
          slug: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Password!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserData(pagination.currentPage, 10, "");
        setIsDialogEditOpen(false);
        setIsDrawerEditOpen(false);
        // router.push("/super-admin/management-list-employees");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate Password!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal Mengupdate Password!",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(1, 10, debounceSearch);
  }, [debounceSearch]);

  return (
    <section className="w-full flex flex-col items-center md:px-5 md:mt-5">
      <div className="bg-line-10 md:shadow-md md:rounded-lg w-full flex flex-col p-5 gap-y-5">
        {/* Mobile */}
        <div className="md:hidden">
          <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-4 gap-y-4 md:p-5 md:gap-y-5">
            <div className="w-full">
              <SearchPages
                search={search}
                setSearch={setSearch}
                value={search}
                onChange={handleSearchChange}
                change={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                placeholder="Pencarian"
              />
            </div>
          </div>
        </div>
        {/* Mobile */}

        {/* dekstop*/}
        <div className="hidden md:block">
          <div className="w-full flex flex-row gap-x-5">
            <SearchPages
              search={search}
              setSearch={setSearch}
              change={handleSearchChange}
              placeholder="Pencarian"
            />
          </div>
        </div>
        {/* dekstop*/}

        <div className="w-full">
          {userData && userData.length > 0 ? (
            <>
              {/* Mobile */}
              <div className="md:hidden">
                {userData.map((data, index) => (
                  <section
                    key={index + "mobile"}
                    className="w-full bg-line-10 rounded-lg shadow-md p-4 mb-4"
                  >
                    <div className="w-full flex justify-end items-end">
                      <div className="w-full text-xs md:text-sm flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300">
                              <EllipsisVertical className="w-4 h-4" />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="transition-all duration-300 ease-in-out opacity-1 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-white border border-gray-300 shadow-2xl rounded-md w-fit mr-6">
                            <DropdownMenuLabel className="font-semibold text-primary text-[14px] w-full shadow-md">
                              Aksi
                            </DropdownMenuLabel>
                            {/* <hr className="border border-primary transition-all ease-in-out animate-pulse ml-2 mr-2" /> */}
                            <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all animate-pulse"></div>
                            <div className="bg-white w-full h-full">
                              <div className="flex flex-col gap-y-2 w-full px-2 py-2">
                                <div className="w-full">
                                  <div className="w-full">
                                    <Drawer
                                      open={isDrawerEditOpen}
                                      onOpenChange={setIsDrawerEditOpen}
                                    >
                                      <DrawerTrigger
                                        onClick={() => {
                                          setPayload({
                                            confirmNewPassword: "",
                                            newPassword: "",
                                            slug: "",
                                          });
                                          setIsDrawerEditOpen(true);
                                        }}
                                        className="w-full"
                                      >
                                        <div
                                          //   name="Edit"
                                          //   title="Edit Data"
                                          className="w-full h-10 text-[14px] px-3 rounded-lg border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 hover:text-line-10"
                                        >
                                          Edit
                                        </div>
                                      </DrawerTrigger>
                                      <DrawerContent className="bg-line-10">
                                        <DrawerHeader>
                                          <DrawerTitle className="text-[16px]">
                                            Master Data NIP
                                          </DrawerTitle>
                                          <form
                                            onSubmit={handleUpdatePassword}
                                            className="w-full flex flex-col gap-y-3 max-h-full"
                                          >
                                            <div className="text-center mb-4">
                                              <TypingEffect
                                                className="custom-class text-[14px]"
                                                text={[data.name]}
                                              />
                                            </div>

                                            <div className="w-full flex flex-col gap-y-5 verticalScroll">
                                              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                                                <Label className="focus-within:text-primary-70 font-normal text-[14px] text-left">
                                                  Password Baru
                                                </Label>
                                                <Input
                                                  id="newPassword"
                                                  name="newPassword"
                                                  value={payload?.newPassword}
                                                  onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                  ) =>
                                                    setPayload({
                                                      ...payload,
                                                      confirmNewPassword:
                                                        e.target.value,
                                                    })
                                                  }
                                                  type="text"
                                                  className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px]"
                                                  placeholder="Masukkan Password Baru"
                                                />
                                              </div>
                                              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                                                <Label className="focus-within:text-primary-70 font-normal text-[14px] text-left">
                                                  Ketik Ulang Password
                                                </Label>
                                                <Input
                                                  id="confirmNewPassword"
                                                  name="confirmNewPassword"
                                                  value={
                                                    payload?.confirmNewPassword
                                                  }
                                                  onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                  ) =>
                                                    setPayload({
                                                      ...payload,
                                                      confirmNewPassword:
                                                        e.target.value,
                                                    })
                                                  }
                                                  type="text"
                                                  className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px]"
                                                  placeholder="Ketik ulang password baru"
                                                />
                                              </div>

                                              <div className="flex gap-4 justify-between">
                                                <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg text-xs">
                                                  <DrawerDescription className="text-[14px]">
                                                    Batal
                                                  </DrawerDescription>
                                                </DrawerClose>
                                                <Button
                                                  title="Reset Password"
                                                  type="submit"
                                                  disabled={
                                                    isLoading ? true : false
                                                  }
                                                  className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[14px] px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-full"
                                                >
                                                  {isLoading ? (
                                                    <Loader className="animate-spin" />
                                                  ) : (
                                                    "Simpan Password"
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
                              </div>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="text-[14px] flex flex-col gap-y-4">
                      <div className="w-full grid grid-cols-3">
                        <div className="w-full font-medium text-black">No.</div>
                        <div className="w-full col-span-2">: {0 + 1}</div>
                      </div>

                      <div className="w-full grid grid-cols-3">
                        <div className="w-full font-medium text-black">NIP</div>
                        <div className="w-full col-span-2">: {data.nip}</div>
                      </div>
                      <div className="w-full grid grid-cols-3">
                        <div className="w-full font-medium text-black">
                          Nama
                        </div>
                        <div className="w-full col-span-2">: {data.name}</div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
              {/* /Mobile */}
              {/* dekstop*/}
              <div className="hidden md:block">
                <Table className="w-full border border-line-20">
                  <TableHeader className="bg-primary-40 text-line-10">
                    <TableRow className="w-full">
                      <TableHead className="text-center text-[14px]">
                        No.
                      </TableHead>
                      <TableHead className="text-center text-[14px]">
                        NIP
                      </TableHead>
                      <TableHead className="text-center text-[14px]">
                        Nama
                      </TableHead>
                      <TableHead className="text-center text-[14px]">
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData.map((data, index) => (
                      <TableRow
                        key={index + "dekstop"}
                        className="border border-line-20 text-[14px]"
                      >
                        <TableCell className="text-[14px] text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-[14px text-center">
                          {data?.nip}
                        </TableCell>
                        <TableCell className="text-[14px text-center">
                          {data?.name}
                        </TableCell>
                        <TableCell className="text-center flex items-center w-full">
                          <div className="w-full flex flex-row items-center justify-center gap-x-2">
                            <div className="w-1/2">
                              <AlertDialog
                                open={isDialogEditOpen}
                                onOpenChange={setIsDialogEditOpen}
                              >
                                <AlertDialogTrigger
                                  className="w-full"
                                  onClick={() => {
                                    setPayload({
                                      newPassword: "",
                                      confirmNewPassword: "",
                                      slug: data.slug,
                                    });
                                    setIsDialogEditOpen(true);
                                  }}
                                >
                                  <div
                                    title="Edit Data"
                                    className="w-full text-[14px] bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2"
                                  >
                                    Edit
                                  </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                                  <AlertDialogHeader className="flex flex-col gap-y-3">
                                    <AlertDialogTitle className="text-center">
                                      Reset Password User
                                    </AlertDialogTitle>

                                    <div className="w-full flex justify-center gap-y-3">
                                      <TypingEffect
                                        className="custom-class md:text-sm text-xs"
                                        text={[data.name]}
                                      />
                                    </div>

                                    <form
                                      onSubmit={handleUpdatePassword}
                                      className="w-full flex flex-col gap-y-3 max-h-[500px]"
                                    >
                                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                          <Label className="focus-within:text-primary-70 font-normal text-[16px] text-left">
                                            Password Baru
                                          </Label>

                                          <Input
                                            id="newPassword"
                                            name="newPassword"
                                            value={payload?.newPassword}
                                            onChange={(
                                              e: React.ChangeEvent<HTMLInputElement>
                                            ) =>
                                              setPayload({
                                                ...payload,
                                                newPassword: e.target.value,
                                              })
                                            }
                                            type="password"
                                            className="w-full text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                            placeholder="Masukkan Password"
                                          />
                                        </div>
                                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                                          <Label className="focus-within:text-primary-70 font-normal text-[16px] text-left">
                                            Ketik Ulang Password Baru
                                          </Label>

                                          <Input
                                            id="confirmNewPassword"
                                            name="confirmNewPassword"
                                            value={payload.confirmNewPassword}
                                            onChange={(
                                              e: React.ChangeEvent<HTMLInputElement>
                                            ) =>
                                              setPayload({
                                                ...payload,
                                                confirmNewPassword:
                                                  e.target.value,
                                              })
                                            }
                                            type="password"
                                            className="w-full text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                                            placeholder="Ketik Ulang Password"
                                          />
                                        </div>
                                      </div>

                                      <div className="w-full flex flex-row justify-between items-center">
                                        <AlertDialogCancel>
                                          <AlertDialogDescription className="text-center text-[16px] pl-3 pr-3">
                                            Batal
                                          </AlertDialogDescription>
                                        </AlertDialogCancel>
                                        <Button
                                          title="Reset Password"
                                          type="submit"
                                          disabled={isLoading ? true : false}
                                          className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[16px] px-3 rounded-lg border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2"
                                        >
                                          {isLoading ? (
                                            <Loader className="animate-spin" />
                                          ) : (
                                            "Simpan Password"
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
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* dekstop*/}
            </>
          ) : (
            <DataNotFound />
          )}
        </div>
        <div className="w-full">
          <PaginationComponent
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
}
