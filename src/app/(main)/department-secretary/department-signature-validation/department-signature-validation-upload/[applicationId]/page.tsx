"use client";

import contract from "@/../../public/assets/icons/signature-contract-white-out.svg";
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
import { FilePlus, Pen, Plus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader } from "lucide-react";
import Image from "next/image";
import ReactSignatureCanvas from "react-signature-canvas";
import { getApplicationDocumentOutput } from "@/services/api";

export default function DepartmentSecretarySignatureValidationUploadScreen({
  params,
}: {
  params: { applicationId: number };
}) {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isLoading, setIsLoading] = useState(false);
  const [signatureData, setSignatureData] = useState<any>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const sigCanvas = useRef<ReactSignatureCanvas>(null);
  const [fotoProfile, setFotoProfile] = useState<File | null>(null);
  const [newProfileImage, setNewProfileImage] = useState({
    image_url: "",
  });
  const [output, setOutput] = useState<string>("");
  const [previewPPImage, setPreviewPPImage] = useState<string>("");

  const fetchOutput = async (id: number) => {
    try {
      const reponse = await getApplicationDocumentOutput(id);

      const fileURL = URL.createObjectURL(reponse);
      // window.open(fileURL);
      setOutput(fileURL);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOutput(params?.applicationId);
  }, [params?.applicationId]);

  const clearSignature = () => {
    sigCanvas?.current?.clear();
    setIsSigned(false);
  };

  const saveSignature = () => {
    const dataUrl = (sigCanvas.current as ReactSignatureCanvas)
      ?.getTrimmedCanvas()
      .toDataURL("image/png");
    setSignatureData(dataUrl);
    setIsSigned(true);
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  const handleFilePPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoProfile(file);
      setNewProfileImage({
        ...newProfileImage,
        image_url: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewPPImage(fileUrl);
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
      setFotoProfile(file);
      setNewProfileImage({
        ...newProfileImage,
        image_url: file.name,
      });
      const fileUrl = URL.createObjectURL(file);
      setPreviewPPImage(fileUrl);
    }
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
                      <div className="w-4/12">
                        <Button className="w-full text-[14px] md:text-[16px] bg-secondary-40 hover:bg-secondary-70 text-line-10">
                          Digital Signature
                        </Button>
                      </div>
                    </TabsList>
                    <TabsContent value="image" className="w-full">
                      <div className="w-full flex flex-col gap-y-3">
                        <div className="w-full flex flex-col gap-y-3">
                          <ReactSignatureCanvas
                            ref={sigCanvas}
                            penColor="black"
                            canvasProps={{
                              width: 500,
                              height: 200,
                              className:
                                "sigCanvas border border-line-20 rounded-lg",
                            }}
                            backgroundColor="white"
                          />
                          <div className="w-full flex flex-row gap-x-3">
                            <Button
                              className="border text-[14px] md:text-[16px] border-line-20"
                              onClick={clearSignature}>
                              Clear
                            </Button>

                            <Button
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

                        {/* <button onClick={submitSignature}>
                          Submit PDF with Signature
                        </button> */}
                        <div className="w-full">
                          <Button className="w-full text-[14px] md:text-[16px] bg-primary-40 hover:bg-primary-70 text-line-10">
                            Tanda Tangan
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="upload">
                      {/* <div className="w-full flex flex-col gap-y-3">
                        <h2>Tanda Tangan Digital</h2>

                        <label>Upload PDF yang ingin ditandatangani:</label>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handleFileUpload}
                        />
                      </div> */}

                      <form
                        // onSubmit={handleFileUpload}
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
                                  accept="application/pdf"
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
                          </div>
                        </div>
                        <div className="flex justify-center items-end self-end w-4/12 md:self-center my-4 md:pb-[30px] mt-4 pr-2 md:pr-0">
                          <Button
                            className="w-full bg-primary-40 hover:bg-primary-70 text-neutral-50 h-[30px] md:h-[40px] text-[14px] md:text-[16px]"
                            type="submit"
                            disabled={isLoading ? true : false}>
                            {isLoading ? (
                              <Loader className="animate-spin" />
                            ) : (
                              "Simpan"
                            )}
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center gap-y-5">
          <div className="w-full h-full">
            <iframe
              allowFullScreen
              src={output}
              title="PDF"
              className="rounded-lg w-full h-[1450px]">
              PDF
            </iframe>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col"></div>
    </section>
  );
}
