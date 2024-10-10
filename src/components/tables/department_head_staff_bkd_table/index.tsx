"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VerificationUserApplicationHistoryCard from "@/components/all_cards/verificationUserApplicationHistoryCard";
import {
  AreasInterface,
  GradeInterface,
  StructureOrganizationInterface,
  UserApplicationHistoryInterface,
} from "@/types/interface";
import DepartmentHeadStaffBkdCard from "@/components/all_cards/department_head_staff_bkd_card";

export default function DepartmentHeadStaffHeadTablePages({
  organizations,
  areas,
  grades,
  previewImage,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  handleRemoveImage,
  data,
  setData,
  isLoadingDelete,
  isLoadingUpdate,
  isDialogOpenUpdate,
  setIsDialogOpenUpdate,
  isDialogOpenDetail,
  setIsDialogOpenDetail,
  handleDeleteStructureOrganization,
  handleUpdateStructureOrganization,
}: {
  organizations: StructureOrganizationInterface[];
  areas: AreasInterface[];
  grades: GradeInterface[];
  previewImage: string;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropImage: (e: React.DragEvent<HTMLDivElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  data: {
    nama: string;
    jabatan: string;
    image: string;
    golongan: string;
    nip: string;
    bidang_id: string;
    status: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      nama: string;
      jabatan: string;
      image: string;
      golongan: string;
      nip: string;
      bidang_id: string;
      status: string;
    }>
  >;
  isLoadingDelete: boolean;
  isLoadingUpdate: boolean;
  isDialogOpenUpdate: boolean;
  setIsDialogOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  isDialogOpenDetail: boolean;
  setIsDialogOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteStructureOrganization: (slug: string) => void;
  handleUpdateStructureOrganization: (
    e: React.FormEvent<HTMLFormElement>,
    slug: string
  ) => void;
}) {
  return (
    <>
      <Table className="w-full border border-line-20 text-[14px]">
        <TableHeader className="bg-primary-40 text-line-10">
          <TableRow className="">
            <TableHead className="">No.</TableHead>
            <TableHead className="text-center">Nama</TableHead>
            {/* <TableHead className="text-center">NIP</TableHead> */}
            <TableHead className="text-center">Jabatan</TableHead>
            {/* <TableHead className="text-center">Gol/Pangkat</TableHead> */}
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations &&
            organizations.length > 0 &&
            organizations.map(
              (item: StructureOrganizationInterface, i: number) => {
                return (
                  <DepartmentHeadStaffBkdCard
                    key={i}
                    item={item}
                    index={i}
                    areas={areas}
                    grades={grades}
                    previewImage={previewImage}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDropImage={handleDropImage}
                    handleImageChange={handleImageChange}
                    handleRemoveImage={handleRemoveImage}
                    handleDeleteStructureOrganization={
                      handleDeleteStructureOrganization
                    }
                    isLoadingDelete={isLoadingDelete}
                    data={data}
                    setData={setData}
                    isLoadingUpdate={isLoadingUpdate}
                    isDialogOpenUpdate={isDialogOpenUpdate}
                    isDialogOpenDetail={isDialogOpenDetail}
                    setIsDialogOpenUpdate={setIsDialogOpenUpdate}
                    setIsDialogOpenDetail={setIsDialogOpenDetail}
                    handleUpdateStructureOrganization={
                      handleUpdateStructureOrganization
                    }
                  />
                );
              }
            )}
        </TableBody>
      </Table>
    </>
  );
}
