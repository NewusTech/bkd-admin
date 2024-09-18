"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BKDGalleryActivitiesInterface,
  CarouselSliderInterface,
} from "@/types/interface";
import SuperBKDGalleryActivitiesMasterDataCard from "@/components/all_cards/superBKDGalleryActivitiesCard";
import SuperCarouselSliderMasterDataCard from "@/components/all_cards/superCarouselSliderMasterDataCard";

export default function SuperCarouselSliderMasterDataTablePages({
  carousels,
  handleDeleteSlider,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleUpdateSlider,
  previewImage,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  handleRemoveImage,
}: {
  carousels: CarouselSliderInterface[];
  handleDeleteSlider: (id: number) => void;
  isDeleteLoading: boolean;
  data: {
    image: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      image: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateSlider: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
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
            <TableHead className="text-center">Slider</TableHead>
            <TableHead className="text-center w-3/12">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carousels &&
            carousels.length > 0 &&
            carousels?.map((carousel: CarouselSliderInterface, i: number) => {
              return (
                <SuperCarouselSliderMasterDataCard
                  key={i}
                  carousel={carousel}
                  index={i}
                  previewImage={previewImage}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDropImage={handleDropImage}
                  handleImageChange={handleImageChange}
                  handleRemoveImage={handleRemoveImage}
                  handleDeleteSlider={handleDeleteSlider}
                  isDeleteLoading={isDeleteLoading}
                  data={data}
                  setData={setData}
                  isUpdateLoading={isUpdateLoading}
                  handleUpdateSlider={handleUpdateSlider}
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
