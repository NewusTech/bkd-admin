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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [setting, setSetting] = useState<SuperAdminSettingInterface>();
  const [data, setData] = useState({
    nama_pj: "",
    nip_pj: "",
    jabatan_pj: "",
    pangkat_pj: "",
    unitkerja_pj: "",
    header: "",
    nomor: "",
    perihal: "",
    body: "",
    tembusan: "",
    catatan: "",
    footer: "",
  });

  const fetchSetting = async (id: number) => {
    try {
      const response = await getSettingMessage(id);

      setSetting(response.data);
      setData({
        nama_pj: response?.data?.Layanan_surat?.nama_pj || "",
        nip_pj: response?.data?.Layanan_surat?.nip_pj || "",
        jabatan_pj: response?.data?.Layanan_surat?.jabatan_pj || "",
        pangkat_pj: response?.data?.Layanan_surat?.pangkat_pj || "",
        unitkerja_pj: response?.data?.Layanan_surat?.unitkerja_pj || "",
        header: response?.data?.Layanan_surat?.header || "",
        nomor: response?.data?.Layanan_surat?.nomor || "",
        perihal: response?.data?.Layanan_surat?.perihal || "",
        body: response?.data?.Layanan_surat?.body || "",
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

  console.log(data, "ini datanya");

  const updateNewOuputLetter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await updateOutputLetter(data, params.serviceId);

      console.log(response, "ini datanya");
      console.log(data, "ini datanya");

      if (response.status === 200) {
        setData({
          nama_pj: "",
          nip_pj: "",
          jabatan_pj: "",
          pangkat_pj: "",
          unitkerja_pj: "",
          header: "",
          nomor: "",
          perihal: "",
          body: "",
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
              <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                Nama Penanggung Jawab
              </Label>
              <Input
                name="nama_pj"
                value={data?.nama_pj}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, nama_pj: e.target.value });
                }}
                type="text"
                className="w-full text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan Nama Penanggung Jawab"
              />
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                NIP Penanggung Jawab
              </Label>
              <Input
                name="nip_pj"
                value={data?.nip_pj}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, nip_pj: e.target.value });
                }}
                type="text"
                className="w-full text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan NIP Penanggung Jawab"
              />
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                Jabatan Penanggung Jawab
              </Label>
              <Input
                name="jabatan_pj"
                value={data?.jabatan_pj}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, jabatan_pj: e.target.value });
                }}
                type="text"
                className="w-full text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan Jabatan Penanggung Jawab"
              />
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                Pangkat Penanggung Jawab
              </Label>
              <Input
                name="jabatan_pj"
                value={data?.pangkat_pj}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, pangkat_pj: e.target.value });
                }}
                type="text"
                className="w-full text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan Pangkat Penanggung Jawab"
              />
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                Unit Kerja Penanggung Jawab
              </Label>
              <Input
                name="unitkerja_pj"
                value={data?.unitkerja_pj}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, unitkerja_pj: e.target.value });
                }}
                type="text"
                className="w-full text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan Unit Kerja Penanggung Jawab"
              />
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                Kepala Surat
              </Label>
              <div className="w-full h-full border border-line-20 rounded-lg text-left">
                {data?.header && (
                  <EditorProvide
                    content={data.header}
                    onChange={(e: any) =>
                      setData({ ...data, header: e })
                    }
                  />
                )}
              </div>
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                Nomor Surat
              </Label>
              <Input
                name="nomor"
                value={data?.nomor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, nomor: e.target.value });
                }}
                type="text"
                className="w-full text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan Nomor Surat"
              />
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                Perihal Surat
              </Label>
              <Input
                name="perihal"
                value={data?.perihal}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, perihal: e.target.value });
                }}
                type="text"
                className="w-full text-[14px] md:text-[16px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                placeholder="Masukkan Perihal Surat"
              />
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                Isi Surat
              </Label>
              <div className="w-full h-full border border-line-20 rounded-lg text-left">
                {data?.body && (
                  <EditorProvide
                    content={data.body}
                    onChange={(e: any) =>
                      setData({ ...data, body: e })
                    }
                  />
                )}
              </div>
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                Tembusan
              </Label>
              <div className="w-full h-full border border-line-20 rounded-lg text-left">
                {data?.tembusan && (
                  <EditorProvide
                    content={data.tembusan}
                    onChange={(e: any) =>
                      setData({ ...data, tembusan: e })
                    }
                  />
                )}
              </div>
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                Catatan
              </Label>
              <div className="w-full h-full border border-line-20 rounded-lg text-left">
                {data?.catatan && (
                  <EditorProvide
                    content={data.catatan}
                    onChange={(e: any) =>
                      setData({ ...data, catatan: e })
                    }
                  />
                )}
              </div>
            </div>

            <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
              <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                Footer
              </Label>
              <div className="w-full h-full border border-line-20 rounded-lg text-left">
                {data?.footer && (
                  <EditorProvide
                    content={data.footer}
                    onChange={(e: any) =>
                      setData({ ...data, footer: e })
                    }
                  />
                )}
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
