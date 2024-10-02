"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, Loader } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/legacy/image";
import Swal from "sweetalert2";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { UserComplaintInterface } from "@/types/interface";
import { getUserComplaintDetail, updateUserComplaint } from "@/services/api";
import { formatDateString } from "@/lib/utils";
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

export default function VerificationUserComplaintDetailScreen({
  params,
}: {
  params: { complaintId: number };
}) {
  const router = useRouter();
  const token = Cookies.get("Authorization");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [complaint, setComplaint] = useState<UserComplaintInterface>();
  const [data, setData] = useState({
    status: 1,
    jawaban: "",
  });

  const fetchUserComplaint = async (id: number) => {
    try {
      const response = await getUserComplaintDetail(id);

      setComplaint(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserComplaint(params.complaintId);
  }, [params.complaintId]);

  console.log(complaint, "ini compaint");

  const updateUserComplaintVerification = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await updateUserComplaint(data, id);

      console.log(response, "ini res");

      if (response.status === 200) {
        setData({
          ...data,
          jawaban: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Memberikan Jawaban!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchUserComplaint(params.complaintId);
        setIsModalOpenUpdate(false);
        router.push(
          `/verification-admin/verification-user-complaint-history/${params?.complaintId}`
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Memberikan Jawaban!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsModalOpenUpdate(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleBackdropClick2 = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal2();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[95%] md:w-[96%] h-full flex flex-col md:mx-8 bg-line-10 py-6 rounded-lg shadow-md mt-6 gap-y-8">
        <div className="px-2 md:px-4 flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center">
            <button onClick={() => router.back()}>
              <ChevronLeft className="w-7 h-7 text-black-80 mr-2" />
            </button>

            <h5 className="text-xl text-start text-black-80 font-normal">
              Detail Hasil Pengaduan
            </h5>
          </div>

          <div className="w-3/12">
            <AlertDialog
              open={isModalOpenUpdate}
              onOpenChange={setIsModalOpenUpdate}>
              <AlertDialogTrigger
                onClick={() => {
                  setIsModalOpenUpdate(true);
                }}
                className="w-full">
                <div className="w-full text-sm bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
                  Kirim Jawaban
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col">
                  <AlertDialogTitle className="text-center">
                    Hasil Pengaduan User
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Input jawaban yang diperlukan
                  </AlertDialogDescription>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      updateUserComplaintVerification(e, params.complaintId)
                    }
                    className="w-full flex flex-col gap-y-3 max-h-[500px]">
                    <div className="w-full flex flex-col gap-y-3 verticalScroll">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Balas Pengaduan User
                        </Label>

                        <Textarea
                          name="jawaban"
                          value={data.jawaban}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => setData({ ...data, jawaban: e.target.value })}
                          className="w-full h-[150px] focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Masukkan Jawaban Untuk Pengaduan User"
                        />
                      </div>
                    </div>

                    <div className="w-full flex flex-row justify-between items-center gap-x-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <Button
                        type="submit"
                        disabled={isLoading ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10">
                        {isLoading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Simpan"
                        )}
                      </Button>
                    </div>
                  </form>
                </AlertDialogHeader>
                {/* <AlertDialogFooter className="w-full flex flex-row justify-center items-center gap-x-5"></AlertDialogFooter> */}
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="flex flex-col gap-y-5 mt-3 md:mt-0 px-3 md:px-6">
          {complaint && complaint?.jawaban !== null ? (
            <div className="w-full flex flex-col gap-y-3 border border-line-20 rounded-lg p-4">
              <h6 className="text-sm text-black-80 font-normal">Balasan:</h6>

              <p className="text-black-80 font-normal text-sm">
                {complaint?.jawaban && complaint.jawaban}
              </p>
            </div>
          ) : (
            <></>
          )}

          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-primary-40 font-semibold">
                Tanggal Pengaduan
              </p>

              <p className="text-sm text-line-80 font-normal">
                {complaint?.createdAt && formatDateString(complaint?.createdAt)}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-primary-40 font-semibold">Bidang</p>

              <p className="text-sm text-line-80 font-normal">
                {complaint?.Bidang?.nama && complaint?.Bidang?.nama}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-primary-40 font-semibold">Layanan</p>

              <p className="text-sm text-line-80 font-normal">
                {complaint?.Layanan &&
                  complaint?.Layanan.nama &&
                  complaint?.Layanan.nama}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-primary-40 font-semibold">
                Judul Pengaduan
              </p>

              <p className="text-sm text-line-80 font-normal">
                {complaint?.judul_pengaduan && complaint?.judul_pengaduan}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-primary-40 font-semibold">
                Isi Pengaduan
              </p>

              <p className="text-sm text-line-80 font-normal">
                {complaint?.isi_pengaduan && complaint?.isi_pengaduan}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-primary-40 font-semibold">Dokumen</p>

              <div className="w-full flex flex-row items-center border border-line-20 p-2 md:p-4 gap-x-8 rounded-lg">
                <p className="w-full text-sm text-line-80 font-normal">
                  File Pengaduan
                </p>

                <AlertDialog>
                  <AlertDialogTrigger className="w-full flex justify-end">
                    <div className="w-5/12 text-[14px] bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 rounded-lg">
                      Lihat Dokumen
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                    <AlertDialogHeader className="flex flex-col max-h-[500px]">
                      <AlertDialogTitle className="text-center">
                        {complaint?.User_info?.name}
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-center">
                        File Pengaduan
                      </AlertDialogDescription>
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="w-full h-full">
                          {complaint?.image && complaint?.judul_pengaduan && (
                            <Image
                              src={complaint?.image}
                              alt={complaint?.judul_pengaduan}
                              width={1000}
                              height={400}
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>
                      </div>
                    </AlertDialogHeader>

                    <div className="w-full flex flex-row justify-center items-center gap-x-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-row items-center justify-center mt-8 gap-x-4"> */}
        {/* {permohonan?.input_skm === true && permohonan?.status === 3 && permohonan?.fileoutput ? (
          <Button
            onClick={() => openModal()}
            type="submit"
            className="text-[12px] md:w-2/12 text-primary-700 hover:bg-neutral-200 font-normal bg-neutral-50 border border-neutral-700">
            Surat Rekomendasi
          </Button>
        ) : permohonan?.status === 4 && permohonan?.fileoutput ? (
          <Button
            disabled
            type="submit"
            className="hidden text-[12px] md:w-2/12 text-primary-700 hover:bg-neutral-200 font-normal bg-neutral-50 border border-neutral-700">
            Surat Rekomendasi
          </Button>
        ) : (
          ''
        )} */}

        {/* {permohonan?.input_skm === true && permohonan?.status === 3 && permohonan?.filesertif ? (
          <Button
            onClick={() => openModal2()}
            type="submit"
            className="text-[12px] md:w-2/12 text-primary-700 hover:bg-neutral-200 font-normal bg-neutral-50 border border-neutral-700">
            Dokumen Hasil
          </Button>
        ) : permohonan?.status === 4 && permohonan?.filesertif ? (
          <Button
            disabled
            type="submit"
            className="hidden text-[12px] md:w-2/12 text-primary-700 hover:bg-neutral-200 font-normal bg-neutral-50 border border-neutral-700">
            Dokumen Hasil
          </Button>
        ) : (
          ''
        )} */}

        {/* {isModalOpen && (
          <div
            className="fixed inset-0 bg-neutral-900 bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}>
            <div className="bg-neutral-50 p-4 rounded-xl w-10/12 md:w-6/12 h-4/6">
              {permohonan?.fileoutput && (
                <iframe
                  allowFullScreen
                  src={permohonan?.fileoutput}
                  title="Manual Book"
                  className="w-full h-full rounded-md">
                  {permohonan?.layanan_name}
                </iframe>
              )}
            </div>
          </div>
        )} */}

        {/* {isModalOpen2 && (
          <div
            className="fixed inset-0 bg-neutral-900 bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick2}>
            <div className="bg-neutral-50 p-4 rounded-xl w-10/12 md:w-6/12 h-4/6">
              {permohonan?.fileoutput && (
                <iframe
                  allowFullScreen
                  src={permohonan?.filesertif}
                  title="Manual Book"
                  className="w-full h-full rounded-md">
                  {permohonan?.layanan_name}
                </iframe>
              )}
            </div>
          </div>
        )} */}

        {/* {permohonan?.input_skm === false && permohonan?.status === 3 ? (
          <Button
            className="text-[12px] md:w-2/12 text-neutral-50 font-normal"
            disabled>
            Unduh
          </Button>
        ) : permohonan?.input_skm === true && permohonan?.status === 3 ? (
          <Button
            type="submit"
            className="text-[12px] md:w-2/12 text-neutral-50 font-normal"
            onClick={() =>
              downloadPermohonan(
                permohonan?.layanan_id ?? 0,
                permohonan?.id ?? 0
              )
            }
            disabled={isLoading ? true : false}>
            {isLoading ? <Loader className="animate-spin" /> : "Unduh"}
          </Button>
        ) : permohonan?.status === 4 ? (
          <Button
            className="hidden text-[12px] md:w-2/12 text-neutral-50 font-normal"
            disabled>
            Unduh
          </Button>
        ) : permohonan?.status === 5 ? (
          <Link
            href={`/riwayat/permohonan-update/${permohonan?.id}/`}
            className="w-4/12 md:w-2/12 text-center bg-primary-700 hover:bg-primary-600 cursor-pointer text-neutral-50 rounded-full py-2 px-2">
            Perbaiki
          </Link>
        ) : (
          <Button
            className="text-[12px] md:w-2/12 text-neutral-50 font-normal"
            disabled>
            Unduh
          </Button>
        )} */}
        {/* </div> */}
      </div>
    </div>
  );
}
