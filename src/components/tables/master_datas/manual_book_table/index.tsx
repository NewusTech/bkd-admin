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
import MobileManualBookCard from "@/components/mobile_all_cards/mobileManualBookCard";

export default function SuperManualBookMasterDataTablePages({
  books,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  isDrawerEditOpen,
  setIsDialogEditOpen,
  setIsDrawerEditOpen,
  handleUpdateManualBook,
  manualFile,
  handleDragOver,
  handleDragLeave,
  handleDropImage,
  handleImageChange,
  fileName,
  previewFile,
}: {
  books: any;
  data: { dokumen: string; title: string };
  setData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      dokumen: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  isDrawerEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDrawerEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateManualBook: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => void;
  manualFile: File | null;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropImage: (e: React.DragEvent<HTMLDivElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
  previewFile: string;
}) {
  return (
    <>
      {/* mobile*/}
      <div className="md:hidden">
        <>
          {books &&
            books.length > 0 &&
            books.map((book: any, i: number) => (
              <MobileManualBookCard
                key={i}
                book={book}
                index={i + 1}
                data={data}
                setData={setData}
                isUpdateLoading={isUpdateLoading}
                isDialogEditOpen={isDialogEditOpen}
                setIsDialogEditOpen={setIsDialogEditOpen}
                handleUpdateManualBook={handleUpdateManualBook}
                manualFile={manualFile}
                handleDragOver={handleDragOver}
                handleDragLeave={handleDragLeave}
                handleDropImage={handleDropImage}
                handleImageChange={handleImageChange}
                fileName={fileName}
                previewFile={previewFile}
                isDrawerEditOpen={isDrawerEditOpen}
                setIsDrawerEditOpen={setIsDrawerEditOpen}
              />
            ))}
        </>
      </div>
      {/* mobile*/}

      {/* dekstop*/}
      <div className="hidden md:block">
        <>
          <Table className="w-full border border-line-20 text-[14px]">
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
                    manualFile={manualFile}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDropImage={handleDropImage}
                    handleImageChange={handleImageChange}
                    fileName={fileName}
                    previewFile={previewFile}
                  />
                ))}
            </TableBody>
          </Table>
        </>
      </div>
      {/* dekstop*/}
    </>
  );
}
