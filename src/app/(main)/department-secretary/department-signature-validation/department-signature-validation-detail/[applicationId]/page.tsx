"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Pen } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader } from "lucide-react";
import {
  JwtPayload,
  UserApplicationHistoryDetailInterface,
  UserApplicationHistoryFormServiceInputInterface,
} from "@/types/interface";
import {
  getUserApplicationHistoryDetail,
  updateUserApplicationHistoryDetail,
} from "@/services/api";
import UserApplicationHistoryFormCard from "@/components/all_cards/verificationUserApplicationHistoryFormCard";
import { Label } from "@/components/ui/label";
import { formatDateString } from "@/lib/utils";
// hapus
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
// hapus

export default function DepartmentSecretarySignatureValidationDetailScreen({
  params,
}: {
  params: { applicationId: number };
}) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  // hapus
  const [role, setRole] = useState<string | null>(null);
  const [data, setData] = useState({
    status: 1,
    pesan: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  // hapus
  const [application, setApplication] =
    useState<UserApplicationHistoryDetailInterface>();

  // hapus
  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);

        if (decoded && decoded.role !== undefined) {
          setRole(decoded.role);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const updateStatusUserApplicationHistoryValidation = async (id: number) => {
    setIsLoading(true);

    try {
      const response = await updateUserApplicationHistoryDetail(
        {
          ...data,
          status: 9,
        },
        id
      );

      if (response.status === 200) {
        setData({
          ...data,
          pesan: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Status Permohonan User!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });

        router.push(
          `/verification-admin/verification-user-application-histories/verification-user-waiting-application-history`
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate Status Permohonan User!",
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
  // hapus

  const fetchUserApplicationHistoryDetail = async (id: number) => {
    try {
      const response = await getUserApplicationHistoryDetail(id);

      setApplication(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserApplicationHistoryDetail(params?.applicationId);
  }, [params?.applicationId]);

  return (
    <section className="w-full flex flex-col px-5">
      <div className="w-full flex flex-col items-center p-5 mt-5 gap-y-8 bg-line-10 rounded-lg shadow-md">
        <div
          className="w-full flex flex-row items-center gap-x-3 cursor-pointer"
          onClick={() => router.back()}>
          <ChevronLeft className="w-6 h-6 text-black-80" />

          <p className="text-black-80 text-[20px]">
            Detail Pengesahan Tanda Tangan
          </p>
        </div>

        <div className="w-full flex flex-row">
          <Tabs defaultValue="data-diri" className="w-full flex flex-col">
            <TabsList
              className={`w-full px-0 py-6 flex flex-row border border-line-20 ${isMobile ? "horizontalScroll" : ""}`}>
              <TabsTrigger
                className="w-full py-4 rounded-s-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                value="data-diri">
                Data Diri
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-4 border-r border-line-20 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                value="formulir">
                Formulir
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-4 border-r border-line-20 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                value="signature">
                Tanda Tangan
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="data-diri"
              className="w-full flex flex-col mt-4">
              <div className="w-full flex flex-col gap-y-5 border border-line-20 rounded-lg p-4">
                <div className="w-full flex flex-col gap-y-5">
                  <div className="w-full bg-primary-40 px-3 py-3 rounded-md">
                    <h5 className="text-line-10 text-[18px]">
                      Riwayat Data Diri
                    </h5>
                  </div>
                  <div className="w-full flex flex-col gap-y-5">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="name"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Nama Lengkap
                      </Label>

                      <p>
                        {application?.userinfo?.name &&
                          application?.userinfo?.name}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="nip"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        NIP
                      </Label>

                      <p>
                        {application?.userinfo?.nip &&
                          application?.userinfo?.nip}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="nik"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        NIK
                      </Label>

                      <p>
                        {application?.userinfo?.nik &&
                          application?.userinfo?.nik}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="email"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Email
                      </Label>

                      <p>
                        {application?.userinfo?.email &&
                          application?.userinfo?.email}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="telepon"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Nomor Telepon
                      </Label>

                      <p>
                        {application?.userinfo?.telepon &&
                          application?.userinfo?.telepon}
                      </p>
                    </div>

                    <div className="w-full flex flex-row gap-x-3 md:gap-x-5">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label
                          htmlFor="tempat-lahir"
                          className="focus-within:text-primary-70 font-normal text-sm">
                          Tempat Lahir
                        </Label>

                        <p>
                          {application?.userinfo?.tempat_lahir &&
                            application?.userinfo?.tempat_lahir}
                        </p>
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label
                          htmlFor="tempat-lahir"
                          className="focus-within:text-primary-70 font-normal text-sm">
                          Tanggal Lahir
                        </Label>

                        <p>
                          {application?.userinfo?.tgl_lahir &&
                            formatDateString(application?.userinfo?.tgl_lahir)}
                        </p>
                      </div>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        Agama
                      </Label>

                      <p>
                        {application?.userinfo?.agama &&
                          application?.userinfo?.agama}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        jenis Kelamin
                      </Label>

                      <p>
                        {application?.userinfo?.gender &&
                          application?.userinfo?.gender}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        Golongan Darah
                      </Label>

                      <p>
                        {application?.userinfo?.goldar &&
                          application?.userinfo?.goldar}
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-y-5">
                    <div className="w-full bg-primary-40 px-3 py-3 rounded-md">
                      <h5 className="text-line-10 text-[18px]">Alamat</h5>
                    </div>

                    <div className="w-full flex flex-col gap-y-5">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label
                          htmlFor="kecamatan"
                          className="focus-within:text-primary-70 font-normal text-sm">
                          Kecamatan
                        </Label>

                        <p>
                          {application?.userinfo?.Kecamatan.nama &&
                            application?.userinfo?.Kecamatan.nama}
                        </p>
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label
                          htmlFor="desa"
                          className="focus-within:text-primary-70 font-normal text-sm">
                          Desa
                        </Label>

                        <p>
                          {application?.userinfo?.Desa.nama &&
                            application?.userinfo?.Desa.nama}
                        </p>
                      </div>

                      <div className="w-full flex flex-row gap-x-5">
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="rt"
                            className="focus-within:text-primary-70 font-normal text-sm">
                            RT
                          </Label>

                          <p>
                            {application?.userinfo?.rt &&
                              application?.userinfo?.rt}
                          </p>
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="rw"
                            className="focus-within:text-primary-70 font-normal text-sm">
                            RW
                          </Label>

                          <p>
                            {application?.userinfo?.rw &&
                              application?.userinfo?.rw}
                          </p>
                        </div>
                      </div>

                      <div className="w-full flex flex-col gap-y-2">
                        <Label className="text-[14px] text-black-80">
                          Alamat
                        </Label>

                        <p>
                          {application?.userinfo?.alamat &&
                            application?.userinfo?.alamat}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="formulir" className="w-full flex flex-col mt-0">
              <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                <div className="w-full flex flex-col gap-y-5">
                  {application?.Layanan_form_inputs &&
                    application?.Layanan_form_inputs.length > 0 &&
                    application?.Layanan_form_inputs.map(
                      (
                        item: UserApplicationHistoryFormServiceInputInterface,
                        index: number
                      ) => {
                        return (
                          <UserApplicationHistoryFormCard
                            key={index}
                            item={item}
                          />
                        );
                      }
                    )}
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="signature"
              className="w-full flex flex-col mt-0">
              <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                <div className="w-full flex flex-row items-center gap-x-5">
                  {/* hapus */}
                  <div className="w-full flex flex-row justify-start">
                    {application?.id && (
                      <Button
                        disabled={isLoading ? true : false}
                        onClick={() => {
                          updateStatusUserApplicationHistoryValidation(
                            application?.id
                          );
                        }}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10 flex flex-row gap-x-5">
                        {isLoading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Selesai"
                        )}
                      </Button>
                    )}
                  </div>
                  {/* hapus */}

                  <div className="w-full flex flex-row justify-end">
                    <Button
                      disabled
                      onClick={() =>
                        router.push(
                          `/department-secretary/department-signature-validation/department-signature-validation-upload/${params?.applicationId}`
                        )
                      }
                      className="bg-primary-40 hover:bg-primary-70 text-line-10 flex flex-row gap-x-5">
                      <Pen className="w-5 h-5 text-line-10" />

                      <p className="text-line-10 text-[16px]">Tanda Tangan</p>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full flex flex-col items-center justify-center border border-line-20 rounded-lg p-5 gap-y-8">
          <div className="w-8/12 flex flex-col items-center gap-y-5">
            <p className="text-black-80 text-sm">Status Permohonan:</p>

            <div
              className={`w-4/12 ${application?.status === 1 ? "bg-primary-40" : application?.status === 2 ? "bg-secondary-40" : application?.status === 3 ? "bg-warning-40" : application?.status === 4 ? "bg-error-40" : application?.status === 5 ? "bg-primary-50" : application?.status === 6 ? "bg-secondary-50" : application?.status === 7 ? "bg-warning-50" : application?.status === 8 ? "bg-error-50" : application?.status === 9 ? "bg-success-40" : "bg-error-40"} bg-opacity-20 py-2 rounded-lg`}>
              <p
                className={`${application?.status === 1 ? "text-primary-70" : application?.status === 2 ? "text-secondary-70" : application?.status === 3 ? "text-warning-70" : application?.status === 4 ? "text-error-70" : application?.status === 5 ? "text-primary-70" : application?.status === 6 ? "text-secondary-70" : application?.status === 7 ? "text-warning-70" : application?.status === 8 ? "text-error-70" : application?.status === 9 ? "text-success-70" : "text-error-70"} text-center`}>
                {application?.status === 1
                  ? "Menunggu"
                  : application?.status === 2
                    ? "Sedang Diproses"
                    : application?.status === 3
                      ? "Butuh Perbaikan"
                      : application?.status === 4
                        ? "Sudah Diperbaiki"
                        : application?.status === 5
                          ? "Sedang Divalidasi"
                          : application?.status === 6
                            ? "Sudah Divalidasi"
                            : application?.status === 7
                              ? "Sedang Ditandatangani"
                              : application?.status === 8
                                ? "Sudah Ditandatangani"
                                : application?.status === 9
                                  ? "Selesai"
                                  : "Ditolak"}
              </p>
            </div>
          </div>

          {/* <div className="w-8/12 flex flex-row gap-x-5">
            <Button className="w-full rounded-lg py-6 bg-red-600 text-line-10">
              Tolak
            </Button>

            <Button className="w-full rounded-lg py-6 bg-primary-40 text-line-10">
              Perbaiki
            </Button>

            <Button className="w-full rounded-lg py-6 bg-green-700 text-line-10">
              validasi
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
