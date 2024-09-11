"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function FooterScreen() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAgree = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex w-full bg-primary-700">
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-[49px] my-[29px] text-center">
        <p className="text-[12px] text-white font-normal">
          Copyright &copy; 2024
          <span className="text-[12px] font-bold"> BKD Lampung Timur</span>. All
          rights reserved
        </p>

        <Link
          href="/kontak"
          className="text-[12px] mt-2 md:mt-0 hover:underline text-neutral-50 font-normal cursor-pointer">
          Hubungi Kami
        </Link>

        <div className="w-3/12 text-center text-neutral-50 text-[12px]">
          <Dialog open={isDialogOpen}>
            <DialogTrigger
              className="text-neutral-50 font-semibold hover:underline"
              onClick={() => setIsDialogOpen(true)}>
              Syarat Ketentuan
            </DialogTrigger>
            <DialogContent className="flex flex-col bg-neutral-50 rounded-xl p-1 justify-center items-center w-10/12 max-h-[700px]">
              <div className="py-4 px-6 flex flex-col items-center w-full verticalScroll gap-y-6">
                <div>Hello World</div>

                <div
                  onClick={handleAgree}
                  className="bg-primary-700 text-center cursor-pointer w-2/12 rounded-full text-neutral-50 py-1 px-5">
                  Setuju
                </div>
              </div>
            </DialogContent>
          </Dialog>{" "}
          &{" "}
          <Dialog open={isDialogOpen}>
            <DialogTrigger
              className="text-neutral-50 font-semibold hover:underline"
              onClick={() => setIsDialogOpen(true)}>
              Kebijakan Privasi
            </DialogTrigger>
            <DialogContent className="flex flex-col bg-line-10 rounded-lg p-1 justify-center items-center w-10/12 max-h-[700px]">
              <div className="m-3 py-4 px-8 flex flex-col items-center w-full verticalScroll gap-y-6">
                <div>Hello World</div>

                <div
                  onClick={handleAgree}
                  className="bg-primary-40 text-sm text-center cursor-pointer w-2/12 rounded-md text-line-10 py-1 px-3">
                  Setuju
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
