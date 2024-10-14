"use client";

export const dynamic = "force-dynamic";
import SearchPages from "@/components/elements/search";
import { Button } from "@/components/ui/button";
import {
  deleteService,
  getAreas,
  getService,
  postCreateService,
  updateService,
} from "@/services/api";
import { AreasInterface, ServiceInterface } from "@/types/interface";
import React, { useEffect, useMemo, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import SuperServicesMasterDataTablePages from "@/components/tables/master_datas/services_table";
import PaginationComponent from "@/components/elements/pagination";
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
import TypingEffect from "@/components/ui/TypingEffect";
import AddIcon from "@/components/elements/add_button";
import EditorProvide from "@/components/pages/areas";
import { useDebounce } from "@/hooks/useDebounce";
import NotFoundSearch from "@/components/ui/SearchNotFound";

export default function ServicesScreen() {
  const router = useRouter();
  // serach
  const [search, setSearch] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  // serach
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerEditOpen, setIsDrawerEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const limitItem = 30;
  const [areas, setAreas] = useState<AreasInterface[]>([]);
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [data, setData] = useState({
    nama: "",
    desc: "",
    syarat: "",
    bidang_id: "",
    penanggung_jawab: "",
    ketentuan: "",
    langkah: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });
  const debounceSearch = useDebounce(search);

  const fetchAreas = async (page: number, limit: number, search: string) => {
    try {
      const response = await getAreas(page, limit, search);

      setAreas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchService = async (page: number, limit: number, search: string) => {
    try {
      const response = await getService(page, limit, search);

      setServices(response.data);
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: response?.pagination?.totalPages,
        totalCount: response?.pagination?.totalCount,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreas(1, limitItem, search);
    fetchService(1, 10, search);
  }, [limitItem, search]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchService(newPage, 10, "");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setData({
      ...data,
      bidang_id: value,
    });
  };

  const handleCreateService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await postCreateService(data);
      if (response.status === 201) {
        setData({
          nama: "",
          desc: "",
          syarat: "",
          bidang_id: "",
          penanggung_jawab: "",
          ketentuan: "",
          langkah: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Layanan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchService(pagination.currentPage, 10, "");
        setIsDialogOpen(false);
        setIsDrawerOpen(false);
        router.push("/super-admin/master-data/services");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Layanan!",
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
  };

  const handleDeleteService = async (id: number) => {
    setIsDeleteLoading(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Layanan?",
        text: "Layanan yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteService(id);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Layanan berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          setIsDeleteLoading(false);
          fetchService(pagination.currentPage, 10, "");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleUpdateService = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    try {
      const response = await updateService(id, data);

      if (response.status === 200) {
        setData({
          nama: "",
          desc: "",
          syarat: "",
          bidang_id: "",
          penanggung_jawab: "",
          ketentuan: "",
          langkah: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Layanan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchService(pagination.currentPage, 10, "");
        setIsDialogEditOpen(false);
        setIsDrawerEditOpen(false);
        router.push("/super-admin/master-data/services");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate Layanan!",
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
      <div className="bg-line-10 md:bg-line-10 md:shadow-md md:rounded-lg w-full flex flex-col p-5 gap-y-5">
        {/* Mobile */}
        <div className="md:hidden">
          <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-4 gap-y-4 md:p-5 md:gap-y-5">

            <div className="w-full">
              <SearchPages
                search={search}
                setSearch={setSearch}
                change={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                placeholder="Pencarian"
              />
            </div>

            <div className="w-full">
              <Drawer
                open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerTrigger onClick={() => {
                  setIsDrawerOpen(true);
                }} className="w-full">
                  <div className="w-full h-full text-[14px] bg-primary-40 hover:bg-primary-70 flex items-center justify-center text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <AddIcon />
                    Tambah
                  </div>
                </DrawerTrigger>
                <DrawerContent className="bg-white">
                  <DrawerHeader>
                    <DrawerTitle>Master Data Layanan</DrawerTitle>

                    <form
                      onSubmit={handleCreateService}
                      className="w-full flex flex-col gap-y-3 max-h-full h-[700px]">
                      <DrawerDescription>
                        <div className="text-center mb-4">
                          <TypingEffect className="text-[14px]" text={["Tambah data yang diperlukan"]} />
                        </div>
                      </DrawerDescription>
                      <div className="w-full flex flex-col gap-y-5 verticalScroll">

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-[14px] text-left">
                            Nama Layanan
                          </Label>
                          <Input
                            id="nama-layanan"
                            name="nama"
                            value={data.nama}
                            onChange={handleChange}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px]"
                            placeholder="Masukkan Nama Layanan"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label
                            htmlFor="syarat"
                            className="focus-within:text-primary-70 font-normal text-[14px] text-left">
                            Syarat Layanan
                          </Label>
                          <div className="w-full h-full border border-line-20 rounded-lg text-left text-[14px] md:text-[16px]">
                            <EditorProvide
                              content={data.syarat}
                              onChange={(e: any) => setData({ ...data, syarat: e })}
                            />
                          </div>
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-[14px] text-left">
                            Pilih Bidang
                          </Label>
                          <div className="w-full border border-line-20 rounded-lg">
                            <Select onValueChange={handleSelectChange}>
                              <SelectTrigger
                                className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                <SelectValue
                                  placeholder="Pilih Bidang"
                                  className="text-black-80 w-full text-[14px]"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-line-10 text-[14px]">
                                <div className="pt-2">
                                  {areas &&
                                    areas.length > 0 &&
                                    areas.map(
                                      (area: AreasInterface, i: number) => {
                                        return (
                                          <SelectItem
                                            key={i}
                                            className={`w-full px-4 text-[14px]`}
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

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-[14px] text-left">
                            Deskripsi Bidang
                          </Label>
                          <div className="w-full h-full border border-line-20 rounded-lg text-left text-[14px] md:text-[16px]">
                            <EditorProvide
                              content={data.desc}
                              onChange={(e: any) => setData({ ...data, desc: e })}
                            />
                          </div>
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-[14px] text-left">
                            Penanggung Jawab
                          </Label>
                          <Input
                            id="pj"
                            name="penanggung_jawab"
                            value={data.penanggung_jawab}
                            onChange={handleChange}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px]"
                            placeholder="Masukkan Nama Penanggung Jawab"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label
                            htmlFor="ketentuan"
                            className="focus-within:text-primary-70 font-normal text-[14px] text-left">
                            Ketentuan
                          </Label>
                          <div className="w-full h-full border border-line-20 rounded-lg text-left text-[14px] md:text-[16px]">
                            <EditorProvide
                              content={data.ketentuan}
                              onChange={(e: any) => setData({ ...data, ketentuan: e })}
                            />
                          </div>
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label
                            htmlFor="langkah"
                            className="focus-within:text-primary-70 font-normal text-[14px] text-left">
                            Langkah
                          </Label>
                          <div className="w-full h-full border border-line-20 rounded-lg text-left text-[14px] md:text-[16px]">
                            <EditorProvide
                              content={data.langkah}
                              onChange={(e: any) => setData({ ...data, langkah: e })}
                            />
                          </div>
                        </div>

                      </div>
                      <div className="flex gap-4 justify-between">
                        <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg text-[14px]">
                          Batal
                        </DrawerClose>
                        <Button
                          title="Simpan Data"
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 h-full px-3 rounded-lg border border-primary text-center font-mediumitems-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 w-full text-[14px] ">
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
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full">
                  <div className="w-full h-full text-[14px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <AddIcon />
                    Tambah
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col">
                    <AlertDialogTitle className="text-center">
                      Master Data Layanan
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      <TypingEffect className="custom-class text-[16px]" text={["Input data yang diperlukan"]} />
                    </AlertDialogDescription>
                    <form
                      onSubmit={handleCreateService}
                      className="w-full flex flex-col gap-y-3 max-h-[500px]">
                      <div className="w-full flex flex-col gap-y-5 verticalScroll">

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                            Nama Layanan
                          </Label>
                          <Input
                            id="nama-layanan"
                            name="nama"
                            value={data.nama}
                            onChange={handleChange}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[16px]"
                            placeholder="Masukkan Nama Layanan"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label
                            htmlFor="syarat"
                            className="focus-within:text-primary-70 font-normal text-[16px]">
                            Syarat Layanan
                          </Label>
                          <div className="w-full h-full border border-line-20 rounded-lg text-left text-[16px]">
                            <EditorProvide
                              content={data.syarat}
                              onChange={(e: any) => setData({ ...data, syarat: e })}
                            />
                          </div>
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-[16px] text-left">
                            Pilih Bidang
                          </Label>
                          <div className="w-full border border-line-20 rounded-lg">
                            <Select onValueChange={handleSelectChange}>
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
                                    areas.map(
                                      (area: AreasInterface, i: number) => {
                                        return (
                                          <SelectItem
                                            key={i}
                                            className={`w-full px-4 text-[16px]`}
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

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                            Deskripsi Bidang
                          </Label>
                          <div className="w-full h-full border border-line-20 rounded-lg text-left text-[16px]">
                            <EditorProvide
                              content={data.desc}
                              onChange={(e: any) => setData({ ...data, desc: e })}
                            />
                          </div>
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                            Penanggung Jawab
                          </Label>
                          <Input
                            id="pj"
                            name="penanggung_jawab"
                            value={data.penanggung_jawab}
                            onChange={handleChange}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[16px]"
                            placeholder="Masukkan Nama Penanggung Jawab"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label
                            htmlFor="ketentuan"
                            className="focus-within:text-primary-70 font-normal text-[16px]">
                            Ketentuan
                          </Label>
                          <div className="w-full h-full border border-line-20 rounded-lg text-left text-[16px]">
                            <EditorProvide
                              content={data.ketentuan}
                              onChange={(e: any) => setData({ ...data, ketentuan: e })}
                            />
                          </div>
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label
                            htmlFor="langkah"
                            className="focus-within:text-primary-70 font-normal text-[16px]">
                            Langkah
                          </Label>
                          <div className="w-full h-full border border-line-20 rounded-lg text-left text-[16px]">
                            <EditorProvide
                              content={data.langkah}
                              onChange={(e: any) => setData({ ...data, langkah: e })}
                            />
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
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        <div className="w-full">
          {services && services.length > 0 ? (
            <SuperServicesMasterDataTablePages
              services={services}
              areas={areas}
              handleDeleteService={handleDeleteService}
              isDeleteLoading={isDeleteLoading}
              data={data}
              setData={setData}
              isUpdateLoading={isUpdateLoading}
              isDialogEditOpen={isDialogEditOpen}
              setIsDialogEditOpen={setIsDialogEditOpen}
              isDrawerEditOpen={isDrawerEditOpen}
              setIsDrawerEditOpen={setIsDrawerEditOpen}
              handleUpdateService={handleUpdateService}
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
