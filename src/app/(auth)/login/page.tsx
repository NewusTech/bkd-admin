"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import BackgroundImage from "@/components/layouts/background_images";
import { schemaLoginAdmin } from "@/validations";
import { z } from "zod";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import Cookies from "js-cookie";
import { getTermConditions, postLoginUser } from "@/services/api";
import { TermConditionInterface } from "@/types/interface";

export default function LoginScreen() {
  const router = useRouter();
  const [seen, setSeen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState({
    nip: "",
    password: "",
  });
  const [terms, setTerms] = useState<TermConditionInterface>();
  const [errors, setErrors] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (token) {
      router.push("/");
    }
  }, [router]);

  const validateForm = useCallback(async () => {
    try {
      await schemaLoginAdmin.parseAsync(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.format();
        setErrors(formattedErrors);
      }
      setIsLoading(false);
      return false;
    }
  }, [data]);

  useEffect(() => {
    if (hasSubmitted) {
      validateForm();
    }
  }, [hasSubmitted, validateForm]);

  const handleLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);

    const isValid = await validateForm();

    if (isValid) {
      setIsLoading(true);

      try {
        const response = await postLoginUser(data);

        if (response.status === 200) {
          Cookies.set("Authorization", response?.data?.token);
          Swal.fire({
            icon: "success",
            title: "Login berhasil!",
            timer: 2000,
            showConfirmButton: false,
            position: "center",
          });
          router.push("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Login gagal. Periksa NIK dan password Anda.",
            timer: 2000,
            showConfirmButton: false,
            position: "center",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setHasSubmitted(false);
      }
    }
  };

  const fetchDataTerms = async () => {
    try {
      const response = await getTermConditions();

      setTerms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataTerms();
  }, []);

  const handleAgree = () => {
    setIsDialogOpen(false);
  };

  return (
    <section className="relative flex justify-center items-center w-screen h-screen">
      <BackgroundImage />

      <div className="relative z-50 flex flex-col w-5/12 items-center justify-center gap-y-8 bg-white p-12 shadow-lg rounded-lg">
        <div className="w-full flex flex-col items-center gap-y-2">
          <h2 className="text-black-80 text-xl">
            Selamat Datang Di Aplikasi BKD
          </h2>

          <p className="text-black-80 text-center text-sm">
            Lorem ipsum sit amet Lorem ipsum sit amet Lorem ipsum sit amet Lorem
            ipsum sit amet
          </p>
        </div>

        <div className="w-full flex flex-col items-center">
          <h5 className="text-black-80 text-lg">Login Akun!</h5>

          <form
            onSubmit={handleLoginUser}
            className="w-full flex flex-col gap-y-3">
            <div className="w-full flex flex-col gap-y-5">
              <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
                <Label
                  htmlFor="nip"
                  className="focus-within:text-primary-70 font-normal">
                  NIP
                </Label>

                <Input
                  id="nip"
                  name="nip"
                  value={data.nip}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setData({
                      ...data,
                      nip: e.target.value,
                    })
                  }
                  type="text"
                  // inputMode="numeric"
                  className="w-full focus-visible:text-neutral-70 focus-visible:border focus-visible:border-primary-70"
                  placeholder="Masukkan NIP Anda"
                />

                {hasSubmitted && errors?.nip?._errors && (
                  <div className="text-red-500 text-[12px] md:text-[14px]">
                    {errors.nip._errors[0]}
                  </div>
                )}
              </div>

              <div className="w-full focus-within:text-black-70 flex flex-col gap-y-2">
                <Label
                  htmlFor="password"
                  className="focus-within:text-primary-40 font-normal">
                  Kata Sandi
                </Label>

                <div className="focus-within:border focus-within:border-primary-40 flex items-center mt-1 justify-between rounded-lg bg-transparent text-[14px] w-full h-[40px] font-normal border border-grey-50 placeholder:text-[14px] placeholder:text-neutral-700">
                  <Input
                    id="password"
                    name="password"
                    autoComplete="true"
                    value={data.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setData({
                        ...data,
                        password: e.target.value,
                      })
                    }
                    type={!seen ? "text" : "password"}
                    className="w-full focus-visible:text-neutral-70 border-none outline-none bg-transparent"
                    placeholder="Masukkan Kata Sandi"
                  />

                  <div
                    onClick={() => setSeen(!seen)}
                    className="p-2 cursor-pointer">
                    {seen ? (
                      <EyeOff className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                    ) : (
                      <Eye className="text-black-40 focus-within:text-primary-40 w-[20px] h-[20px]" />
                    )}
                  </div>
                </div>

                {hasSubmitted && errors?.password?._errors && (
                  <div className="text-red-500 text-[12px] md:text-[14px]">
                    {errors.password._errors[0]}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-8">
              <div className="w-full flex flex-col gap-y-6">
                <div className="w-full flex flex-row">
                  <Button
                    type="submit"
                    disabled={isLoading ? true : false}
                    className="w-full bg-primary-40 hover:bg-primary-70 text-line-10 text-sm py-4">
                    {isLoading ? <Loader className="animate-spin" /> : "Masuk"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full text-center text-black-80 text-sm mt-5">
              Dengan mendaftar, Anda menyetujui{" "}
              <AlertDialog open={isDialogOpen}>
                <AlertDialogTrigger
                  className="text-primary-40 font-semibold hover:underline"
                  onClick={() => setIsDialogOpen(true)}>
                  Syarat & Ketentuan
                </AlertDialogTrigger>
                <AlertDialogContent className="flex flex-col bg-line-10 rounded-xl p-1 justify-center items-center w-10/12 md:w-4/12 max-h-[550px]">
                  <AlertDialogTitle>Ini Syarat Judul</AlertDialogTitle>
                  <AlertDialogDescription>Ini Syarat</AlertDialogDescription>

                  <div className="m-3 px-4 flex flex-col items-center w-full verticalScroll gap-y-6">
                    <div>{terms && parse(terms?.desc)}</div>

                    <div
                      onClick={handleAgree}
                      className="bg-primary-40 text-center cursor-pointer w-4/12 rounded-full text-line-10 py-1 px-5">
                      Setuju
                    </div>
                  </div>
                </AlertDialogContent>
              </AlertDialog>{" "}
              kami dan Anda telah membaca{" "}
              <AlertDialog open={isDialogOpen}>
                <AlertDialogTrigger
                  className="text-primary-40 font-semibold hover:underline"
                  onClick={() => setIsDialogOpen(true)}>
                  Kebijakan Privasi
                </AlertDialogTrigger>
                <AlertDialogContent className="flex flex-col bg-line-10 rounded-xl p-1 justify-center items-center w-10/12 md:w-4/12 max-h-[550px]">
                  <AlertDialogTitle>Ini Ketentuan Judul</AlertDialogTitle>
                  <AlertDialogDescription>Ini Ketentuan</AlertDialogDescription>

                  <div className="m-3 px-4 flex flex-col items-center w-full verticalScroll gap-y-6">
                    <div>{terms && parse(terms?.desc)}</div>

                    <div
                      onClick={handleAgree}
                      className="bg-primary-40 text-center cursor-pointer w-4/12 rounded-full text-line-10 py-1 px-5">
                      Setuju
                    </div>
                  </div>
                </AlertDialogContent>
              </AlertDialog>{" "}
              kami.
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
