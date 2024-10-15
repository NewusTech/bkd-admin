"use client";

export const dynamic = "force-dynamic";
import { getTermConditions, updateTermConditions } from "@/services/api";
import { TermConditionInterface } from "@/types/interface";
import React, { useEffect, useMemo, useState } from "react";
import {
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
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
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { RichTextDisplay } from "@/components/elements/RichTextDisplay";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import EditorProvide from "@/components/pages/areas";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import TypingEffect from "@/components/ui/TypingEffect";

export default function TermConditionScreen() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [terms, setTerms] = useState<TermConditionInterface>();
  const [data, setData] = useState({
    desc: "",
    privacy_policy: "",
  });

  const fetchTermConditions = async () => {
    try {
      const response = await getTermConditions();

      setTerms(response.data);
      setData({
        desc: response.data.desc,
        privacy_policy: response.data.privacy_policy,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTermConditions();
  }, []);

  const handleUpdateTerms = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    try {
      const response = await updateTermConditions(data);

      if (response.status === 200) {
        setData({
          desc: "",
          privacy_policy: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Term And Condition!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchTermConditions();
        setIsDialogEditOpen(false);
        router.push("/super-admin/master-data/terms-and-conditions");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate Term And Condition!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdateLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
      <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-black-80 font-semibold text-lg">
            Data Tabel Syarat dan Ketentuan
          </p>
        </div>

        <div className="w-full flex flex-row justify-end gap-x-3">
          <div className="w-full md:w-3/12 flex flex-row items-center justify-center gap-x-2">
            <div className="w-full">
              {!isMobile ? (
                <AlertDialog
                  open={isDialogEditOpen}
                  onOpenChange={setIsDialogEditOpen}>
                  <AlertDialogTrigger
                    onClick={() => {
                      setIsDialogEditOpen(true);
                    }}
                    className="w-full">
                    <div className="h-10 text-[16px] rounded-lg border border-primary text-center font-medium justify-center flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 bg-black-80 bg-opacity-20 hover:bg-opacity-40 text-black-80 hover:text-line-10 w-full">
                      Edit
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full max-w-3xl bg-line-10 rounded-lg shadow-md">
                    <AlertDialogHeader className="flex flex-col">
                      <AlertDialogTitle className="text-center text-[16px]">
                        Master Data Syarat dan Ketentuan
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-center">
                        <TypingEffect
                          className="custom-class text-[16px]"
                          speed={125}
                          deleteSpeed={50}
                          text={["Edit data yang diperlukan"]}
                        />
                      </AlertDialogDescription>

                      <form
                        onSubmit={handleUpdateTerms}
                        className="w-full flex flex-col gap-y-3 max-h-[500px]">
                        <div className="w-full verticalScroll flex flex-col gap-y-5">
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                            <div className="w-full flex flex-row justify-between items-center">
                              <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                                Ketentuan
                              </Label>
                            </div>
                            <div className="w-full h-full verticalScroll border border-line-20 rounded-lg text-[16px]">
                              <EditorProvide
                                content={data.desc}
                                onChange={(e: any) =>
                                  setData({ ...data, desc: e })
                                }
                              />
                            </div>
                          </div>

                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                            <div className="w-full flex flex-row justify-between items-center">
                              <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                                Syarat
                              </Label>
                            </div>
                            <div className="w-full h-full verticalScroll border border-line-20 rounded-lg text-[16px]">
                              <EditorProvide
                                content={data.privacy_policy}
                                onChange={(e: any) =>
                                  setData({ ...data, privacy_policy: e })
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="w-full flex flex-row justify-between items-center gap-x-5">
                          <AlertDialogCancel className="text-[16px]">Cancel</AlertDialogCancel>
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
                      setIsDialogEditOpen(true);
                    }}
                    className="w-full min-h-[40px] md:min-h-[60px] text-line-10 text-[14px] md:bg-primary-40 md:hover:bg-primary-70 rounded-lg">
                    <div className="w-full bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg">
                      Edit
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-5/6 px-3 pb-6">
                    <div className="w-full flex flex-col gap-y-3 verticalScroll">
                      <DrawerTitle className="text-center text-[14px]">
                        Master Data Syarat dan Ketentuan
                      </DrawerTitle>

                      <DrawerDescription className="text-center">
                        <TypingEffect
                          className="custom-class text-[14px]"
                          speed={125}
                          deleteSpeed={50}
                          text={["Edit data yang diperlukan"]}
                        />
                      </DrawerDescription>

                      <form
                        onSubmit={handleUpdateTerms}
                        className="w-full flex flex-col gap-y-5 verticalScroll">
                        <div className="w-full flex flex-col gap-y-3 verticalScroll">
                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                            <div className="w-full flex flex-row justify-between items-center">
                              <Label className="focus-within:text-primary-70 font-normal text-[14px]">
                                Ketentuan
                              </Label>
                            </div>
                            <div className="w-full h-full verticalScroll border border-line-20 rounded-lg text-[14px]">
                              <EditorProvide
                                content={data.desc}
                                onChange={(e: any) =>
                                  setData({ ...data, desc: e })
                                }
                              />
                            </div>
                          </div>

                          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
                            <div className="w-full flex flex-row justify-between items-center">
                              <Label className="focus-within:text-primary-70 font-normal text-[14px]">
                                Syarat
                              </Label>
                            </div>
                            <div className="w-full h-full verticalScroll border border-line-20 rounded-lg text-[14px]">
                              <EditorProvide
                                content={data.privacy_policy}
                                onChange={(e: any) =>
                                  setData({ ...data, privacy_policy: e })
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 justify-between">
                          <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg text-[14px]">
                            <DrawerDescription className="text-[14px]">
                              Batal
                            </DrawerDescription>
                          </DrawerClose>
                          <Button
                            title="Simpan Data"
                            type="submit"
                            disabled={isUpdateLoading ? true : false}
                            className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[14px] px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-full">
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
        </div>

        <div className="w-full flex flex-col gap-y-5 bg-line-10 p-3 rounded-lg shadow-md">
          <div className="w-full flex flex-col gap-y-3">
            <h5 className="text-primary-40 text-[16px]">Ketentuan</h5>
            <div className="w-full border border-black-80 rounded-lg p-3">
              <div className="text-black-80 font-normal text-[16px]">
                {terms && <RichTextDisplay content={terms?.desc} />}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-3">
            <h5 className="text-primary-40 text-[16px]">Syarat</h5>
            <div className="w-full border border-black-80 rounded-lg p-3">
              <div className="text-black-80 font-normal text-[16px]">
                {terms && <RichTextDisplay content={terms?.privacy_policy} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-3">
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-black-80 font-semibold text-lg">
            Form Update Syarat dan Ketentuan
          </p>
        </div>

        <form
          onSubmit={handleUpdateTerms}
          className="w-full flex flex-col gap-y-3">
          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
            <div className="w-full flex flex-row justify-between items-center">
              <Label className="focus-within:text-primary-70 font-normal text-[16px]">
                Deskripsi
              </Label>

              <div className="w-full flex flex-row justify-end items-center gap-x-5">
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
            </div>

            <div className="w-full h-[250px] border border-line-20 rounded-lg">
              <EditorProvide
                content={data.desc}
                onChange={(e: any) => setData({ ...data, desc: e })}
              />
            </div>
          </div>
        </form>
      </div> */}
    </section>
  );
}
