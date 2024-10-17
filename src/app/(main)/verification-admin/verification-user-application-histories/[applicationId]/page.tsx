"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Cookies from "js-cookie";
import {
  AdminProfileInterface,
  JwtPayload,
  UserApplicationHistoryDetailInterface,
  UserApplicationHistoryFormServiceInputInterface,
} from "@/types/interface";
import {
  getUserApplicationHistoryDetail,
  getUserProfile,
  updateUserApplicationHistoryDetail,
} from "@/services/api";
import { Label } from "@/components/ui/label";
import { formatDateString } from "@/lib/utils";
import UserApplicationHistoryFormCard from "@/components/all_cards/verificationUserApplicationHistoryFormCard";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader } from "lucide-react";
import UserApplicationActions from "@/components/pages/user_application_action";
import { jwtDecode } from "jwt-decode";

export default function VerificationUserApplicationHistoryDetailScreen({
  params,
}: {
  params: { applicationId: number };
}) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRevision, setIsLoadingRevision] = useState(false);
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);
  const [isDialogRevision, setIsDialogRevision] = useState(false);
  const [isDialogFailed, setIsDialogFailed] = useState(false);
  const [user, setUser] = useState<AdminProfileInterface>();
  const [application, setApplication] =
    useState<UserApplicationHistoryDetailInterface>();
  const [data, setData] = useState({
    status: 1,
    pesan: "",
  });
  const [role, setRole] = useState<string | null>(null);

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

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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

  const updateStatusUserApplicationHistoryValidation = async (id: number) => {
    setIsLoading(true);

    try {
      const response: { status: number } =
        await updateUserApplicationHistoryDetail(
          {
            ...data,
            status: 2,
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
        if (role && role === "Super Admin") {
          router.push(`/areas-head/head-manage-approvals`);
        } else if (role && role === "Admin Verifikasi") {
          router.push(
            `/verification-admin/verification-user-application-histories/verification-user-waiting-application-history`
          );
        }
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

  const updateStatusUserApplicationHistoryRevision = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsLoadingRevision(true);

    try {
      const response = await updateUserApplicationHistoryDetail(
        {
          ...data,
          status: 3,
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
        setIsDialogRevision(false);
        if (role && (role === "Super Admin" || role === "Admin Verifikasi")) {
          router.push(
            `/verification-admin/verification-user-application-histories/verification-user-revision-application-history`
          );
        }
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
      setIsLoadingRevision(false);
    }
  };

  const updateStatusUserApplicationHistoryFailed = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsLoadingFailed(true);

    try {
      const response = await updateUserApplicationHistoryDetail(
        {
          ...data,
          status: 10,
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
        setIsDialogFailed(false);
        if (role && (role === "Super Admin" || role === "Admin Verifikasi")) {
          router.push(`/verification-admin/verification-reportings`);
        }
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
      setIsLoadingFailed(false);
    }
  };

  return (
    <section className="w-full flex flex-col px-5">
      <div className="w-full flex flex-col items-center p-5 mt-5 gap-y-8 bg-line-10 rounded-lg shadow-md">
        <div
          className="w-full flex flex-row items-center gap-x-3 cursor-pointer"
          onClick={() => router.back()}>
          <ChevronLeft className="w-6 h-6 text-black-80" />

          <p className="text-black-80 text-[20px]">
            Detail verifikasi permohonan pemohon
          </p>
        </div>

        <div className="w-full flex flex-row">
          <Tabs defaultValue="data-diri" className="w-full flex flex-col">
            <TabsList
              className={`w-full px-0 py-6 flex flex-row border border-line-20 ${isMobile ? "horizontalScroll" : ""}`}>
              <TabsTrigger
                className="w-full py-4 text-[14px] md:text-[16px] rounded-s-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                value="data-diri">
                Data Diri
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-4 text-[14px] md:text-[16px] border-r border-line-20 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                value="formulir">
                Formulir
              </TabsTrigger>
              {/* <TabsTrigger
                className="w-full py-4 border-r border-line-20 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                value="dokumen-pendukung">
                Dokumen Pendukung
              </TabsTrigger> */}
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
                        className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                        Nama Lengkap
                      </Label>

                      <p className="text-[14px] md:text-[16px]">
                        {application?.userinfo?.name &&
                          application?.userinfo?.name}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="nip"
                        className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                        NIP
                      </Label>

                      <p className="text-[14px] md:text-[16px]">
                        {application?.userinfo?.nip &&
                          application?.userinfo?.nip}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="nik"
                        className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                        NIK
                      </Label>

                      <p className="text-[14px] md:text-[16px]">
                        {application?.userinfo?.nik &&
                          application?.userinfo?.nik}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="email"
                        className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                        Email
                      </Label>

                      <p className="text-[14px] md:text-[16px]">
                        {application?.userinfo?.email &&
                          application?.userinfo?.email}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="telepon"
                        className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                        Nomor Telepon
                      </Label>

                      <p className="text-[14px] md:text-[16px]">
                        {application?.userinfo?.telepon &&
                          application?.userinfo?.telepon}
                      </p>
                    </div>

                    <div className="w-full flex flex-row gap-x-3 md:gap-x-5">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label
                          htmlFor="tempat-lahir"
                          className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                          Tempat Lahir
                        </Label>

                        <p className="text-[14px] md:text-[16px]">
                          {application?.userinfo?.tempat_lahir &&
                            application?.userinfo?.tempat_lahir}
                        </p>
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label
                          htmlFor="tempat-lahir"
                          className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                          Tanggal Lahir
                        </Label>

                        <p className="text-[14px] md:text-[16px]">
                          {application?.userinfo?.tgl_lahir &&
                            formatDateString(application?.userinfo?.tgl_lahir)}
                        </p>
                      </div>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                        Agama
                      </Label>

                      <p className="text-[14px] md:text-[16px]">
                        {application?.userinfo?.agama &&
                          application?.userinfo?.agama}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                        jenis Kelamin
                      </Label>

                      <p className="text-[14px] md:text-[16px]">
                        {application?.userinfo?.gender &&
                          application?.userinfo?.gender}
                      </p>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                        Golongan Darah
                      </Label>

                      <p className="text-[14px] md:text-[16px]">
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
                          className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                          Kecamatan
                        </Label>

                        <p className="text-[14px] md:text-[16px]">
                          {application?.userinfo?.Kecamatan.nama &&
                            application?.userinfo?.Kecamatan.nama}
                        </p>
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label
                          htmlFor="desa"
                          className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                          Desa
                        </Label>

                        <p className="text-[14px] md:text-[16px]">
                          {application?.userinfo?.Desa.nama &&
                            application?.userinfo?.Desa.nama}
                        </p>
                      </div>

                      <div className="w-full flex flex-row gap-x-5">
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="rt"
                            className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                            RT
                          </Label>

                          <p className="text-[14px] md:text-[16px]">
                            {application?.userinfo?.rt &&
                              application?.userinfo?.rt}
                          </p>
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label
                            htmlFor="rw"
                            className="focus-within:text-primary-70 font-normal text-[14px] md:text-[16px]">
                            RW
                          </Label>

                          <p className="text-[14px] md:text-[16px]">
                            {application?.userinfo?.rw &&
                              application?.userinfo?.rw}
                          </p>
                        </div>
                      </div>

                      <div className="w-full flex flex-col gap-y-2">
                        <Label className="text-[14px] md:text-[16px] text-black-80">
                          Alamat
                        </Label>

                        <p className="text-[14px] md:text-[16px]">
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
            {/* <TabsContent
              value="dokumen-pendukung"
              className="w-full flex flex-col mt-0">
              <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                <div>
                  <div>Hello hoho</div>
                </div>
              </div>
            </TabsContent> */}
          </Tabs>
        </div>

        <div className="w-full flex flex-col items-center justify-center border border-line-20 rounded-lg p-5 gap-y-8">
          <div className="w-8/12 flex flex-col items-center gap-y-5">
            <p className="text-black-80 text-[14px] md:text-[16px]">
              Status Permohonan:
            </p>

            <div
              className={`w-full md:w-4/12 ${application?.status === 1 ? "text-primary-70 bg-primary-40" : application?.status === 2 ? "text-secondary-70 bg-secondary-40" : application?.status === 3 ? "text-warning-70 bg-warning-40" : application?.status === 4 ? "text-error-70 bg-error-40" : application?.status === 5 ? "text-primary-70 bg-primary-50" : application?.status === 6 ? "text-secondary-70 bg-secondary-50" : application?.status === 7 ? "text-warning-70 bg-warning-50" : application?.status === 8 ? "text-error-70 bg-error-50" : application?.status === 9 ? "text-success-70 bg-success-40" : "text-error-70 bg-error-40"} bg-opacity-20 py-2 rounded-lg`}>
              <p
                className={`${application?.status === 1 ? "text-primary-70" : application?.status === 2 ? "text-secondary-70" : application?.status === 3 ? "text-warning-70" : application?.status === 4 ? "text-error-70" : application?.status === 5 ? "text-primary-70" : application?.status === 6 ? "text-secondary-70" : application?.status === 7 ? "text-warning-70" : application?.status === 8 ? "text-error-70" : application?.status === 9 ? "text-success-70" : "text-error-70"} text-center text-[14px] md:text-[16px]`}>
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

          {role && (role === "Admin Verifikasi" || role === "Super Admin") && (
            <div className="w-full flex flex-row gap-x-5">
              {application && application.id && (
                <UserApplicationActions
                  name="Tolak"
                  isGlobalDialog={isDialogFailed}
                  setIsGlobalDialog={setIsDialogFailed}
                  handleSubmit={updateStatusUserApplicationHistoryFailed}
                  data={data}
                  setData={setData}
                  isGlobalLoading={isLoadingFailed}
                  id={application.id}
                />
              )}

              {application && application.id && (
                <UserApplicationActions
                  name="Perbaiki"
                  isGlobalDialog={isDialogRevision}
                  setIsGlobalDialog={setIsDialogRevision}
                  handleSubmit={updateStatusUserApplicationHistoryRevision}
                  data={data}
                  setData={setData}
                  isGlobalLoading={isLoadingRevision}
                  id={application.id}
                />
              )}

              {application?.id && (
                <Button
                  disabled={isLoading ? true : false}
                  onClick={() => {
                    updateStatusUserApplicationHistoryValidation(
                      application?.id
                    );
                  }}
                  className="w-full rounded-lg py-6 bg-green-700 text-line-10">
                  {isLoading ? <Loader className="animate-spin" /> : "Validasi"}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
