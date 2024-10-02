"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { AboutUsVisionMisionInterface } from "@/types/interface";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function SuperLocationMapsMasterDataTablePages({
  abouts,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleUpdateAbout,
}: {
  abouts: AboutUsVisionMisionInterface;
  data: {
    long: string;
    lang: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      long: string;
      lang: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateAbout: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
}) {
  const handleSetAbout = () => {
    setData({
      long: abouts.long,
      lang: abouts.lang,
    });
  };

  let iframeSrc = "https://www.google.com/maps?q=";
  if (abouts?.lang && abouts?.long) {
    iframeSrc += abouts.lang + "," + abouts.long + "&hl=es;z=14&output=embed";
  }

  return (
    <div className="w-full flex flex-col items-center gap-y-5">
      <div className="w-full flex flex-row bg-line-10 rounded-lg shadow-md py-3 items-center px-3">
        <div className="w-full">Data Master Tentang, Visi, Dan Misi</div>

        <div className="w-7/12 flex flex-row gap-x-3">
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
                <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col">
                    <AlertDialogTitle className="text-center">
                      Master Data Lokasi
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      Input data yang diperlukan
                    </AlertDialogDescription>
                    <form
                      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                        handleUpdateAbout(e, abouts.id)
                      }
                      className="w-full flex flex-col gap-y-3 max-h-[500px]">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setData({ ...data, long: e.target.value })}
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setData({ ...data, lang: e.target.value })}
                            type="text"
                            inputMode="numeric"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Lintang"
                          />
                        </div>
                      </div>

                      <div className="w-full flex flex-row justify-between items-center gap-x-5">
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

          <div className="w-full">
            <Button
              // disabled={isDeleteLoading ? true : false}
              // onClick={() => handleDeleteArea(area?.slug)}
              className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10">
              {/* {isDeleteLoading ? (
                <Loader className="animate-spin" />
              ) : isDeleteLoading ? (
                ""
              ) : (
                "Hapus"
              )} */}
              Hapus
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-5 bg-line-10 p-3 rounded-lg shadow-md">
        <section className="w-full flex snap-start scroll-mt-24 flex-col py-8 md:py-12 px-4 md:px-20 gap-y-8">
          <div className="w-full flex flex-col items-center gap-y-3">
            <h5 className="text-black-80 px-6 md:px-0 text-xl md:text-3xl font-semibold">
              MAPS BKD LAMPUNG TIMUR
            </h5>
          </div>

          <div className="w-full">
            <div className="w-full h-[300px] md:h-[500px]">
              {abouts && (
                <iframe
                  src={iframeSrc}
                  width="600"
                  height="450"
                  style={{ border: "0" }}
                  className="border-0 w-full rounded-xl"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade">
                  {abouts?.lang}
                </iframe>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
