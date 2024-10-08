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
import SuperManualBookMasterDataCard from "@/components/all_cards/superManualBookDataCard";

export default function SuperManualBookMasterDataTablePages({
  books,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleUpdateManualBook,
  previewImage,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  handleRemoveImage,
}: {
  books: any;
  data: { dokumen: string, title: string };
  setData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      dokumen: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateManualBook: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
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
            <TableHead className="text-center">Nama Manual Book</TableHead>
            <TableHead className="text-center">File</TableHead>
            <TableHead className="text-center">Tanggal Dibuat</TableHead>
            <TableHead className="text-center w-3/12">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books &&
            books.length > 0 &&
            books.map((book: any, i: number) => (
              <SuperManualBookMasterDataCard
                key={i}
                book={book}
                index={i + 1}
                data={data}
                setData={setData}
                isUpdateLoading={isUpdateLoading}
                isDialogEditOpen={isDialogEditOpen}
                setIsDialogEditOpen={setIsDialogEditOpen}
                handleUpdateManualBook={handleUpdateManualBook}
                previewImage={previewImage}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDropImage={handleDropImage}
                handleImageChange={handleImageChange}
                handleRemoveImage={handleRemoveImage}
              />
            ))}
        </TableBody>
      </Table>
    </>
  );
}
