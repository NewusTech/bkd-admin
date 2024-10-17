"use client";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import SuperAreasMasterDataCard from "@/components/all_cards/superAreasMasterDataCard";
import { AreasInterface, ServiceInterface } from "@/types/interface";
import SuperServiceRequirementsCard from "@/components/all_cards/superServiceRequirementsCard";

export default function SuperServiceRequirementsMasterDataTablePages({
    item,
    index,
    // data,
    // setData,
}: {
    item: ServiceInterface;
    index: number;
    // data: {
    //     bidang_name: string;
    //     nama: string;
    // };
    // setData: React.Dispatch<
    //     React.SetStateAction<{
    //         bidang_name: string;
    //         nama: string;
    //     }>
    // >;
}) {
    return (
        <>
            <section className="w-full bg-line-10 rounded-lg shadow-md flex flex-col gap-y-7 p-4 mb-4">
                <>
                    <div className="text-[14px] md:text-[16px] flex flex-col gap-y-4">
                        <div className="w-full grid grid-cols-3">
                            <div className="w-full text-[14px] md:text-[16px]">No.</div>
                            <div className="w-full col-span-2 text-[14px] md:text-[16px]">
                                : {index + 1}
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-3">
                            <div className="w-full text-[14px] md:text-[16px]">Pertanyaan</div>
                            <div className="w-full col-span-2 text-[14px] md:text-[16px]">
                                : {item?.Bidang_name && item?.Bidang_name}
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-3">
                            <div className="w-full text-[14px] md:text-[16px]">Jawaban</div>
                            <div className="w-full col-span-2 text-[14px] md:text-[16px]">
                                : {item?.nama && item?.nama}
                            </div>
                        </div>
                    </div>
                </>

            </section>
        </>
    );
}
