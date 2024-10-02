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
import SuperServiceRequirementsCard from "@/components/all_cards/superServiceRequirementsCard";

export default function SuperServiceRequirementsMasterDataTablePages({
    areas,
    handleDeleteArea,
    isDeleteLoading,
    data,
    setData,
    isUpdateLoading,
    isDialogEditOpen,
    setIsDialogEditOpen,
    handleUpdateArea,
    quillEdit,
    quillEditRef,
}: {
    areas: AreasInterface[];
    handleDeleteArea: (slug: string) => void;
    isDeleteLoading: boolean;
    data: { nama: string; desc: string; pj: string; nip_pj: string };
    setData: React.Dispatch<
        React.SetStateAction<{
            nama: string;
            desc: string;
            pj: string;
            nip_pj: string;
        }>
    >;
    isUpdateLoading: boolean;
    isDialogEditOpen: boolean;
    setIsDialogEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleUpdateArea: (e: React.FormEvent<HTMLFormElement>, slug: string) => void;
    quillEdit: any;
    quillEditRef: any;
}) {
    return (
        <>
            <Table className="w-full border border-line-20">
                <TableHeader className="bg-primary-40 text-line-10">
                    <TableRow className="w-full">
                        <TableHead className="text-center">No.</TableHead>
                        <TableHead className="text-left">Pilih Layanan</TableHead>
                        <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {areas && areas.length > 0 && areas.map((area: AreasInterface, i: number) => (
                        <SuperServiceRequirementsCard
                            key={i}
                            area={area}
                            index={i}
                            handleDeleteArea={handleDeleteArea}
                            isDeleteLoading={isDeleteLoading}
                            data={data}
                            setData={setData}
                            isUpdateLoading={isUpdateLoading}
                            handleUpdateArea={handleUpdateArea}
                            isDialogEditOpen={isDialogEditOpen}
                            setIsDialogEditOpen={setIsDialogEditOpen}
                            quillEdit={quillEdit}
                            quillEditRef={quillEditRef}
                        />
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
