"use client";

import SearchPages from "@/components/elements/search";
import SuperAreasMasterDataTablePages from "@/components/tables/master_datas/areas_table";
import { Button } from "@/components/ui/button";
import {
  deleteAreas,
  getAboutVisionMision,
  getAreas,
  postAreas,
  updateAboutVisionMision,
  updateAreas,
} from "@/services/api";
import {
  AboutUsVisionMisionInterface,
  AreasInterface,
} from "@/types/interface";
import React, { useEffect, useMemo, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import SuperAboutUsVisionMisionMasterDataTablePages from "@/components/tables/master_datas/about_us_visiob_mision_table";

export default function AboutUsVisionMisionScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const limitItem = 30;
  const [abouts, setAbouts] = useState<AboutUsVisionMisionInterface[]>([]);
  const [data, setData] = useState({
    kontak: "",
    visi: "",
    misi: "",
    about_bkd: "",
    long: "",
    lang: "",
  });

  const fetchAboutVisionMision = async (limit: number) => {
    try {
      const response = await getAboutVisionMision(limit);

      setAbouts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(() => {
    fetchAboutVisionMision(limitItem);
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
        fetchAboutVisionMision(limitItem);
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
      <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
        <div className="w-full flex flex-row gap-x-5">
          <SearchPages
            search={search}
            setSearch={setSearch}
            change={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Pencarian"
          />
        </div>

        <div className="w-full">
          {abouts && abouts.length > 0 && (
            <SuperAboutUsVisionMisionMasterDataTablePages
              abouts={abouts}
              data={data}
              setData={setData}
              isUpdateLoading={isUpdateLoading}
              isDialogEditOpen={isDialogEditOpen}
              setIsDialogEditOpen={setIsDialogEditOpen}
              handleUpdateAbout={handleUpdateAbout}
            />
          )}
        </div>
      </div>
    </section>
  );
}
