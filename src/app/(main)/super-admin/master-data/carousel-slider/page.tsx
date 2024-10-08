"use client";

export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import {
  deleteCarouselSliders,
  getCarouselSliders,
  postCarouselSliders,
  updateCarouselSliders,
} from "@/services/api";
import { CarouselSliderInterface } from "@/types/interface";
import React, { useEffect, useRef, useState } from "react";
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
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Trash } from "@phosphor-icons/react";
import SuperCarouselSliderMasterDataTablePages from "@/components/tables/master_datas/carousel_sliders_table";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileCarouselSliderMasterDataCard from "@/components/mobile_all_cards/mobileCarouselSliderMasterDataCard";
import AddIcon from "@/components/elements/add_button";
import TypingEffect from "@/components/ui/TypingEffect";

export default function CarouselSliderScreen() {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [carousels, setCarousels] = useState<CarouselSliderInterface[]>([]);
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [data, setData] = useState({
    image: "",
  });

  const fetchCarouselSliders = async () => {
    try {
      const response = await getCarouselSliders();

      setCarousels(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarouselSliders();
  }, []);

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

  const handleCreateSlider = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    if (fileImage) {
      formData.append("image", fileImage);
    }

    try {
      const response = await postCarouselSliders(formData);

      if (response.status === 201) {
        setData({
          image: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Slider!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchCarouselSliders();
        setIsDialogOpen(false);
        router.push("/super-admin/master-data/carousel-slider");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Slider!",
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

  const handleDeleteSlider = async (id: number) => {
    setIsDeleteLoading(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Slider?",
        text: "Slider yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteCarouselSliders(id);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Slider berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          setIsDeleteLoading(false);
          fetchCarouselSliders();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleUpdateSlider = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    const formData = new FormData();
    if (fileImage) {
      formData.append("image", fileImage);
    }

    try {
      const response = await updateCarouselSliders(id, formData);

      if (response.status === 200) {
        setData({
          image: "",
        });
        setFileImage(null);
        setPreviewImage("");
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Slider!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchCarouselSliders();
        setIsDialogEditOpen(false);
        router.push("/super-admin/master-data/carousel-slider");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate Slider!",
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
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
        <div className="w-full flex flex-row justify-end gap-x-5">
          <div className="w-5/12 md:w-3/12">
            {!isMobile ? (
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full">
                  <div className="w-full text-[14px] md:text-[16px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <AddIcon />
                    Tambah Slider
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col">
                    <AlertDialogTitle className="text-center">
                      Master Data Slider
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      <TypingEffect className="custom-class text-[14px] md:text-[16px]" speed={125} deleteSpeed={50} text={["Input data yang diperlukan"]} />
                    </AlertDialogDescription>

                    <form
                      onSubmit={handleCreateSlider}
                      className="w-full flex flex-col gap-y-3 max-h-[500px]">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">

                        <div className="flex flex-col w-full">
                          <Label className="text-[14px] md:text-[16px] text-neutral-700 font-normal mb-2">
                            Slider
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
                                  className="text-[14px] md:text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
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

                      </div>
                      <div className="w-full flex flex-row justify-center items-center gap-x-5">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10">
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
                  <div className="w-full text-[14px] md:text-[16px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <AddIcon />
                    Tambah Slider
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                  <div className="w-full flex flex-col gap-y-3 verticalScroll">
                    <DrawerTitle className="text-center">
                      Master Data Carousel Slider
                    </DrawerTitle>
                    <DrawerDescription className="text-center">
                      <TypingEffect className="custom-class text-[14px] md:text-[16px]" speed={125} deleteSpeed={50} text={["Input data yang diperlukan"]} />
                    </DrawerDescription>

                    <form
                      onSubmit={handleCreateSlider}
                      className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">

                        <div className="flex flex-col w-full">
                          <Label className="text-[14px] md:text-[16px] text-neutral-700 font-normal mb-2">
                            Slider
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
                                  className="text-[14px] md:text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
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
                        <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg">
                          <DrawerDescription>Batal</DrawerDescription>
                        </DrawerClose>
                        <Button
                          title="Simpan Data"
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[14px] md:text-[16px] px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-full">
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
              {carousels && carousels.length > 0 && (
                <SuperCarouselSliderMasterDataTablePages
                  carousels={carousels}
                  previewImage={previewImage}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDropImage={handleDropImage}
                  handleImageChange={handleImageChange}
                  handleRemoveImage={handleRemoveImage}
                  handleDeleteSlider={handleDeleteSlider}
                  isDeleteLoading={isDeleteLoading}
                  data={data}
                  setData={setData}
                  isUpdateLoading={isUpdateLoading}
                  isDialogEditOpen={isDialogEditOpen}
                  setIsDialogEditOpen={setIsDialogEditOpen}
                  handleUpdateSlider={handleUpdateSlider}
                />
              )}
            </>
          ) : (
            <>
              {carousels &&
                carousels.length > 0 &&
                carousels?.map(
                  (carousel: CarouselSliderInterface, i: number) => {
                    return (
                      <MobileCarouselSliderMasterDataCard
                        key={i}
                        carousel={carousel}
                        index={i}
                        previewImage={previewImage}
                        handleDragOver={handleDragOver}
                        handleDragLeave={handleDragLeave}
                        handleDropImage={handleDropImage}
                        handleImageChange={handleImageChange}
                        handleRemoveImage={handleRemoveImage}
                        handleDeleteSlider={handleDeleteSlider}
                        isDeleteLoading={isDeleteLoading}
                        data={data}
                        setData={setData}
                        isUpdateLoading={isUpdateLoading}
                        handleUpdateSlider={handleUpdateSlider}
                        isDialogEditOpen={isDialogEditOpen}
                        setIsDialogEditOpen={setIsDialogEditOpen}
                      />
                    );
                  }
                )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
