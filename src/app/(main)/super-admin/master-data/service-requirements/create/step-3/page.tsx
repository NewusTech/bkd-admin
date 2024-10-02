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
import Step from "@/components/Steps";

const steps = [
    { id: 1, desk: "Tambah Persyaratan" },
    { id: 2, desk: "Formulir" },
    { id: 3, desk: "Dokumen" },
];
const currentStep = 3;

export default function ServiceRequiremntsCreate() {
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
                <div className="flex gap-4">
                    <Link href="/super-admin/master-data/service-requirements/create/step-2">
                        <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.413 24.2122C19.5001 24.2993 19.5692 24.4028 19.6164 24.5166C19.6635 24.6304 19.6878 24.7523 19.6878 24.8755C19.6878 24.9987 19.6635 25.1207 19.6164 25.2345C19.5692 25.3483 19.5001 25.4517 19.413 25.5388C19.3259 25.6259 19.2225 25.695 19.1087 25.7421C18.9949 25.7893 18.8729 25.8135 18.7498 25.8135C18.6266 25.8135 18.5046 25.7893 18.3908 25.7421C18.277 25.695 18.1736 25.6259 18.0865 25.5388L8.71148 16.1638C8.62431 16.0767 8.55517 15.9733 8.50799 15.8595C8.46081 15.7457 8.43652 15.6237 8.43652 15.5005C8.43652 15.3773 8.46081 15.2553 8.50799 15.1415C8.55517 15.0277 8.62431 14.9243 8.71148 14.8372L18.0865 5.46224C18.2624 5.28633 18.501 5.1875 18.7498 5.1875C18.9985 5.1875 19.2371 5.28633 19.413 5.46224C19.589 5.63815 19.6878 5.87674 19.6878 6.12552C19.6878 6.3743 19.589 6.61289 19.413 6.7888L10.7002 15.5005L19.413 24.2122Z" fill="#3D3D3D" />
                        </svg>
                    </Link>
                    <h1 className="text-sm md:text-lg">
                        Persyaratan Layanan
                    </h1>
                </div>
                <div className="w-full">
                    <div className="text-center mb-4 text-sm md:text-lg">Dokumen</div>
                    <div className="flex w-full">
                        {steps.map((step, index) => (
                            <Step
                                key={step.id}
                                isLastStep={index === steps.length - 1}
                                isActive={step.id === currentStep}
                                isCompleted={step.id < currentStep}  // Determine if the step is completed
                                desk={step.desk}
                            />
                        ))}
                    </div>
                </div>
                <div className="bg-white border border-[#E4E4E7] p-10">
                    <div className="flex text-xs md:text-sm gap-8">
                        <div className="w-[70%]">
                            Apakah kamu bersedia melakukan pendaftaran?
                            <hr className="border-t-1 border-[#E4E4E7] my-2 w-full" />
                        </div>
                        <div className="w-[30%]">
                            <div className="div">Tipe Pertanyaan</div>
                            <div className="border border-[#E4E4E7] mt-2">
                                <InputComponent
                                    typeInput="select"
                                    valueInput={searchInputInstance}
                                    onChangeInputSearch={(e) =>
                                        setSearchInputInstance(e.target.value)
                                    }
                                    // items={result}
                                    label="pertanyaan"
                                    placeholder="Jawaban Panjang"
                                    value={instance}
                                    onChange={(e: any) => setInstance(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Add Data */}
                <div className="flex justify-center m-auto items-center w-full mt-20">
                    <Link
                        href="/super-admin/master-data/service-requirements/create/step-2"
                        className='bg-primary-40 h-10 text-xs md:text-sm px-3 rounded-lg text-white hover:bg-primary-70 border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300 py-2'>
                        Selanjutnya
                    </Link>
                </div>
                {/* Tambah Data */}
            </div>
        </section>
    );
}
