"use client";

export const dynamic = "force-dynamic";
import SearchPages from "@/components/elements/search";
import { Button } from "@/components/ui/button";
import {
  deleteBKDGalleryActivities,
  getBKDGalleryActivities,
  postCreateBKDGalleryActivities,
  updateBKDGalleryActivities,
} from "@/services/api";
import { BKDGalleryActivitiesInterface } from "@/types/interface";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Trash } from "@phosphor-icons/react";
import SuperBKDGalleryActivitiesMasterDataTablePages from "@/components/tables/master_datas/bkd_gallery_activities_table";
import Image from "next/image";
import PaginationComponent from "@/components/elements/pagination";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileBkdGalleryActivitiesMasterDataCard from "@/components/mobile_all_cards/mobileBkdGalleryActivitiesMasterDataCard";
import AddIcon from "@/components/elements/add_button";
import { useDebounce } from "@/hooks/useDebounce";
import NotFoundSearch from "@/components/ui/SearchNotFound";
import TypingEffect from "@/components/ui/TypingEffect";

export default function BKDGalleryActivitiesScreen() {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const limitItem = 30;
  const [galleries, setGalleries] = useState<BKDGalleryActivitiesInterface[]>(
    []
  );
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [data, setData] = useState({
    title: "",
    image: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });
  const debounceSearch = useDebounce(search);

  const fetchGalleries = async (
    page: number,
    limit: number,
    search: string
  ) => {
    try {
      const response = await getBKDGalleryActivities(page, limit, search);

      setGalleries(response.data);
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
    fetchGalleries(1, 10, search);
  }, [search]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchGalleries(newPage, 10, "");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileImage(file);
      setData({
        ...data,
        image: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
  };

  const handleDropImage = (e: any) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileImage(file);
      setData({
        ...data,
        image: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  const handleRemoveImage = () => {
    setFileImage(null);
    setPreviewImage("");
    setData({ ...data, image: "" });
  };

  const handleCreateGallery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    if (fileImage) {
      formData.append("image", fileImage);
    }

    try {
      const response = await postCreateBKDGalleryActivities(formData);

      if (response.status === 201) {
        setData({
          title: "",
          image: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Galeri!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchGalleries(pagination.currentPage, 10, "");
        setIsDialogOpen(false);
        router.push("/super-admin/master-data/bkd-gallery-activities");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Galeri!",
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
    }
  };

  const handleDeleteGallery = async (slug: string) => {
    setIsDeleteLoading(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Galeri?",
        text: "Galeri yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteBKDGalleryActivities(slug);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Galeri berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          setIsDeleteLoading(false);
          fetchGalleries(pagination.currentPage, 10, "");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleUpdateGallery = async (
    e: React.FormEvent<HTMLFormElement>,
    slug: string
  ) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    if (fileImage) {
      formData.append("image", fileImage);
    }

    try {
      const response = await updateBKDGalleryActivities(slug, formData);

      if (response.status === 200) {
        setData({
          title: "",
          image: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Bidang!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchGalleries(pagination.currentPage, 10, "");
        setIsDialogEditOpen(false);
        router.push("/super-admin/master-data/bkd-gallery-activities");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate Galeri!",
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
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
      <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
        <div className="w-full flex flex-col md:flex-row gap-x-5 gap-y-5">
          <SearchPages
            search={search}
            setSearch={setSearch}
            change={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Pencarian"
          />

          <div className="w-full md:w-3/12">
            {!isMobile ? (
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full">
                  <div className="w-full h-full text-[16px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <AddIcon />
                    Tambah
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col max-h-[500px]">
                    <AlertDialogTitle className="text-center text-[16px]">
                      Master Data Galeri Kegiatan
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      <TypingEffect
                        className="custom-class text-[14px]"
                        speed={125}
                        deleteSpeed={50}
                        text={["Input data yang diperlukan"]}
                      />
                    </AlertDialogDescription>

                    <form
                      onSubmit={handleCreateGallery}
                      className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                          Judul Berita
                        </Label>
                        <Input
                          id="nama-bidang"
                          name="title"
                          value={data.title}
                          onChange={handleChange}
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[16px]"
                          placeholder="Masukkan Judul Foto Kegiatan"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                          Foto Kegiatan
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
                                className=" text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                Drag and drop file here or click to select file
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

                      <div className="w-full flex flex-row justify-between items-center gap-x-5">
                        <AlertDialogCancel className="text-[16px]">Cancel</AlertDialogCancel>
                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 text-[16px]">
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
            ) : (
              <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DrawerTrigger
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full">
                  <div className="w-full text-[14px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <AddIcon />
                    Tambah Galeri
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                  <div className="w-full flex flex-col gap-y-3 verticalScroll">
                    <DrawerTitle className="text-center text-[14px]">
                      Master Data Berita
                    </DrawerTitle>

                    <DrawerDescription className="text-center">
                      <TypingEffect
                        className="custom-class text-[14px]"
                        speed={125}
                        deleteSpeed={50}
                        text={["Input data yang diperlukan"]}
                      />
                    </DrawerDescription>

                    <form
                      onSubmit={handleCreateGallery}
                      className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full flex flex-col gap-y-5 verticalScroll">
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-[14px]">
                            Judul Berita
                          </Label>
                          <Input
                            id="nama-bidang"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px]"
                            placeholder="Masukkan Judul Foto Kegiatan"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="text-[14px] text-neutral-700 font-normal mb-2">
                            Foto Kegiatan
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
                                  className="text-[14px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
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

                      <div className="flex gap-4 justify-between">
                        <DrawerClose className="border border-line-20 bg-line-50 bg-opacity-20 rounded-lg text-[14px] w-full h-full">
                          Batal
                        </DrawerClose>
                        <Button
                          title="Simpan Data"
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 text-[14px] rounded-lg border border-primary text-center font-medium items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 w-full h-full">
                          {isLoading ? (
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

        <div className="w-full">
          {!isMobile ? (
            <>
              {galleries && galleries.length > 0 ? (
                <SuperBKDGalleryActivitiesMasterDataTablePages
                  galleries={galleries}
                  previewImage={previewImage}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDropImage={handleDropImage}
                  handleImageChange={handleImageChange}
                  handleRemoveImage={handleRemoveImage}
                  handleDeleteGallery={handleDeleteGallery}
                  isDeleteLoading={isDeleteLoading}
                  data={data}
                  setData={setData}
                  isUpdateLoading={isUpdateLoading}
                  isDialogEditOpen={isDialogEditOpen}
                  setIsDialogEditOpen={setIsDialogEditOpen}
                  handleUpdateGallery={handleUpdateGallery}
                />
              ) : (
                <>
                  <NotFoundSearch />
                </>
              )}
            </>
          ) : (
            <div className="w-full flex flex-col gap-y-5">
              {galleries && galleries.length > 0 ? (
                galleries?.map(
                  (gallery: BKDGalleryActivitiesInterface, i: number) => {
                    return (
                      <MobileBkdGalleryActivitiesMasterDataCard
                        key={i}
                        gallery={gallery}
                        index={i}
                        previewImage={previewImage}
                        handleDragOver={handleDragOver}
                        handleDragLeave={handleDragLeave}
                        handleDropImage={handleDropImage}
                        handleImageChange={handleImageChange}
                        handleRemoveImage={handleRemoveImage}
                        handleDeleteGallery={handleDeleteGallery}
                        isDeleteLoading={isDeleteLoading}
                        data={data}
                        setData={setData}
                        isUpdateLoading={isUpdateLoading}
                        handleUpdateGallery={handleUpdateGallery}
                        isDialogEditOpen={isDialogEditOpen}
                        setIsDialogEditOpen={setIsDialogEditOpen}
                      />
                    );
                  }
                )
              ) : (
                <>
                  <NotFoundSearch />
                </>
              )}
            </div>
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
