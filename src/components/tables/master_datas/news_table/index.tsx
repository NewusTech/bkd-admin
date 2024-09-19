"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewsInterface } from "@/types/interface";
import SuperNewsMasterDataCard from "@/components/all_cards/superNewsMasterDataCard";

export default function SuperNewsMasterDataTablePages({
  news,
  handleDeleteNews,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleUpdateNews,
  previewImage,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  handleRemoveImage,
}: {
  news: NewsInterface[];
  handleDeleteNews: (slug: string) => void;
  isDeleteLoading: boolean;
  data: {
    title: string;
    desc: string;
    image: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      desc: string;
      image: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateNews: (e: React.FormEvent<HTMLFormElement>, slug: string) => void;
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
            <TableHead className="text-center">Nama Layanan</TableHead>
            <TableHead className="text-center">Deskripsi</TableHead>
            <TableHead className="text-center">Foto Berita</TableHead>
            <TableHead className="text-center w-3/12">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news &&
            news.length > 0 &&
            news?.map((item: NewsInterface, i: number) => {
              return (
                <SuperNewsMasterDataCard
                  key={i}
                  item={item}
                  index={i}
                  previewImage={previewImage}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDropImage={handleDropImage}
                  handleImageChange={handleImageChange}
                  handleRemoveImage={handleRemoveImage}
                  handleDeleteNews={handleDeleteNews}
                  isDeleteLoading={isDeleteLoading}
                  data={data}
                  setData={setData}
                  isUpdateLoading={isUpdateLoading}
                  handleUpdateNews={handleUpdateNews}
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
