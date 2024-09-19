"use client";

export const dynamic = "force-dynamic";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
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
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { RichTextDisplay } from "@/components/elements/RichTextDisplay";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function TermConditionScreen() {
  const router = useRouter();
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const { quill, quillRef } = useQuill();
  const [terms, setTerms] = useState<TermConditionInterface>();
  const [data, setData] = useState({
    desc: "",
  });

  const fetchTermConditions = async () => {
    try {
      const response = await getTermConditions();

      setTerms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTermConditions();
  }, []);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setData((prevData) => ({
          ...prevData,
          desc: quill.root.innerHTML,
        }));
      });
    }
  }, [quill]);

  const handleUpdateTerms = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    try {
      const response = await updateTermConditions(data);

      if (response.status === 200) {
        setData({
          desc: "",
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Term And Condition!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        fetchTermConditions();
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
    <section className="w-full flex flex-col items-center px-5 mt-5 gap-y-5">
      <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-black-80 font-semibold text-lg">
            Data Tabel Syarat dan Ketentuan
          </p>
        </div>

        <div className="w-full">
          <Table className="w-full border border-line-20">
            <TableHeader className="bg-primary-40 text-line-10">
              <TableRow className="w-full">
                <TableHead className="text-center">Deskripsi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border border-line-20">
                <TableCell className="text-center">
                  {terms && <RichTextDisplay content={terms?.desc} />}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-3">
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-black-80 font-semibold text-lg">
            Form Update Syarat dan Ketentuan
          </p>
        </div>

        <form
          onSubmit={handleUpdateTerms}
          className="w-full flex flex-col gap-y-3">
          <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-3">
            <Label className="focus-within:text-primary-70 font-normal text-[16px]">
              Deskripsi
            </Label>

            <div className="w-full h-[300px] flex flex-col gap-y-2">
              <div
                className="flex flex-col h-[300px] w-full border border-line-20 rounded-lg"
                ref={quillRef}></div>
            </div>
          </div>

          <div className="w-full flex flex-row justify-center items-center gap-x-5">
            <Button
              type="submit"
              disabled={isUpdateLoading ? true : false}
              className="bg-primary-40 hover:bg-primary-70 text-line-10">
              {isUpdateLoading ? <Loader className="animate-spin" /> : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
