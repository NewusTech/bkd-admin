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
  handleUpdateBooks,
}: {
  books: any;
  data: { dokumen: string };
  setData: React.Dispatch<
    React.SetStateAction<{
      dokumen: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateBooks: (
    e: React.FormEvent<HTMLFormElement>,
    slug: string
  ) => void;
}) {
  return (
    <>
      <Table className="w-full border border-line-20">
        <TableHeader className="bg-primary-40 text-line-10">
          <TableRow className="w-full">
            <TableHead className="">No.</TableHead>
            <TableHead className="text-center">Nama Bidang</TableHead>
            <TableHead className="text-center">Deskripsi</TableHead>
            <TableHead className="text-center w-3/12">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books &&
            books.length > 0 &&
            books?.map((book: any, i: number) => {
              return (
                <SuperManualBookMasterDataCard
                  book={book}
                  index={i}
                  key={i}
                  data={data}
                  setData={setData}
                  isUpdateLoading={isUpdateLoading}
                  isDialogEditOpen={isDialogEditOpen}
                  setIsDialogEditOpen={setIsDialogEditOpen}
                  handleUpdateBooks={handleUpdateBooks}
                />
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}
