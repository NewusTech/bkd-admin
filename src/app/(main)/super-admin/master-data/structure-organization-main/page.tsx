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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileStructureOrganizationMainMasterDataCard from "@/components/mobile_all_cards/mobileStructurOrganizationMainMasterDataCard";
import AddIcon from "@/components/elements/add_button";
import TypingEffect from "@/components/ui/TypingEffect";
import { useDebounce } from "@/hooks/useDebounce";

export default function StructureOrganizationMainScreen() {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
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

  const fetchStructureOrganizationMain = async (
    page: number,
    limit: number,
    search: string
  ) => {
    try {
      const response = await getStructureOrganizationsMain(page, limit, search);

      setMainOrganizations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStructureOrganizationMain(1, 5, debounceSearch);
  }, [debounceSearch]);

  const fetchStructureOrganization = async (
    page: number,
    limit: number,
    search: string
  ) => {
    try {
      const response = await getStructureOrganizations(page, limit, search);

      setOrganizations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStructureOrganization(1, 50, "");
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

    try {
      const response = await postStructureOrganizationsMain({
        ...data,
        bkdstruktur_id: Number(data.bkdstruktur_id),
      });

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
        fetchStructureOrganizationMain(1, 5, "");
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

  const handleDeleteStructureOrganization = async (slug: string) => {
    setIsDeleteLoading(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Struktur Organisasi?",
        text: "Struktur Organisasi yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteStructureOrganizations(slug);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Struktur Organisasi berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          setIsDeleteLoading(false);
          fetchStructureOrganization(1, 10, "");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

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
  //     const response = await updateStructureOrganizations(formData, slug);
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
  //       fetchStructureOrganization(1, 10, "");
  //       setIsDialogEditOpen(false);
  //       router.push("/super-admin/master-data/structure-organization-main");
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
                  <div className="w-full text-[14px] md:text-[16px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-full text-line-10 px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <AddIcon />
                    Tambah Data
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col">
                    <AlertDialogTitle className="text-center">
                      <AlertDialogDescription className="text-center">
                        Master Data Struktur Organisasi Inti
                      </AlertDialogDescription>
                    </AlertDialogTitle>

                    <TypingEffect
                      className="custom-class text-[14px] md:text-[16px] text-center"
                      speed={125}
                      deleteSpeed={50}
                      text={["Input data yang diperlukan"]}
                    />

                    <form
                      onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-3 max-h-[500px]">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
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
                                              {organization?.nama}
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
                      </div>
                      <div className="w-full flex flex-row justify-between items-center gap-x-5">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
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
                    Tambah Data
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                  <div className="w-full flex flex-col gap-y-3 verticalScroll">
                    <DrawerTitle className="text-center">
                      Master Data Struktur Organisasi
                    </DrawerTitle>

                    <DrawerDescription className="text-center">
                      <TypingEffect
                        className="custom-class text-[14px] md:text-[16px] text-center"
                        speed={125}
                        deleteSpeed={50}
                        text={["Input data yang diperlukan"]}
                      />
                    </DrawerDescription>

                    <form
                      onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
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
              {mainOrganizations && mainOrganizations.length > 0 && (
                <SuperStructureOrganizationMainMasterDataTablePages
                  organizations={mainOrganizations}
                  handleDeleteStructureOrganization={
                    handleDeleteStructureOrganization
                  }
                  isDeleteLoading={isDeleteLoading}
                  data={data}
                  setData={setData}
                  isUpdateLoading={isUpdateLoading}
                  isDialogEditOpen={isDialogEditOpen}
                  setIsDialogEditOpen={setIsDialogEditOpen}
                  // handleUpdateStructureOrganization={
                  //   handleUpdateStructureOrganization
                  // }
                />
              )}
            </>
          ) : (
            <div className="w-full flex flex-col gap-y-5">
              {mainOrganizations &&
                mainOrganizations.length > 0 &&
                mainOrganizations?.map(
                  (organization: StructureOrganizationInterface, i: number) => {
                    return (
                      <MobileStructureOrganizationMainMasterDataCard
                        key={i}
                        organization={organization}
                        index={i}
                        data={data}
                        setData={setData}
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
