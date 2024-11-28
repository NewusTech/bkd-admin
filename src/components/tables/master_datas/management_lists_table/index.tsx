"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SuperAreasMasterDataCard from "@/components/all_cards/superAreasMasterDataCard";
import { AreasInterface, NipInterface } from "@/types/interface";
import MobileSuperAreasMasterDataCard from "@/components/all_cards/mobile/superAreasMasterDataCard";
import MobileSuperManagementListCard from "@/components/all_cards/mobile/superManagementListCard";
import SuperManagementListCard from "@/components/all_cards/superManagementListCard";

export default function SuperManagementListTablePages({
  nip,
  data2,
  setData2,
  isUpdateLoading,
  isDialogEditOpen,
  isDrawerEditOpen,
  setIsDialogEditOpen,
  setIsDrawerEditOpen,
  handleUpdateNipData,
  nipId,
  setNipId,
}: {
  nip: NipInterface[];
  nipId: number | null;
  setNipId: React.Dispatch<React.SetStateAction<number | null>>;
  data2: { nip: string, name:string };
  setData2: React.Dispatch<
    React.SetStateAction<{
      nip: string;
      name:string
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  isDrawerEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDrawerEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateNipData: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
}) {
  return (
    <>
      {/* mobile*/}
      <div className="md:hidden">
        <>
          {nip &&
            nip.length > 0 &&
            nip.map((item: NipInterface, i: number) => (
              <MobileSuperManagementListCard
                key={i}
                item={item}
                index={i}
                data2={data2}
                setData2={setData2}
                isUpdateLoading={isUpdateLoading}
                handleUpdateNipData={handleUpdateNipData}
                isDrawerEditOpen={isDrawerEditOpen}
                setIsDrawerEditOpen={setIsDrawerEditOpen}
                nipId={nipId}
                setNipId={setNipId}
              />
            ))}
        </>
      </div>
      {/* mobile*/}

      {/* dekstop*/}
      <div className="hidden md:block">
        <Table className="w-full border border-line-20">
          <TableHeader className="bg-primary-40 text-line-10">
            <TableRow className="w-full">
              <TableHead className="text-center text-[14px]">No.</TableHead>
              <TableHead className="text-center text-[14px]">NIP</TableHead>
              <TableHead className="text-center text-[14px]">Nama</TableHead>
              <TableHead className="text-center text-[14px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nip &&
              nip.length > 0 &&
              nip.map((item: NipInterface, i: number) => (
                <SuperManagementListCard
                  key={i}
                  item={item}
                  index={i}
                  data2={data2}
                  setData2={setData2}
                  isUpdateLoading={isUpdateLoading}
                  handleUpdateNipData={handleUpdateNipData}
                  isDialogEditOpen={isDialogEditOpen}
                  setIsDialogEditOpen={setIsDialogEditOpen}
                  nipId={nipId}
                  setNipId={setNipId}
                />
              ))}
          </TableBody>
        </Table>
      </div>
      {/* dekstop*/}
    </>
  );
}
