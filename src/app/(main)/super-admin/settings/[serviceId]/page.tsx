"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSettingMessage, updateOutputLetter } from "@/services/api";
import { ChevronLeft, Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import EditorProvide from "@/components/pages/areas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import { SuperAdminSettingInterface } from "@/types/interface";

export default function SuperSettingCreateScreen({
  params,
}: {
  params: { serviceId: number };
}) {
  console.log(params.serviceId, "ini params");

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [setting, setSetting] = useState<SuperAdminSettingInterface>();
  const [data, setData] = useState({
    header: "",
    nomor: "",
    perihal: "",
    bidang_pj: "",
    body: "",
    nip_pj: "",
    tembusan: "",
    catatan: "",
    footer: "",
  });

  const fetchSetting = async (id: number) => {
    try {
      const response = await getSettingMessage(id);

      setSetting(response.data);
      setData({
        header: response?.data?.Layanan_surat?.header || "",
        nomor: response?.data?.Layanan_surat?.nomor || "",
        perihal: response?.data?.Layanan_surat?.perihal || "",
        bidang_pj: response?.data?.Bidang?.pj || "",
        body: response?.data?.Layanan_surat?.body || "",
        nip_pj: response?.data?.Bidang?.nip_pj || "",
        tembusan: response?.data?.Layanan_surat?.tembusan || "",
        catatan: response?.data?.Layanan_surat?.catatan || "",
        footer: response?.data?.Layanan_surat?.footer || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSetting(params.serviceId);
  }, [params.serviceId]);

  console.log(setting, "ini setting");

  const updateNewOuputLetter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await updateOutputLetter(data, params.serviceId);

      if (response.status === 200) {
        setData({
          header: "",
          nomor: "",
          perihal: "",
          bidang_pj: "",
          body: "",
          nip_pj: "",
          tembusan: "",
          catatan: "",
          footer: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Output Surat!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        router.push("/super-admin/settings");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Output Surat!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center md:px-5 md:mt-5">
      <div className="bg-line-20 md:bg-line-10 md:shadow-md md:rounded-lg w-full flex flex-col p-5 gap-y-5">
        <div
          className="w-full flex flex-row items-center gap-x-3 cursor-pointer"
          onClick={() => router.back()}>
          <ChevronLeft className="w-6 h-6 text-black-80" />

          <p className="text-black-80 text-[20px]">Kelola Output Surat</p>
        </div>

        <form
          onSubmit={updateNewOuputLetter}
          className="w-full flex flex-col gap-y-3 h-full">
          <div className="w-full flex flex-col gap-y-3 verticalScroll">
            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-sm">
                Kepala Surat
              </Label>
              <div className="w-full h-full border border-line-20 rounded-lg text-left">
                <EditorProvide
                  content={data?.header}
                  onChange={(e: any) => setData({ ...data, header: e })}
                />
              </div>
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-sm">
                Nomor Surat
              </Label>
              <Input
                name="nomor"
                value={data?.nomor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, nomor: e.target.value });
                }}
                type="text"
                className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan Nomor Surat"
              />
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-sm">
                Perihal Surat
              </Label>
              <Input
                name="perihal"
                value={data?.perihal}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, perihal: e.target.value });
                }}
                type="text"
                className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan Perihal Surat"
              />
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-sm">
                Nama Penanggung Jawab
              </Label>
              <Input
                name="bidang_pj"
                value={data?.bidang_pj}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, bidang_pj: e.target.value });
                }}
                type="text"
                className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan Nama Penanggung Jawab"
              />
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-sm">
                Isi Surat
              </Label>
              <div className="w-full h-full border border-line-20 rounded-lg text-left">
                <EditorProvide
                  content={data?.body}
                  onChange={(e: any) => setData({ ...data, body: e })}
                />
              </div>
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-sm">
                NIP Penanggung Jawab
              </Label>
              <Input
                name="nip_pj"
                value={data?.nip_pj}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, nip_pj: e.target.value });
                }}
                type="text"
                className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan NIP Penanggung Jawab"
              />
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-sm">
                Tembusan
              </Label>
              <div className="w-full h-full border border-line-20 rounded-lg text-left">
                <EditorProvide
                  content={data?.tembusan}
                  onChange={(e: any) => setData({ ...data, tembusan: e })}
                />
              </div>
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-sm">
                Catatan
              </Label>
              <div className="w-full h-full border border-line-20 rounded-lg text-left">
                <EditorProvide
                  content={data?.catatan}
                  onChange={(e: any) => setData({ ...data, catatan: e })}
                />
              </div>
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-sm">
                Footer
              </Label>
              <div className="w-full h-full border border-line-20 rounded-lg text-left">
                <EditorProvide
                  content={data?.footer}
                  onChange={(e: any) => setData({ ...data, footer: e })}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-row justify-between items-center gap-x-5">
            <Button
              type="submit"
              disabled={isLoading ? true : false}
              className="bg-primary-40 hover:bg-primary-70 text-line-10">
              {isLoading ? <Loader className="animate-spin" /> : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
