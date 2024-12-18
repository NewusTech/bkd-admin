"use client";

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
import { AboutVisionMisionInterface } from "@/types/interface";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EditorProvide from "@/components/pages/areas";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import TypingEffect from "@/components/ui/TypingEffect";
import parse from "html-react-parser";
import { RichTextDisplay } from "@/components/elements/RichTextDisplay";

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
        <div className="w-full text-center md:text-start text-[16px] md:text-[18px]">
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
                    <div className="w-full bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 text-[14px] md:text-[16px]">
                      Edit
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                    <AlertDialogHeader className="flex flex-col">
                      <AlertDialogTitle className="text-center">
                        <AlertDialogDescription className="text-center text-[16px]">
                          Master Data Visi Misi
                        </AlertDialogDescription>
                      </AlertDialogTitle>

                      <TypingEffect
                        className="custom-class text-center text-[14px]"
                        speed={125}
                        deleteSpeed={50}
                        text={["Edit data yang diperlukan"]}
                      />

                      <form
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                          handleUpdateAbout(e, abouts.id)
                        }
                        className="w-full flex flex-col gap-y-3 max-h-[500px]">
                        <div className="w-full flex flex-col gap-y-5 verticalScroll">
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                            <Label
                              htmlFor="kontak"
                              className="focus-within:text-primary-70 font-normal text-[16px]">
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
                              className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[16px]"
                              placeholder="Masukkan Misi BKD"
                            />
                          </div>
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                            <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                              Tentang BKD
                            </Label>

                            <div className="w-full h-full border border-line-20 rounded-lg text-left text-[16px]">
                              <EditorProvide
                                content={data.about_bkd}
                                onChange={(e: any) =>
                                  setData({ ...data, about_bkd: e })
                                }
                              />
                            </div>
                          </div>
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                            <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                              Visi
                            </Label>

                            <div className="w-full h-full border border-line-20 rounded-lg text-left text-[16px]">
                              <EditorProvide
                                content={data.visi}
                                onChange={(e: any) =>
                                  setData({ ...data, visi: e })
                                }
                              />
                            </div>
                          </div>
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                            <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                              Misi
                            </Label>

                            <Textarea
                              name="desc"
                              placeholder="Masukkan Misi BKD"
                              value={data.misi}
                              onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                              ) => setData({ ...data, misi: e.target.value })}
                              className="w-full rounded-lg h-[100px] border border-line-20 md:h-[122px] placeholder:opacity-[70%] text-[16px]"
                            />
                          </div>
                        </div>

                        <div className="w-full flex flex-row justify-between items-center gap-x-5">
                          <AlertDialogCancel className="text-[16px]">
                            Cancel
                          </AlertDialogCancel>

                          <Button
                            type="submit"
                            disabled={isUpdateLoading ? true : false}
                            className="bg-primary-40 hover:bg-primary-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 text-[16px]">
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
                    <div className="w-full bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 text-[14px]">
                      Edit
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-5/6 px-3 pb-6">
                    <div className="w-full flex flex-col gap-y-3 verticalScroll">
                      <DrawerTitle className="text-center text-[16px]">
                        <DrawerDescription className="text-center">
                          Master Data Tentang BKD
                        </DrawerDescription>
                      </DrawerTitle>

                      <TypingEffect
                        className="custom-class text-[14px]"
                        speed={125}
                        deleteSpeed={50}
                        text={["Edit data yang diperlukan"]}
                      />

                      <form
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                          handleUpdateAbout(e, abouts.id)
                        }
                        className="w-full flex flex-col gap-y-5 verticalScroll">
                        <div className="w-full flex flex-col gap-y-5 verticalScroll">
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                            <Label
                              htmlFor="kontak"
                              className="focus-within:text-primary-70 font-normal text-[14px]">
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
                              className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70 text-[14px]"
                              placeholder="Masukkan Misi BKD"
                            />
                          </div>
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                            <Label className="focus-within:text-primary-70 font-normal text-[14px]">
                              Tentang BKD
                            </Label>

                            <div className="w-full h-full border border-line-20 rounded-lg text-left text-[14px]">
                              <EditorProvide
                                content={data.about_bkd}
                                onChange={(e: any) =>
                                  setData({ ...data, about_bkd: e })
                                }
                              />
                            </div>
                          </div>
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                            <Label className="focus-within:text-primary-70 font-normal text-[14px]">
                              Visi
                            </Label>

                            <div className="w-full h-full border border-line-20 rounded-lg text-left">
                              <EditorProvide
                                content={data.visi}
                                onChange={(e: any) =>
                                  setData({ ...data, visi: e })
                                }
                              />
                            </div>
                          </div>
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                            <Label className="focus-within:text-primary-70 font-normal text-[14px]">
                              Misi
                            </Label>

                            <Textarea
                              name="desc"
                              placeholder="Masukkan Misi BKD"
                              value={data.misi}
                              onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                              ) => setData({ ...data, misi: e.target.value })}
                              className="w-full rounded-lg h-[200px] border border-line-20 md:h-[122px] placeholder:opacity-[70%] text-[14px]"
                            />
                          </div>
                        </div>

                        <div className="w-full flex flex-row justify-end items-center gap-x-5">
                          <DrawerClose className="w-full rounded-lg border border-line-20 bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                            <DrawerDescription className="text-[14px]">
                              Batal
                            </DrawerDescription>
                          </DrawerClose>
                          <Button
                            type="submit"
                            disabled={isUpdateLoading ? true : false}
                            className="bg-primary-40 w-full hover:bg-primary-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 text-[14px]">
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

          {/* <div className="w-full">
            <Button className="w-full rounded-lg bg-error-60 hover:bg-error-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 text-[14px] md:text-[16px]">
              Hapus
            </Button>
          </div> */}
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-5 bg-line-10 p-3 rounded-lg shadow-md">
        <div className="w-full flex flex-col gap-y-3">
          <h5 className="text-primary-40 text-[14px] md:text-[16px]">
            Tentang
          </h5>

          <div className="w-full border border-black-80 rounded-lg p-3">
            <div className="text-black-80 font-normal text-[14px] md:text-[16px]">
              {abouts?.about_bkd && (
                <RichTextDisplay content={abouts?.about_bkd} />
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-3">
          <h5 className="text-primary-40 text-[14px] md:text-[16px]">Visi</h5>

          <div className="w-full border border-black-80 rounded-lg p-3">
            <div className="text-black-80 font-normal text-[14px] md:text-[16px]">
              {abouts?.visi && <RichTextDisplay content={abouts?.visi} />}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-3">
          <h5 className="text-primary-40 text-[14px] md:text-[16px]">Misi</h5>

          <div className="w-full border border-black-80 rounded-lg p-3">
            <p className="text-black-80 font-normal text-[14px] md:text-[16px]">
              {abouts?.misi && abouts?.misi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
