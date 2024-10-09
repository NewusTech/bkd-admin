"use client";

import {
  deleteAreas,
  getAreas,
  getService,
  postAreas,
  updateAreas,
} from "@/services/api";
import { AreasInterface, ServiceInterface } from "@/types/interface";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import PaginationComponent from "@/components/elements/pagination";
import InputComponent from "@/components/InputComponent";
import SuperServiceRequirementsMasterDataTablePages from "@/components/tables/master_datas/service-requirements-table";
import Link from "next/link";
import AddIcon from "@/components/elements/add_button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import SearchPages from "@/components/elements/search";
import { useDebounce } from "@/hooks/useDebounce";

export default function ServiceRequiremnts() {
  const [instance, setInstance] = useState<string>("");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState<string>("");
  const deboucedSearch = useDebounce(search, 500);
  const [searchInputInstance, setSearchInputInstance] = useState("");
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerEditOpen, setIsDrawerEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [areas, setAreas] = useState<AreasInterface[]>([]);
  const [services, setServices] = useState<ServiceInterface[]>([]);
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

  const fetchService = async (page: number, limit: number, search: string) => {
    try {
      const response = await getService(page, limit, search);

      setServices(response.data);
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
    fetchService(1, 10, "");
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchService(newPage, 10, "");
    }
  };

  //   const handleDeleteAreas = async (slug: string) => {
  //     setIsDeleteLoading(true);
  //     try {
  //       const result = await Swal.fire({
  //         title: "Apakah Anda Yakin Menghapus Bidang?",
  //         text: "Bidang yang telah dihapus tidak dapat dipulihkan!",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#0000FF",
  //         cancelButtonColor: "#EE3F62",
  //         confirmButtonText: "Delete",
  //       });

  //       if (result.isConfirmed) {
  //         const response = await deleteAreas(slug);

  //         if (response.status === 200) {
  //           await Swal.fire({
  //             icon: "success",
  //             title: `Bidang berhasil dihapus!`,
  //             timer: 2000,
  //             position: "center",
  //           });
  //           setIsDeleteLoading(false);
  //           fetchAreas(pagination.currentPage, 10);
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsDeleteLoading(false);
  //     }
  //   };

  //   const handleUpdateArea = async (
  //     e: React.FormEvent<HTMLFormElement>,
  //     slug: string
  //   ) => {
  //     e.preventDefault();
  //     setIsUpdateLoading(true);

  //     try {
  //       const response = await updateAreas(slug, data);

  //       if (response.status === 200) {
  //         setData({
  //           nama: "",
  //           desc: "",
  //           nip_pj: "",
  //           pj: "",
  //         });
  //         Swal.fire({
  //           icon: "success",
  //           title: "Berhasil Mengupdate Bidang!",
  //           timer: 2000,
  //           showConfirmButton: false,
  //           position: "center",
  //         });
  //         fetchAreas(pagination.currentPage, 10);
  //         setIsDialogEditOpen(false);
  //         router.push("/super-admin/master-data/areas");
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Gagal Menagupdate Bidang!",
  //           timer: 2000,
  //           showConfirmButton: false,
  //           position: "center",
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsUpdateLoading(false);
  //     }
  //   };

  return (
    <>
      {!isMobile ? (
        <>
          {/* Dekstop */}
          <section className="w-full flex flex-col items-center px-5 mt-5">
            <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
              <div className="w-full flex flex-row justify-between gap-x-5">
                <div className="w-[80%] border border-b rounded-lg z-50">
                  <SearchPages
                    search={search}
                    change={(e: any) => setSearch(e.target.value)}
                    placeholder="Pencarian"
                  />
                </div>
                <div className="w-[15%]">
                  <div className="flex justify-end items-center w-full">
                    <Link
                      href="/super-admin/master-data/service-requirements/create"
                      className="bg-primary-40 w-full group h-11 text-[14px] md:text-[16px] px-3 rounded-lg text-white hover:bg-primary-70 border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300 py-2">
                      <AddIcon className="w-4 h-4 text-line-10" />
                      Tambah
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-full">
                {services && services.length > 0 && (
                  <SuperServiceRequirementsMasterDataTablePages
                    services={services}
                  />
                )}
              </div>
            </div>
          </section>
          {/* Desktop */}
        </>
      ) : (
        <>
          {/* mobile */}
          <section className="w-full flex flex-col items-center px-5 mt-5">
            <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
              <h1 className="text-lg text-center">Kelola Persyaratan</h1>

              <div className="w-full gap-x-5">
                <div className="w-full border border-b rounded-lg z-50">
                  <InputComponent
                    typeInput="selectSearch"
                    valueInput={searchInputInstance}
                    onChangeInputSearch={(e) =>
                      setSearchInputInstance(e.target.value)
                    }
                    // items={result}
                    label="Instansi"
                    placeholder="Pilih Instansi"
                    value={instance}
                    onChange={(e: any) => setInstance(e)}
                  />
                </div>
                <div className="w-full mt-2">
                  <div className="flex justify-end items-center w-full">
                    <Link
                      className="w-full text-[14px] md:text-[16px] bg-primary-40 flex flex-row items-center justify-center hover:bg-primary-70 h-10 text-line-10 px-3 py-2 rounded-lg border border-primary-40 text-center font-medium gap-x-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                      href="/super-admin/master-data/service-requirements/create">
                      <AddIcon className="w-4 h-4 text-line-10" />
                      Tambah Persyaratan
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5 mt-2">
              <div className="w-full">
                {/* {areas && areas.length > 0 && (
                                    <MobileSuperServiceRequirementsMasterDataTablePages
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
                                )} */}
              </div>
            </div>
          </section>
          {/* Mobile */}
        </>
      )}

      <div className="w-full">
        <PaginationComponent
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
