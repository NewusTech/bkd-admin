"use client";

import React, { useRef } from "react";
import { Button } from "../ui/button";
import { formatDateString } from "@/lib/utils";
import { useRouter } from "next/navigation";
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
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NewsInterface,
  StructureOrganizationInterface,
} from "@/types/interface";
import Image from "next/image";
import { Label } from "../ui/label";
import EditorProvide from "../pages/areas";
import { Input } from "../ui/input";
import { Loader } from "lucide-react";
import { Trash } from "@phosphor-icons/react";

export default function MobileStructureOrganizationMainMasterDataCard({
  organization,
  index,
  // handleDeleteStructureOrganization,
  // isDeleteLoading,
  data,
  setData,
  // isUpdateLoading,
  // handleUpdateStructureOrganization,
  // isDialogEditOpen,
  // setIsDialogEditOpen,
}: {
  organization: StructureOrganizationInterface;
  index: number;
  // handleDeleteStructureOrganization: (slug: string) => void;
  // isDeleteLoading: boolean;
  data: {
    bkdstruktur_id: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      bkdstruktur_id: string;
    }>
  >;
  // isUpdateLoading: boolean;
  // handleUpdateStructureOrganization: (
  //   e: React.FormEvent<HTMLFormElement>,
  //   slug: string
  // ) => void;
  // isDialogEditOpen: boolean;
  // setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const handleSetGallery = () => {
    setData({
      bkdstruktur_id: "",
    });
  };

  return (
    <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4">
      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">No.</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {index + 1}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Nama Lengkap</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {organization.nama && organization.nama}
        </div>
      </div>

      <div className="w-full grid grid-cols-3">
        <div className="w-full text-[14px] md:text-[16px]">Jabatan</div>

        <div className="w-full col-span-2 text-[14px] md:text-[16px]">
          : {organization.jabatan && organization.jabatan}
        </div>
      </div>

      <div className="w-full flex flex-row gap-x-5">
        <Drawer
        // open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}
        >
          <DrawerTrigger
            // onClick={() => {
            //   handleSetGallery();
            //   setIsDialogEditOpen(true);
            // }}
            className="w-full text-[14px] border border-black-80 hover:bg-black-80 hover:bg-opacity-20 hover:text-line-10 rounded-lg">
            <div className="w-full">Edit</div>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-y-3 bg-line-10 rounded-lg w-full max-w-4xl h-4/6 px-3 pb-6">
            <div className="w-full flex flex-col gap-y-3 verticalScroll">
              <DrawerTitle className="text-center">
                Master Data Struktur Kegiatan
              </DrawerTitle>

              <DrawerDescription className="text-center">
                Input data yang diperlukan
              </DrawerDescription>

              <form
                // onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                //   handleUpdateStructureOrganization(e, organization?.slug)
                // }
                className="w-full flex flex-col gap-y-3 verticalScroll">
                <div className="w-full focus-within:text-black-80 flex flex-col gap-y-2">
                  <Label className="focus-within:text-black-800 font-normal text-sm">
                    Pilih Struktur Yang Akan Ditampilkan
                  </Label>

                  <div className="w-full border border-line-20 rounded-lg">
                    <Select
                    // onValueChange={handleSelectChange}
                    >
                      <SelectTrigger
                        className={`w-full gap-x-4 rounded-lg border-none active:border-none active:outline-none focus:border-none focus:outline-none`}>
                        <SelectValue
                          placeholder="Pilih Bidang"
                          className="text-black-80 w-full"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-line-10">
                        {/* <div className="pt-2">
                                {organizations &&
                                  organizations.length > 0 &&
                                  organizations.map(
                                    (
                                      organization: StructureOrganizationInterface,
                                      i: number
                                    ) => {
                                      return (
                                        <SelectItem
                                          key={i}
                                          className={`w-full px-4`}
                                          value={organization.id.toString()}>
                                          {organization?.jabatan}
                                        </SelectItem>
                                      );
                                    }
                                  )}
                              </div> */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="w-full flex flex-row justify-center items-center gap-x-5">
                  {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}

                  <Button
                    type="submit"
                    // disabled={isUpdateLoading ? true : false}
                    className="bg-primary-40 hover:bg-primary-70 text-line-10">
                    {/* {isUpdateLoading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Update"
                        )} */}
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </DrawerContent>
        </Drawer>

        <div className="w-full">
          <Button
            // disabled={isDeleteLoading ? true : false}
            // onClick={() =>
            //   handleDeleteStructureOrganization(organization?.slug)
            // }
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
    </section>
  );
}
