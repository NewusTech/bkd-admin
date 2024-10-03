"use client";

import React, { useRef } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { StructureOrganizationInterface } from "@/types/interface";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Trash } from "@phosphor-icons/react";
import Image from "next/image";

export default function SuperStructureOrganizationMainMasterDataCard({
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
  const dropRef = useRef<HTMLDivElement>(null);
  const handleSetGallery = () => {
    setData({
      bkdstruktur_id: "",
    });
  };

  return (
    <TableRow className="border border-line-20">
      <TableCell className="text-center">{index + 1}</TableCell>
      <TableCell className="text-center">{organization.nama}</TableCell>
      <TableCell className="text-center">{organization.jabatan}</TableCell>
      {/* <TableCell className="text-center">{item?.image}</TableCell> */}
      <TableCell className="text-center flex items-center w-full">
        <div className="w-full flex flex-row items-center justify-center gap-x-2">
          <div className="w-full">
            <AlertDialog
            // open={isDialogEditOpen}
            // onOpenChange={setIsDialogEditOpen}
            >
              <AlertDialogTrigger
                // onClick={() => {
                //   handleSetGallery();
                //   setIsDialogEditOpen(true);
                // }}
                className="w-full">
                <div className="w-full text-sm bg-black-80 bg-opacity-20 hover:bg-opacity-40 flex items-center justify-center h-10 text-black-80 hover:text-line-10 rounded-lg">
                  Edit
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full max-w-2xl bg-line-10 rounded-lg shadow-md">
                <AlertDialogHeader className="flex flex-col max-h-[500px]">
                  <AlertDialogTitle className="text-center">
                    Master Data Foto Kegiatan
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    Input data yang diperlukan
                  </AlertDialogDescription>
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
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

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
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          </div>

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
      </TableCell>
    </TableRow>
  );
}
