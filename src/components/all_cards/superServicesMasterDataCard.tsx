"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { AreasInterface, ServiceInterface } from "@/types/interface";
import { Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import EditorProvide from "../pages/areas";
import CombinedReadMoreRichTextDisplay from "../ui/CombinedReadMoreRichTextDisplay";
import ReadMore from "../ui/ReadMore";
import TypingEffect from "../ui/TypingEffect";

export default function SuperServicesMasterDataCard({
  service,
  areas,
  index,
  handleDeleteService,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  handleUpdateService,
  isDialogEditOpen,
  setIsDialogEditOpen,
}: {
  service: ServiceInterface;
  areas: AreasInterface[];
  index: number;
  handleDeleteService: (id: number) => void;
  isDeleteLoading: boolean;
  data: {
    nama: string;
    desc: string;
    syarat: string;
    bidang_id: string;
    penanggung_jawab: string;
    ketentuan: string;
    langkah: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      nama: string;
      desc: string;
      syarat: string;
      bidang_id: string;
      penanggung_jawab: string;
      ketentuan: string;
      langkah: string;
    }>
  >;
  isUpdateLoading: boolean;
  handleUpdateService: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleSetService = () => {
    setData({
      nama: service.nama,
      desc: service.desc,
      syarat: service.syarat,
      bidang_id: service.bidang_id.toString(),
      penanggung_jawab: service.penanggung_jawab,
      ketentuan: service.ketentuan,
      langkah: service.langkah,
    });

  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{service.nama}</TableCell>
      <TableCell className="text-center">{service.penanggung_jawab}</TableCell>
      <TableCell className="text-left">
        <ReadMore text={service.desc}></ReadMore>
        {/* {service.desc && (
          <CombinedReadMoreRichTextDisplay content={service.desc} keys={true} />
        )} */}
      </TableCell>
      <TableCell className="text-center flex items-center w-full">
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-1/2">
            <AlertDialog
              open={isDialogEditOpen}
              onOpenChange={setIsDialogEditOpen}>
              <AlertDialogTrigger
                onClick={() => {
                  handleSetService();
                  setIsDialogEditOpen(true);
                }}
                className="w-full">
                <div className="w-full text-[14px] bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg">
                  Edit
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col">
                  <AlertDialogTitle className="text-center">
                    Master Data Layanan
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    <TypingEffect className="text-[16px]" text={["Edit data yang diperlukan"]} />
                  </AlertDialogDescription>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleUpdateService(e, service?.id)
                    }
                    className="w-full flex flex-col gap-y-3 max-h-[500px]">
                    <div className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                          Nama Layanan
                        </Label>
                        <Input
                          id="nama-layanan"
                          name="nama"
                          value={data.nama}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData({
                              ...data,
                              nama: e.target.value,
                            })
                          }
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[16px]"
                          placeholder="Masukkan Nama Layanan"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label
                          htmlFor="syarat"
                          className="focus-within:text-primary-70 font-normal text-[16px]">
                          Syarat Layanan
                        </Label>
                        <div className="w-full h-full border border-line-20 rounded-lg text-left text-[16px]">
                          <EditorProvide
                            content={data.syarat}
                            onChange={(e: any) => setData({ ...data, syarat: e })}
                          />
                        </div>
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label
                          htmlFor="ketentuan"
                          className="focus-within:text-primary-70 font-normal text-[16px]">
                          Pilih Bidang
                        </Label>
                        <div className="w-full border border-line-20 rounded-lg">
                          <Select
                            value={data.bidang_id}
                            onValueChange={(value: string) =>
                              setData({ ...data, bidang_id: value })
                            }>
                            <SelectTrigger
                              className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none text-[16px]`}>
                              <SelectValue
                                placeholder="Pilih Bidang"
                                className="text-black-80 w-full text-[16px]"
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-line-10">
                              <div className="pt-2">
                                {areas &&
                                  areas.length > 0 &&
                                  areas.map((area: AreasInterface, i: number) => {
                                    return (
                                      <SelectItem
                                        key={i}
                                        className={`w-full px-4 text-[16px]`}
                                        value={area.id.toString()}>
                                        {area.nama}
                                      </SelectItem>
                                    );
                                  })}
                              </div>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                          Deskripsi Bidang
                        </Label>
                        <div className="w-full h-full border border-line-20 rounded-lg text-left text-[16px]">
                          <EditorProvide
                            content={data.desc}
                            onChange={(e: any) => setData({ ...data, desc: e })}
                          />
                        </div>
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                          Penanggung Jawab
                        </Label>
                        <Input
                          id="pj"
                          name="penanggung_jawab"
                          value={data.penanggung_jawab}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData({
                              ...data,
                              penanggung_jawab: e.target.value,
                            })
                          }
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[16px]"
                          placeholder="Masukkan Nama Penanggung Jawab"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label
                          htmlFor="ketentuan"
                          className="ffocus-within:text-primary-70 font-normal text-[16px]">
                          Ketentuan
                        </Label>
                        <div className="w-full h-full border border-line-20 rounded-lg text-left text-[16px]">
                          <EditorProvide
                            content={data.ketentuan}
                            onChange={(e: any) => setData({ ...data, ketentuan: e })}
                          />
                        </div>
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                        <Label
                          htmlFor="langkah"
                          className="focus-within:text-primary-70 font-normal text-[16px]">
                          Langkah
                        </Label>
                        <div className="w-full h-full border border-line-20 rounded-lg text-left text-[16px]">
                          <EditorProvide
                            content={data.langkah}
                            onChange={(e: any) => setData({ ...data, langkah: e })}
                          />
                        </div>
                      </div>

                    </div>
                    <div className="w-full flex flex-row justify-between items-center gap-x-5">
                      <AlertDialogCancel>
                        <AlertDialogDescription className="text-center text-[16px] pl-3 pr-3">
                          Batal
                        </AlertDialogDescription>
                      </AlertDialogCancel>
                      <Button
                        title="Simpan Data"
                        type="submit"
                        disabled={isUpdateLoading ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[16px] px-3 rounded-lg border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                        {isUpdateLoading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Simpan"
                        )}
                      </Button>
                    </div>

                  </form>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="w-1/2">
            <Button
              disabled={isDeleteLoading ? true : false}
              onClick={() => handleDeleteService(service.id)}
              className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 h-10 text-[14px] px-3 border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
              {isDeleteLoading ? (
                <Loader className="animate-spin" />
              ) : isDeleteLoading ? (
                ""
              ) : (
                "Hapus"
              )}
            </Button>
          </div>

        </div>
      </TableCell>
    </TableRow>
  );
}
