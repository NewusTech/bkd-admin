"use client";

import SearchPages from "@/components/elements/search";
import SuperAreasMasterDataTablePages from "@/components/tables/master_datas/areas_table";
import { Button } from "@/components/ui/button";
import {
  deleteAreas,
  getAreas,
  getNIPData,
  postAreas,
  postNIPData,
  postNIPDataImport,
  updateAreas,
  updateNIPData,
} from "@/services/api";
import { AreasInterface, NipInterface } from "@/types/interface";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Import, Loader } from "lucide-react";
import PaginationComponent from "@/components/elements/pagination";
import Editor from "@/components/elements/toolbar_editors";
import EditorProvide from "@/components/pages/areas";
import AddIcon from "@/components/elements/add_button";
import TypingEffect from "@/components/ui/TypingEffect";
import { useDebounce } from "@/hooks/useDebounce";
import NotFoundSearch from "@/components/ui/SearchNotFound";
import { schemaAreaData, schemaNIPData } from "@/validations";
import { z } from "zod";
import SuperManagementListTablePages from "@/components/tables/master_datas/management_lists_table";
import { Trash } from "@phosphor-icons/react";
import DataNotFound from "@/components/elements/data_not_found";

export default function ManagementListEmployeesScreen() {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenImport, setIsDialogOpenImport] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerOpenImport, setIsDrawerOpenImport] = useState(false);
  const [isDrawerEditOpen, setIsDrawerEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImport, setIsLoadingImport] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [previewFileName, setPreviewFileName] = useState("");
  const [nipId, setNipId] = useState<number | null>(null);
  const [nip, setNip] = useState<NipInterface[]>([]);
  const [data, setData] = useState({
    file: "",
  });
  const [data2, setData2] = useState({
    nip: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateForm = useCallback(async () => {
    try {
      await schemaNIPData.parseAsync({
        ...data2,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.format();
        setErrors(formattedErrors);
      }
      setIsLoading(false);
      return false;
    }
  }, [data2]);

  useEffect(() => {
    if (hasSubmitted) {
      validateForm();
    }
  }, [hasSubmitted, validateForm]);

  useEffect(() => {
    setFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  const fetchNipData = async (page: number, limit: number, search: string) => {
    try {
      const response = await getNIPData(page, limit, search);

      setNip(response.data);
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

  useEffect(() => {
    fetchNipData(1, 10, debounceSearch);
  }, [debounceSearch]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchNipData(newPage, 10, "");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData2({
      ...data2,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateNIP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setHasSubmitted(true);

    const isValid = await validateForm();

    if (isValid) {
      setIsLoading(true);

      try {
        const response = await postNIPData(data2);

        if (response.status === 201) {
          setData2({
            nip: "",
          });
          Swal.fire({
            icon: "success",
            title: "Berhasil Menambahkan NIP!",
            timer: 2000,
            showConfirmButton: false,
            position: "center",
          });
          fetchNipData(pagination.currentPage, 10, "");
          setIsDialogOpen(false);
          setIsDrawerOpen(false);
          router.push("/super-admin/management-list-employees");
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal Menambahkan NIP!",
            timer: 2000,
            showConfirmButton: false,
            position: "center",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsDialogOpen(false);
        setIsDrawerOpen(false);
      }
    }
  };

  const handleCreateNIPImport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingImport(true);

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await postNIPDataImport(formData);

      if (response.status === 201) {
        setData({
          file: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengimport NIP!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchNipData(pagination.currentPage, 10, "");
        setIsDialogOpen(false);
        setIsDrawerOpen(false);
        router.push("/super-admin/management-list-employees");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengimport NIP!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingImport(false);
      setIsDialogOpenImport(false);
      setIsDrawerOpenImport(false);
    }
  };

  const handleUpdateNipData = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    try {
      const response = await updateNIPData(data2, id);

      if (response.status === 200) {
        setData2({
          nip: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate NIP!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchNipData(pagination.currentPage, 10, "");
        setIsDialogEditOpen(false);
        setIsDrawerEditOpen(false);
        router.push("/super-admin/management-list-employees");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate NIP!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdateLoading(false);
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setData({
        ...data,
        file: file,
      });

      setPreviewFileName(file.name);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
  };

  const handleDropFile = (e: any) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFile(file);
      setData({
        ...data,
        file: file.name,
      });

      setPreviewFileName(file.name);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewFileName("");
    setData({ ...data, file: "" });
  };

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

            <div className="w-full flex flex-row gap-x-3">
              <div className="w-full">
                <Drawer
                  open={isDrawerOpenImport}
                  onOpenChange={setIsDrawerOpenImport}>
                  <DrawerTrigger
                    onClick={() => {
                      setIsDrawerOpenImport(true);
                    }}
                    className="w-full">
                    <div className="w-full text-[14px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                      <Import />
                      Tambah
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="bg-line-10">
                    <DrawerHeader>
                      <DrawerTitle>Master Data Import</DrawerTitle>

                      <form
                        onSubmit={handleCreateNIPImport}
                        className="w-full flex flex-col gap-y-3 max-h-full">
                        <div className="text-center mb-4">
                          <TypingEffect
                            className="text-[14px]"
                            text={["Tambah data yang diperlukan...."]}
                          />
                        </div>

                        <div className="w-full flex flex-col gap-y-5 verticalScroll">
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                            <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                              Data Import
                            </Label>
                            <div className="flex flex-col md:flex-row w-full">
                              <div
                                ref={dropRef}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDropFile}
                                className={`w-full ${
                                  previewFileName ? "md:w-8/12" : "w-full"
                                }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                                <>
                                  <input
                                    type="file"
                                    id="file-input-image"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                  />
                                  <label
                                    htmlFor="file-input-image"
                                    className="text-[14px] md:text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                    {previewFileName
                                      ? previewFileName
                                      : "Drag and drop file here or click to select file"}
                                  </label>
                                </>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 justify-between">
                          <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg">
                            <DrawerDescription className="text-[14px]">
                              Batal
                            </DrawerDescription>
                          </DrawerClose>
                          <Button
                            title="Simpan Data"
                            type="submit"
                            disabled={isLoadingImport ? true : false}
                            className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[14px] px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-full">
                            {isLoadingImport ? (
                              <Loader className="animate-spin" />
                            ) : (
                              "Simpan"
                            )}
                          </Button>
                        </div>
                      </form>
                    </DrawerHeader>
                  </DrawerContent>
                </Drawer>
              </div>

              <div className="w-full">
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                  <DrawerTrigger
                    onClick={() => {
                      setIsDrawerOpen(true);
                    }}
                    className="w-full">
                    <div className="w-full text-[14px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                      <AddIcon />
                      Tambah
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="bg-line-10">
                    <DrawerHeader>
                      <DrawerTitle>Master Data NIP</DrawerTitle>

                      <form
                        onSubmit={handleCreateNIP}
                        className="w-full flex flex-col gap-y-3 max-h-full">
                        <div className="text-center mb-4">
                          <TypingEffect
                            className="text-[14px]"
                            text={["Tambah data yang diperlukan...."]}
                          />
                        </div>

                        <div className="w-full flex flex-col gap-y-5 verticalScroll">
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                            <Label className="focus-within:text-primary-70 font-normal text-left text-[14px]">
                              NIP
                            </Label>
                            <Input
                              id="nip"
                              name="nip"
                              value={data2.nip}
                              onChange={handleChange}
                              type="number"
                              className="w-full text-[14px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                              placeholder="Masukkan NIP"
                            />

                            {hasSubmitted && errors?.nip?._errors && (
                              <div className="text-red-500 text-[14px] md:text-[16px]">
                                {errors.nip._errors[0]}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-4 justify-between">
                          <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg">
                            <DrawerDescription className="text-[14px]">
                              Batal
                            </DrawerDescription>
                          </DrawerClose>
                          <Button
                            title="Simpan Data"
                            type="submit"
                            disabled={isLoading ? true : false}
                            className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[14px] px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-full">
                            {isLoading ? (
                              <Loader className="animate-spin" />
                            ) : (
                              "Simpan"
                            )}
                          </Button>
                        </div>
                      </form>
                    </DrawerHeader>
                  </DrawerContent>
                </Drawer>
              </div>
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
              change={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Pencarian"
            />

            <div className="w-6/12 flex flex-row gap-x-5">
              <div className="w-full">
                <AlertDialog
                  open={isDialogOpenImport}
                  onOpenChange={setIsDialogOpenImport}>
                  <AlertDialogTrigger
                    onClick={() => {
                      setIsDialogOpenImport(true);
                    }}
                    className="w-full">
                    <div className="w-full h-12 text-[14px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                      <Import />
                      Import
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                    <div className="flex flex-col gap-y-3">
                      <AlertDialogTitle className="text-center text-[18px]">
                        Master Data Import
                      </AlertDialogTitle>

                      <div className="flex w-full justify-center">
                        <TypingEffect
                          className="custom-class text-[16px]"
                          text={["Input data yang diperlukan"]}
                        />
                      </div>

                      <form
                        onSubmit={handleCreateNIPImport}
                        className="w-full flex flex-col gap-y-3 max-h-[500px]">
                        <div className="w-full flex flex-col gap-y-5 verticalScroll">
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                            <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                              Data Import
                            </Label>
                            <div className="flex flex-col md:flex-row w-full">
                              <div
                                ref={dropRef}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDropFile}
                                className={`w-full h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                                <>
                                  <input
                                    type="file"
                                    id="file-input-image"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                  />
                                  <label
                                    htmlFor="file-input-image"
                                    className="text-[14px] md:text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                    {previewFileName
                                      ? previewFileName
                                      : "Drag and drop file here or click to select file"}
                                  </label>
                                </>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full flex flex-row justify-between items-center gap-x-5">
                          <AlertDialogCancel>
                            <AlertDialogDescription className="text-center text-[16px] pl-3 pr-3">
                              Batal
                            </AlertDialogDescription>
                          </AlertDialogCancel>
                          <Button
                            type="submit"
                            disabled={isLoadingImport ? true : false}
                            className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[16px] px-3 rounded-lg border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                            {isLoadingImport ? (
                              <Loader className="animate-spin" />
                            ) : (
                              "Simpan"
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="w-full">
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger
                    onClick={() => {
                      setIsDialogOpen(true);
                    }}
                    className="w-full">
                    <div className="w-full h-12 text-[14px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                      <AddIcon />
                      Tambah
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                    <div className="flex flex-col gap-y-3">
                      <AlertDialogTitle className="text-center text-[18px]">
                        Master Data NIP
                      </AlertDialogTitle>

                      <div className="flex w-full justify-center">
                        <TypingEffect
                          className="custom-class text-[16px]"
                          text={["Input data yang diperlukan"]}
                        />
                      </div>

                      <form
                        onSubmit={handleCreateNIP}
                        className="w-full flex flex-col gap-y-3 max-h-[500px]">
                        <div className="w-full flex flex-col gap-y-5 verticalScroll">
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                            <Label className="focus-within:text-primary-70 font-normal text-left text-[16px]">
                              NIP
                            </Label>
                            <Input
                              id="nip"
                              name="nip"
                              value={data2.nip}
                              onChange={handleChange}
                              type="number"
                              className="w-full text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                              placeholder="Masukkan NIP"
                            />

                            {hasSubmitted && errors?.nip?._errors && (
                              <div className="text-red-500 text-[14px] md:text-[16px]">
                                {errors.nip._errors[0]}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="w-full flex flex-row justify-between items-center gap-x-5">
                          <AlertDialogCancel>
                            <AlertDialogDescription className="text-center text-[16px] pl-3 pr-3">
                              Batal
                            </AlertDialogDescription>
                          </AlertDialogCancel>
                          <Button
                            type="submit"
                            disabled={isLoading ? true : false}
                            className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[16px] px-3 rounded-lg border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                            {isLoading ? (
                              <Loader className="animate-spin" />
                            ) : (
                              "Simpan"
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
        {/* dekstop*/}

        <div className="w-full">
          {nip && nip.length > 0 ? (
            <SuperManagementListTablePages
              nip={nip}
              data2={data2}
              setData2={setData2}
              isUpdateLoading={isUpdateLoading}
              isDialogEditOpen={isDialogEditOpen}
              setIsDialogEditOpen={setIsDialogEditOpen}
              isDrawerEditOpen={isDrawerEditOpen}
              setIsDrawerEditOpen={setIsDrawerEditOpen}
              handleUpdateNipData={handleUpdateNipData}
              nipId={nipId}
              setNipId={setNipId}
            />
          ) : (
            <>
              <DataNotFound />
            </>
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
