"use client";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import SearchPages from "@/components/elements/search";
import SuperAreasMasterDataTablePages from "@/components/tables/master_datas/areas_table";
import { Button } from "@/components/ui/button";
import {
  deleteAreas,
  getAreas,
  getManualBooks,
  postAreas,
  updateAreas,
  updateManualBooks,
} from "@/services/api";
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
import SuperManualBookMasterDataTablePages from "@/components/tables/master_datas/manual_book_table";

export default function ManualBookScreen() {
  const router = useRouter();
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [data, setData] = useState({
    title: "",
    dokumen: "",
  });

  const fetchManualBooks = async () => {
    try {
      const response = await getManualBooks();

      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchManualBooks();
  }, []);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileImage(file);
      setData({
        ...data,
        dokumen: file.name,
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
        dokumen: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  const handleRemoveImage = () => {
    setFileImage(null);
    setPreviewImage("");
    setData({ ...data, dokumen: "" });
  };

  const handleUpdateManualBook = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    const formData = new FormData();

    formData.append("dokumen", data.dokumen);

    try {
      const response = await updateManualBooks(formData, id);

      if (response.status === 200) {
        setData({
          title: "",
          dokumen: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Manual Book!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchManualBooks();
        setIsDialogEditOpen(false);
        router.push("/super-admin/master-data/manual-book");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate Manual Book!",
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
        <div className="w-full">
          {books && books.length > 0 && (
            <SuperManualBookMasterDataTablePages
              books={books}
              data={data}
              setData={setData}
              isUpdateLoading={isUpdateLoading}
              isDialogEditOpen={isDialogEditOpen}
              setIsDialogEditOpen={setIsDialogEditOpen}
              // handleUpdateBooks={() => { }}
              handleUpdateManualBook={handleUpdateManualBook}
              previewImage={previewImage}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDropImage={handleDropImage}
              handleImageChange={handleImageChange}
              handleRemoveImage={handleRemoveImage}
            />
          )}
        </div>
      </div>
    </section>
  );
}
