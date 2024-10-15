"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StructureOrganizationInterface } from "@/types/interface";
import SuperStructureOrganizationMasterDataCard from "@/components/all_cards/superStructureOrganizationCard";

export default function SuperStructureOrganizationMasterDataTablePages({
  organizations,
  handleDeleteStructureOrganization,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleUpdateStructureOrganization,
  previewImage,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  handleRemoveImage,
}: {
  organizations: StructureOrganizationInterface[];
  handleDeleteStructureOrganization: (slug: string) => void;
  isDeleteLoading: boolean;
  data: {
    nama: string;
    jabatan: string;
    image: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      nama: string;
      jabatan: string;
      image: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateStructureOrganization: (
    e: React.FormEvent<HTMLFormElement>,
    slug: string
  ) => void;
  previewImage: string;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropImage: (e: React.DragEvent<HTMLDivElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
}) {
  return (
    <>
      <Table className="w-full border border-line-20 text-[14px]">
        <TableHeader className="bg-primary-40 text-line-10">
          <TableRow className="w-full">
            <TableHead className="">No.</TableHead>
            <TableHead className="text-center">Nama Lengkap</TableHead>
            <TableHead className="text-center">Jabatan</TableHead>
            <TableHead className="text-center w-3/12">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations &&
            organizations.length > 0 &&
            organizations?.map(
              (organization: StructureOrganizationInterface, i: number) => {
                return (
                  <SuperStructureOrganizationMasterDataCard
                    key={i}
                    organization={organization}
                    index={i}
                    previewImage={previewImage}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDropImage={handleDropImage}
                    handleImageChange={handleImageChange}
                    handleRemoveImage={handleRemoveImage}
                    handleDeleteStructureOrganization={
                      handleDeleteStructureOrganization
                    }
                    isDeleteLoading={isDeleteLoading}
                    data={data}
                    setData={setData}
                    isUpdateLoading={isUpdateLoading}
                    handleUpdateStructureOrganization={
                      handleUpdateStructureOrganization
                    }
                    isDialogEditOpen={isDialogEditOpen}
                    setIsDialogEditOpen={setIsDialogEditOpen}
                  />
                );
              }
            )}
        </TableBody>
      </Table>
    </>
  );
}
