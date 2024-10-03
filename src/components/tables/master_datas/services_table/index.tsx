"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AreasInterface, ServiceInterface } from "@/types/interface";
import SuperServicesMasterDataCard from "@/components/all_cards/superServicesMasterDataCard";
import MobileSuperServicesMasterDataCard from "@/components/all_cards/mobile/superServicesMasterDataCard";

export default function SuperServicesMasterDataTablePages({
  services,
  areas,
  handleDeleteService,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  setIsDialogEditOpen,
  isDrawerEditOpen,
  setIsDrawerEditOpen,
  handleUpdateService,
  quillConditionEdit,
  quillConditionEditRef,
  quillTermEdit,
  quillTermEditRef,
  quillStepEdit,
  quillStepEditRef,
  quillDescEdit,
  quillDescEditRef,
}: {
  services: ServiceInterface[];
  areas: AreasInterface[];
  handleDeleteService: (id: number) => void;
  isDeleteLoading: boolean;
  data: {
    nama: string;
    desc: string;
    syarat: string;
    bidang_id: string;
    penanggung_jawab: string;
    ketentuan: string;
    langkah: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      nama: string;
      desc: string;
      syarat: string;
      bidang_id: string;
      penanggung_jawab: string;
      ketentuan: string;
      langkah: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  isDrawerEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDrawerEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateService: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  quillConditionEdit: any;
  quillConditionEditRef: any;
  quillTermEdit: any;
  quillTermEditRef: any;
  quillStepEdit: any;
  quillStepEditRef: any;
  quillDescEdit: any;
  quillDescEditRef: any;
}) {
  return (
    <>
      {/* mobile*/}
      {/* <div className="md:hidden">
        <>
          {services &&
            services.length > 0 &&
            services?.map((service: ServiceInterface, i: number) => {
              return (
                <MobileSuperServicesMasterDataCard
                  key={i}
                  service={service}
                  areas={areas}
                  index={i}
                  handleDeleteService={handleDeleteService}
                  isDeleteLoading={isDeleteLoading}
                  data={data}
                  setData={setData}
                  isUpdateLoading={isUpdateLoading}
                  handleUpdateService={handleUpdateService}
                  isDrawerEditOpen={isDrawerEditOpen}
                  setIsDrawerEditOpen={setIsDrawerEditOpen}
                  quillConditionEdit={quillConditionEdit}
                  quillConditionEditRef={quillConditionEditRef}
                  quillTermEdit={quillTermEdit}
                  quillTermEditRef={quillTermEditRef}
                  quillStepEdit={quillStepEdit}
                  quillStepEditRef={quillStepEditRef}
                  quillDescEdit={quillDescEdit}
                  quillDescEditRef={quillDescEditRef}
                />
              );
            })}
        </>
      </div> */}
      {/* mobile*/}

      {/* dekstop*/}
      <div className="hidden md:block">
        <Table className="w-full border border-line-20">
          <TableHeader className="bg-primary-40 text-line-10">
            <TableRow className="w-full">
              <TableHead className="">No.</TableHead>
              <TableHead className="text-center">Nama Layanan</TableHead>
              <TableHead className="text-center">Penanggung Jawab</TableHead>
              <TableHead className="text-center">Deskripsi</TableHead>
              <TableHead className="text-center w-3/12">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services &&
              services.length > 0 &&
              services?.map((service: ServiceInterface, i: number) => {
                return (
                  <SuperServicesMasterDataCard
                    key={i}
                    service={service}
                    areas={areas}
                    index={i}
                    handleDeleteService={handleDeleteService}
                    isDeleteLoading={isDeleteLoading}
                    data={data}
                    setData={setData}
                    isUpdateLoading={isUpdateLoading}
                    handleUpdateService={handleUpdateService}
                    isDialogEditOpen={isDialogEditOpen}
                    setIsDialogEditOpen={setIsDialogEditOpen}
                    quillConditionEdit={quillConditionEdit}
                    quillConditionEditRef={quillConditionEditRef}
                    quillTermEdit={quillTermEdit}
                    quillTermEditRef={quillTermEditRef}
                    quillStepEdit={quillStepEdit}
                    quillStepEditRef={quillStepEditRef}
                    quillDescEdit={quillDescEdit}
                    quillDescEditRef={quillDescEditRef}
                  />
                );
              })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
