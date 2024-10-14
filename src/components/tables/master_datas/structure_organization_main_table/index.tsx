"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StructureOrganizationInterface, StructureOrganizationInterfaceMain } from "@/types/interface";
import SuperStructureOrganizationMasterDataCard from "@/components/all_cards/superStructureOrganizationCard";
import SuperStructureOrganizationMainMasterDataCard from "@/components/all_cards/superStructureOrganizationMainCard";

export default function SuperStructureOrganizationMainMasterDataTablePages({
  organizations,
  handleDeleteStructureOrganizationMain,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  setIsDialogEditOpen,
  // handleUpdateStructureOrganization,
}: {
  organizations: StructureOrganizationInterfaceMain[];
  handleDeleteStructureOrganizationMain: (id: number) => void;
  isDeleteLoading: boolean;
  data: {
    bkdstruktur_id: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      bkdstruktur_id: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // handleUpdateStructureOrganization: (
  //   e: React.FormEvent<HTMLFormElement>,
  //   slug: string
  // ) => void;
}) {
  return (
    <>
      <Table className="w-full border border-line-20">
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
              (organization: StructureOrganizationInterfaceMain, i: number) => {
                return (
                  <SuperStructureOrganizationMainMasterDataCard
                    key={i}
                    organization={organization}
                    index={i}
                    handleDeleteStructureOrganizationMain={
                      handleDeleteStructureOrganizationMain
                    }
                    isDeleteLoading={isDeleteLoading}
                    data={data}
                    setData={setData}
                    isUpdateLoading={isUpdateLoading}
                    // handleUpdateStructureOrganization={
                    //   handleUpdateStructureOrganization
                    // }
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
