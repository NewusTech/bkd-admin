"use client";

export const dynamic = "force-dynamic";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import SearchPages from "@/components/elements/search";
import { getAboutVisionMision, updateAboutVisionMision } from "@/services/api";
import { AboutUsVisionMisionInterface } from "@/types/interface";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import SuperAboutUsVisionMisionMasterDataTablePages from "@/components/tables/master_datas/about_us_visiob_mision_table";

export default function AboutUsVisionMisionScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { quill: quillAboutEdit, quillRef: quillAboutEditRef } = useQuill();
  const { quill: quillVisionEdit, quillRef: quillVisionEditRef } = useQuill();
  const { quill: quillMisionEdit, quillRef: quillMisionEditRef } = useQuill();
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const limitItem = 30;
  const [abouts, setAbouts] = useState<AboutUsVisionMisionInterface>();
  const [data, setData] = useState({
    kontak: "",
    visi: "",
    misi: "",
    about_bkd: "",
    long: "",
    lang: "",
  });

  useEffect(() => {
    if (quillAboutEdit && isDialogEditOpen) {
      quillAboutEdit.on("text-change", () => {
        setData((prevData) => ({
          ...prevData,
          about_bkd: quillAboutEdit.root.innerHTML,
        }));
      });

      if (data?.about_bkd && isDialogEditOpen) {
        quillAboutEdit.clipboard.dangerouslyPasteHTML(data?.about_bkd);
      }
    }

    if (quillVisionEdit && isDialogEditOpen) {
      quillVisionEdit.on("text-change", () => {
        setData((prevData) => ({
          ...prevData,
          visi: quillVisionEdit.root.innerHTML,
        }));
      });

      if (data?.visi && isDialogEditOpen) {
        quillVisionEdit.clipboard.dangerouslyPasteHTML(data?.visi);
      }
    }

    if (quillMisionEdit && isDialogEditOpen) {
      quillMisionEdit.on("text-change", () => {
        setData((prevData) => ({
          ...prevData,
          misi: quillMisionEdit.root.innerHTML,
        }));
      });

      if (data?.misi && isDialogEditOpen) {
        quillMisionEdit.clipboard.dangerouslyPasteHTML(data?.misi);
      }
    }
  }, [
    quillAboutEdit,
    quillVisionEdit,
    quillMisionEdit,
    isDialogEditOpen,
    data?.misi,
    data?.visi,
    data?.about_bkd,
  ]);

  const fetchAboutVisionMision = async () => {
    try {
      const response = await getAboutVisionMision();

      setAbouts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAboutVisionMision();
  }, []);

  const handleUpdateAbout = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    try {
      const response = await updateAboutVisionMision(id, data);

      if (response.status === 200) {
        setData({
          kontak: "",
          visi: "",
          misi: "",
          about_bkd: "",
          long: "",
          lang: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Profile BKD!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchAboutVisionMision();
        setIsDialogEditOpen(false);
        router.push("/super-admin/master-data/about-us-vision-mission");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate Profile BKD!",
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
      <div className="w-full flex flex-col p-5 gap-y-5">
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
            <SuperAboutUsVisionMisionMasterDataTablePages
              abouts={abouts}
              data={data}
              setData={setData}
              isUpdateLoading={isUpdateLoading}
              isDialogEditOpen={isDialogEditOpen}
              setIsDialogEditOpen={setIsDialogEditOpen}
              handleUpdateAbout={handleUpdateAbout}
              quillAboutEdit={quillAboutEdit}
              quillAboutEditRef={quillAboutEditRef}
              quillVisionEdit={quillVisionEdit}
              quillVisionEditRef={quillVisionEditRef}
              quillMisionEdit={quillMisionEdit}
              quillMisionEditRef={quillMisionEditRef}
            />
          )}
        </div>
      </div>
    </section>
  );
}
