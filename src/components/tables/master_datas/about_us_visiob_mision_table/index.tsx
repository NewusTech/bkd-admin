"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SuperAreasMasterDataCard from "@/components/all_cards/superAreasMasterDataCard";
import {
  AboutUsVisionMisionInterface,
  AreasInterface,
} from "@/types/interface";
import SuperAboutUsVisionMisionMasterDataCard from "@/components/all_cards/superAboutUsVisionMisioncard";

export default function SuperAboutUsVisionMisionMasterDataTablePages({
  abouts,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleUpdateAbout,
}: {
  abouts: AboutUsVisionMisionInterface[];
  data: {
    kontak: string;
    visi: string;
    misi: string;
    about_bkd: string;
    long: string;
    lang: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      kontak: string;
      visi: string;
      misi: string;
      about_bkd: string;
      long: string;
      lang: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateAbout: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
}) {
  return (
    <>
      <Table className="w-full border border-line-20">
        <TableHeader className="bg-primary-40 text-line-10">
          <TableRow className="w-full">
            <TableHead className="">No.</TableHead>
            <TableHead className="text-center">Tentang BKD</TableHead>
            <TableHead className="text-center">Kontak BKD</TableHead>
            <TableHead className="text-center w-3/12">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {abouts &&
            abouts.length > 0 &&
            abouts?.map((about: AboutUsVisionMisionInterface, i: number) => {
              return (
                <SuperAboutUsVisionMisionMasterDataCard
                  key={i}
                  about={about}
                  index={i}
                  data={data}
                  setData={setData}
                  isUpdateLoading={isUpdateLoading}
                  handleUpdateAbout={handleUpdateAbout}
                  isDialogEditOpen={isDialogEditOpen}
                  setIsDialogEditOpen={setIsDialogEditOpen}
                />
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}
