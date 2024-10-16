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
  AreasInterface,
  RegulationInterface,
  UploadBKDInterface,
} from "@/types/interface";
import SuperManualBookMasterDataCard from "@/components/all_cards/superManualBookDataCard";
import SuperregulationMasterDataCard from "@/components/all_cards/superRegulationMasterDataCard";
import SuperUploadBkdMasterDataCard from "@/components/all_cards/superUploadBkdMasterDataCard";

export default function SuperUploadBKDMasterDataTablePages({
  bkds,
  handleDeleteRegulations,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleUpdateRegulations,
  dropRef,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  handleRemoveImage,
  previewImage,
}: {
  bkds: UploadBKDInterface[];
  handleDeleteRegulations: (id: number) => void;
  isDeleteLoading: boolean;
  data: { title: string; file: string };
  setData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      file: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateRegulations: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  dropRef: React.RefObject<HTMLDivElement>;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropImage: (e: React.DragEvent<HTMLDivElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  previewImage: string;
}) {
  return (
    <>
      <Table className="w-full border border-line-20 text-[14px]">
        <TableHeader className="bg-primary-40 text-line-10">
          <TableRow className="w-full">
            <TableHead className="text-center">No.</TableHead>
            <TableHead className="text-center w-3/12">
              Judul BKD Struktur
            </TableHead>
            <TableHead className="text-center">File</TableHead>
            <TableHead className="text-center w-3/12">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bkds &&
            bkds.length > 0 &&
            bkds?.map((bkd: UploadBKDInterface, i: number) => {
              return (
                <SuperUploadBkdMasterDataCard
                  bkd={bkd}
                  index={i}
                  key={i}
                  handleDeleteRegulations={handleDeleteRegulations}
                  isDeleteLoading={isDeleteLoading}
                  data={data}
                  setData={setData}
                  isUpdateLoading={isUpdateLoading}
                  isDialogEditOpen={isDialogEditOpen}
                  setIsDialogEditOpen={setIsDialogEditOpen}
                  handleUpdateRegulations={handleUpdateRegulations}
                  dropRef={dropRef}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDropImage={handleDropImage}
                  handleRemoveImage={handleRemoveImage}
                  handleImageChange={handleImageChange}
                  previewImage={previewImage}
                />
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}
