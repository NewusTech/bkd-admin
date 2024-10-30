"use client";

import SearchPages from "@/components/elements/search";
import SuperAreasMasterDataTablePages from "@/components/tables/master_datas/areas_table";
import { Button } from "@/components/ui/button";
import { deleteAreas, getAreas, postAreas, updateAreas } from "@/services/api";
import { AreasInterface } from "@/types/interface";
import React, { useCallback, useEffect, useState } from "react";
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
import { Loader } from "lucide-react";
import PaginationComponent from "@/components/elements/pagination";
import Editor from "@/components/elements/toolbar_editors";
import EditorProvide from "@/components/pages/areas";
import AddIcon from "@/components/elements/add_button";
import TypingEffect from "@/components/ui/TypingEffect";
import { useDebounce } from "@/hooks/useDebounce";
import NotFoundSearch from "@/components/ui/SearchNotFound";
import { schemaAreaData } from "@/validations";
import { z } from "zod";

export default function AreasScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerEditOpen, setIsDrawerEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [slug, setSlug] = useState<string>("");
  const [areas, setAreas] = useState<AreasInterface[]>([]);
  const [data, setData] = useState({
    nama: "",
    desc: "",
    nip_pj: "",
    pj: "",
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
      await schemaAreaData.parseAsync({
        ...data,
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
  }, [data]);

  useEffect(() => {
    if (hasSubmitted) {
      validateForm();
    }
  }, [hasSubmitted, validateForm]);

  useEffect(() => {
    setFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  const fetchAreas = async (page: number, limit: number, search: string) => {
    try {
      const response = await getAreas(page, limit, search);

      setAreas(response.data);
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
    fetchAreas(1, 10, debounceSearch);
  }, [debounceSearch]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchAreas(newPage, 10, "");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAreas = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setHasSubmitted(true);

    const isValid = await validateForm();

    if (isValid) {
      setIsLoading(true);

      try {
        const response = await postAreas(data);

        if (response.status === 201) {
          setData({
            nama: "",
            desc: "",
            nip_pj: "",
            pj: "",
          });
          Swal.fire({
            icon: "success",
            title: "Berhasil Menambahkan Bidang!",
            timer: 2000,
            showConfirmButton: false,
            position: "center",
          });
          fetchAreas(pagination.currentPage, 10, "");
          setIsDialogOpen(false);
          setIsDrawerOpen(false);
          router.push("/super-admin/master-data/areas");
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal Menambahkan Bidang!",
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

  const handleDeleteAreas = async (slug: string) => {
    setIsDeleteLoading(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Bidang?",
        text: "Bidang yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteAreas(slug);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Bidang berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          setIsDeleteLoading(false);
          fetchAreas(pagination.currentPage, 10, "");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleUpdateArea = async (
    e: React.FormEvent<HTMLFormElement>,
    slug: string
  ) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    try {
      const response = await updateAreas(data, slug);

      if (response.status === 200) {
        setData({
          nama: "",
          desc: "",
          nip_pj: "",
          pj: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Bidang!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchAreas(pagination.currentPage, 10, "");
        setIsDialogEditOpen(false);
        setIsDrawerEditOpen(false);
        router.push("/super-admin/master-data/areas");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menagupdate Bidang!",
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
                    <DrawerTitle>Master Data Bidang</DrawerTitle>

                    <form
                      onSubmit={handleCreateAreas}
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
                            Nama Bidang
                          </Label>
                          <Input
                            id="nama-bidang"
                            name="nama"
                            value={data.nama}
                            onChange={handleChange}
                            type="text"
                            className="w-full text-[14px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Nama Bidang"
                          />

                          {hasSubmitted && errors?.nama?._errors && (
                            <div className="text-red-500 text-[14px] md:text-[16px]">
                              {errors.nama._errors[0]}
                            </div>
                          )}
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-left text-[14px]">
                            Penanggung Jawab
                          </Label>
                          <Input
                            id="pj"
                            name="pj"
                            value={data.pj}
                            onChange={handleChange}
                            type="text"
                            className="w-full text-[14px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Nama Penanggung Jawab"
                          />

                          {hasSubmitted && errors?.pj?._errors && (
                            <div className="text-red-500 text-[14px] md:text-[16px]">
                              {errors.pj._errors[0]}
                            </div>
                          )}
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label
                            htmlFor="nip-pj"
                            className="focus-within:text-primary-70 font-normal text-left text-[14px]">
                            NIP Penanggung Jawab
                          </Label>
                          <Input
                            id="nip-pj"
                            name="nip_pj"
                            value={data.nip_pj}
                            onChange={handleChange}
                            type="text"
                            inputMode="numeric"
                            className="w-full text-[14px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan NIP Penanggung Jawab"
                          />

                          {hasSubmitted && errors?.nip_pj?._errors && (
                            <div className="text-red-500 text-[14px] md:text-[16px]">
                              {errors.nip_pj._errors[0]}
                            </div>
                          )}
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-left text-[14px]">
                            Deskripsi Bidang
                          </Label>
                          <div className="w-full h-full border border-line-20 rounded-lg text-left">
                            <EditorProvide
                              content={data.desc}
                              onChange={(e: any) =>
                                setData({ ...data, desc: e })
                              }
                            />
                          </div>

                          {hasSubmitted && errors?.desc?._errors && (
                            <div className="text-red-500 text-[14px] md:text-[16px]">
                              {errors.desc._errors[0]}
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

            <div className="w-3/12">
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger
                  onClick={() => {
                    setIsDialogOpen(true);
                  }}
                  className="w-full">
                  <div className="w-full h-full text-[14px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <AddIcon />
                    Tambah
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                  <div className="flex flex-col gap-y-3">
                    <AlertDialogTitle className="text-center text-[18px]">
                      Master Data Bidang
                    </AlertDialogTitle>

                    <div className="flex w-full justify-center">
                      <TypingEffect
                        className="custom-class text-[16px]"
                        text={["Input data yang diperlukan"]}
                      />
                    </div>

                    <form
                      onSubmit={handleCreateAreas}
                      className="w-full flex flex-col gap-y-3 max-h-[500px]">
                      <div className="w-full flex flex-col gap-y-5 verticalScroll">
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-left text-[16px]">
                            Nama Bidang
                          </Label>
                          <Input
                            id="nama-bidang"
                            name="nama"
                            value={data.nama}
                            onChange={handleChange}
                            type="text"
                            className="w-full text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Nama Bidang"
                          />

                          {hasSubmitted && errors?.nama?._errors && (
                            <div className="text-red-500 text-[14px] md:text-[16px]">
                              {errors.nama._errors[0]}
                            </div>
                          )}
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-left text-[16px]">
                            Penanggung Jawab
                          </Label>
                          <Input
                            id="pj"
                            name="pj"
                            value={data.pj}
                            onChange={handleChange}
                            type="text"
                            className="w-full text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Nama Penanggung Jawab"
                          />

                          {hasSubmitted && errors?.pj?._errors && (
                            <div className="text-red-500 text-[14px] md:text-[16px]">
                              {errors.pj._errors[0]}
                            </div>
                          )}
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label
                            htmlFor="nip-pj"
                            className="focus-within:text-primary-70 font-normal text-left text-[16px]">
                            NIP Penanggung Jawab
                          </Label>
                          <Input
                            id="nip-pj"
                            name="nip_pj"
                            value={data.nip_pj}
                            onChange={handleChange}
                            type="text"
                            inputMode="numeric"
                            className="w-full text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan NIP Penanggung Jawab"
                          />

                          {hasSubmitted && errors?.nip_pj?._errors && (
                            <div className="text-red-500 text-[14px] md:text-[16px]">
                              {errors.nip_pj._errors[0]}
                            </div>
                          )}
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-left text-[16px]">
                            Deskripsi Bidang
                          </Label>
                          <div className="w-full h-full border border-line-20 rounded-lg text-left">
                            <EditorProvide
                              content={data.desc}
                              onChange={(e: any) =>
                                setData({ ...data, desc: e })
                              }
                            />
                          </div>

                          {hasSubmitted && errors?.desc?._errors && (
                            <div className="text-red-500 text-[14px] md:text-[16px]">
                              {errors.desc._errors[0]}
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
        {/* dekstop*/}

        <div className="w-full">
          {areas && areas.length > 0 ? (
            <SuperAreasMasterDataTablePages
              areas={areas}
              handleDeleteArea={handleDeleteAreas}
              isDeleteLoading={isDeleteLoading}
              data={data}
              setData={setData}
              isUpdateLoading={isUpdateLoading}
              isDialogEditOpen={isDialogEditOpen}
              setIsDialogEditOpen={setIsDialogEditOpen}
              isDrawerEditOpen={isDrawerEditOpen}
              setIsDrawerEditOpen={setIsDrawerEditOpen}
              handleUpdateArea={handleUpdateArea}
              slug={slug}
              setSlug={setSlug}
            />
          ) : (
            <>
              <NotFoundSearch />
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
