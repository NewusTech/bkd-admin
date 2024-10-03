"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SuperAreasMasterDataCard from "@/components/all_cards/superAreasMasterDataCard";
import { AreasInterface } from "@/types/interface";
import MobileSuperAreasMasterDataCard from "@/components/all_cards/mobile/superAreasMasterDataCard";

export default function SuperAreasMasterDataTablePages({
  areas,
  handleDeleteArea,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  isDrawerEditOpen,
  setIsDialogEditOpen,
  setIsDrawerEditOpen,
  handleUpdateArea,

}: {
  areas: AreasInterface[];
  handleDeleteArea: (slug: string) => void;
  isDeleteLoading: boolean;
  data: { nama: string; desc: string; pj: string; nip_pj: string };
  setData: React.Dispatch<
    React.SetStateAction<{
      nama: string;
      desc: string;
      pj: string;
      nip_pj: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  isDrawerEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDrawerEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateArea: (e: React.FormEvent<HTMLFormElement>, slug: string) => void;
}) {
  return (
    <>
      {/* mobile*/}
      <div className="md:hidden">
        <>
          {areas && areas.length > 0 && areas.map((area: AreasInterface, i: number) => (
            <MobileSuperAreasMasterDataCard
              key={i}
              area={area}
              index={i}
              handleDeleteArea={handleDeleteArea}
              isDeleteLoading={isDeleteLoading}
              data={data}
              setData={setData}
              isUpdateLoading={isUpdateLoading}
              handleUpdateArea={handleUpdateArea}
              isDrawerEditOpen={isDrawerEditOpen}
              setIsDrawerEditOpen={setIsDrawerEditOpen}
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
              <TableHead className="text-center">No.</TableHead>
              <TableHead className="text-center">Nama Bidang</TableHead>
              <TableHead className="text-center">Penanggung Jawab</TableHead>
              <TableHead className="text-center">NIP Penanggung Jawab</TableHead>
              <TableHead className="text-center">Deskripsi</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {areas && areas.length > 0 && areas.map((area: AreasInterface, i: number) => (
              <SuperAreasMasterDataCard
                key={i}
                area={area}
                index={i}
                handleDeleteArea={handleDeleteArea}
                isDeleteLoading={isDeleteLoading}
                data={data}
                setData={setData}
                isUpdateLoading={isUpdateLoading}
                handleUpdateArea={handleUpdateArea}
                isDialogEditOpen={isDialogEditOpen}
                setIsDialogEditOpen={setIsDialogEditOpen}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      {/* dekstop*/}
    </>
  );
}
