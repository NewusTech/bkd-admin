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
  slug,
  setSlug,
}: {
  areas: AreasInterface[];
  slug: string;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
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
          {areas &&
            areas.length > 0 &&
            areas.map((area: AreasInterface, i: number) => (
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
                slug={slug}
                setSlug={setSlug}
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
              <TableHead className="text-center text-[14px]">
                Nama Bidang
              </TableHead>
              <TableHead className="text-center text-[14px]">
                Penanggung Jawab
              </TableHead>
              <TableHead className="text-center text-[14px]">
                NIP Penanggung Jawab
              </TableHead>
              <TableHead className="text-center text-[14px]">
                Deskripsi
              </TableHead>
              <TableHead className="text-center text-[14px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {areas &&
              areas.length > 0 &&
              areas.map((area: AreasInterface, i: number) => (
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
                  slug={slug}
                  setSlug={setSlug}
                />
              ))}
          </TableBody>
        </Table>
      </div>
      {/* dekstop*/}
    </>
  );
}
