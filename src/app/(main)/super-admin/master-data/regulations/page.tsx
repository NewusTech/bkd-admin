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
  getRegulations,
  postAreas,
  updateAreas,
  updateRegulations,
} from "@/services/api";
import { AreasInterface, RegulationInterface } from "@/types/interface";
import React, { useEffect, useRef, useState } from "react";
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
import SuperRegulationMasterDataTablePages from "@/components/tables/master_datas/regulation_table";
import { set } from "date-fns";

export default function RegulationScreen() {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [regulations, setRegulations] = useState<RegulationInterface[]>();
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [data, setData] = useState({
    title: "",
    file: "",
  });

  const fetchRegulations = async () => {
    try {
      const response = await getRegulations();

      setRegulations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRegulations();
  }, []);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileImage(file);
      setData({
        ...data,
        file: file.name,
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
        file: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  const handleRemoveImage = () => {
    setFileImage(null);
    setPreviewImage("");
    setData({ ...data, file: "" });
  };

  const handleUpdateRegulations = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    if (fileImage) {
      formData.append("file", fileImage);
    }

    try {
      const response = await updateRegulations(formData, id);

      if (response.status === 200) {
        setData({
          title: "",
          file: "",
        });
        setFileImage(null);
        setPreviewImage("");
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Regulasi!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchRegulations();
        setIsDialogEditOpen(false);
        router.push("/super-admin/master-data/regulations");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate Regulasi!",
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
          {regulations && regulations.length > 0 && (
            <SuperRegulationMasterDataTablePages
              regulations={regulations}
              data={data}
              setData={setData}
              isUpdateLoading={isUpdateLoading}
              isDialogEditOpen={isDialogEditOpen}
              setIsDialogEditOpen={setIsDialogEditOpen}
              handleUpdateRegulations={handleUpdateRegulations}
              dropRef={dropRef}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDropImage={handleDropImage}
              handleRemoveImage={handleRemoveImage}
              handleImageChange={handleImageChange}
              previewImage={previewImage}
            />
          )}
        </div>
      </div>
    </section>
  );
}
