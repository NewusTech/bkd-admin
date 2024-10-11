"use client";

export const dynamic = "force-dynamic";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import SearchPages from "@/components/elements/search";
import {
  getAboutVisionMision,
  getLogo,
  updateAboutVisionMision,
  updateLogo,
} from "@/services/api";
import {
  AboutUsVisionMisionInterface,
  AboutVisionMisionInterface,
} from "@/types/interface";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import SuperAboutUsVisionMisionMasterDataTablePages from "@/components/tables/master_datas/about_us_visiob_mision_table";
import SuperLogoMasterDataTablePages from "@/components/tables/master_datas/logo_table";

export default function LogoScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const limitItem = 30;
  const [abouts, setAbouts] = useState<AboutVisionMisionInterface>();
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [data, setData] = useState({
    image_bkd: "",
    logo: "",
  });

  const fetchLogo = async () => {
    try {
      const response = await getLogo();

      setAbouts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileImage(file);
      setData({
        ...data,
        logo: file,
      });
      console.log(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  console.log(data);

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
        logo: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  const handleRemoveImage = () => {
    setFileImage(null);
    setPreviewImage("");
    setData({ ...data, logo: "" });
  };

  const handleUpdateAbout = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    try {
      const response = await updateLogo(id, data);

      if (response.status === 200) {
        setData({
          image_bkd: "",
          logo: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Logo!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchLogo();
        setIsDialogEditOpen(false);
        router.push("/super-admin/master-data/logo");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate Logo!",
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
      <div className="w-full flex flex-col md:p-5 gap-y-5">
        {/* <div className="w-full flex flex-row gap-x-5">
          <SearchPages
            search={search}
            setSearch={setSearch}
            change={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Pencarian"
          />
        </div> */}

        <div className="w-full">
          {abouts && (
            <SuperLogoMasterDataTablePages
              abouts={abouts}
              data={data}
              setData={setData}
              isUpdateLoading={isUpdateLoading}
              isDialogEditOpen={isDialogEditOpen}
              setIsDialogEditOpen={setIsDialogEditOpen}
              handleUpdateAbout={handleUpdateAbout}
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
