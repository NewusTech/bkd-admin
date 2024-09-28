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

export default function SuperAboutUsVisionMisionMasterDataTablePages({
  abouts,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleUpdateAbout,
  quillAboutEdit,
  quillAboutEditRef,
  quillVisionEdit,
  quillVisionEditRef,
  quillMisionEdit,
  quillMisionEditRef,
}: {
  abouts: AboutUsVisionMisionInterface;
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
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateAbout: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
  quillAboutEdit: any;
  quillAboutEditRef: any;
  quillVisionEdit: any;
  quillVisionEditRef: any;
  quillMisionEdit: any;
  quillMisionEditRef: any;
}) {
  const handleSetAbout = () => {
    setData({
      kontak: abouts.kontak,
      visi: abouts.visi,
      misi: abouts.misi,
      about_bkd: abouts.about_bkd,
      long: abouts.long,
      lang: abouts.lang,
    });

    if (quillAboutEdit && abouts?.about_bkd) {
      quillAboutEdit.clipboard.dangerouslyPasteHTML(abouts?.about_bkd);
    }

    if (quillVisionEdit && abouts?.visi) {
      quillVisionEdit.clipboard.dangerouslyPasteHTML(abouts?.visi);
    }

    if (quillMisionEdit && abouts?.misi) {
      quillMisionEdit.clipboard.dangerouslyPasteHTML(abouts?.misi);
    }
  };

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
                      Master Data Bidang
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
                            htmlFor="kontak"
                            className="focus-within:text-primary-70 font-normal text-sm">
                            Kontak
                          </Label>

                          <Input
                            id="kontak"
                            name="kontak"
                            value={data.kontak}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setData({ ...data, kontak: e.target.value })}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Misi BKD"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Tentang BKD
                          </Label>

                          <div className="w-full h-[250px] flex flex-col gap-y-2">
                            <div
                              className="flex flex-col h-[250px] mt-2 w-full border border-line-20 rounded-b-lg"
                              ref={quillAboutEditRef}></div>
                          </div>

                          {/* <Input
                        id="about-bkd"
                        name="about_bkd"
                        value={data?.about_bkd}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData({ ...data, about_bkd: e.target.value })
                        }
                        type="text"
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Tentang BKD"
                      /> */}
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Visi
                          </Label>

                          <div className="w-full h-[250px] flex flex-col gap-y-2">
                            <div
                              className="flex flex-col h-[250px] mt-2 w-full border border-line-20 rounded-b-lg"
                              ref={quillVisionEditRef}></div>
                          </div>

                          {/* <Input
                        id="visi"
                        name="visi"
                        value={data.visi}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData({ ...data, visi: e.target.value })
                        }
                        type="text"
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Visi BKD"
                      /> */}
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Misi
                          </Label>

                          <div className="w-full h-[250px] flex flex-col gap-y-2">
                            <div
                              className="flex flex-col h-[250px] mt-2 w-full border border-line-20 rounded-b-lg"
                              ref={quillMisionEditRef}></div>
                          </div>

                          {/* <Input
                        id="visi"
                        name="visi"
                        value={data.visi}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData({ ...data, visi: e.target.value })
                        }
                        type="text"
                        className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                        placeholder="Masukkan Visi BKD"
                      /> */}
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
        <div className="w-full flex flex-col gap-y-3">
          <h5 className="text-primary-40 text-[20px]">Tentang</h5>

          <div className="w-full border border-black-80 rounded-lg p-3">
            <p className="text-black-80 font-normal text-[16px]">
              {abouts?.about_bkd && abouts?.about_bkd}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-3">
          <h5 className="text-primary-40 text-[20px]">Visi</h5>

          <div className="w-full border border-black-80 rounded-lg p-3">
            <p className="text-black-80 font-normal text-[16px]">
              {abouts?.visi && abouts?.visi}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-3">
          <h5 className="text-primary-40 text-[20px]">Misi</h5>

          <div className="w-full border border-black-80 rounded-lg p-3">
            <p className="text-black-80 font-normal text-[16px]">
              {abouts?.misi && abouts?.misi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
