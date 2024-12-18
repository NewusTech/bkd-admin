"use client";

export const dynamic = "force-dynamic";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import SearchPages from "@/components/elements/search";
import { Button } from "@/components/ui/button";
import {
  deleteNews,
  getNews,
  postCreateNews,
  updateNews,
} from "@/services/api";
import { NewsInterface } from "@/types/interface";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Plus, Trash } from "@phosphor-icons/react";
import SuperNewsMasterDataTablePages from "@/components/tables/master_datas/news_table";
import Image from "next/image";
import PaginationComponent from "@/components/elements/pagination";
import EditorProvide from "@/components/pages/areas";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileNewsMasterDataCard from "@/components/mobile_all_cards/mobileNewsMasterDataCard";
import Link from "next/link";
import AddIcon from "@/components/elements/add_button";
import { useDebounce } from "@/hooks/useDebounce";
import NotFoundSearch from "@/components/ui/SearchNotFound";
import TypingEffect from "@/components/ui/TypingEffect";
import { z } from "zod";
import { schemaNewsData } from "@/validations";

export default function NewsScreen() {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [news, setNews] = useState<NewsInterface[]>([]);
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [data, setData] = useState({
    title: "",
    desc: "",
    image: "",
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
      await schemaNewsData.parseAsync({
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

  const fetchNews = async (page: number, limit: number, search: string) => {
    try {
      const response = await getNews(page, limit, search);

      setNews(response.data);
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
    fetchNews(1, 10, debounceSearch);
  }, [debounceSearch]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchNews(newPage, 10, debounceSearch);
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

  const handleCreateNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setHasSubmitted(true);

    const isValid = await validateForm();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    if (fileImage) {
      formData.append("image", fileImage);
    }

    // Object.keys(formData).forEach((key) => {
    //   console.log(key, formData.get(key));
    // });

    if (isValid) {
      setIsLoading(true);

      try {
        const response = await postCreateNews(formData);

        if (response.status === 201) {
          setData({
            title: "",
            desc: "",
            image: "",
          });
          Swal.fire({
            icon: "success",
            title: "Berhasil Menambahkan Berita!",
            timer: 2000,
            showConfirmButton: false,
            position: "center",
          });
          fetchNews(pagination.currentPage, 10, "");
          setIsDialogOpen(false);
          router.push("/super-admin/master-data/news");
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal Menambahkan Berita!",
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
    }
  };

  const handleDeleteNews = async (slug: string) => {
    setIsDeleteLoading(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Berita?",
        text: "Berita yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteNews(slug);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Berita berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          setIsDeleteLoading(false);
          fetchNews(pagination.currentPage, 10, "");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleUpdateNews = async (
    e: React.FormEvent<HTMLFormElement>,
    slug: string
  ) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    if (fileImage) {
      formData.append("image", fileImage);
    }

    try {
      const response = await updateNews(slug, formData);

      if (response.status === 200) {
        setData({
          title: "",
          desc: "",
          image: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Berita!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchNews(pagination.currentPage, 10, "");
        setIsDialogEditOpen(false);
        router.push("/super-admin/master-data/news");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menagupdate Berita!",
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
        <h1 className="text-lg">Kelola Berita</h1>
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
                  {/* Add Data */}
                  <div className="flex justify-end items-center w-full">
                    <Link
                      href="/super-admin/master-data/news"
                      className="w-full h-full text-[16px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                      <AddIcon />
                      Tambah
                    </Link>
                  </div>
                  {/* Tambah Data */}
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col">
                    <AlertDialogTitle className="text-center">
                      <AlertDialogDescription className="text-center">
                        Master Data Berita
                      </AlertDialogDescription>
                    </AlertDialogTitle>

                    <div className="w-full flex flex-row items-center justify-center">
                      <TypingEffect
                        className="custom-class text-[14px]"
                        speed={125}
                        deleteSpeed={50}
                        text={["Input data yang diperlukan"]}
                      />
                    </div>

                    <form
                      onSubmit={handleCreateNews}
                      className="w-full flex flex-col gap-y-3 max-h-[500px]">
                      <div className="w-full flex flex-col gap-y-5 verticalScroll">
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
                            className="focus-within:text-primary-70 font-normal text-[16px]"
                            placeholder="Masukkan Judul Berita"
                          />

                          {hasSubmitted && errors?.title?._errors && (
                            <div className="text-red-500 text-[14px] md:text-[16px]">
                              {errors.title._errors[0]}
                            </div>
                          )}
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                            Deskripsi Berita
                          </Label>
                          <div className="w-full h-full border border-line-20 rounded-lg text-[16px]">
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

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                          <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                            Foto Berita
                          </Label>
                          <div className="flex flex-col md:flex-row w-full">
                            <div
                              ref={dropRef}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDropImage}
                              className={`w-full ${
                                data?.image || previewImage
                                  ? "md:w-8/12"
                                  : "w-full"
                              }  h-[100px] border-2 border-dashed rounded-xl mt-1 flex flex-col items-center justify-center }`}>
                              <>
                                <input
                                  type="file"
                                  id="file-input-image"
                                  name="image"
                                  accept="image/*,.pdf"
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
                            {(previewImage || data?.image) && (
                              <div className="relative md:ml-4 w-full mt-1">
                                <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                  <div className="w-full h-full">
                                    <Image
                                      src={previewImage || data?.image}
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

                      <div className="w-full flex flex-row justify-between items-center gap-x-5">
                        <AlertDialogCancel className="text-[16px]">
                          Cancel
                        </AlertDialogCancel>
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
                    Tambah Berita
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                  <div className="w-full flex flex-col gap-y-3 verticalScroll">
                    <DrawerTitle className="text-center text-[14px]">
                      <DrawerDescription className="text-center">
                        Master Data Berita
                      </DrawerDescription>
                    </DrawerTitle>

                    <div className="w-full flex flex-row items-center justify-center">
                      <TypingEffect
                        className="custom-class text-[14px]"
                        speed={125}
                        deleteSpeed={50}
                        text={["Input data yang diperlukan"]}
                      />
                    </div>

                    <form
                      onSubmit={handleCreateNews}
                      className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
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
                            placeholder="Masukkan Judul Berita"
                          />

                          {hasSubmitted && errors?.title?._errors && (
                            <div className="text-red-500 text-[14px] md:text-[16px]">
                              {errors.title._errors[0]}
                            </div>
                          )}
                        </div>

                        <div className="w-full flex flex-col gap-y-2">
                          <Label className="text-[14px] text-black-70 font-normal">
                            Deskripsi Berita
                          </Label>
                          <div className="w-full h-full border border-line-20 rounded-lg text-[14px]">
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

                        <div className="flex flex-col w-full">
                          <Label className="text-[14px] text-neutral-700 font-normal mb-2">
                            Foto Berita
                          </Label>
                          <div className="flex flex-col md:flex-row w-full">
                            <div
                              ref={dropRef}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDropImage}
                              className={`w-full ${
                                data?.image || previewImage
                                  ? "md:w-8/12"
                                  : "w-full"
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
                            {(previewImage || data?.image) && (
                              <div className="relative md:ml-4 w-full mt-1">
                                <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                  <div className="w-full h-full">
                                    <Image
                                      src={previewImage || data?.image}
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
              {news && news.length > 0 ? (
                <SuperNewsMasterDataTablePages
                  news={news}
                  previewImage={previewImage}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDropImage={handleDropImage}
                  handleImageChange={handleImageChange}
                  handleRemoveImage={handleRemoveImage}
                  handleDeleteNews={handleDeleteNews}
                  isDeleteLoading={isDeleteLoading}
                  data={data}
                  setData={setData}
                  isUpdateLoading={isUpdateLoading}
                  isDialogEditOpen={isDialogEditOpen}
                  setIsDialogEditOpen={setIsDialogEditOpen}
                  handleUpdateNews={handleUpdateNews}
                />
              ) : (
                <>
                  <NotFoundSearch />
                </>
              )}
            </>
          ) : (
            <div className="w-full flex flex-col gap-y-5">
              {news && news.length > 0 ? (
                news.map((item: NewsInterface, i: number) => {
                  return (
                    <MobileNewsMasterDataCard
                      key={i}
                      item={item}
                      index={i}
                      previewImage={previewImage}
                      handleDragOver={handleDragOver}
                      handleDragLeave={handleDragLeave}
                      handleDropImage={handleDropImage}
                      handleImageChange={handleImageChange}
                      handleRemoveImage={handleRemoveImage}
                      handleDeleteNews={handleDeleteNews}
                      isDeleteLoading={isDeleteLoading}
                      data={data}
                      setData={setData}
                      isUpdateLoading={isUpdateLoading}
                      handleUpdateNews={handleUpdateNews}
                      isDialogEditOpen={isDialogEditOpen}
                      setIsDialogEditOpen={setIsDialogEditOpen}
                    />
                  );
                })
              ) : (
                <NotFoundSearch />
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
