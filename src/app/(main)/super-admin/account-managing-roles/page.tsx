"use client";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import SearchPages from "@/components/elements/search";
import SuperAreasMasterDataTablePages from "@/components/tables/master_datas/areas_table";
import { Button } from "@/components/ui/button";
import {
  deleteAreas,
  getAccountManagingRoles,
  getAllRoles,
  getAreas,
  postAreas,
  postRegisterCreate,
  updateAreas,
} from "@/services/api";
import {
  AccountAdminInterface,
  AccountManagingRolesInterface,
  AreasInterface,
  RolesInterface,
} from "@/types/interface";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Eye, EyeOff, Loader } from "lucide-react";
import PaginationComponent from "@/components/elements/pagination";
import Editor from "@/components/elements/toolbar_editors";
import EditorProvide from "@/components/pages/areas";
import AddIcon from "@/components/elements/add_button";
import TypingEffect from "@/components/ui/TypingEffect";
import { useDebounce } from "@/hooks/useDebounce";
import NotFoundSearch from "@/components/ui/SearchNotFound";
import SuperAccountManagingRolesTablePages from "@/components/tables/super_admin_account_managing_roles_table/page";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function SuperAccountManagingRolesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [seen, setSeen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerEditOpen, setIsDrawerEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const limitItem = 30;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [roles, setRoles] = useState<RolesInterface[]>([]);
  const [areas, setAreas] = useState<AreasInterface[]>([]);
  const [accounts, setAccounts] = useState<AccountAdminInterface[]
  >([]);
  const [data, setData] = useState({
    bidang_id: "",
    role_id: "",
    name: "",
    nip: "",
    email: "",
    password: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });
  const debounceSearch = useDebounce(search);

  const fetchAccountManagingRoles = async (
    page: number,
    limit: number,
    search: string
  ) => {
    try {
      const response = await getAccountManagingRoles(page, limit, search);
      setAccounts(response.data);
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
    fetchAccountManagingRoles(1, 5, search);
  }, [search]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchAccountManagingRoles(newPage, 5, "");
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await getAllRoles();

      setRoles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAreas = async (page: number, limit: number, search: string) => {
    try {
      const response = await getAreas(page, limit, search);

      setAreas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreas(1, 10, search);
    fetchRoles();
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCreateAreas = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await postRegisterCreate(data);

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menambahkan akun!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        return router.push("/super-admin/account-managing-roles");
      } else {
        Swal.fire({
          icon: "error",
          title: `${response.message} dan Gagal membuat akun!`,
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

  // const handleDeleteAreas = async (slug: string) => {
  //   setIsDeleteLoading(true);
  //   try {
  //     const result = await Swal.fire({
  //       title: "Apakah Anda Yakin Menghapus Bidang?",
  //       text: "Bidang yang telah dihapus tidak dapat dipulihkan!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#0000FF",
  //       cancelButtonColor: "#EE3F62",
  //       confirmButtonText: "Delete",
  //     });

  //     if (result.isConfirmed) {
  //       const response = await deleteAreas(slug);

  //       if (response.status === 200) {
  //         await Swal.fire({
  //           icon: "success",
  //           title: `Bidang berhasil dihapus!`,
  //           timer: 2000,
  //           position: "center",
  //         });
  //         setIsDeleteLoading(false);
  //         fetchAreas(pagination.currentPage, 10, "");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsDeleteLoading(false);
  //   }
  // };

  // const handleUpdateArea = async (
  //   e: React.FormEvent<HTMLFormElement>,
  //   slug: string
  // ) => {
  //   e.preventDefault();
  //   setIsUpdateLoading(true);

  //   try {
  //     const response = await updateAreas(slug, data);

  //     if (response.status === 200) {
  //       setData({
  //         nama: "",
  //         desc: "",
  //         nip_pj: "",
  //         pj: "",
  //       });
  //       Swal.fire({
  //         icon: "success",
  //         title: "Berhasil Mengupdate Bidang!",
  //         timer: 2000,
  //         showConfirmButton: false,
  //         position: "center",
  //       });
  //       fetchAreas(pagination.currentPage, 10, "");
  //       setIsDialogEditOpen(false);
  //       setIsDrawerEditOpen(false);
  //       router.push("/super-admin/master-data/areas");
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Gagal Menagupdate Bidang!",
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
    <section className="w-full flex flex-col items-center md:px-5 md:mt-5">
      <div className="bg-[#F6F6F6] md:bg-line-10 md:shadow-md md:rounded-lg w-full flex flex-col p-5 gap-y-5">
        {/* Mobile */}
        {/* <div className="md:hidden">
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
                  <div className="w-full text-xs bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <AddIcon />
                    Tambah Bidang
                  </div>
                </DrawerTrigger>
                <DrawerContent className="bg-white">
                  <DrawerHeader>
                    <DrawerTitle>Master Data Bidang</DrawerTitle>

                    <form
                      onSubmit={handleCreateAreas}
                      className="w-full flex flex-col gap-y-3 max-h-full">
                      <div className="text-center mb-4">
                        <TypingEffect
                          text={["Tambah data yang diperlukan...."]}
                        />
                      </div>

                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-left text-xs md:text-sm">
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
                          <Label className="focus-within:text-primary-70 font-normal text-left text-xs md:text-sm">
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
                            className="focus-within:text-primary-70 font-normal text-left text-xs md:text-sm">
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
                          <Label className="focus-within:text-primary-70 font-normal text-left text-xs md:text-sm">
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
                      </div>
                    </form>
                  </DrawerHeader>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div> */}
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

            <div className="w-full md:w-3/12">
              {!isMobile ? (
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger
                    onClick={() => {
                      setIsDialogOpen(true);
                    }}
                    className="w-full"
                  >
                    <div className="w-full text-[14px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                      <AddIcon />
                      Tambah
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                    <div className="flex flex-col gap-y-3">
                      <AlertDialogTitle className="text-center">
                        Kelola Akun
                      </AlertDialogTitle>

                      <div className="flex w-full justify-center">
                        <TypingEffect
                          className="custom-class md:text-sm text-xs"
                          text={["Input data yang diperlukan"]}
                        />
                      </div>

                      <form
                        onSubmit={handleCreateAreas}
                        className="w-full flex flex-col gap-y-3 max-h-[500px]"
                      >
                        <div className="w-full flex flex-col gap-y-3 verticalScroll">
                          <div className="w-full focus-within:text-black-80 flex flex-col gap-y-2">
                            <Label className="focus-within:text-black-800 font-normal text-[14px] md:text-smtext-left">
                              Pilih Bidang
                            </Label>
                            <div className="w-full border border-line-20 rounded-lg">
                              <Select
                                onValueChange={(value) =>
                                  setData({ ...data, bidang_id: value })
                                }
                              >
                                <SelectTrigger
                                  className={`w-full text-[14px] gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}
                                >
                                  <SelectValue
                                    placeholder="Pilih Bidang"
                                    className="text-black-80 text-[14px] w-full"
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
                                              className={`w-full px-4`}
                                              value={area.id.toString()}
                                            >
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

                          <div className="w-full focus-within:text-black-80 flex flex-col gap-y-2">
                            <Label className="focus-within:text-black-800 font-normal text-[14px] md:text-smtext-left">
                              Pilih Peran
                            </Label>
                            <div className="w-full border border-line-20 rounded-lg">
                              <Select
                                onValueChange={(value) =>
                                  setData({ ...data, role_id: value })
                                }
                              >
                                <SelectTrigger
                                  className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}
                                >
                                  <SelectValue
                                    placeholder="Pilih Bidang"
                                    className="text-black-80 tetx-[14px] w-full"
                                  />
                                </SelectTrigger>
                                <SelectContent className="bg-line-10">
                                  <div className="pt-2">
                                    {roles &&
                                      roles.length > 0 &&
                                      roles.map(
                                        (role: RolesInterface, i: number) => {
                                          return (
                                            <SelectItem
                                              key={i}
                                              className={`w-full px-4`}
                                              value={role.id.toString()}
                                            >
                                              {role?.name}
                                            </SelectItem>
                                          );
                                        }
                                      )}
                                  </div>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                            <Label
                              htmlFor="name"
                              className="focus-within:text-primary-70 font-normal text-left text-xs md:text-sm"
                            >
                              Nama Lengkap
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={data.name}
                              onChange={handleChange}
                              type="text"
                              className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                              placeholder="Masukkan Nama Lengkap"
                            />
                          </div>

                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                            <Label
                              htmlFor="nip"
                              className="focus-within:text-primary-70 font-normal text-left text-xs md:text-sm"
                            >
                              NIP
                            </Label>
                            <Input
                              id="nip"
                              name="nip"
                              value={data.nip}
                              onChange={handleChange}
                              type="text"
                              inputMode="numeric"
                              className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                              placeholder="Masukkan NIP"
                            />
                          </div>

                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                            <Label
                              htmlFor="email"
                              className="focus-within:text-primary-70 font-normal text-left text-xs md:text-sm"
                            >
                              Email
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              value={data.email}
                              onChange={handleChange}
                              type="email"
                              className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                              placeholder="Masukkan Email"
                            />
                          </div>

                          <div className="w-full focus-within:text-black-70 flex flex-col gap-y-2">
                            <Label
                              htmlFor="password"
                              className="focus-within:text-primary-40 text-[14px] font-normal"
                            >
                              Kata Sandi
                            </Label>

                            <div className="focus-within:border focus-within:border-primary-40 flex items-center mt-1 justify-between rounded-lg bg-transparent text-[14px] w-full h-[40px] font-normal border border-grey-50 placeholder:text-[14px] placeholder:text-neutral-700">
                              <Input
                                id="password"
                                name="password"
                                autoComplete="true"
                                value={data.password}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setData({
                                    ...data,
                                    password: e.target.value,
                                  })
                                }
                                type={!seen ? "text" : "password"}
                                className="w-full focus-visible:text-black-70 border-none outline-none bg-transparent"
                                placeholder="Masukkan Kata Sandi"
                              />

                              <div
                                onClick={() => setSeen(!seen)}
                                className="p-2 cursor-pointer"
                              >
                                {seen ? (
                                  <EyeOff className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                                ) : (
                                  <Eye className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full flex flex-row justify-between items-center gap-x-5">
                          <AlertDialogCancel>
                            <AlertDialogDescription className="text-center">
                              Batal
                            </AlertDialogDescription>
                          </AlertDialogCancel>
                          <Button
                            type="submit"
                            disabled={isLoading ? true : false}
                            className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-xs md:text-sm px-3 rounded-lg border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2"
                          >
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
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {/* dekstop*/}

        <div className="w-full">
          {/* {areas && areas.length > 0 ? ( */}
          <SuperAccountManagingRolesTablePages
            accounts={accounts}
            areas={areas}
            roles={roles}
            // handleDeleteArea={handleDeleteAreas}
            isDeleteLoading={isDeleteLoading}
            data={data}
            setData={setData}
            isUpdateLoading={isUpdateLoading}
            isDialogEditOpen={isDialogEditOpen}
            setIsDialogEditOpen={setIsDialogEditOpen}
            isDrawerEditOpen={isDrawerEditOpen}
            setIsDrawerEditOpen={setIsDrawerEditOpen}
            // handleUpdateArea={handleUpdateArea}
            seen={seen}
            setSeen={setSeen}
          />
          {/* ) : (
            <>
              <NotFoundSearch />
            </>
          )} */}
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
