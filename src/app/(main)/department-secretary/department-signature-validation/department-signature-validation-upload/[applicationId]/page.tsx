"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FilePlus, Pen, Plus, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader } from "lucide-react";
import Image from "next/image";
import ReactSignatureCanvas from "react-signature-canvas";
import {
  getApplicationDocumentOutput,
  getOutputLetterDetail,
  getSignatureBarcode,
  SignatureBarcode,
  updateSignatureLetterApplication,
  updateUserApplicationHistoryDetail,
} from "@/services/api";
import {
  JwtPayload,
  OutputLetterDetailInterface,
  SignatureBarcodeInterface,
} from "@/types/interface";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function DepartmentSecretarySignatureValidationUploadScreen({
  params,
}: {
  params: { applicationId: number };
}) {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [isLoadingBarcode, setIsLoadingBarcode] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const sigCanvas = useRef<ReactSignatureCanvas>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [data, setData] = useState({
    sign: "",
  });
  const [data2, setData2] = useState({
    status: 8,
    pesan: "",
  });
  const [sign, setSign] = useState<string | null>("");
  const [output, setOutput] = useState<OutputLetterDetailInterface>();
  const [previewFile, setPreviewFile] = useState<string>("");

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

  const fetchOutput = async (id: number) => {
    try {
      const response = await getOutputLetterDetail(id);
      setOutput(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOutput(params?.applicationId);
  }, [params?.applicationId]);

  // Helper function to convert Base64 to Blob
  const dataURLtoBlob = (dataurl: string) => {
    const arr = dataurl.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error("Invalid data URL");
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleUpdateSignature = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    try {
      if (signatureData) {
        // Convert Base64 to Blob and append as File
        const blob = dataURLtoBlob(signatureData);
        const file = new File([blob], "signature.png", { type: blob.type });
        formData.append("sign", file);
      } else if (signature) {
        // Append uploaded file
        formData.append("sign", signature);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Tidak ada tanda tangan yang ditemukan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        setIsLoading(false);
        return;
      }

      // Debugging: Log FormData entries
      // Object.keys(formData).forEach((key) => {
      //   console.log(key, formData.get(key));
      // });

      const response = await updateSignatureLetterApplication(
        formData,
        params?.applicationId
      );

      const response2: { status: number } =
        await updateUserApplicationHistoryDetail(
          {
            ...data,
            status: 9,
          },
          params?.applicationId
        );

      const result = await Promise.all([response, response2]);

      if (response.status === 200) {
        setData({
          sign: "",
        });
        setSignatureData(null);
        setSignature(null);
        Swal.fire({
          icon: "success",
          title: "Berhasil Membubuhkan tanda tangan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });

        router.push("/areas-head/head-manage-approvals");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Membubuhkan tanda tangan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan!",
        text: "Gagal membubuhkan tanda tangan.",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearSignature = () => {
    sigCanvas?.current?.clear();
    setIsSigned(false);
    setSignatureData(null);
  };

  const saveSignature = () => {
    if (sigCanvas.current?.isEmpty()) {
      Swal.fire({
        icon: "warning",
        title: "Tanda tangan kosong!",
        text: "Silakan buat tanda tangan sebelum menyimpan.",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      return;
    }
    const dataUrl = sigCanvas.current
      ?.getTrimmedCanvas()
      .toDataURL("image/png");
    if (dataUrl !== undefined) {
      setSignatureData(dataUrl);
    }
    setIsSigned(true);
    Swal.fire({
      icon: "success",
      title: "Tanda tangan berhasil disimpan!",
      timer: 2000,
      showConfirmButton: false,
      position: "center",
    });
  };

  const handleFilePPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSignature(file);
      setData({
        ...data,
        sign: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewFile(fileUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropPP = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSignature(file);
      setData({
        ...data,
        sign: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewFile(fileUrl);
    }
  };

  const handleRemoveImage = () => {
    setSignature(null);
    setPreviewFile("");
    setData({ ...data, sign: "" });
  };

  const handleSignature = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsLoadingBarcode(true);
    try {
      const response = await SignatureBarcode(id);

      console.log(response, "ini response");

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Generate Barcode!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        setSign(response?.data?.sign);
        setIsLoadingBarcode(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Generate Barcode!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingBarcode(false);
    }
  };

  const handleNext = async () => {
    setIsLoadingNext(true);
    setTimeout(() => {
      setIsLoadingNext(false);
      router.push("/department-secretary/department-signature-validation");
    }, 3000);
  };

  return (
    <section className="w-full flex flex-col px-5">
      <div className="w-full flex flex-col items-center p-5 mt-5 gap-y-8 bg-line-10 rounded-lg shadow-md">
        <div className="w-full flex flex-row gap-x-5">
          <div
            className="w-full flex flex-row items-center gap-x-3 cursor-pointer"
            onClick={() => router.back()}>
            <ChevronLeft className="w-6 h-6 text-black-80" />

            <p className="text-black-80 text-[20px]">
              Detail File Pengesahan Tanda Tangan
            </p>
          </div>

          <div className="w-4/12">
            <Dialog>
              <DialogTrigger className="w-full">
                <div className="bg-primary-40 hover:bg-primary-70 rounded-lg px-4 py-3 text-line-10 w-full flex flex-row justify-center items-center gap-x-3">
                  <Plus className="w-6 h-6 text-line-10" />

                  <p className="text-line-10 text-[14px] md:text-[16px]">
                    Tambah
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-line-10 w-full max-w-xl">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Tanda Tangan
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Untuk menyelesaikan proses tanda tangan ini, silakan pilih
                    salah satu metode tanda tangan berikut:
                  </DialogDescription>
                </DialogHeader>

                <div className="w-full flex flex-row gap-x-3">
                  <Tabs
                    defaultValue="image"
                    className={`w-full flex flex-col gap-y-6`}>
                    <TabsList
                      className={`w-full px-0 py-0 h-full flex flex-row gap-x-3 border-none verticalScroll`}>
                      <TabsTrigger
                        className="w-full text-[14px] md:text-[16px] text-primary-40 py-2 border border-primary-40 bg-line-10 rounded-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                        value="image">
                        Gambar
                      </TabsTrigger>
                      <TabsTrigger
                        className="w-full text-[14px] md:text-[16px] text-primary-40 border border-primary-40 bg-line-10 py-2 rounded-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                        value="upload">
                        Upload
                      </TabsTrigger>
                      <TabsTrigger
                        className="w-full text-[14px] md:text-[16px] text-primary-40 border border-primary-40 bg-line-10 py-2 rounded-lg data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                        value="digital">
                        Digital Signature
                      </TabsTrigger>
                      {/* <div className="w-4/12">
                        <Button className="w-full text-[14px] md:text-[16px] bg-secondary-40 hover:bg-secondary-70 text-line-10">
                          Digital Signature
                        </Button>
                      </div> */}
                    </TabsList>

                    <TabsContent value="image" className="w-full">
                      <form onSubmit={handleUpdateSignature}>
                        <div className="w-full flex flex-col gap-y-3">
                          <div className="w-full flex flex-col gap-y-3">
                            <ReactSignatureCanvas
                              ref={sigCanvas}
                              penColor="black"
                              canvasProps={{
                                width: isMobile ? 300 : 500,
                                height: isMobile ? 150 : 200,
                                className:
                                  "sigCanvas border border-line-20 rounded-lg",
                              }}
                              backgroundColor="white"
                            />
                            <div className="w-full flex flex-row gap-x-3">
                              <Button
                                type="button"
                                className="border text-[14px] md:text-[16px] border-line-20"
                                onClick={clearSignature}>
                                Clear
                              </Button>

                              <Button
                                type="button"
                                className="border text-[14px] md:text-[16px] border-line-20"
                                onClick={saveSignature}>
                                Save
                              </Button>
                            </div>
                          </div>

                          {isSigned && (
                            <p className="text-[14px] md:text-[16px]">
                              Tanda tangan berhasil dibuat!
                            </p>
                          )}

                          <div className="w-full">
                            <Button
                              type="submit"
                              className="w-full text-[14px] md:text-[16px] bg-primary-40 hover:bg-primary-70 text-line-10"
                              disabled={isLoading}>
                              {isLoading ? (
                                <Loader className="animate-spin" />
                              ) : (
                                "Tanda Tangan"
                              )}
                            </Button>
                          </div>
                        </div>
                      </form>
                    </TabsContent>
                    <TabsContent value="upload">
                      <form
                        onSubmit={handleUpdateSignature}
                        className="flex flex-col w-full mt-2 md:mt-4">
                        <div className="flex flex-col w-full h-full mt-2 px-4">
                          <div className="flex flex-col w-full gap-y-5">
                            <div
                              ref={dropRef}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDropPP}
                              className={`w-full h-[100px] border-2 border-dashed border-neutral-800 rounded-xl mt-1 flex flex-col items-center justify-center `}>
                              <>
                                <input
                                  type="file"
                                  id="file-input-pp"
                                  name="imaga_url"
                                  accept="image/*,application/pdf"
                                  onChange={handleFilePPChange}
                                  className="hidden"
                                />
                                <label
                                  htmlFor="file-input-pp"
                                  className="text-[16px] md:text-[20px] text-center text-neutral-800 p-2 md:p-4 font-light cursor-pointer">
                                  Drag and drop file here or click to select
                                  file
                                </label>
                              </>
                            </div>
                            {previewFile && (
                              <div className="relative w-full mt-1">
                                <div className="border-2 border-dashed flex justify-center rounded-xl p-2">
                                  <div className="w-6/12 h-full">
                                    <Image
                                      src={previewFile}
                                      width={1000}
                                      height={500}
                                      alt="Preview"
                                      className="max-h-full rounded-xl p-4 md:p-2 max-w-full object-contain"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute bg-none -top-0 -right-0 md:-top-0 md:-right-0 text-neutral-800 p-1">
                                    <Trash />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-center items-end self-end w-4/12 md:self-center my-4 md:pb-[30px] mt-4 pr-2 md:pr-0">
                          <Button
                            className="w-full bg-primary-40 hover:bg-primary-70 text-neutral-50 h-[30px] md:h-[40px] text-[14px] md:text-[16px]"
                            type="submit"
                            disabled={isLoading}>
                            {isLoading ? (
                              <Loader className="animate-spin" />
                            ) : (
                              "Simpan"
                            )}
                          </Button>
                        </div>
                      </form>
                    </TabsContent>

                    <TabsContent value="digital" className="w-full">
                      <form className="flex flex-col w-full">
                        <div className="flex flex-col w-full md:h-[150px] border border-line-20 rounded-lg mt-2 px-4">
                          {sign && (
                            <Image
                              src={sign}
                              alt="Digital Signature"
                              width={1000}
                              height={1000}
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>
                        <div className="flex justify-center items-end self-end w-4/12 md:self-start md:mt-2">
                          <Button
                            onClick={(e: any) =>
                              handleSignature(e, params?.applicationId)
                            }
                            className="w-full bg-secondary-40 hover:bg-secondary-50 text-neutral-50 h-[30px] md:h-[40px] text-[14px] md:text-[16px]"
                            type="submit"
                            disabled={isLoadingBarcode}>
                            {isLoadingBarcode ? (
                              <Loader className="animate-spin" />
                            ) : (
                              "Generate Barcode"
                            )}
                          </Button>
                        </div>
                      </form>

                      <div className="flex justify-center items-end self-end w-full md:self-center my-4 md:pb-[30px] mt-4 pr-2 md:pr-0">
                        <Button
                          className="w-full bg-primary-40 hover:bg-primary-70 text-neutral-50 h-[30px] md:h-[40px] text-[14px] md:text-[16px]"
                          onClick={handleNext}
                          disabled={isLoadingNext}>
                          {isLoadingNext ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Tanda Tangan"
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center gap-y-5">
          <div className="w-full h-full">
            {output && output?.fileoutput && (
              <iframe
                allowFullScreen
                allow="accelerometer"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
                src={`${output?.fileoutput?.toString()}#toolbar=0`}
                height={"auto"}
                title="PDF"
                className="rounded-lg w-full h-[1450px]">
                PDF
              </iframe>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col"></div>
    </section>
  );
}
