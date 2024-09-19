"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BKDGalleryActivitiesInterface } from "@/types/interface";
import SuperBKDGalleryActivitiesMasterDataCard from "@/components/all_cards/superBKDGalleryActivitiesCard";

export default function SuperBKDGalleryActivitiesMasterDataTablePages({
  galleries,
  handleDeleteGallery,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleUpdateGallery,
  previewImage,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  handleRemoveImage,
}: {
  galleries: BKDGalleryActivitiesInterface[];
  handleDeleteGallery: (slug: string) => void;
  isDeleteLoading: boolean;
  data: {
    title: string;
    image: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      image: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateGallery: (
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
      <Table className="w-full border border-line-20">
        <TableHeader className="bg-primary-40 text-line-10">
          <TableRow className="w-full">
            <TableHead className="">No.</TableHead>
            <TableHead className="text-center">Judul Foto Kegiatan</TableHead>
            <TableHead className="text-center">Foto Kegiatan</TableHead>
            <TableHead className="text-center w-3/12">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {galleries &&
            galleries.length > 0 &&
            galleries?.map(
              (gallery: BKDGalleryActivitiesInterface, i: number) => {
                return (
                  <SuperBKDGalleryActivitiesMasterDataCard
                    key={i}
                    gallery={gallery}
                    index={i}
                    previewImage={previewImage}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDropImage={handleDropImage}
                    handleImageChange={handleImageChange}
                    handleRemoveImage={handleRemoveImage}
                    handleDeleteGallery={handleDeleteGallery}
                    isDeleteLoading={isDeleteLoading}
                    data={data}
                    setData={setData}
                    isUpdateLoading={isUpdateLoading}
                    handleUpdateGallery={handleUpdateGallery}
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
