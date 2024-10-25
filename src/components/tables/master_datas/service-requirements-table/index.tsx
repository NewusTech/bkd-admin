"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ServiceInterface } from "@/types/interface";
import SuperServiceRequirementsCard from "@/components/all_cards/superServiceRequirementsCard";

export default function SuperServiceRequirementsMasterDataTablePages({
  services,
}: {
  services: ServiceInterface[];
}) {
  return (
    <>
      <Table className="w-full border border-line-20 text-[14px]">
        <TableHeader className="bg-primary-40 text-line-10">
          <TableRow className="w-full">
            <TableHead className="text-center">No.</TableHead>
            <TableHead className="text-center">Nama Layanan</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services &&
            services.length &&
            services.map((item: ServiceInterface, i: number) => {
              return (
                <SuperServiceRequirementsCard key={i} index={i} item={item} />
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}
