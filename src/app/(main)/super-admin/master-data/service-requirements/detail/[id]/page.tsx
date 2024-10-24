"use client";

import SuperAdminServiceRequirmentDetailDocCard from "@/components/all_cards/superAdminServiceRequirmentDetailDocCard";
import SuperAdminServiceRequirmentDetailFormCard from "@/components/all_cards/superAdminServiceRequirmentDetailFormCard";
import {
  deleteDocDetailServiceRequirment,
  deleteFormDetailServiceRequirment,
  getFormByService,
  getFormDocByService,
} from "@/services/api";
import {
  ApplicationFormServiceDocInterface,
  ApplicationFormServiceInterface,
  FormServiceInterface,
} from "@/types/interface";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ServiceRequirmentMasterDataDetailPages({
  params,
}: {
  params: { id: number };
}) {
  const router = useRouter();
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoadingDoc, setIsLoadingDoc] = useState(false);
  const [itemId, setItemId] = useState<number | null>(null);
  const [form, setForm] = useState<ApplicationFormServiceInterface>();
  const [docForm, setDocForm] = useState<ApplicationFormServiceDocInterface>();

  const fetchFormData = async (serviceId: number) => {
    try {
      const response = await getFormByService(serviceId);

      setForm(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDocFormData = async (serviceId: number) => {
    try {
      const response = await getFormDocByService(serviceId);
      setDocForm(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchFormData(params?.id);
      fetchDocFormData(params?.id);
    }
  }, [params?.id]);

  const handleDeleteForm = async (id: number) => {
    setIsLoadingForm(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Pertanyaan?",
        text: "Pertanyaan yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteFormDetailServiceRequirment(id);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Pertanayaan berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          setIsLoadingForm(false);
          fetchFormData(params?.id);
          fetchDocFormData(params?.id);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleDeleteDoc = async (id: number) => {
    setIsLoadingDoc(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Pertanyaan?",
        text: "Pertanyaan yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteDocDetailServiceRequirment(id);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Pertanayaan berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          setIsLoadingDoc(false);
          fetchFormData(params?.id);
          fetchDocFormData(params?.id);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDoc(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
      <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
        <div className="flex flex-row items-center">
          <button onClick={() => router.back()}>
            <ChevronLeft className="w-7 h-7 text-black-80 mr-2" />
          </button>

          <h5 className="text-xl text-start text-black-80 font-normal">
            Detail Persyaratan
          </h5>
        </div>

        <div className="flex flex-col h-full items-center w-full verticalScroll gap-y-6">
          <div className="w-full flex flex-col gap-y-3">
            <h5 className="text-primary-40 text-[18px]">Nama Layanan</h5>

            <p className="text-[14px] md:text-[16px] text-black-80">
              {form && form?.nama}
            </p>
          </div>

          <div className="h-0.5 w-full bg-black-80"></div>

          <div className="w-full bg-primary-40 px-3 py-3 rounded-md">
            <h5 className="text-line-10 text-[18px]">Formulir</h5>
          </div>

          <div className="w-full flex flex-col p-3 gap-y-5 border border-line-20 rounded-lg">
            {form &&
              form?.Layanan_forms?.map(
                (item: FormServiceInterface, i: number) => {
                  return (
                    <SuperAdminServiceRequirmentDetailFormCard
                      key={i}
                      item={item}
                      handleDeleteForm={handleDeleteForm}
                      isLoadingForm={isLoadingForm}
                    />
                  );
                }
              )}
          </div>
        </div>

        <div className="flex flex-col h-full items-center w-full verticalScroll gap-y-6">
          <div className="w-full bg-primary-40 px-3 py-3 rounded-md">
            <h5 className="text-line-10 text-[18px]">Dokumen</h5>
          </div>
        </div>

        <div className="w-full flex flex-col p-3 gap-y-5 border border-line-20 rounded-lg">
          {docForm &&
            docForm.Layanan_forms?.map(
              (item: FormServiceInterface, i: number) => {
                return (
                  <SuperAdminServiceRequirmentDetailDocCard
                    key={i}
                    item={item}
                    handleDeleteDoc={handleDeleteDoc}
                    isLoadingDoc={isLoadingDoc}
                  />
                );
              }
            )}
        </div>
      </div>
    </section>
  );
}
