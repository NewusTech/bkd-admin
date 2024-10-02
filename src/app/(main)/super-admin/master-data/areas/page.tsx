"use client";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import SearchPages from "@/components/elements/search";
import SuperAreasMasterDataTablePages from "@/components/tables/master_datas/areas_table";
import { Button } from "@/components/ui/button";
import { deleteAreas, getAreas, postAreas, updateAreas } from "@/services/api";
import { AreasInterface } from "@/types/interface";
import React, { useEffect, useState } from "react";
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
import { Loader } from "lucide-react";
import PaginationComponent from "@/components/elements/pagination";
import Editor from "@/components/elements/toolbar_editors";

export default function AreasScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const limitItem = 30;
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
  const { quill: quillAdd, quillRef: quillAddRef } = useQuill();
  const { quill: quillEdit, quillRef: quillEditRef } = useQuill();

  useEffect(() => {
    if (quillAdd && isDialogOpen) {
      quillAdd.on("text-change", () => {
        setData((prevData) => ({
          ...prevData,
          desc: quillAdd.root.innerHTML,
        }));
      });
    }

    if (quillEdit && isDialogEditOpen) {
      quillEdit.on("text-change", () => {
        setData((prevData) => ({
          ...prevData,
          desc: quillEdit.root.innerHTML,
        }));
      });

      if (data?.desc && isDialogEditOpen) {
        quillEdit.clipboard.dangerouslyPasteHTML(data?.desc);
      }
    }
  }, [isDialogOpen, isDialogEditOpen, quillAdd, quillEdit, data?.desc]);

  const fetchAreas = async (page: number, limit: number) => {
    try {
      const response = await getAreas(page, limit);

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
    fetchAreas(1, 10);
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchAreas(newPage, 10);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAreas = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        fetchAreas(pagination.currentPage, 10);
        setIsDialogOpen(false);
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
          fetchAreas(pagination.currentPage, 10);
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
      const response = await updateAreas(slug, data);

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
        fetchAreas(pagination.currentPage, 10);
        setIsDialogEditOpen(false);
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
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
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
                <div className="w-full text-sm bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
                  Tambah Bidang
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col">
                  <AlertDialogTitle className="text-center">
                    Master Data Bidang
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Input data yang diperlukan
                  </AlertDialogDescription>
                  <form
                    onSubmit={handleCreateAreas}
                    className="w-full flex flex-col gap-y-3 max-h-[500px]">
                    <div className="w-full flex flex-col gap-y-3 verticalScroll">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Nama Bidang
                        </Label>

                        <Input
                          id="nama-bidang"
                          name="nama"
                          value={data.nama}
                          onChange={handleChange}
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Masukkan Nama Bidang"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Penanggung Jawab
                        </Label>

                        <Input
                          id="pj"
                          name="pj"
                          value={data.pj}
                          onChange={handleChange}
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Masukkan Nama Penanggung Jawab"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label
                          htmlFor="nip-pj"
                          className="focus-within:text-primary-70 font-normal text-sm">
                          NIP Penanggung Jawab
                        </Label>

                        <Input
                          id="nip-pj"
                          name="nip_pj"
                          value={data.nip_pj}
                          onChange={handleChange}
                          type="text"
                          inputMode="numeric"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Masukkan NIP Penanggung Jawab"
                        />
                      </div>

                      <div className="w-full flex flex-col gap-y-3">
                        <Label className="text-[15px] text-black-80 font-normal">
                          Deskripsi Bidang
                        </Label>

                        {isDialogOpen && (
                          <div className="w-full h-[250px] flex flex-col gap-y-2">
                            <div
                              className="flex flex-col h-[250px] mt-2 w-full border border-line-20 rounded-b-lg"
                              ref={quillAddRef}></div>
                          </div>
                        )}

                        {/* <Editor
                        onChange={(value: any) =>
                          setData({
                            ...data,
                            desc: value,
                          })
                        }
                      /> */}
                      </div>
                    </div>

                    <div className="w-full flex flex-row justify-between items-center gap-x-5">
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
                {/* <AlertDialogFooter className="w-full flex flex-row justify-center items-center gap-x-5"></AlertDialogFooter> */}
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="w-full">
          {areas && areas.length > 0 && (
            <SuperAreasMasterDataTablePages
              areas={areas}
              handleDeleteArea={handleDeleteAreas}
              isDeleteLoading={isDeleteLoading}
              data={data}
              setData={setData}
              isUpdateLoading={isUpdateLoading}
              isDialogEditOpen={isDialogEditOpen}
              setIsDialogEditOpen={setIsDialogEditOpen}
              handleUpdateArea={handleUpdateArea}
              quillEdit={quillEdit}
              quillEditRef={quillEditRef}
            />
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
