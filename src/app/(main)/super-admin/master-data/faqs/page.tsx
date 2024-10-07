"use client";

export const dynamic = "force-dynamic";
import SearchPages from "@/components/elements/search";
import { Button } from "@/components/ui/button";
import { deleteFaqs, getFaqs, postFaqs, updateFaqs } from "@/services/api";
import { FaqsInterface } from "@/types/interface";
import React, { useEffect, useMemo, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import SuperFaqsMasterDataTablePages from "@/components/tables/master_datas/faqs_table";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileFaqMasterDataCard from "@/components/mobile_all_cards/mobileFaqMasterDataCard";
import AddIcon from "@/components/elements/add_button";
import TypingEffect from "@/components/ui/TypingEffect";

export default function FaqsScreen() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const limitItem = 30;
  const [faqs, setFaqs] = useState<FaqsInterface[]>([]);
  const [data, setData] = useState({
    answer: "",
    question: "",
  });

  const fetchFaqs = async (limit: number) => {
    try {
      const response = await getFaqs(limit);

      setFaqs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFaqs(limitItem);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateFaqs = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await postFaqs(data);

      if (response.status === 201) {
        setData({
          answer: "",
          question: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Faq!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchFaqs(limitItem);
        setIsDialogOpen(false);
        router.push("/super-admin/master-data/faqs");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Faq!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteFaqs = async (id: number) => {
    setIsDeleteLoading(true);
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin Menghapus Faq?",
        text: "Faq yang telah dihapus tidak dapat dipulihkan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0000FF",
        cancelButtonColor: "#EE3F62",
        confirmButtonText: "Delete",
      });

      if (result.isConfirmed) {
        const response = await deleteFaqs(id);

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: `Faq berhasil dihapus!`,
            timer: 2000,
            position: "center",
          });
          setIsDeleteLoading(false);
          fetchFaqs(limitItem);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleUpdateFaqs = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    try {
      const response = await updateFaqs(id, data);

      if (response.status === 200) {
        setData({
          answer: "",
          question: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Faq!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchFaqs(limitItem);
        setIsDialogEditOpen(false);
        router.push("/super-admin/master-data/faqs");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengupdate Faq!",
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
    <section className="w-full flex flex-col items-center px-5 mt-5">
      <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
        <div className="w-full flex flex-col md:flex-row gap-x-5 gap-y-5">
          <SearchPages
            search={search}
            setSearch={setSearch}
            change={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Pencarian"
          />

          <div className="w-full md:w-3/12">
            {!isMobile ? (
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full">
                  <div className="w-full text-xs bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <AddIcon />
                    Tambah FAQ
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                  <AlertDialogHeader className="flex flex-col max-h-[500px]">
                    <AlertDialogTitle className="text-center">
                      Master Data FAQ
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      <TypingEffect className="custom-class md:text-sm text-xs" speed={125} deleteSpeed={50} text={["Input data yang diperlukan"]} />
                    </AlertDialogDescription>
                    <form
                      onSubmit={handleCreateFaqs}
                      className="w-full flex flex-col gap-y-3 verticalScroll">
                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Pertanyaan
                        </Label>

                        <Input
                          id="question"
                          name="question"
                          value={data.question}
                          onChange={handleChange}
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Masukkan Pertanyaan Anda"
                        />
                      </div>

                      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                        <Label className="focus-within:text-primary-70 font-normal text-sm">
                          Jawaban
                        </Label>

                        <Input
                          id="answer"
                          name="answer"
                          value={data.answer}
                          onChange={handleChange}
                          type="text"
                          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                          placeholder="Masukkan Jawaban Anda"
                        />
                      </div>

                      <div className="w-full flex flex-row justify-between items-center gap-x-5">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <Button
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                          {isLoading ? (
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
              <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DrawerTrigger
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full">
                  <div className="w-full text-xs bg-primary-40 flex items-center justify-center hover:bg-primary-70 h-10 text-line-10 md:text-sm px-3 rounded-lg border border-primary text-center font-medium gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2">
                    <AddIcon />
                    Tambah FAQ
                  </div>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
                  <div className="w-full flex flex-col gap-y-3 verticalScroll">
                    <DrawerTitle className="text-center">
                      Master Data FAQ
                    </DrawerTitle>

                    <DrawerDescription className="text-center">
                      <TypingEffect className="custom-class md:text-sm text-xs" speed={125} deleteSpeed={50} text={["Edit data yang diperlukan"]} />
                    </DrawerDescription>

                    <form
                      onSubmit={handleCreateFaqs}
                      className="w-full flex flex-col gap-y-5 verticalScroll">
                      <div className="w-full flex flex-col gap-y-3 verticalScroll">
                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Pertanyaan
                          </Label>

                          <Input
                            id="question"
                            name="question"
                            value={data.question}
                            onChange={handleChange}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Pertanyaan Anda"
                          />
                        </div>

                        <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                          <Label className="focus-within:text-primary-70 font-normal text-sm">
                            Jawaban
                          </Label>

                          <Input
                            id="answer"
                            name="answer"
                            value={data.answer}
                            onChange={handleChange}
                            type="text"
                            className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
                            placeholder="Masukkan Jawaban Anda"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 justify-between">
                        <DrawerClose className="w-full border border-line-20 bg-line-50 bg-opacity-20 rounded-lg">
                          <DrawerDescription>Batal</DrawerDescription>
                        </DrawerClose>
                        <Button
                          title="Simpan Data"
                          type="submit"
                          disabled={isLoading ? true : false}
                          className="bg-primary-40 hover:bg-primary-70 text-line-10 h-10 text-[14px] md:text-[16px] px-3 rounded-lg border border-primary text-center font-medium gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-2 w-full">
                          {isLoading ? (
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
          {!isMobile ? (
            <>
              {faqs && faqs.length > 0 && (
                <SuperFaqsMasterDataTablePages
                  faqs={faqs}
                  handleDeleteFaqs={handleDeleteFaqs}
                  isDeleteLoading={isDeleteLoading}
                  data={data}
                  setData={setData}
                  isUpdateLoading={isUpdateLoading}
                  isDialogEditOpen={isDialogEditOpen}
                  setIsDialogEditOpen={setIsDialogEditOpen}
                  handleUpdateFaqs={handleUpdateFaqs}
                />
              )}
            </>
          ) : (
            <>
              {faqs &&
                faqs.length > 0 &&
                faqs?.map((faq: FaqsInterface, i: number) => {
                  return (
                    <MobileFaqMasterDataCard
                      key={i}
                      faq={faq}
                      index={i}
                      handleDeleteFaqs={handleDeleteFaqs}
                      isDeleteLoading={isDeleteLoading}
                      data={data}
                      setData={setData}
                      isUpdateLoading={isUpdateLoading}
                      handleUpdateFaqs={handleUpdateFaqs}
                      isDialogEditOpen={isDialogEditOpen}
                      setIsDialogEditOpen={setIsDialogEditOpen}
                    />
                  );
                })}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
