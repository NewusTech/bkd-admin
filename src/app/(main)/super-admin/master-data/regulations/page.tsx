"use client";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import SearchPages from "@/components/elements/search";
import SuperAreasMasterDataTablePages from "@/components/tables/master_datas/areas_table";
import { Button } from "@/components/ui/button";
import {
  createRegulations,
  deleteAreas,
  getAreas,
  getManualBooks,
  getRegulations,
  postAreas,
  updateAreas,
  updateRegulations,
} from "@/services/api";
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
import { AreasInterface, RegulationInterface } from "@/types/interface";
import React, { useEffect, useRef, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Loader, Trash } from "lucide-react";
import PaginationComponent from "@/components/elements/pagination";
import Editor from "@/components/elements/toolbar_editors";
import SuperManualBookMasterDataTablePages from "@/components/tables/master_datas/manual_book_table";
import SuperRegulationMasterDataTablePages from "@/components/tables/master_datas/regulation_table";
import { set } from "date-fns";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileRegulationMasterDataCard from "@/components/mobile_all_cards/mobileRegulationMasterDataCard";
import AddIcon from "@/components/elements/add_button";
import TypingEffect from "@/components/ui/TypingEffect";

export default function RegulationScreen() {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [regulations, setRegulations] = useState<RegulationInterface[]>();
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [data, setData] = useState({
    title: "",
    file: "",
  });

  const fetchRegulations = async () => {
    try {
      const response = await getRegulations();

      setRegulations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRegulations();
  }, []);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileImage(file);
      setData({
        ...data,
        file: file.name,
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
        file: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  const handleRemoveImage = () => {
    setFileImage(null);
    setPreviewImage("");
    setData({ ...data, file: "" });
  };

  const handleCreateRegulations = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsCreateLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    if (fileImage) {
      formData.append("file", fileImage);
    }

    try {
      const response = await createRegulations(formData);

      if (response.status === 201) {
        setData({
          title: "",
          file: "",
        });
        setFileImage(null);
        setPreviewImage("");
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Regulasi!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchRegulations();
        setIsDialogOpen(false);
        router.push("/super-admin/master-data/regulations");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Regulasi!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreateLoading(false);
    }
  };

  const handleUpdateRegulations = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    if (fileImage) {
      formData.append("file", fileImage);
    }

    try {
      const response = await updateRegulations(formData, id);

      if (response.status === 200) {
        setData({
          title: "",
          file: "",
        });
        setFileImage(null);
        setPreviewImage("");
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Regulasi!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchRegulations();
        setIsDialogEditOpen(false);
        router.push("/super-admin/master-data/regulations");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate Regulasi!",
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
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-black-80 font-semibold text-lg">
            Data Tabel Regulasi
          </p>
        </div>

        <div className="w-full md:w-3/12">
          {!isMobile ? (
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger
                onClick={() => setIsDialogOpen(true)}
                className="w-full">
                <div className="w-full text-[14px] md:text-[16px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                  <AddIcon />
                  Tambah Regulasi
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center">
                    Master Data Regulasi
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    <TypingEffect
                      className="custom-class text-[14px] md:text-[16px]"
                      speed={125}
                      deleteSpeed={50}
                      text={["Input data yang diperlukan"]}
                    />
                  </AlertDialogDescription>

                  <form
                    onSubmit={handleCreateRegulations}
                    className="w-full flex flex-col gap-y-3 verticalScroll">
                    <div className="flex flex-col gap-y-3 w-full">
                      <Label className="text-[14px] md:text-[16px] text-neutral-700 font-normal mb-2">
                        Title
                      </Label>
                      <Input
                        type="text"
                        name="title"
                        id="title"
                        value={data.title}
                        onChange={(e) =>
                          setData({ ...data, title: e.target.value })
                        }
                        className="w-full"
                        placeholder="Masukkan Judul Regulasi"
                      />
                    </div>

                    <div className="flex flex-col w-full">
                      <Label className="text-[14px] md:text-[16px] text-neutral-700 font-normal mb-2">
                        File
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
                          <>
                            <input
                              type="file"
                              id="file-input-image"
                              name="file"
                              accept="pdf, image/*"
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
                                <iframe
                                  src={previewImage}
                                  className="w-full h-[200px] rounded-lg">
                                  Berkas Regilasi
                                </iframe>
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

                    <div className="w-full flex flex-row justify-center items-center gap-x-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button
                        type="submit"
                        disabled={isCreateLoading ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10">
                        {isCreateLoading ? (
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
                  Tambah Regulasi
                </div>
              </DrawerTrigger>
              <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                <div className="w-full flex flex-col gap-y-3 verticalScroll">
                  <DrawerTitle className="text-center">
                    Master Data Regulasi
                  </DrawerTitle>
                  <DrawerDescription className="text-center">
                    <TypingEffect
                      className="custom-class text-[14px] md:text-[16px]"
                      speed={125}
                      deleteSpeed={50}
                      text={["Input data yang diperlukan"]}
                    />
                  </DrawerDescription>

                  <form
                    onSubmit={handleCreateRegulations}
                    className="w-full flex flex-col gap-y-5 verticalScroll">
                    <div className="w-full flex flex-col gap-y-3 verticalScroll">
                      <div className="flex flex-col gap-y-3 w-full">
                        <Label className="text-[14px] md:text-[16px] text-neutral-700 font-normal mb-2">
                          Title
                        </Label>
                        <Input
                          type="text"
                          name="title"
                          id="title"
                          value={data.title}
                          onChange={(e) =>
                            setData({ ...data, title: e.target.value })
                          }
                          className="w-full"
                          placeholder="Masukkan Judul Regulasi"
                        />
                      </div>

                      <div className="flex flex-col w-full">
                        <Label className="text-[14px] md:text-[16px] text-neutral-700 font-normal mb-2">
                          File
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
                            <>
                              <input
                                type="file"
                                id="file-input-image"
                                name="file"
                                accept="pdf, image/*"
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
                                  <iframe
                                    src={previewImage}
                                    className="w-full h-[200px] rounded-lg">
                                    Berkas Regulasi
                                  </iframe>
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
                      <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg text-[14px] md:text-[16px]">
                        <DrawerDescription className="text-[14px] md:text-[16px]">
                          Batal
                        </DrawerDescription>
                      </DrawerClose>
                      <Button
                        title="Simpan Data"
                        type="submit"
                        disabled={isUpdateLoading ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[14px] md:text-[16px] px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-full">
                        {isUpdateLoading ? (
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
          {!isMobile ? (
            <>
              {regulations && regulations.length > 0 && (
                <SuperRegulationMasterDataTablePages
                  regulations={regulations}
                  data={data}
                  setData={setData}
                  isUpdateLoading={isUpdateLoading}
                  isDialogEditOpen={isDialogEditOpen}
                  setIsDialogEditOpen={setIsDialogEditOpen}
                  handleUpdateRegulations={handleUpdateRegulations}
                  dropRef={dropRef}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDropImage={handleDropImage}
                  handleRemoveImage={handleRemoveImage}
                  handleImageChange={handleImageChange}
                  previewImage={previewImage}
                />
              )}
            </>
          ) : (
            <div className="w-full flex flex-col gap-y-5">
              {regulations &&
                regulations.length > 0 &&
                regulations?.map(
                  (regulation: RegulationInterface, i: number) => {
                    return (
                      <MobileRegulationMasterDataCard
                        regulation={regulation}
                        index={i}
                        key={i}
                        data={data}
                        setData={setData}
                        isUpdateLoading={isUpdateLoading}
                        isDialogEditOpen={isDialogEditOpen}
                        setIsDialogEditOpen={setIsDialogEditOpen}
                        handleUpdateRegulations={handleUpdateRegulations}
                        dropRef={dropRef}
                        handleDragOver={handleDragOver}
                        handleDragLeave={handleDragLeave}
                        handleDropImage={handleDropImage}
                        handleRemoveImage={handleRemoveImage}
                        handleImageChange={handleImageChange}
                        previewImage={previewImage}
                      />
                    );
                  }
                )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
