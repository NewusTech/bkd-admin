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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  AboutUsVisionMisionInterface,
  AboutVisionMisionInterface,
} from "@/types/interface";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EditorProvide from "@/components/pages/areas";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function SuperAboutUsVisionMisionMasterDataTablePages({
  abouts,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleUpdateAbout,
}: {
  abouts: AboutVisionMisionInterface;
  data: {
    kontak: string;
    visi: string;
    misi: string;
    about_bkd: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      kontak: string;
      visi: string;
      misi: string;
      about_bkd: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateAbout: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const handleSetAbout = () => {
    setData({
      kontak: abouts.kontak,
      visi: abouts.visi,
      misi: abouts.misi,
      about_bkd: abouts.about_bkd,
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-y-5">
      <div className="w-full flex flex-col md:flex-row bg-line-10 rounded-lg shadow-md py-3 items-center px-3 gap-y-3">
        <div className="w-full text-center md:text-start">
          Data Master Tentang, Visi, Dan Misi
        </div>

        <div className="w-full md:w-7/12 flex flex-row gap-x-3">
          <div className="w-full flex flex-row items-center justify-center gap-x-2">
            <div className="w-full">
              {!isMobile ? (
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

                            <div className="w-full h-full md:h-[250px] border border-line-20 rounded-lg text-left">
                              <EditorProvide
                                content={data.about_bkd}
                                onChange={(e: any) =>
                                  setData({ ...data, about_bkd: e })
                                }
                              />
                            </div>
                          </div>
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                            <Label className="focus-within:text-primary-70 font-normal text-sm">
                              Visi
                            </Label>

                            <div className="w-full h-full md:h-[250px] border border-line-20 rounded-lg text-left">
                              <EditorProvide
                                content={data.visi}
                                onChange={(e: any) =>
                                  setData({ ...data, visi: e })
                                }
                              />
                            </div>
                          </div>
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                            <Label className="focus-within:text-primary-70 font-normal text-sm">
                              Misi
                            </Label>

                            <Textarea
                              name="desc"
                              placeholder="Masukkan Misi BKD"
                              value={data.misi}
                              onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                              ) => setData({ ...data, misi: e.target.value })}
                              className="w-full rounded-lg h-[74px] border border-line-20 md:h-[122px] text-sm placeholder:opacity-[70%]"
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
              ) : (
                <Drawer
                  open={isDialogEditOpen}
                  onOpenChange={setIsDialogEditOpen}>
                  <DrawerTrigger
                    onClick={() => {
                      handleSetAbout();
                      setIsDialogEditOpen(true);
                    }}
                    className="w-full min-h-[40px] md:min-h-[60px] text-line-10 text-[13px] md:text-lg md:bg-primary-40 md:hover:bg-primary-70 rounded-lg">
                    <div className="w-full text-sm bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg">
                      Edit
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-5/6 px-3 pb-6">
                    <div className="w-full flex flex-col gap-y-3 verticalScroll">
                      <DrawerTitle className="text-center">
                        Master Data Tentang BKD
                      </DrawerTitle>

                      <DrawerDescription className="text-center">
                        Input data yang diperlukan
                      </DrawerDescription>

                      <form
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                          handleUpdateAbout(e, abouts.id)
                        }
                        className="w-full flex flex-col gap-y-5 verticalScroll">
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

                            <div className="w-full h-full md:h-[250px] border border-line-20 rounded-lg text-left">
                              <EditorProvide
                                content={data.about_bkd}
                                onChange={(e: any) =>
                                  setData({ ...data, about_bkd: e })
                                }
                              />
                            </div>
                          </div>
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                            <Label className="focus-within:text-primary-70 font-normal text-sm">
                              Visi
                            </Label>

                            <div className="w-full h-full md:h-[250px] border border-line-20 rounded-lg text-left">
                              <EditorProvide
                                content={data.visi}
                                onChange={(e: any) =>
                                  setData({ ...data, visi: e })
                                }
                              />
                            </div>
                          </div>
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                            <Label className="focus-within:text-primary-70 font-normal text-sm">
                              Misi
                            </Label>

                            <Textarea
                              name="desc"
                              placeholder="Masukkan Misi BKD"
                              value={data.misi}
                              onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                              ) => setData({ ...data, misi: e.target.value })}
                              className="w-full rounded-lg h-[100px] border border-line-20 md:h-[122px] text-sm placeholder:opacity-[70%]"
                            />
                          </div>
                        </div>

                        <div className="w-full flex flex-row justify-end items-center gap-x-5">
                          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}

                          <Button
                            type="submit"
                            disabled={isUpdateLoading ? true : false}
                            className="bg-primary-40 w-full hover:bg-primary-70 text-line-10">
                            {isUpdateLoading ? (
                              <Loader className="animate-spin" />
                            ) : (
                              "Simpan"
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </DrawerContent>
                </Drawer>
              )}
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
