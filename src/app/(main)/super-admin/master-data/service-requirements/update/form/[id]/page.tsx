"use client";

import SuperAdminServiceRequirmentDetailDocCard from "@/components/all_cards/superAdminServiceRequirmentDetailDocCard";
import SuperAdminServiceRequirmentDetailFormCard from "@/components/all_cards/superAdminServiceRequirmentDetailFormCard";
import {
  deleteDocDetailServiceRequirment,
  deleteFormDetailServiceRequirment,
  getFormByService,
  getFormDocByService,
} from "@/services/api";
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
import {
  ApplicationFormServiceDocInterface,
  ApplicationFormServiceInterface,
  CardType,
  FormServiceInterface,
  OptionType,
} from "@/types/interface";
import { ChevronLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Step from "@/components/Steps";
import { Input } from "@/components/ui/input";
import { selectDataTypeForm } from "@/constants";
import { Button } from "@/components/ui/button";
import { X } from "@phosphor-icons/react";

const steps = [
  { id: 1, desk: "Tambah Persyaratan" },
  { id: 2, desk: "Formulir" },
  { id: 3, desk: "Dokumen" },
];
const currentStep = 2;

export default function ServiceRequirmentMasterDataUpdateFormPages({
  params,
}: {
  params: { id: number };
}) {
  const router = useRouter();
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemId, setItemId] = useState<number | null>(null);
  const [form, setForm] = useState<ApplicationFormServiceInterface>();
  const [docForm, setDocForm] = useState<ApplicationFormServiceDocInterface>();
  const { serviceId, dataStep2, setDataStep2 } = useCreateRequirement();
  const [cards, setCards] = useState<CardType[]>(
    dataStep2.length > 0
      ? dataStep2
      : [
          {
            id: Date.now(),
            field: "",
            tipedata: "text",
            isrequired: "",
          },
        ]
  );

  const fetchFormData = async (serviceId: number) => {
    try {
      const response = await getFormByService(serviceId);

      setForm(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDocFormData = async (serviceId: number) => {
    try {
      const response = await getFormDocByService(serviceId);
      setDocForm(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchFormData(params?.id);
      fetchDocFormData(params?.id);
    }
  }, [params?.id]);

  const handleAddCard = () => {
    const newCard: CardType = {
      id: Date.now(),
      field: "",
      tipedata: "text",
      isrequired: "",
      ...(cards[cards.length - 1].tipedata === "radio" ||
      cards[cards.length - 1].tipedata === "checkbox"
        ? { options: [] }
        : {}),
    };
    setCards([...cards, newCard]);
  };

  const handleRemoveCard = (id: number) => {
    const updatedCards = cards.filter((card) => card.id !== id);

    setCards(updatedCards);
    setDataStep2(updatedCards);
  };

  const handleCardChange = (
    id: number,
    field: keyof CardType,
    value: string | number | OptionType[]
  ) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const addOption = (cardId: number) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId &&
      (card.tipedata === "radio" || card.tipedata === "checkbox")
        ? {
            ...card,
            options: [
              ...(card.options || []),
              { id: (card.options?.length || 0) + 1, key: "" },
            ],
          }
        : card
    );

    setCards(updatedCards);
  };

  const removeOption = (cardId: number, optionId: number) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId
        ? {
            ...card,
            options: card.options
              ?.filter((option) => option.id !== optionId)
              ?.map((option, index) => ({ ...option, id: index + 1 })),
          }
        : card
    );

    setCards(updatedCards);
  };

  const handleOptionChange = (
    cardId: number,
    optionId: number,
    value: string
  ) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId
        ? {
            ...card,
            options: card.options?.map((option) =>
              option.id === optionId ? { ...option, key: value } : option
            ),
          }
        : card
    );
    setCards(updatedCards);
  };

  useEffect(() => {
    setDataStep2(cards);
  }, [cards, setDataStep2]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const formattedData = dataStep2.map((card: any) => {
      const formattedCard: any = {
        field: card.field,
        tipedata: card.tipedata,
        isrequired: card.isrequired,
        layanan_id: serviceId,
        status: 1,
      };

      if (card.tipedata === "radio" || card.tipedata === "checkbox") {
        formattedCard.datajson = card.options?.map((option: any) => ({
          id: option.id,
          key: option.key,
        }));
      }

      return formattedCard;
    });

    const token = Cookies.get("Authorization");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/layanan/form/createmulti`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formattedData),
          cache: "no-store",
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: `${responseData.message}`,
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        setCards([]);
        router.push(
          "/super-admin/master-data/service-requirements/create/step-3"
        );
      } else {
        Swal.fire({
          icon: "error",
          title: responseData?.message || "Submission failed",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      // Log the error for debugging
      console.error("Submission error:", error);
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
    <section className="w-full flex flex-col items-center gap-y-5 px-5 mt-5">
      <div className="bg-line-10 shadow-md rounded-lg w-full flex flex-col p-5 gap-y-5">
        <div className="flex gap-4">
          <Link href="/super-admin/master-data/service-requirements/create">
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
          <div className="text-center mb-4 text-sm md:text-lg">Formulir</div>
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
            className="bg-white border border-[#E4E4E7] p-4 md:p-10">
            <div className="flex-none md:flex text-xs md:text-sm gap-8">
              <div className="w-full md:w-[70%]">
                <Input
                  type="text"
                  placeholder="Judul / Pertanyaan"
                  className="rounded-none border-r-0 border-t-0 border-l-0 bg-transparent text-[14px] md:text-[16px]"
                  value={card.field}
                  onChange={(e) =>
                    handleCardChange(card.id, "field", e.target.value)
                  }
                />
              </div>
              <div className="w-full mt-2 md:w-[30%]">
                <div className="p-2">
                  <div className="div">Tipe Pertanyaan</div>
                  <div className="border border-[#E4E4E7] mt-2">
                    <Select
                      value={card.tipedata}
                      onValueChange={(e: string) =>
                        handleCardChange(card.id, "tipedata", e)
                      }>
                      <SelectTrigger className="w-full text-xs md:text-sm">
                        <SelectValue
                          className="text-xs md:text-sm"
                          placeholder="Pilih Tipe Pertanyaan"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-line-10">
                        <SelectGroup>
                          <SelectLabel>Tipe Pertanyaan</SelectLabel>
                          {selectDataTypeForm?.map((item: any) => (
                            <SelectItem key={item.id} value={item.value}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-none justify-start md:flex md:justify-between mt-3">
              <div className="space-y-2 text-sm text-neutral-900">
                <RadioGroup
                  onValueChange={(e) =>
                    handleCardChange(card.id, "isrequired", parseInt(e))
                  }
                  value={card.isrequired.toString()}
                  className="flex-none md:flex space-x-4 md:space-x-1">
                  <div className="flex items-center space-x-2 space-y-0">
                    <RadioGroupItem
                      value="1"
                      className="border border-[#E4E4E7]"
                    />
                    <p className="font-normal">Ya</p>
                  </div>
                  <div className="flex items-center space-x-2 space-y-0">
                    <RadioGroupItem
                      value="0"
                      className="border border-[#E4E4E7]"
                    />
                    <p className="font-normal">Tidak</p>
                  </div>
                </RadioGroup>
              </div>
            </div>
            {/* Menampilkan opsi tambahan jika tipedata adalah radio atau checkbox */}
            {(card.tipedata === "radio" || card.tipedata === "checkbox") && (
              <div className="mt-4 space-y-2">
                <p className="text-sm">Pilihan</p>
                {card.options?.map((option) => (
                  <div key={option.id} className="flex gap-x-3 items-center">
                    <Input
                      type="text"
                      className="rounded-full w-2/12"
                      value={option.key}
                      onChange={(e) =>
                        handleOptionChange(card.id, option.id, e.target.value)
                      }
                      placeholder={`Pilihan ${option.id}`}
                    />
                    <div
                      className="cursor-pointer group"
                      onClick={() => removeOption(card.id, option.id)}>
                      <X className="text-error-500 group-hover:text-error-600" />
                    </div>
                  </div>
                ))}
                <Button
                  className="mt-2 border border-primary-700 bg-transparent text-primary-700 hover:bg-primary-700 hover:text-neutral-50 rounded-full"
                  onClick={() => addOption(card.id)}>
                  <p className="text-xs">Tambah Pilihan</p>
                </Button>
              </div>
            )}

            <hr className="border-t-1 border-[#E4E4E7] my-4 w-full" />
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
  );
}
