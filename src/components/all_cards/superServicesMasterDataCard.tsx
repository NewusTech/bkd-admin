"use client";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
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
  quillConditionEdit,
  quillConditionEditRef,
  quillTermEdit,
  quillTermEditRef,
  quillStepEdit,
  quillStepEditRef,
  quillDescEdit,
  quillDescEditRef,
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
  quillConditionEdit: any;
  quillConditionEditRef: any;
  quillTermEdit: any;
  quillTermEditRef: any;
  quillStepEdit: any;
  quillStepEditRef: any;
  quillDescEdit: any;
  quillDescEditRef: any;
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

    if (quillConditionEdit && service?.syarat) {
      quillConditionEdit.clipboard.dangerouslyPasteHTML(service?.syarat);
    }

    if (quillTermEdit && service?.ketentuan) {
      quillTermEdit.clipboard.dangerouslyPasteHTML(service?.ketentuan);
    }

    if (quillStepEdit && service?.langkah) {
      quillStepEdit.clipboard.dangerouslyPasteHTML(service?.langkah);
    }

    if (quillDescEdit && service?.desc) {
      quillDescEdit.clipboard.dangerouslyPasteHTML(service?.desc);
    }
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{service.nama}</TableCell>
      <TableCell className="text-center">{service.penanggung_jawab}</TableCell>
      <TableCell className="text-center">{service.desc}</TableCell>
      <TableCell className="text-center flex items-center w-full">
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
              open={isDialogEditOpen}
              onOpenChange={setIsDialogEditOpen}>
              <AlertDialogTrigger
                onClick={() => {
                  handleSetService();
                  setIsDialogEditOpen(true);
                }}
                className="w-full">
                <div className="w-full text-sm bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg">
                  Edit
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center">
                    Master Data Layanan
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Input data yang diperlukan
                  </AlertDialogDescription>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleUpdateService(e, service?.id)
                    }
                    className="w-full flex flex-col gap-y-3 verticalScroll">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
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
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Nama Layanan"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="syarat"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Syarat Layanan
                      </Label>
                      <div className="w-full h-full border border-line-20 rounded-lg text-left">
                        <EditorProvide
                          content={data.syarat}
                          onChange={(e: any) => setData({ ...data, syarat: e })}
                        />
                      </div>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="ketentuan"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Pilih Bidang
                      </Label>
                      <div className="w-full border border-line-20 rounded-lg">
                        <Select
                          value={data.bidang_id}
                          onValueChange={(value: string) =>
                            setData({ ...data, bidang_id: value })
                          }>
                          <SelectTrigger
                            className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                            <SelectValue
                              placeholder="Pilih Bidang"
                              className="text-black-80 w-full"
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
                                      className={`w-full px-4`}
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

                    <div className="w-full flex flex-col gap-y-2">
                      <Label className="text-black-70 font-normal text-xs md:text-sm text-left">
                        Deskripsi Bidang
                      </Label>
                      <div className="w-full h-full border border-line-20 rounded-lg text-left">
                        <EditorProvide
                          content={data.desc}
                          onChange={(e: any) => setData({ ...data, desc: e })}
                        />
                      </div>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
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
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Nama Penanggung Jawab"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="ketentuan"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Ketentuan
                      </Label>
                      <div className="w-full h-full border border-line-20 rounded-lg text-left">
                        <EditorProvide
                          content={data.ketentuan}
                          onChange={(e: any) => setData({ ...data, ketentuan: e })}
                        />
                      </div>
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="langkah"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Langkah
                      </Label>
                      <div className="w-full h-full border border-line-20 rounded-lg text-left">
                        <EditorProvide
                          content={data.langkah}
                          onChange={(e: any) => setData({ ...data, langkah: e })}
                        />
                      </div>
                    </div>

                    <div className="w-full flex flex-row justify-center items-center gap-x-5">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <Button
                        type="submit"
                        disabled={isUpdateLoading ? true : false}
                        className="bg-primary-40 hover:bg-primary-70 text-line-10">
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

          <div className="w-full">
            <Button
              disabled={isDeleteLoading ? true : false}
              onClick={() => handleDeleteService(service.id)}
              className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10">
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
