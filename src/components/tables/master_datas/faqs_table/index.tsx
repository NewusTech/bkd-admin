"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaqsInterface } from "@/types/interface";
import SuperFaqsMasterDataCard from "@/components/all_cards/superFaqsMasterDataCard";

export default function SuperFaqsMasterDataTablePages({
  faqs,
  handleDeleteFaqs,
  isDeleteLoading,
  data,
  setData,
  isUpdateLoading,
  isDialogEditOpen,
  setIsDialogEditOpen,
  handleUpdateFaqs,
}: {
  faqs: FaqsInterface[];
  handleDeleteFaqs: (id: number) => void;
  isDeleteLoading: boolean;
  data: { answer: string; question: string };
  setData: React.Dispatch<
    React.SetStateAction<{
      answer: string;
      question: string;
    }>
  >;
  isUpdateLoading: boolean;
  isDialogEditOpen: boolean;
  setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateFaqs: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
}) {
  return (
    <>
      <Table className="w-full border border-line-20">
        <TableHeader className="bg-primary-40 text-line-10">
          <TableRow className="w-full">
            <TableHead className="text-center">No.</TableHead>
            <TableHead className="text-center">Pertanyaan</TableHead>
            <TableHead className="text-center">Jawaban</TableHead>
            <TableHead className="text-center w-3/12">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faqs &&
            faqs.length > 0 &&
            faqs?.map((faq: FaqsInterface, i: number) => {
              return (
                <SuperFaqsMasterDataCard
                  key={i}
                  faq={faq}
                  index={i}
                  handleDeleteFaqs={handleDeleteFaqs}
                  isDeleteLoading={isDeleteLoading}
                  data={data}
                  setData={setData}
                  isUpdateLoading={isUpdateLoading}
                  handleUpdateFaqs={handleUpdateFaqs}
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
