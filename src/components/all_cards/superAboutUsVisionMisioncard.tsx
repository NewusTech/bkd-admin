"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  AboutUsVisionMisionInterface,
  AreasInterface,
} from "@/types/interface";
import { Loader } from "lucide-react";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function SuperAboutUsVisionMisionMasterDataCard({
  about,
  index,
  data,
  setData,
  isUpdateLoading,
  handleUpdateAbout,
  isDialogEditOpen,
  setIsDialogEditOpen,
}: {
  about: AboutUsVisionMisionInterface;
  index: number;
  data: {
    kontak: string;
    visi: string;
    misi: string;
    about_bkd: string;
    long: string;
    lang: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      kontak: string;
      visi: string;
      misi: string;
      about_bkd: string;
      long: string;
      lang: string;
    }>
  >;
  isUpdateLoading: boolean;
  handleUpdateAbout: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleSetAbout = () => {
    setData({
      kontak: about.kontak,
      visi: about.visi,
      misi: about.misi,
      about_bkd: about.about_bkd,
      long: about.long,
      lang: about.lang,
    });
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{about?.about_bkd}</TableCell>
      <TableCell className="text-center">{about?.kontak}</TableCell>
      <TableCell className="text-center flex items-center w-full">
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
              open={isDialogEditOpen}
              onOpenChange={setIsDialogEditOpen}>
              <AlertDialogTrigger
                onClick={() => {
                  handleSetAbout();
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
                    Master Data Bidang
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Input data yang diperlukan
                  </AlertDialogDescription>
                  <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                      handleUpdateAbout(e, about.id)
                    }
                    className="w-full flex flex-col gap-y-3 verticalScroll">
                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        Tentang BKD
                      </Label>

                      <Input
                        id="about-bkd"
                        name="about_bkd"
                        value={data?.about_bkd}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData({ ...data, about_bkd: e.target.value })
                        }
                        type="text"
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Tentang BKD"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label className="focus-within:text-primary-70 font-normal text-sm">
                        Visi
                      </Label>

                      <Input
                        id="visi"
                        name="visi"
                        value={data.visi}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData({ ...data, visi: e.target.value })
                        }
                        type="text"
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Visi BKD"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="misi"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        NIP Penanggung Jawab
                      </Label>

                      <Input
                        id="misi"
                        name="misi"
                        value={data.misi}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData({ ...data, misi: e.target.value })
                        }
                        type="text"
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Misi BKD"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="kontak"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Kontak
                      </Label>

                      <Input
                        id="kontak"
                        name="kontak"
                        value={data.kontak}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData({ ...data, kontak: e.target.value })
                        }
                        type="text"
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Misi BKD"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="long"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Bujur
                      </Label>

                      <Input
                        id="long"
                        name="long"
                        value={data.long}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData({ ...data, long: e.target.value })
                        }
                        type="text"
                        inputMode="numeric"
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Bujur Lokasi"
                      />
                    </div>

                    <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                      <Label
                        htmlFor="lang"
                        className="focus-within:text-primary-70 font-normal text-sm">
                        Lintang
                      </Label>

                      <Input
                        id="lang"
                        name="lang"
                        value={data.lang}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData({ ...data, lang: e.target.value })
                        }
                        type="text"
                        inputMode="numeric"
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Lintang"
                      />
                    </div>

                    {/* <div className="w-full flex flex-col gap-y-2">
                      <Label className="text-sm text-black-70 font-normal">
                        Deskripsi Bidang
                      </Label>

                      <Textarea
                        name="desc"
                        placeholder="Masukkan Deskripsi Bidang"
                        value={data.desc}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setData({ ...data, desc: e.target.value })
                        }
                        className="w-full rounded-lg h-[74px] border border-line-20 md:h-[122px] text-sm placeholder:opacity-[70%]"
                      />
                    </div> */}

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
        </div>
      </TableCell>
    </TableRow>
  );
}
