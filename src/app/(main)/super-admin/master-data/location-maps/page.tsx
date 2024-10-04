"use client";

export const dynamic = "force-dynamic";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import SearchPages from "@/components/elements/search";
import {
  getAboutVisionMision,
  updateAboutVisionMision,
  updateLocationMaps,
} from "@/services/api";
import { AboutUsVisionMisionInterface } from "@/types/interface";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import SuperAboutUsVisionMisionMasterDataTablePages from "@/components/tables/master_datas/about_us_visiob_mision_table";
import SuperLocationMapsMasterDataTablePages from "@/components/tables/master_datas/location_maps_table";

export default function LocationMapsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const limitItem = 30;
  const [abouts, setAbouts] = useState<AboutUsVisionMisionInterface>();
  const [data, setData] = useState({
    long: "",
    lang: "",
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
      const response = await updateLocationMaps(id, data);

      if (response.status === 200) {
        setData({
          long: "",
          lang: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Lokasi BKD!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchAboutVisionMision();
        setIsDialogEditOpen(false);
        router.push("/super-admin/master-data/location-maps");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate Lokasi BKD!",
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
            <SuperLocationMapsMasterDataTablePages
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
