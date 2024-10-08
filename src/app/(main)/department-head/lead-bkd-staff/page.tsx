"use client";

import DatePages from "@/components/elements/date";
import SearchPages from "@/components/elements/search";
import { formatDate } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Checks, Printer, Trash } from "@phosphor-icons/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import FilterDataPages from "@/components/elements/data_filters";
import VerificationUserApplicationHistoryTablePages from "@/components/tables/verification_admin_user_application_history_table";
import {
  deleteStructureOrganizations,
  getAllGrade,
  getApplicationUserHistories,
  getAreas,
  getService,
  getStructureOrganizations,
  postStructureOrganizations,
  updateStructureOrganizations,
} from "@/services/api";
import {
  AreasInterface,
  GradeInterface,
  ServiceInterface,
  StructureOrganizationInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import DataNotFound from "@/components/elements/data_not_found";
import { useDebounce } from "@/hooks/useDebounce";
import PaginationComponent from "@/components/elements/pagination";
import DepartmentHeadStaffHeadTablePages from "@/components/tables/department_head_staff_bkd_table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TypingEffect from "@/components/ui/TypingEffect";
import AddIcon from "@/components/elements/add_button";
import { Loader } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { staffStatus } from "@/constants/main";
import Image from "next/image";

export default function LeadBkdStaffScreen() {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [layananId, setLayananId] = useState<number | undefined>(undefined);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isDialogOpenCreate, setIsDialogOpenCreate] = useState(false);
  const [isDialogOpenUpdate, setIsDialogOpenUpdate] = useState(false);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), 0, 1);
  const [startDate, setStartDate] = useState<Date | undefined>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [users, setUsers] = useState<UserApplicationHistoryInterface[]>([]);
  const [areas, setAreas] = useState<AreasInterface[]>([]);
  const [grades, setGrades] = useState<GradeInterface[]>([]);
  const [organizations, setOrganizations] = useState<
    StructureOrganizationInterface[]
  >([]);
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [data, setData] = useState({
    nama: "",
    jabatan: "",
    image: "",
    golongan: "",
    nip: "",
    bidang_id: "",
    status: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const startDateFormatted = startDate
    ? formatDate(new Date(startDate))
    : undefined;
  const endDateFormatted = endDate ? formatDate(new Date(endDate)) : undefined;

  const fetchStructureOrganization = async (
    page: number,
    limit: number,
    search: string
  ) => {
    try {
      const response = await getStructureOrganizations(page, limit, search);

      setOrganizations(response.data);
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
    fetchStructureOrganization(1, 5, debounceSearch);
  }, [debounceSearch]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== pagination.currentPage) {
      fetchStructureOrganization(newPage, 5, "");
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

  const handleCreateStructureOrganization = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoadingCreate(true);

    const formData = new FormData();
    formData.append("nama", data.nama);
    formData.append("jabatan", data.jabatan);
    formData.append("golongan", data.golongan);
    formData.append("nip", data.nip);
    formData.append("bidang_id", data.bidang_id);
    formData.append("status", data.status);
    if (fileImage) {
      formData.append("image", fileImage);
    }

    // Object.keys(formData).forEach((key) => {
    //   console.log(key, formData.get(key));
    // });

    try {
      const response = await postStructureOrganizations(formData);

      if (response.status === 201) {
        setData({
          nama: "",
          jabatan: "",
          image: "",
          golongan: "",
          nip: "",
          bidang_id: "",
          status: "",
        });
        setFileImage(null);
        setPreviewImage("");
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Staff BKD!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchStructureOrganization(pagination?.currentPage, 5, "");
        setIsDialogOpenCreate(false);
        router.push("/department-head/lead-bkd-staff");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Staff BKD!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCreate(false);
      setIsDialogOpenCreate(false);
    }
  };

  const handleDeleteStructureOrganization = async (slug: string) => {
    setIsLoadingDelete(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Daftar Staff BKD?",
        text: "Staff BKD yang telah dihapus tidak dapat dipulihkan!",
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
            title: `Staff BKD Berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          setIsLoadingDelete(false);
          fetchStructureOrganization(pagination?.currentPage, 5, "");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const handleUpdateStructureOrganization = async (
    e: React.FormEvent<HTMLFormElement>,
    slug: string
  ) => {
    e.preventDefault();
    setIsLoadingUpdate(true);

    const formData = new FormData();
    formData.append("nama", data?.nama);
    formData.append("jabatan", data?.jabatan);
    formData.append("golongan", data?.golongan);
    formData.append("nip", data?.nip);
    formData.append("bidang_id", data?.bidang_id);
    formData.append("status", data?.status);
    if (fileImage) {
      formData.append("image", fileImage);
    }

    console.log(data, "data");

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await updateStructureOrganizations(formData, slug);

      console.log(response, "ini res");

      if (response.status === 200) {
        setData({
          nama: "",
          jabatan: "",
          image: "",
          golongan: "",
          nip: "",
          bidang_id: "",
          status: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Staff BKD!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchStructureOrganization(pagination?.currentPage, 5, "");
        setIsDialogOpenUpdate(false);
        router.push("/department-head/lead-bkd-staff");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate Staff BKD!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const fetchAreas = async (page: number, limit: number, search?: string) => {
    try {
      const response = await getAreas(page, limit, search);

      setAreas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGrades = async (limit: number) => {
    try {
      const response = await getAllGrade(limit);

      setGrades(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreas(1, 100, "");
    fetchGrades(19);
  }, []);

  return (
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <div
        className={`w-full flex flex-col ${!isMobile ? "bg-white shadow-md rounded-lg p-5" : ""} gap-y-3`}>
        <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
          <Select
            onValueChange={(value) =>
              setLayananId(value === "all" ? undefined : Number(value))
            }>
            <SelectTrigger
              className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
              <SelectValue
                placeholder="Pilih Layanan"
                className="text-black-80 tex-[14px] w-full"
              />
            </SelectTrigger>
            <SelectContent className="bg-line-10">
              <div className="pt-2">
                <SelectItem className="w-full px-4" value="all">
                  Semua Status
                </SelectItem>
                {areas &&
                  areas.map((area: AreasInterface, i: number) => {
                    return (
                      <SelectItem
                        key={i}
                        className={`w-full px-4`}
                        value={area.id.toString()}>
                        {area?.nama}
                      </SelectItem>
                    );
                  })}
              </div>
            </SelectContent>
          </Select>
        </div>

        <div
          className={`w-full flex flex-col md:flex-row ${!isMobile ? "" : "p-3 rounded-lg shadow-md"} bg-line-10 gap-y-5 gap-x-5`}>
          <SearchPages
            search={search}
            change={(e: any) => setSearch(e.target.value)}
            placeholder="Pencarian"
          />

          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
            <Select
              onValueChange={(value) =>
                setLayananId(value === "all" ? undefined : Number(value))
              }>
              <SelectTrigger
                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                <SelectValue
                  placeholder="Pilih Status"
                  className="text-black-80 tex-[14px] w-full"
                />
              </SelectTrigger>
              <SelectContent className="bg-line-10">
                <div className="pt-2">
                  <SelectItem className="w-full px-4" value="all">
                    Semua Status
                  </SelectItem>
                  {areas &&
                    areas.map((area: AreasInterface, i: number) => {
                      return (
                        <SelectItem
                          key={i}
                          className={`w-full px-4`}
                          value={area.id.toString()}>
                          {area?.nama}
                        </SelectItem>
                      );
                    })}
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className="w-4/12">
            <Button className="w-full flex flex-row gap-x-4 text-sm bg-primary-40 items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
              <Printer className="w-6 h-6 text-line-10" />

              <span>Print</span>
            </Button>
          </div>

          <div className="w-full md:w-6/12">
            {!isMobile ? (
              <AlertDialog
                open={isDialogOpenCreate}
                onOpenChange={setIsDialogOpenCreate}>
                <AlertDialogTrigger
                  onClick={() => setIsDialogOpenCreate(true)}
                  className="w-full">
                  <div className="w-full text-xs bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <AddIcon />
                    Tambah
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col max-h-[500px]">
                    <AlertDialogTitle className="text-center">
                      Staff BKD
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      <TypingEffect
                        className="custom-class md:text-sm text-xs"
                        speed={125}
                        deleteSpeed={50}
                        text={["Input data yang diperlukan"]}
                      />
                    </AlertDialogDescription>
                    <form
                      onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-3 verticalScroll">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Bidang
                        </Label>

                        <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                          <Select
                            onValueChange={(value) =>
                              setData({ ...data, bidang_id: value })
                            }>
                            <SelectTrigger
                              className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                              <SelectValue
                                placeholder="Pilih Bidang"
                                className="text-black-80 tex-[14px] w-full"
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-line-10">
                              <div className="pt-2">
                                {areas &&
                                  areas.map(
                                    (area: AreasInterface, i: number) => {
                                      return (
                                        <SelectItem
                                          key={i}
                                          className={`w-full px-4`}
                                          value={area.id.toString()}>
                                          {area?.nama}
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
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Nama Lengkap
                        </Label>

                        <Input
                          id="nama"
                          name="nama"
                          value={data.nama}
                          onChange={handleChange}
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Masukkan Nama Lengkap Anda"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          NIP
                        </Label>

                        <Input
                          id="nip"
                          name="nip"
                          value={data.nip}
                          onChange={handleChange}
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Masukkan NIP Anda"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Jabatan
                        </Label>

                        <Input
                          id="jabatan"
                          name="jabatan"
                          value={data.jabatan}
                          onChange={handleChange}
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Masukkan Jabatan Anda"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Golongan
                        </Label>

                        <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                          <Select
                            onValueChange={(value) =>
                              setData({ ...data, golongan: value })
                            }>
                            <SelectTrigger
                              className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                              <SelectValue
                                placeholder="Pilih Golongan"
                                className="text-black-80 tex-[14px] w-full"
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-line-10">
                              <div className="pt-2">
                                {grades &&
                                  grades.map(
                                    (grade: GradeInterface, i: number) => {
                                      return (
                                        <SelectItem
                                          key={i}
                                          className={`w-full px-4`}
                                          value={grade?.nama}>
                                          {grade?.nama}
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
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Status
                        </Label>

                        <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                          <Select
                            onValueChange={(value) =>
                              setData({ ...data, status: value })
                            }>
                            <SelectTrigger
                              className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                              <SelectValue
                                placeholder="Pilih Status Staff"
                                className="text-black-80 tex-[14px] w-full"
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-line-10">
                              <div className="pt-2">
                                {staffStatus &&
                                  staffStatus.map(
                                    (
                                      status: {
                                        id: number;
                                        value: string;
                                        keys: number;
                                      },
                                      i: number
                                    ) => {
                                      return (
                                        <SelectItem
                                          key={i}
                                          className={`w-full px-4`}
                                          value={status.keys.toString()}>
                                          {status?.value}
                                        </SelectItem>
                                      );
                                    }
                                  )}
                              </div>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex flex-col w-full">
                        <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                          Foto Staff
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
                            <div>
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
                                className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                Drag and drop file here or click to select file
                              </label>
                            </div>
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

                      <div className="w-full flex flex-row justify-center items-center gap-x-5">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <Button
                          type="submit"
                          disabled={isLoadingCreate ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                          {isLoadingCreate ? (
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
              <Drawer
                open={isDialogOpenCreate}
                onOpenChange={setIsDialogOpenCreate}>
                <DrawerTrigger
                  onClick={() => setIsDialogOpenCreate(true)}
                  className="w-full">
                  <div className="w-full text-xs bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <AddIcon />
                    Tambah
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                  <div className="w-full flex flex-col gap-y-3 verticalScroll">
                    <DrawerTitle className="text-center">Staff BKD</DrawerTitle>

                    <DrawerDescription className="text-center">
                      <TypingEffect
                        className="custom-class md:text-sm text-xs"
                        speed={125}
                        deleteSpeed={50}
                        text={["Input data yang diperlukan"]}
                      />
                    </DrawerDescription>

                    <form
                      onSubmit={handleCreateStructureOrganization}
                      className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Bidang
                          </Label>

                          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                            <Select
                              onValueChange={(value) =>
                                setData({ ...data, bidang_id: value })
                              }>
                              <SelectTrigger
                                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                <SelectValue
                                  placeholder="Pilih Bidang"
                                  className="text-black-80 tex-[14px] w-full"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-line-10">
                                <div className="pt-2">
                                  {areas &&
                                    areas.map(
                                      (area: AreasInterface, i: number) => {
                                        return (
                                          <SelectItem
                                            key={i}
                                            className={`w-full px-4`}
                                            value={area.id.toString()}>
                                            {area?.nama}
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
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Nama Lengkap
                          </Label>

                          <Input
                            id="nama"
                            name="nama"
                            value={data.nama}
                            onChange={handleChange}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Nama Lengkap Anda"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            NIP
                          </Label>

                          <Input
                            id="nip"
                            name="nip"
                            value={data.nip}
                            onChange={handleChange}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan NIP Anda"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Jabatan
                          </Label>

                          <Input
                            id="jabatan"
                            name="jabatan"
                            value={data.jabatan}
                            onChange={handleChange}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Jabatan Anda"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Golongan
                          </Label>

                          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                            <Select
                              onValueChange={(value) =>
                                setData({ ...data, golongan: value })
                              }>
                              <SelectTrigger
                                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                <SelectValue
                                  placeholder="Pilih Golongan"
                                  className="text-black-80 tex-[14px] w-full"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-line-10">
                                <div className="pt-2">
                                  {grades &&
                                    grades.map(
                                      (grade: GradeInterface, i: number) => {
                                        return (
                                          <SelectItem
                                            key={i}
                                            className={`w-full px-4`}
                                            value={grade?.nama}>
                                            {grade?.nama}
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
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Status
                          </Label>

                          <div className="flex items-center w-full h-[40px] justify-between bg-line-10 border border-primary-40 rounded-lg">
                            <Select
                              onValueChange={(value) =>
                                setData({ ...data, status: value })
                              }>
                              <SelectTrigger
                                className={`w-full gap-x-4 text-[14px] rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                                <SelectValue
                                  placeholder="Pilih Status Staff"
                                  className="text-black-80 tex-[14px] w-full"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-line-10">
                                <div className="pt-2">
                                  {staffStatus &&
                                    staffStatus.map(
                                      (
                                        status: {
                                          id: number;
                                          value: string;
                                          keys: number;
                                        },
                                        i: number
                                      ) => {
                                        return (
                                          <SelectItem
                                            key={i}
                                            className={`w-full px-4`}
                                            value={status.keys.toString()}>
                                            {status?.value}
                                          </SelectItem>
                                        );
                                      }
                                    )}
                                </div>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex flex-col w-full">
                          <Label className="text-[16px] text-neutral-700 font-normal mb-2">
                            Foto Staff
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
                              <div>
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
                                  className="text-[16px] text-center text-neutral-600 p-2 md:p-4 font-light cursor-pointer">
                                  Drag and drop file here or click to select
                                  file
                                </label>
                              </div>
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
                          disabled={isLoadingCreate ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[14px] md:text-[16px] px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-full">
                          {isLoadingCreate ? (
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
      </div>

      <div className="w-full">
        {organizations && organizations.length > 0 && (
          <DepartmentHeadStaffHeadTablePages
            organizations={organizations}
            areas={areas}
            grades={grades}
            previewImage={previewImage}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDropImage={handleDropImage}
            handleImageChange={handleImageChange}
            handleRemoveImage={handleRemoveImage}
            handleDeleteStructureOrganization={
              handleDeleteStructureOrganization
            }
            isLoadingDelete={isLoadingDelete}
            data={data}
            setData={setData}
            isLoadingUpdate={isLoadingUpdate}
            isDialogOpenUpdate={isDialogOpenUpdate}
            setIsDialogOpenUpdate={setIsDialogOpenUpdate}
            handleUpdateStructureOrganization={
              handleUpdateStructureOrganization
            }
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

      <div className="w-full">
        {organizations.length === 0 && <DataNotFound />}
      </div>
    </section>
  );
}