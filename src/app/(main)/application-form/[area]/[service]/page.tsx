"use client";

import ApplicationFormInputPages from "@/components/elements/application_form_input/page";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export default function ApplicationFormScreen({
  params,
}: {
  params: { area: string; service: string };
}) {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    nip: "",
    telepon: "",
  });

  return (
    <section className="w-full flex flex-col my-6 px-6">
      <div className="w-full flex flex-col bg-line-10 py-6 shadow-md gap-y-8 rounded-lg">
        <div className="grid grid-cols-2 px-4 md:grid-cols-none md:flex md:flex-row md:justify-between items-center md:w-full">
          <div className="flex flex-row items-center">
            <button onClick={() => router.back()}>
              <ChevronLeft className="w-7 h-7 text-black-80 mr-2" />
            </button>

            <h5 className="text-xl text-start text-black-80 font-normal">
              Informasi Data Diri
            </h5>
          </div>
        </div>

        <div className="flex flex-col gap-y-5 mt-3 md:mt-0 px-6">
          <ApplicationFormInputPages
            value={data.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, name: e.target.value })
            }
            name={"name"}
            id={"name"}
            placeholder={"Masukkan Nama Lengkap Anda"}
            type={"text"}
            label={"Nama Lengkap"}
          />

          <ApplicationFormInputPages
            value={data.nip}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, nip: e.target.value })
            }
            name={"nip"}
            id={"nip"}
            placeholder={"Masukkan NIP Anda"}
            type={"number"}
            label={"NIP"}
          />

          <ApplicationFormInputPages
            value={data.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, email: e.target.value })
            }
            name={"email"}
            id={"email"}
            placeholder={"Masukkan Email Anda"}
            type={"email"}
            label={"Email"}
          />

          <ApplicationFormInputPages
            value={data.telepon}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, telepon: e.target.value })
            }
            name={"telepon"}
            id={"telepon"}
            placeholder={"Masukkan Nomor Telepon Anda"}
            type={"number"}
            label={"Nomor Telepon"}
          />
        </div>
      </div>

      <div className="w-full flex flex-col bg-line-10 py-6 shadow-md gap-y-8">
        <div className="grid grid-cols-2 px-4 md:grid-cols-none md:flex md:flex-row md:justify-between items-center md:w-full">
          <h5 className="text-xl text-start text-black-80 font-normal">
            Formulir
          </h5>
        </div>

        <div className="flex flex-col gap-y-5 mt-3 md:mt-0 px-6">
          <ApplicationFormInputPages
            value={data.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, name: e.target.value })
            }
            name={"name"}
            id={"name"}
            placeholder={"Masukkan Nama Lengkap Anda"}
            type={"text"}
            label={"Nama Lengkap"}
          />

          <ApplicationFormInputPages
            value={data.nip}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, nip: e.target.value })
            }
            name={"nip"}
            id={"nip"}
            placeholder={"Masukkan NIP Anda"}
            type={"number"}
            label={"NIP"}
          />

          <ApplicationFormInputPages
            value={data.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, email: e.target.value })
            }
            name={"email"}
            id={"email"}
            placeholder={"Masukkan Email Anda"}
            type={"email"}
            label={"Email"}
          />

          <ApplicationFormInputPages
            value={data.telepon}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, telepon: e.target.value })
            }
            name={"telepon"}
            id={"telepon"}
            placeholder={"Masukkan Nomor Telepon Anda"}
            type={"number"}
            label={"Nomor Telepon"}
          />
        </div>
      </div>

      <div className="w-full flex flex-col bg-line-10 py-6 shadow-md gap-y-8">
        <div className="grid grid-cols-2 px-4 md:grid-cols-none md:flex md:flex-row md:justify-between items-center md:w-full">
          <h5 className="text-xl text-start text-black-80 font-normal">
            Dokumen Pendukung
          </h5>
        </div>

        <div className="flex flex-col gap-y-5 mt-3 md:mt-0 px-6">
          <div
            // onSubmit={handleSubmit}
            className="flex flex-col items-center w-full">
            {/* {dataFile.Layananforms.map((el) => ( */}
            <div
              // key={el.id}
              className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-line-10 border border-primary-700 px-4">
              <div className="flex flex-col w-full justify-center gap-[9px]">
                {/* {el.isrequired === true ? ( */}
                <h6 className="text-sm text-black-80 font-normal">
                  {/* {el.field} */} Hello World
                  <span className="text-red-500 text-sm font-normal">*</span>
                </h6>
                {/* ) : (
                        <h6 className="text-[12px] md:text-[16px] text-primary-800 font-semibold">
                          {el.field}
                        </h6>
                      )} */}

                {/* {el.isrequired === true && (
                        <div className="text-error-700">Data Wajib Diisi!</div>
                      )} */}
              </div>
              <div className="flex self-center items-center w-full md:justify-end">
                <input
                  // id={`fileInput-${el.id}`}
                  type="file"
                  className="md:appearance-none hidden"
                  // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  //   handleDocChange(
                  //     el.id.toString(),
                  //     e.target.files ? e.target.files[0] : null
                  //   )
                  // }
                />
                <label
                  // htmlFor={`fileInput-${el.id}`}
                  className="flex items-center w-full md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-sm hover:bg-primary-70 hover:text-line-10 border border-primary-40 text-primary-40 py-[10px] cursor-pointer">
                  {/* {(fileName[el.id.toString()] &&
                          truncateTitle(
                            String(fileName[el.id.toString()]),
                            10
                          )) ||
                          "Upload"} */}
                  Upload
                </label>

                <Dialog>
                  <DialogTrigger>
                    <div
                      // onClick={() =>
                      //   handleViewFile(
                      //     docValues[el.id.toString()] || null
                      //   )
                      // }
                      className="flex items-center text-sm justify-center w-full text-black-80 font-normal hover:text-primary-40 hover:border-b hover:border-line-20 ml-4 mr-2">
                      Lihat File
                    </div>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col justify-between w-full bg-line-10">
                    {/* <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 z-50">
                            <div className="bg-primary-100 rounded-xl shadow-md max-w-full">
                              {previewFile?.type.startsWith("image/") ? (
                                <div className="w-full h-full p-4 rounded-xl">
                                  <Image
                                    src={fileURL}
                                    alt="File preview"
                                    className="w-full h-full object-cover rounded-xl"
                                    width={500}
                                    height={500}
                                  />
                                </div>
                              ) : (
                                <iframe src={fileURL} className="w-full h-64" />
                              )}
                            </div>
                          </div> */}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            {/* ))} */}

            <div className="h-[40px] w-[150px] bg-primary-40 rounded-lg text-line-10 md:w-full flex self-center justify-center items-end mb-[22px] mt-[16px] md:mt-[24px]">
              <Button
                type="submit"
                // disabled={
                //   isLoading
                //     ? true
                //     : false ||
                //       dataFile?.Layananforms.some(
                //         (el) =>
                //           el.isrequired && !docValues[el.id.toString()]
                //       )
                // }
              >
                {/* {isLoading ? <Loader className="animate-spin" /> : "Ajukan"} */}
                Simpan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}