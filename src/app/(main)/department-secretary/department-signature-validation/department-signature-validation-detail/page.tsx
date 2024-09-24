"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Pen } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function DepartmentSecretarySignatureValidationDetailScreen() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

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
                value="dokumen-pendukung">
                Dokumen Pendukung
              </TabsTrigger>
              <TabsTrigger
                className="w-full py-4 border-r border-line-20 data-[state=active]:bg-primary-40 data-[state=active]:text-line-10"
                value="upload-pendukung">
                Upload Dokumen
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="data-diri"
              className="w-full flex flex-col mt-4">
              <div className="w-full flex flex-col gap-y-5 border border-line-20 rounded-lg p-4">
                <div>
                  <div>Hello wkwkwk</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="formulir" className="w-full flex flex-col mt-0">
              <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                <div>
                  <div>Hello ehehhe</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="dokumen-pendukung"
              className="w-full flex flex-col mt-0">
              <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                <div>
                  <div>Hello hoho</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="upload-pendukung"
              className="w-full flex flex-col mt-0">
              <div className="w-full flex flex-col gap-y-5 border border-grey-100 rounded-lg p-4">
                <div className="w-full flex flex-row items-center gap-x-5">
                  <div className="w-full">Hello hoho</div>

                  <div className="w-full flex flex-row justify-end">
                    <Button
                      onClick={() =>
                        router.push(
                          "/department-secretary/department-signature-validation/department-signature-validation-upload"
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

            <div className="w-4/12 bg-green-700 bg-opacity-20 py-2 rounded-lg">
              <p className="text-green-700 text-center">Masih Menunggu</p>
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
