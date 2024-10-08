"use client";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";
import SearchPages from "@/components/elements/search";
import { Button } from "@/components/ui/button";
import {
  deleteAreas,
  getAreas,
  postAreas,
  updateAreas,
  serviceRequirementStep2,
} from "@/services/api";
import {
  AreasInterface,
  CardType,
  CardTypeFile,
  OptionType,
} from "@/types/interface";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Loader, X } from "lucide-react";
import PaginationComponent from "@/components/elements/pagination";
import Editor from "@/components/elements/toolbar_editors";
import InputComponent from "@/components/InputComponent";
import SuperServiceRequirementsMasterDataTablePages from "@/components/tables/master_datas/service-requirements-table";
import Link from "next/link";
import AddIcon from "@/components/elements/add_button";
import Step from "@/components/Steps";

import Image from "next/image";
import { selectDataTypeForm } from "@/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useCreateRequirement from "@/store/useCreateRequirement";
import Cookies from "js-cookie";
import { Trash } from "@phosphor-icons/react";

const steps = [
  { id: 1, desk: "Tambah Persyaratan" },
  { id: 2, desk: "Formulir" },
  { id: 3, desk: "Dokumen" },
];
const currentStep = 3;

export default function ServiceRequirementsCreate() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { serviceId } = useCreateRequirement();
  const [cards, setCards] = useState<CardTypeFile[]>([
    {
      id: Date.now(),
      toggle: false,
      field: "",
      tipedata: "file",
      isrequired: "",
    },
  ]);

  const handleSwitch = (id: number) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, toggle: !card.toggle } : card
      )
    );
  };

  const handleAddCard = () => {
    setCards([
      ...cards,
      {
        id: Date.now(),
        toggle: false,
        field: "",
        isrequired: "",
        tipedata: "file",
      },
    ]);
  };

  const handleRemoveCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleInputChange = (id: number, field: string, value: any) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const requestData = cards.map((card) => ({
      field: card.field,
      tipedata: card.tipedata,
      status: 1,
      layanan_id: serviceId,
      isrequired: card.isrequired,
    }));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/docs/createmulti`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: `${data.message}`,
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        localStorage.removeItem("requirement");
        setCards([]);
        router.push("/super-admin/master-data/service-requirements");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal submit",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="w-full flex flex-col items-center px-5 mt-5">
        <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
          <div className="flex gap-4">
            <Link href="/super-admin/master-data/service-requirements/create/step-2">
              <svg
                width="30"
                height="31"
                viewBox="0 0 30 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19.413 24.2122C19.5001 24.2993 19.5692 24.4028 19.6164 24.5166C19.6635 24.6304 19.6878 24.7523 19.6878 24.8755C19.6878 24.9987 19.6635 25.1207 19.6164 25.2345C19.5692 25.3483 19.5001 25.4517 19.413 25.5388C19.3259 25.6259 19.2225 25.695 19.1087 25.7421C18.9949 25.7893 18.8729 25.8135 18.7498 25.8135C18.6266 25.8135 18.5046 25.7893 18.3908 25.7421C18.277 25.695 18.1736 25.6259 18.0865 25.5388L8.71148 16.1638C8.62431 16.0767 8.55517 15.9733 8.50799 15.8595C8.46081 15.7457 8.43652 15.6237 8.43652 15.5005C8.43652 15.3773 8.46081 15.2553 8.50799 15.1415C8.55517 15.0277 8.62431 14.9243 8.71148 14.8372L18.0865 5.46224C18.2624 5.28633 18.501 5.1875 18.7498 5.1875C18.9985 5.1875 19.2371 5.28633 19.413 5.46224C19.589 5.63815 19.6878 5.87674 19.6878 6.12552C19.6878 6.3743 19.589 6.61289 19.413 6.7888L10.7002 15.5005L19.413 24.2122Z"
                  fill="#3D3D3D"
                />
              </svg>
            </Link>
            <h1 className="text-lg md:text-lg">Persyaratan Layanan</h1>
          </div>
          <div className="w-full">
            <div className="text-center mb-4 text-sm md:text-lg">Dokumen</div>
            <div className="flex w-full">
              {steps.map((step, index) => (
                <Step
                  key={step.id}
                  isLastStep={index === steps.length - 1}
                  isActive={step.id === currentStep}
                  isCompleted={step.id < currentStep}
                  desk={step.desk}
                />
              ))}
            </div>
          </div>
          {cards.map((card) => (
            <div
              key={card.id}
              className="w-full h-full rounded-lg border border-line-20 bg-line-10 p-8">
              <InputComponent
                typeInput="formInput"
                value={card.field}
                onChange={(e) =>
                  handleInputChange(card.id, "field", e.target.value)
                }
              />
              <div className="mt-8">
                <div className="space-y-2 text-sm text-neutral-900">
                  <p>Apakah wajib diisi?</p>
                  <RadioGroup
                    onValueChange={(e) =>
                      handleInputChange(card.id, "isrequired", parseInt(e))
                    }
                    defaultValue={card?.isrequired}
                    className="flex space-x-1">
                    <div className="flex items-center space-x-2 space-y-0">
                      <RadioGroupItem value="1" />
                      <p className="font-normal">Ya</p>
                    </div>
                    <div className="flex items-center space-x-2 space-y-0">
                      <RadioGroupItem value="0" />
                      <p className="font-normal">Tidak</p>
                    </div>
                  </RadioGroup>
                </div>
                {/*  <div className="flex items-center gap-x-4">*/}
                {/*    <p className="text-sm text-neutral-900">*/}
                {/*      Hanya izinkan dengan file tertentu*/}
                {/*    </p>*/}
                {/*    <Switch*/}
                {/*      onClick={() => handleSwitch(card.id)}*/}
                {/*      className="data-[state=checked]:bg-neutral-800 data-[state=unchecked]:bg-transparent data-[state=unchecked]:border data-[state=unchecked]:border-neutral-800"*/}
                {/*      thumbClassName="data-[state=unchecked]:border data-[state=unchecked]:border-neutral-800 data-[state=unchecked]:ml-[2px]"*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*  {card.toggle && (*/}
                {/*    <div className="w-[321px] flex mt-6">*/}
                {/*      <InputComponent typeInput="radio" />*/}
                {/*    </div>*/}
                {/*  )}*/}
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  type="submit"
                  onClick={handleAddCard}
                  className="bg-primary-40 hover:bg-primary-70 text-line-10">
                  Tambah
                </Button>
                <Button
                  type="submit"
                  onClick={() => handleRemoveCard(card.id)}
                  className="bg-[#DF1212] hover:bg-[#5e1919] text-line-10">
                  Hapus
                </Button>
              </div>
            </div>
          ))}
          {/* Add Data */}
          <div className="flex justify-center m-auto items-center w-full mt-20">
            <Button
              onClick={handleSubmit}
              disabled={isLoading ? true : false}
              className="bg-primary-40 h-10 text-xs md:text-sm px-3 rounded-lg text-white hover:bg-primary-70 border border-primary text-center font-medium justify-end flex gap-2 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110duration-300 py-2">
              {isLoading ? <Loader className="animate-spin" /> : "Selanjutnya"}
            </Button>
          </div>
          {/* Tambah Data */}
        </div>
      </section>
    </>
  );
}
