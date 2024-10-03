"use client";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import SearchPages from "@/components/elements/search";
import { Button } from "@/components/ui/button";
import { deleteAreas, getAreas, postAreas, updateAreas } from "@/services/api";
import { AreasInterface } from "@/types/interface";
import React, { useEffect, useState } from "react";
import { FaPlus } from 'react-icons/fa';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import InputComponent from "@/components/InputComponent";
import SuperServiceRequirementsMasterDataTablePages from "@/components/tables/master_datas/service-requirements-table";
import Link from "next/link";
import AddIcon from "@/components/elements/add_button";

export default function ServiceRequiremnts() {
    const [instance, setInstance] = useState<string>("");
    // const setSelectedId = useCreateRequirement((state) => state.setSelectedId);
    const [searchTermInstance, setSearchTermInstance] = useState("");
    const [role, setRole] = useState<string | null>(null);
    const [instansiId, setInstansiId] = useState<any>(0);
    const [searchInputInstance, setSearchInputInstance] = useState(""); // State for search input
    const [permission, setPermission] = useState<string[]>([]);

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
                <h1 className="text-lg font-semibold">Kelola Persyaratan</h1>
                <div className="w-full flex flex-row gap-x-5">
                    <div className="w-[65%] border border-b rounded-lg z-50">
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
                    <div className="w-[35%]">
                        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <AlertDialogTrigger
                                onClick={() => {
                                    setIsDialogOpen(true);
                                }}
                                className="w-full">
                                {/* Add Data */}
                                <div className="flex justify-end items-center w-full">
                                    <Link
                                        href="/super-admin/master-data/service-requirements/create"
                                        className='bg-primary-40 h-10 text-xs md:text-sm px-3 rounded-lg text-white hover:bg-primary-70 border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300 py-2'>
                                        <AddIcon />
                                        Add Persyaratan Layanan
                                    </Link>
                                </div>
                                {/* Tambah Data */}
                            </AlertDialogTrigger>
                        </AlertDialog>
                    </div>
                </div>

                <div className="w-full">
                    {areas && areas.length > 0 && (
                        <SuperServiceRequirementsMasterDataTablePages
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
