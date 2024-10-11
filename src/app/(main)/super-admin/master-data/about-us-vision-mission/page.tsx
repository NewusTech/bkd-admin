"use client";

export const dynamic = "force-dynamic";
import { getAboutVisionMision, updateAboutVisionMision } from "@/services/api";
import { AboutVisionMisionInterface } from "@/types/interface";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import SuperAboutUsVisionMisionMasterDataTablePages from "@/components/tables/master_datas/about_us_visiob_mision_table";

export default function AboutUsVisionMisionScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [abouts, setAbouts] = useState<AboutVisionMisionInterface>();
  const [data, setData] = useState({
    kontak: "",
    visi: "",
    misi: "",
    about_bkd: "",
  });

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
