import React from "react";
import { Button } from "../ui/button";
import { Trash } from "@phosphor-icons/react";
import { FormServiceInterface } from "@/types/interface";
import { Loader } from "lucide-react";

export default function SuperAdminServiceRequirmentDetailDocCard({
  item,
  handleDeleteDoc,
  isLoadingDoc,
}: {
  item: FormServiceInterface;
  handleDeleteDoc: (id: number) => void;
  isLoadingDoc: boolean;
}) {
  return (
    <div className="w-full flex flex-row justify-between px-3 py-5 border-b-2 border-line-20">
      <div className="w-full flex flex-row items-center">
        <p className="text-[14px] md:text-[16px] text-black-80">
          {item?.field}
        </p>
      </div>

      <div className="w-4/12">
        <Button
          disabled={isLoadingDoc ? true : false}
          onClick={() => handleDeleteDoc(item?.id)}
          className="w-full group bg-error-50 hover:bg-error-70 text-line-10">
          {isLoadingDoc ? (
            <Loader className="animate-spin" />
          ) : (
            <div className="w-full flex flex-row justify-center gap-x-3">
              <Trash className="w-5 h-5 group-hover:text-line-10" />

              <span className="text-[14px] md:text-[16px]">Hapus</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
