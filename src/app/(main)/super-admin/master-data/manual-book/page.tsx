"use client";

import { getManualBooks, updateManualBooks } from "@/services/api";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import SuperManualBookMasterDataTablePages from "@/components/tables/master_datas/manual_book_table";

export default function ManualBookScreen() {
  const router = useRouter();
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isDrawerEditOpen, setIsDrawerEditOpen] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [fileName, setFileName] = useState<string>("");
  const [manualFile, setManualFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<string>("");
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
      setManualFile(file);
      setFileName(file.name);
      setData({
        ...data,
        dokumen: file.name,
      });
    }
    const fileUrl = URL.createObjectURL(file);
    setPreviewFile(fileUrl);
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
      setManualFile(file);
      setFileName(file.name);
      setData({
        ...data,
        dokumen: file.name,
      });
    }

    const fileUrl = URL.createObjectURL(file);
    setPreviewFile(fileUrl);
  };

  const handleUpdateManualBook = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    const formData = new FormData();

    formData.append("title", data.title);
    if (manualFile) {
      formData.append("dokumen", manualFile);
    }

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
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
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
              isDrawerEditOpen={isDrawerEditOpen}
              setIsDrawerEditOpen={setIsDrawerEditOpen}
              // handleUpdateBooks={() => { }}
              handleUpdateManualBook={handleUpdateManualBook}
              manualFile={manualFile}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDropImage={handleDropImage}
              handleImageChange={handleImageChange}
              fileName={fileName}
              previewFile={previewFile}
            />
          )}
        </div>
      </div>
    </section>
  );
}
