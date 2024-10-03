"use client";

export const dynamic = "force-dynamic";
import SearchPages from "@/components/elements/search";
import { Button } from "@/components/ui/button";
import {
  deleteStructureOrganizations,
  getStructureOrganizations,
  getStructureOrganizationsMain,
  postStructureOrganizations,
  postStructureOrganizationsMain,
  updateStructureOrganizations,
} from "@/services/api";
import { StructureOrganizationInterface } from "@/types/interface";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Trash } from "@phosphor-icons/react";
import SuperStructureOrganizationMasterDataTablePages from "@/components/tables/master_datas/structure_organization_table";
import Image from "next/image";
import SuperStructureOrganizationMainMasterDataTablePages from "@/components/tables/master_datas/structure_organization_main_table";

export default function StructureOrganizationMainScreen() {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const limitItem = 30;
  const [organizations, setOrganizations] = useState<
    StructureOrganizationInterface[]
  >([]);
  const [mainOrganizations, setMainOrganizations] = useState<any>();
  const [data, setData] = useState({
    bkdstruktur_id: "",
  });

  const fetchStructureOrganizationMain = async () => {
    try {
      const response = await getStructureOrganizationsMain();

      setMainOrganizations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStructureOrganizationMain();
  }, []);

  const fetchStructureOrganization = async (limit: number) => {
    try {
      const response = await getStructureOrganizations(limit);

      setOrganizations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStructureOrganization(limitItem);
  }, []);

  const handleSelectChange = (value: string) => {
    setData({
      ...data,
      bkdstruktur_id: value,
    });
  };

  const handleCreateStructureOrganization = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(data, "ini data");

    try {
      const response = await postStructureOrganizationsMain({
        ...data,
        bkdstruktur_id: Number(data.bkdstruktur_id),
      });

      console.log(response, "ini res");

      if (response.status === 201) {
        setData({
          bkdstruktur_id: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Struktur Organisasi!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchStructureOrganizationMain();
        setIsDialogOpen(false);
        router.push("/super-admin/master-data/structure-organization-main");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Struktur Organisasi!",
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

  // const handleDeleteStructureOrganization = async (slug: string) => {
  //   setIsDeleteLoading(true);
  //   try {
  //     const result = await Swal.fire({
  //       title: "Apakah Anda Yakin Menghapus Struktur Organisasi?",
  //       text: "Struktur Organisasi yang telah dihapus tidak dapat dipulihkan!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#0000FF",
  //       cancelButtonColor: "#EE3F62",
  //       confirmButtonText: "Delete",
  //     });

  //     if (result.isConfirmed) {
  //       const response = await deleteStructureOrganizations(slug);

  //       if (response.status === 200) {
  //         await Swal.fire({
  //           icon: "success",
  //           title: `Struktur Organisasi berhasil dihapus!`,
  //           timer: 2000,
  //           position: "center",
  //         });
  //         setIsDeleteLoading(false);
  //         fetchStructureOrganization(limitItem);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsDeleteLoading(false);
  //   }
  // };

  // const handleUpdateStructureOrganization = async (
  //   e: React.FormEvent<HTMLFormElement>,
  //   slug: string
  // ) => {
  //   e.preventDefault();
  //   setIsUpdateLoading(true);

  //   const formData = new FormData();
  //   formData.append("nama", data.nama);
  //   formData.append("jabatan", data.jabatan);
  //   if (fileImage) {
  //     formData.append("image", fileImage);
  //   }

  //   try {
  //     const response = await updateStructureOrganizations(slug, formData);

  //     if (response.status === 200) {
  //       setData({
  //         nama: "",
  //         jabatan: "",
  //         image: "",
  //       });
  //       Swal.fire({
  //         icon: "success",
  //         title: "Berhasil Mengupdate Struktur Organisasi!",
  //         timer: 2000,
  //         showConfirmButton: false,
  //         position: "center",
  //       });
  //       fetchStructureOrganization(limitItem);
  //       setIsDialogEditOpen(false);
  //       router.push("/super-admin/master-data/structure-organization");
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Gagal Mengupdate Struktur Organisasi!",
  //         timer: 2000,
  //         showConfirmButton: false,
  //         position: "center",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsUpdateLoading(false);
  //   }
  // };

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
                onClick={() => setIsDialogOpen(true)}
                className="w-full">
                <div className="w-full text-sm bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
                  Tambah
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center">
                    Master Data Struktur Organisasi Inti
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Input data yang diperlukan
                  </AlertDialogDescription>
                  <form
                    onSubmit={handleCreateStructureOrganization}
                    className="w-full flex flex-col gap-y-3 verticalScroll">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <div className="w-full focus-within:text-black-80 flex flex-col gap-y-2">
                        <Label className="focus-within:text-black-800 font-normal text-sm">
                          Pilih Struktur Yang Akan Ditampilkan
                        </Label>

                        <div className="w-full border border-line-20 rounded-lg">
                          <Select onValueChange={handleSelectChange}>
                            <SelectTrigger
                              className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                              <SelectValue
                                placeholder="Pilih Jabatan"
                                className="text-black-80 w-full"
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-line-10">
                              <div className="pt-2">
                                {organizations &&
                                  organizations.length > 0 &&
                                  organizations.map(
                                    (
                                      organization: StructureOrganizationInterface,
                                      i: number
                                    ) => {
                                      return (
                                        <SelectItem
                                          key={i}
                                          className={`w-full px-4`}
                                          value={organization.id.toString()}>
                                          {organization?.jabatan}
                                        </SelectItem>
                                      );
                                    }
                                  )}
                              </div>
                            </SelectContent>
                          </Select>
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
          </div>
        </div>

        <div className="w-full">
          {organizations && organizations.length > 0 && (
            <SuperStructureOrganizationMainMasterDataTablePages
              organizations={organizations}
              // handleDeleteStructureOrganization={
              //   handleDeleteStructureOrganization
              // }
              // isDeleteLoading={isDeleteLoading}
              data={data}
              setData={setData}
              // isUpdateLoading={isUpdateLoading}
              // isDialogEditOpen={isDialogEditOpen}
              // setIsDialogEditOpen={setIsDialogEditOpen}
              // handleUpdateStructureOrganization={
              //   handleUpdateStructureOrganization
              // }
            />
          )}
        </div>
      </div>
    </section>
  );
}